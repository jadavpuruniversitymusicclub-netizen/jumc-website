import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Participant from "@/models/Participant";

async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }
  const role = session.role ?? session.user.role;
  if (role !== "admin") {
    return {
      ok: false as const,
      status: 403,
      error: "Forbidden: Admin privileges required.",
    };
  }
  return { ok: true as const, session };
}

export async function GET() {
  const auth = await ensureAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    await connectToDatabase();

    const participants = await Participant.find({ isRegistered: true })
      .sort({ createdAt: -1 })
      .lean();

    let pendingVerifications = 0;
    let verifiedRegistrations = 0;
    let totalEventEntries = 0;

    for (const p of participants) {
      const events = Array.isArray(p.events) ? p.events : [];
      totalEventEntries += events.length;
      const hasPending = events.some((ev) => ev.status !== "Verified");
      if (hasPending) {
        pendingVerifications += 1;
      } else if (events.length > 0) {
        verifiedRegistrations += 1;
      }
    }

    return NextResponse.json({
      participants,
      metrics: {
        totalRegistrations: participants.length,
        pendingVerifications,
        verifiedRegistrations,
        totalEventEntries,
      },
    });
  } catch (error) {
    console.error("[GET /api/admin/participants error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch participants." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const auth = await ensureAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Participant ID is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const deleted = await Participant.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json(
        { error: "Participant not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error("[DELETE /api/admin/participants error]:", error);
    return NextResponse.json(
      { error: "Failed to delete participant." },
      { status: 500 }
    );
  }
}
