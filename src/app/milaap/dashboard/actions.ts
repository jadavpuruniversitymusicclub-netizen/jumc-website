"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { Types } from "mongoose";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { getGlobalSettings } from "@/lib/settings";
import Participant from "@/models/Participant";
import { MILAAP_COMPETITIONS } from "@/data/milaapCompetitions";
import {
  isAlwaysGroupCompetition,
  sanitizeAndValidateTeamMembers,
  supportsGroupEntryOption,
  type TeamMemberInput,
} from "@/lib/teamValidation";

export interface UpdateRegistrationInput {
  eventSlug: string;
  teamName?: string;
  role?: string;
  teamMode?: "Solo" | "Group";
  teamMembers?: TeamMemberInput[];
  phone?: string;
  college?: string;
  year?: string;
}

export interface RegistrationActionResult {
  success: boolean;
  status: number;
  message?: string;
  error?: string;
}

/**
 * Shared authentication, global lock, and record ownership guard for
 * participant self-service edits and cancellations.
 */
async function authorizeParticipantAction(registrationId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return {
      ok: false as const,
      result: {
        success: false,
        status: 401,
        error: "Unauthorized. Please sign in to continue.",
      },
    };
  }

  const settings = await getGlobalSettings();
  if (!settings.isEventEditingOpen) {
    return {
      ok: false as const,
      result: {
        success: false,
        status: 403,
        error: "Registration editing is currently locked by the administrators.",
      },
    };
  }

  if (!Types.ObjectId.isValid(registrationId)) {
    return {
      ok: false as const,
      result: {
        success: false,
        status: 400,
        error: "Invalid registration identifier.",
      },
    };
  }

  await connectToDatabase();
  const doc = await Participant.findById(registrationId);
  if (!doc) {
    return {
      ok: false as const,
      result: {
        success: false,
        status: 404,
        error: "Registration record not found.",
      },
    };
  }

  const sessionEmail = session.user.email.toLowerCase().trim();
  if (doc.email.toLowerCase().trim() !== sessionEmail) {
    return {
      ok: false as const,
      result: {
        success: false,
        status: 403,
        error: "Forbidden: You do not have permission to modify this registration.",
      },
    };
  }

  return { ok: true as const, doc, sessionEmail };
}

/**
 * Updates editable details for a specific competition registration owned by
 * the authenticated participant while keeping core identity/status immutable.
 */
export async function updateEventRegistration(
  registrationId: string,
  updatedData: UpdateRegistrationInput
): Promise<RegistrationActionResult> {
  try {
    const auth = await authorizeParticipantAction(registrationId);
    if (!auth.ok) return auth.result;

    const { doc } = auth;
    const targetSlug = String(updatedData.eventSlug || "").trim();
    const targetEvent = doc.events.find((ev) => ev.eventSlug === targetSlug);

    if (!targetEvent) {
      return {
        success: false,
        status: 404,
        error: "Selected event registration was not found.",
      };
    }

    if (typeof updatedData.phone === "string") {
      const cleanedPhone = updatedData.phone.trim();
      if (!cleanedPhone.replace(/[\s-]/g, "").match(/^\+?[0-9]{10,14}$/)) {
        return {
          success: false,
          status: 400,
          error: "Please enter a valid 10-digit phone number.",
        };
      }
      doc.phone = cleanedPhone;
    }

    if (typeof updatedData.college === "string") {
      const cleanedCollege = updatedData.college.trim();
      if (!cleanedCollege) {
        return {
          success: false,
          status: 400,
          error: "University / College name cannot be empty.",
        };
      }
      doc.college = cleanedCollege;
    }

    if (typeof updatedData.year === "string") {
      const cleanedYear = updatedData.year.trim();
      if (!cleanedYear) {
        return {
          success: false,
          status: 400,
          error: "Year of study is required.",
        };
      }
      doc.year = cleanedYear;
    }

    // Mutate only permitted competition metadata; email, eventSlug, eventName,
    // category, and verification status remain strictly immutable.
    const catalogComp = MILAAP_COMPETITIONS.find((c) => c.id === targetSlug);
    const requiresTeam = Boolean(
      catalogComp &&
        (isAlwaysGroupCompetition(catalogComp.format) ||
          (supportsGroupEntryOption(catalogComp.format) &&
            (updatedData.teamMode === "Group" ||
              (Array.isArray(updatedData.teamMembers) &&
                updatedData.teamMembers.length > 0))))
    );

    if (requiresTeam || updatedData.teamMembers !== undefined) {
      const membersToValidate =
        updatedData.teamMembers !== undefined
          ? updatedData.teamMembers
          : targetEvent.teamMembers;
      const memberCheck = sanitizeAndValidateTeamMembers(
        membersToValidate,
        requiresTeam,
        targetEvent.eventName
      );
      if (!memberCheck.valid) {
        return {
          success: false,
          status: 400,
          error:
            memberCheck.error ||
            "Please enter at least 2 valid team members (Name and Phone).",
        };
      }
      targetEvent.teamMembers = memberCheck.members;
    }

    if (typeof updatedData.teamName === "string") {
      targetEvent.teamName = updatedData.teamName.trim();
    }
    if (typeof updatedData.role === "string") {
      targetEvent.role = updatedData.role.trim() || "Participant";
    }
    targetEvent.updatedAt = new Date();

    doc.markModified("events");
    await doc.save();

    revalidatePath("/milaap/dashboard");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      status: 200,
      message: "Registration updated successfully!",
    };
  } catch (error) {
    console.error("[updateEventRegistration error]:", error);
    return {
      success: false,
      status: 500,
      error: "Failed to update registration details.",
    };
  }
}

/**
 * Cancels (withdraws) a participant's registration for the given event slug
 * from MongoDB after passing auth, global lock, and email ownership checks.
 */
export async function cancelEventRegistration(
  registrationId: string,
  eventSlug: string
): Promise<RegistrationActionResult> {
  try {
    const auth = await authorizeParticipantAction(registrationId);
    if (!auth.ok) return auth.result;

    const { doc, sessionEmail } = auth;
    const targetSlug = String(eventSlug || "").trim();
    const exists = doc.events.some((ev) => ev.eventSlug === targetSlug);

    if (!exists) {
      return {
        success: false,
        status: 404,
        error: "Event registration was not found or has already been cancelled.",
      };
    }

    // Pull only the withdrawn competition entry so multi-event participants keep
    // their other active registrations and verified participant profile intact.
    await Participant.findOneAndUpdate(
      { _id: doc._id, email: sessionEmail },
      { $pull: { events: { eventSlug: targetSlug } } },
      { new: true }
    );

    revalidatePath("/milaap/dashboard");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      status: 200,
      message: "Registration cancelled successfully.",
    };
  } catch (error) {
    console.error("[cancelEventRegistration error]:", error);
    return {
      success: false,
      status: 500,
      error: "Failed to cancel registration.",
    };
  }
}

