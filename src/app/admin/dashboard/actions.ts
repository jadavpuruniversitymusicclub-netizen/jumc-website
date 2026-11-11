"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { Types } from "mongoose";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { deriveDeterministicParticipantId } from "@/lib/participantId";
import { MILAAP_COMPETITIONS } from "@/data/milaapCompetitions";
import Participant, { type IParticipant } from "@/models/Participant";

export interface ScannedRegistrationItem {
  _id: string;
  participantDocId: string;
  eventSlug: string;
  eventName: string;
  category: string;
  role: string;
  teamName: string;
  teamMembers: Array<{ name: string; phone: string }>;
  status: "Pending" | "Verified";
  attended: boolean;
  attendedAt: string | null;
}

export interface ScannedParticipantProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  image: string;
  participantId: string;
}

export interface QRLookupResult {
  success: boolean;
  error?: string;
  profile?: ScannedParticipantProfile;
  registrations?: ScannedRegistrationItem[];
}

export interface MarkAttendanceResult {
  success: boolean;
  error?: string;
  registration?: ScannedRegistrationItem;
}

export interface EventAttendanceStat {
  eventSlug: string;
  eventName: string;
  category: string;
  format: string;
  totalRegistered: number;
  totalAttended: number;
}

export interface EventAttendanceStatsResult {
  success: boolean;
  error?: string;
  stats: EventAttendanceStat[];
}

async function ensureAdminAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { ok: false as const, error: "Unauthorized: Sign in required." };
  }

  await connectToDatabase();
  const sessionEmail = session.user.email.toLowerCase().trim();
  const adminDoc = await Participant.findOne({ email: sessionEmail })
    .select("role")
    .lean();

  const role = adminDoc?.role ?? session.role ?? session.user.role;
  if (role !== "admin") {
    return {
      ok: false as const,
      error: "Forbidden: Admin privileges required.",
    };
  }

  return { ok: true as const, sessionEmail };
}

function parseQrPayload(raw: unknown): {
  email?: string;
  participantId?: string;
} {
  if (!raw) return {};

  if (typeof raw === "string") {
    const trimmed = raw.trim();
    try {
      const parsed = JSON.parse(trimmed) as Record<string, unknown>;
      return parseQrPayload(parsed);
    } catch {
      if (trimmed.includes("@")) {
        return { email: trimmed.toLowerCase() };
      }
      return { participantId: trimmed };
    }
  }

  if (typeof raw === "object") {
    const rec = raw as Record<string, unknown>;
    const email =
      typeof rec.email === "string" && rec.email.trim()
        ? rec.email.toLowerCase().trim()
        : undefined;
    const participantId =
      typeof rec.participantId === "string" && rec.participantId.trim()
        ? rec.participantId.trim()
        : typeof rec.token === "string" && rec.token.trim()
        ? rec.token.trim()
        : undefined;
    return { email, participantId };
  }

  return {};
}

function serializeRegistrationItem(
  docId: string,
  ev: IParticipant["events"][number]
): ScannedRegistrationItem {
  return {
    _id: ev._id ? String(ev._id) : `${docId}:${ev.eventSlug}`,
    participantDocId: docId,
    eventSlug: ev.eventSlug,
    eventName: ev.eventName,
    category: ev.category,
    role: ev.role || "Participant",
    teamName: ev.teamName || "",
    teamMembers: Array.isArray(ev.teamMembers)
      ? ev.teamMembers.map((m) => ({ name: m.name, phone: m.phone }))
      : [],
    status: ev.status === "Verified" ? "Verified" : "Pending",
    attended: Boolean(ev.attended),
    attendedAt: ev.attendedAt || null,
  };
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Resolves a scanned Master Pass QR payload or manual Participant ID lookup
 * (supports full case-insensitive IDs like `MIL-2026-7979` / `MLP-2026-7979`
 * as well as 4-digit suffixes like `7979`) to the participant's profile
 * details and ALL associated competition registrations from MongoDB.
 */
export async function getParticipantByQR(
  payload: { email?: string; participantId?: string } | string
): Promise<QRLookupResult> {
  try {
    const auth = await ensureAdminAction();
    if (!auth.ok) {
      return { success: false, error: auth.error };
    }

    const parsed = parseQrPayload(payload);
    if (!parsed.email && !parsed.participantId) {
      return {
        success: false,
        error: "Invalid QR payload: missing participant email or ID.",
      };
    }

    const pidQuery = parsed.participantId
      ? parsed.participantId.trim().toUpperCase()
      : "";

    let docs = parsed.email
      ? await Participant.find({ email: parsed.email }).lean()
      : [];

    if (docs.length === 0 && pidQuery) {
      // Exact case-insensitive match against persisted participantId
      docs = await Participant.find({
        participantId: new RegExp(`^${escapeRegex(pidQuery)}$`, "i"),
      }).lean();
    }

    // Legacy & suffix-aware fallback across registered participants
    if (docs.length === 0 && pidQuery) {
      const allRegistered = await Participant.find({
        $or: [{ isRegistered: true }, { "events.0": { $exists: true } }],
      }).lean();

      const exactDeterministic = allRegistered.filter(
        (d) =>
          (
            d.participantId || deriveDeterministicParticipantId(d.email)
          ).toUpperCase() === pidQuery
      );

      if (exactDeterministic.length > 0) {
        docs = exactDeterministic;
      } else {
        const digitsOnly = /^\d{4,}$/.test(pidQuery)
          ? pidQuery
          : pidQuery.match(/-(\d{4,})$/)?.[1] || "";

        if (digitsOnly) {
          const suffixTarget = `-${digitsOnly}`;
          const suffixMatches = allRegistered.filter((d) => {
            const stored = (d.participantId || "").toUpperCase();
            const deterministic = deriveDeterministicParticipantId(
              d.email
            ).toUpperCase();
            return (
              stored.endsWith(suffixTarget) ||
              deterministic.endsWith(suffixTarget)
            );
          });

          if (suffixMatches.length > 1) {
            return {
              success: false,
              error: `Multiple participants matched suffix "${digitsOnly}". Please enter the full Participant ID.`,
            };
          }

          docs = suffixMatches;
        }
      }
    }

    if (docs.length === 0) {
      return {
        success: false,
        error: "No participant found for this Master Pass QR code or ID.",
      };
    }

    const primaryDoc = docs[0];
    const effectivePid =
      primaryDoc.participantId ||
      deriveDeterministicParticipantId(primaryDoc.email);

    const registrations: ScannedRegistrationItem[] = [];
    for (const doc of docs) {
      const docId = String(doc._id);
      const events = Array.isArray(doc.events) ? doc.events : [];
      for (const ev of events) {
        registrations.push(serializeRegistrationItem(docId, ev));
      }
    }

    return {
      success: true,
      profile: {
        id: String(primaryDoc._id),
        name: primaryDoc.name,
        email: primaryDoc.email,
        phone: primaryDoc.phone || "",
        college: primaryDoc.college || "",
        year: primaryDoc.year || "",
        image: primaryDoc.image || "",
        participantId: effectivePid,
      },
      registrations,
    };
  } catch (error) {
    console.error("[getParticipantByQR error]:", error);
    return {
      success: false,
      error: "Failed to verify Master Pass QR code.",
    };
  }
}

/**
 * Marks a single competition registration entry as attended in MongoDB with a
 * duplicate check and cache revalidation.
 */
export async function markEventAttendance(
  registrationId: string
): Promise<MarkAttendanceResult> {
  try {
    const auth = await ensureAdminAction();
    if (!auth.ok) {
      return { success: false, error: auth.error };
    }

    const trimmed = String(registrationId || "").trim();
    if (!trimmed) {
      return { success: false, error: "Invalid registration identifier." };
    }

    let doc: IParticipant | null = null;
    let targetEvent: IParticipant["events"][number] | undefined;

    if (trimmed.includes(":")) {
      const [docId, ...rest] = trimmed.split(":");
      const eventSlug = rest.join(":");
      if (!Types.ObjectId.isValid(docId) || !eventSlug) {
        return { success: false, error: "Invalid registration reference." };
      }
      doc = await Participant.findById(docId);
      targetEvent = doc?.events.find((ev) => ev.eventSlug === eventSlug);
    } else if (Types.ObjectId.isValid(trimmed)) {
      doc = await Participant.findOne({ "events._id": trimmed });
      targetEvent = doc?.events.find((ev) => String(ev._id) === trimmed);
    }

    if (!doc || !targetEvent) {
      return { success: false, error: "Event registration record not found." };
    }

    if (targetEvent.attended === true) {
      return {
        success: false,
        error: "Already Marked Attended!",
        registration: serializeRegistrationItem(String(doc._id), targetEvent),
      };
    }

    targetEvent.attended = true;
    targetEvent.attendedAt = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    doc.markModified("events");
    await doc.save();

    revalidatePath("/milaap/dashboard");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin");
    revalidatePath("/milaap/admin");

    return {
      success: true,
      registration: serializeRegistrationItem(String(doc._id), targetEvent),
    };
  } catch (error) {
    console.error("[markEventAttendance error]:", error);
    return {
      success: false,
      error: "Failed to record event attendance.",
    };
  }
}

/**
 * Aggregates per-event registered and attended counts grouped by eventName.
 */
export async function getEventAttendanceStats(): Promise<EventAttendanceStatsResult> {
  try {
    const auth = await ensureAdminAction();
    if (!auth.ok) {
      return { success: false, error: auth.error, stats: [] };
    }

    const aggregated = await Participant.aggregate<{
      _id: string;
      eventSlug?: string;
      totalRegistered: number;
      totalAttended: number;
    }>([
      { $match: { isRegistered: true } },
      { $unwind: "$events" },
      {
        $group: {
          _id: "$events.eventName",
          eventSlug: { $first: "$events.eventSlug" },
          totalRegistered: { $sum: 1 },
          totalAttended: {
            $sum: { $cond: [{ $eq: ["$events.attended", true] }, 1, 0] },
          },
        },
      },
    ]);

    const byName = new Map(aggregated.map((item) => [item._id, item]));
    const bySlug = new Map(
      aggregated
        .filter((item) => item.eventSlug)
        .map((item) => [item.eventSlug as string, item])
    );

    const stats: EventAttendanceStat[] = MILAAP_COMPETITIONS.map((comp) => {
      const matched = bySlug.get(comp.id) || byName.get(comp.title);
      return {
        eventSlug: comp.id,
        eventName: comp.title,
        category: comp.category,
        format: comp.format,
        totalRegistered: matched?.totalRegistered ?? 0,
        totalAttended: matched?.totalAttended ?? 0,
      };
    });

    return { success: true, stats };
  } catch (error) {
    console.error("[getEventAttendanceStats error]:", error);
    return {
      success: false,
      error: "Failed to compute attendance analytics.",
      stats: [],
    };
  }
}

