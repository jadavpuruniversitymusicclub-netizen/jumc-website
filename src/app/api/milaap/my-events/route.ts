import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { deriveDeterministicParticipantId } from "@/lib/participantId";
import { getGlobalSettings } from "@/lib/settings";
import Participant from "@/models/Participant";

export interface MyEventItem {
  registrationId: string;
  eventRecordId: string;
  name: string;
  email: string;
  eventSlug: string;
  eventName: string;
  category: string;
  teamName: string;
  role: string;
  teamMembers: Array<{ name: string; phone: string }>;
  status: "Pending" | "Verified";
  attended: boolean;
  attendedAt: string | null;
  registeredAt: string;
  updatedAt?: string;
  participantId: string;
  phone: string;
  college: string;
  year: string;
}

/**
 * GET /api/milaap/my-events
 * Fetches all registered competition entries from MongoDB matching the
 * authenticated NextAuth user's Google email alongside the global edit lock.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to view your registered events." },
        { status: 401 }
      );
    }

    const email = session.user.email.toLowerCase().trim();
    await connectToDatabase();

    const [settings, registrationDocs] = await Promise.all([
      getGlobalSettings(),
      Participant.find({ email }).sort({ createdAt: -1 }).lean(),
    ]);

    const events: MyEventItem[] = [];
    for (const doc of registrationDocs) {
      const docEvents = Array.isArray(doc.events) ? doc.events : [];
      const fallbackDate = doc.createdAt
        ? new Date(doc.createdAt).toISOString()
        : new Date().toISOString();

      for (const ev of docEvents) {
        const docParticipantId =
          doc.participantId || deriveDeterministicParticipantId(doc.email);
        events.push({
          registrationId: String(doc._id),
          eventRecordId: ev._id
            ? String(ev._id)
            : `${String(doc._id)}:${ev.eventSlug}`,
          name: doc.name || session.user.name || "Milaap Delegate",
          email: doc.email || email,
          eventSlug: ev.eventSlug,
          eventName: ev.eventName,
          category: ev.category,
          teamName: ev.teamName || "",
          role: ev.role || "Participant",
          teamMembers: Array.isArray(ev.teamMembers)
            ? ev.teamMembers.map((m) => ({ name: m.name, phone: m.phone }))
            : [],
          status: ev.status === "Verified" ? "Verified" : "Pending",
          attended: Boolean(ev.attended),
          attendedAt: ev.attendedAt || null,
          registeredAt: ev.registeredAt
            ? new Date(ev.registeredAt).toISOString()
            : fallbackDate,
          updatedAt: ev.updatedAt
            ? new Date(ev.updatedAt).toISOString()
            : undefined,
          participantId: docParticipantId,
          phone: doc.phone || "",
          college: doc.college || "",
          year: doc.year || "",
        });
      }
    }

    return NextResponse.json({
      email,
      isEventEditingOpen: settings.isEventEditingOpen,
      events,
    });
  } catch (error) {
    console.error("[GET /api/milaap/my-events error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch registered events." },
      { status: 500 }
    );
  }
}
