import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Participant from "@/models/Participant";

export interface MyEventItem {
  eventSlug: string;
  eventName: string;
  category: string;
  teamName: string;
  role: string;
  status: "Pending" | "Verified";
  registeredAt: string;
  participantId?: string;
}

/**
 * GET /api/milaap/my-events
 * Fetches all registered competition entries from MongoDB matching the
 * authenticated NextAuth user's Google email.
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

    const registrationDocs = await Participant.find({ email })
      .sort({ createdAt: -1 })
      .lean();

    const events: MyEventItem[] = [];
    for (const doc of registrationDocs) {
      const docEvents = Array.isArray(doc.events) ? doc.events : [];
      const fallbackDate = doc.createdAt
        ? new Date(doc.createdAt).toISOString()
        : new Date().toISOString();

      for (const ev of docEvents) {
        events.push({
          eventSlug: ev.eventSlug,
          eventName: ev.eventName,
          category: ev.category,
          teamName: ev.teamName || "",
          role: ev.role || "Participant",
          status: ev.status === "Verified" ? "Verified" : "Pending",
          registeredAt: ev.registeredAt
            ? new Date(ev.registeredAt).toISOString()
            : fallbackDate,
          participantId: doc.participantId || undefined,
        });
      }
    }

    return NextResponse.json({ email, events });
  } catch (error) {
    console.error("[GET /api/milaap/my-events error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch registered events." },
      { status: 500 }
    );
  }
}

