import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Announcement from "@/models/Announcement";

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
    const announcements = await Announcement.find({})
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ announcements });
  } catch (error) {
    console.error("[GET /api/admin/announcements error]:", error);
    return NextResponse.json(
      { error: "Failed to load announcements." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const auth = await ensureAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const title = String(body.title || "").trim();
    const message = String(body.message || "").trim();
    const priority = ["info", "urgent", "success"].includes(body.priority)
      ? body.priority
      : "info";

    if (!title || !message) {
      return NextResponse.json(
        { error: "Both title and message are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const announcement = await Announcement.create({
      title,
      message,
      priority,
      isActive: true,
      createdBy: auth.session.user.email || "Admin",
    });

    return NextResponse.json(
      { success: true, announcement: announcement.toObject() },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/admin/announcements error]:", error);
    return NextResponse.json(
      { error: "Failed to publish announcement." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const auth = await ensureAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const id = String(body.id || "").trim();
    if (!id) {
      return NextResponse.json(
        { error: "Announcement id is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const updated = await Announcement.findByIdAndUpdate(
      id,
      { $set: { isActive: Boolean(body.isActive) } },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { error: "Announcement not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, announcement: updated });
  } catch (error) {
    console.error("[PATCH /api/admin/announcements error]:", error);
    return NextResponse.json(
      { error: "Failed to update announcement." },
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
        { error: "Announcement id is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await Announcement.findByIdAndDelete(id);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error("[DELETE /api/admin/announcements error]:", error);
    return NextResponse.json(
      { error: "Failed to delete announcement." },
      { status: 500 }
    );
  }
}

