import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import FestivalSetting from "@/models/FestivalSetting";

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
    let setting = await FestivalSetting.findOne({
      key: "milaap-edition-1",
    }).lean();

    if (!setting) {
      const created = await FestivalSetting.create({
        key: "milaap-edition-1",
      });
      setting = created.toObject();
    }

    return NextResponse.json({ setting });
  } catch (error) {
    console.error("[GET /api/admin/settings error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch festival settings." },
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
    await connectToDatabase();

    const updateFields: Record<string, unknown> = {
      updatedBy: auth.session.user.email || "Admin",
      updatedAt: new Date(),
    };

    if (typeof body.registrationsLocked === "boolean") {
      updateFields.registrationsLocked = body.registrationsLocked;
    }
    if (Array.isArray(body.lockedEvents)) {
      updateFields.lockedEvents = body.lockedEvents.map(String);
    }
    if (typeof body.lockMessage === "string") {
      updateFields.lockMessage = body.lockMessage.trim();
    }
    if (typeof body.showAnnouncements === "boolean") {
      updateFields.showAnnouncements = body.showAnnouncements;
    }
    if (typeof body.heroNotice === "string") {
      updateFields.heroNotice = body.heroNotice.trim();
    }
    if (typeof body.festDatesText === "string") {
      updateFields.festDatesText = body.festDatesText.trim();
    }

    const updated = await FestivalSetting.findOneAndUpdate(
      { key: "milaap-edition-1" },
      { $set: updateFields },
      { new: true, upsert: true }
    ).lean();

    return NextResponse.json({ success: true, setting: updated });
  } catch (error) {
    console.error("[PATCH /api/admin/settings error]:", error);
    return NextResponse.json(
      { error: "Failed to update settings." },
      { status: 500 }
    );
  }
}
