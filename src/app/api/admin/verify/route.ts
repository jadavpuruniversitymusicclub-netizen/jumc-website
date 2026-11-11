import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Participant from "@/models/Participant";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = session.role ?? session.user.role;
    if (role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin privileges required." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const id = String(body.id || "").trim();
    const eventSlug = body.eventSlug ? String(body.eventSlug).trim() : "ALL";
    const status: "Verified" | "Pending" =
      body.status === "Pending" ? "Pending" : "Verified";

    if (!id) {
      return NextResponse.json(
        { error: "Participant record id is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const participant = await Participant.findById(id);

    if (!participant) {
      return NextResponse.json(
        { error: "Participant not found." },
        { status: 404 }
      );
    }

    for (const ev of participant.events) {
      if (eventSlug === "ALL" || ev.eventSlug === eventSlug) {
        ev.status = status;
      }
    }

    participant.markModified("events");
    await participant.save();

    return NextResponse.json({
      success: true,
      participant: participant.toObject(),
    });
  } catch (error) {
    console.error("[PATCH /api/admin/verify error]:", error);
    return NextResponse.json(
      { error: "Failed to update verification status." },
      { status: 500 }
    );
  }
}

