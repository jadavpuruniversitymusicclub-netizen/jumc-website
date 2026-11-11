import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { getGlobalSettings } from "@/lib/settings";
import Participant, { type IRegisteredEvent } from "@/models/Participant";
import { MILAAP_COMPETITIONS } from "@/data/milaapCompetitions";

interface EventPayloadItem {
  eventSlug: string;
  eventName?: string;
  category?: string;
  teamName?: string;
  role?: string;
}

async function generateUniqueParticipantId(): Promise<string> {
  for (let attempt = 0; attempt < 10; attempt++) {
    const num = Math.floor(1000 + Math.random() * 9000);
    const candidate = `MIL-2026-${num}`;
    const exists = await Participant.exists({ participantId: candidate });
    if (!exists) return candidate;
  }
  const suffix = Date.now().toString().slice(-4);
  return `MIL-2026-${suffix}`;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const email = session.user.email.toLowerCase().trim();
    const participant = await Participant.findOne({ email }).lean();

    return NextResponse.json({ participant: participant || null });
  } catch (error) {
    console.error("[GET /api/milaap/register error]:", error);
    return NextResponse.json(
      { error: "Failed to load participant profile." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in with Google first." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const email = session.user.email.toLowerCase().trim();
    const name = String(body.name || session.user.name || "").trim();
    const phone = String(body.phone || "").trim();
    const college = String(body.college || "").trim();
    const year = String(body.year || "").trim();
    const rawEvents: EventPayloadItem[] = Array.isArray(body.events)
      ? body.events
      : [];

    if (!name) {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }

    if (!phone.replace(/[\s-]/g, "").match(/^\+?[0-9]{10,14}$/)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    if (!college) {
      return NextResponse.json(
        { error: "University / College name is required." },
        { status: 400 }
      );
    }

    if (!year) {
      return NextResponse.json(
        { error: "Year of study is required." },
        { status: 400 }
      );
    }

    if (rawEvents.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one Milaap Edition I competition." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existing = await Participant.findOne({ email });
    const setting = await getGlobalSettings();

    // Enforce global registration lock on new registrations
    if (setting.registrationsLocked && !existing?.isRegistered) {
      return NextResponse.json(
        {
          error:
            setting.lockMessage ||
            "Registrations for Milaap Edition I are currently locked by the organizers.",
        },
        { status: 403 }
      );
    }

    // Enforce global edit lock when already-registered participants modify entries
    if (existing?.isRegistered && !setting.isEventEditingOpen) {
      return NextResponse.json(
        {
          error:
            "Registration editing is currently locked by the administrators.",
        },
        { status: 403 }
      );
    }

    const existingStatusMap = new Map<string, "Pending" | "Verified">();
    const existingDateMap = new Map<string, Date>();
    const existingSlugs = new Set<string>();
    if (existing?.events) {
      for (const ev of existing.events) {
        existingStatusMap.set(ev.eventSlug, ev.status);
        existingDateMap.set(
          ev.eventSlug,
          ev.registeredAt
            ? new Date(ev.registeredAt)
            : existing.createdAt
            ? new Date(existing.createdAt)
            : new Date()
        );
        existingSlugs.add(ev.eventSlug);
      }
    }

    const lockedEventSlugs = new Set(setting?.lockedEvents || []);

    // Deduplicate & sanitize against canonical competitions catalog
    const seenSlugs = new Set<string>();
    const sanitizedEvents: IRegisteredEvent[] = [];

    for (const item of rawEvents) {
      const slug = String(item.eventSlug || "").trim();
      if (!slug || seenSlugs.has(slug)) continue;

      const comp = MILAAP_COMPETITIONS.find((c) => c.id === slug);
      if (!comp) continue;

      // Prevent adding newly locked competitions unless already registered
      if (lockedEventSlugs.has(comp.id) && !existingSlugs.has(comp.id)) {
        return NextResponse.json(
          {
            error: `Registrations for "${comp.title}" are currently closed by admins.`,
          },
          { status: 403 }
        );
      }

      seenSlugs.add(slug);
      sanitizedEvents.push({
        eventSlug: comp.id,
        eventName: comp.title,
        category: `${comp.category} (${comp.format})`,
        teamName: String(item.teamName || "").trim(),
        role:
          String(item.role || "").trim() ||
          (comp.format === "Solo" ? "Solo Performer" : "Participant"),
        status: existingStatusMap.get(comp.id) ?? "Pending",
        registeredAt: existingDateMap.get(comp.id) ?? new Date(),
      });
    }

    if (sanitizedEvents.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one valid competition." },
        { status: 400 }
      );
    }

    const participantId =
      existing?.participantId || (await generateUniqueParticipantId());

    const updated = await Participant.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          email,
          image: existing?.image || session.user.image || "",
          phone,
          college,
          year,
          participantId,
          isRegistered: true,
          events: sanitizedEvents,
        },
        $setOnInsert: {
          role: "user",
          createdAt: new Date(),
        },
      },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    return NextResponse.json({
      success: true,
      participant: updated,
    });
  } catch (error) {
    console.error("[POST /api/milaap/register error]:", error);
    return NextResponse.json(
      { error: "Failed to save registration. Please try again." },
      { status: 500 }
    );
  }
}
