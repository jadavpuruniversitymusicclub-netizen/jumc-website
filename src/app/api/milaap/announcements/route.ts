import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Announcement from "@/models/Announcement";
import FestivalSetting from "@/models/FestivalSetting";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const [announcements, setting] = await Promise.all([
      Announcement.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(8)
        .lean(),
      FestivalSetting.findOne({ key: "milaap-edition-1" }).lean(),
    ]);

    return NextResponse.json({
      announcements,
      setting: setting || {
        registrationsLocked: false,
        lockedEvents: [],
        lockMessage:
          "Registrations for Milaap Edition I are temporarily paused.",
        showAnnouncements: true,
        heroNotice: "",
        festDatesText: "Nov 28 – 30, 2026 • Jadavpur University",
      },
    });
  } catch (error) {
    console.error("[GET /api/milaap/announcements error]:", error);
    return NextResponse.json({
      announcements: [],
      setting: {
        registrationsLocked: false,
        lockedEvents: [],
        lockMessage: "",
        showAnnouncements: true,
        heroNotice: "",
        festDatesText: "Nov 28 – 30, 2026 • Jadavpur University",
      },
    });
  }
}

