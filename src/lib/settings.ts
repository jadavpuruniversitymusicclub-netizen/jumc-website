import connectToDatabase from "@/lib/mongodb";
import FestivalSetting from "@/models/FestivalSetting";

export const FESTIVAL_SETTINGS_KEY = "milaap-edition-1";

export interface GlobalSettingsState {
  key: string;
  registrationsLocked: boolean;
  isEventEditingOpen: boolean;
  lockedEvents: string[];
  lockMessage: string;
  showAnnouncements: boolean;
  heroNotice: string;
  festDatesText: string;
}

/**
 * Safely fetches the singleton FestivalSetting document from MongoDB,
 * creating it with safe defaults if it does not exist yet.
 */
export async function getGlobalSettings(): Promise<GlobalSettingsState> {
  await connectToDatabase();

  let setting = await FestivalSetting.findOne({
    key: FESTIVAL_SETTINGS_KEY,
  }).lean();

  if (!setting) {
    setting = await FestivalSetting.findOneAndUpdate(
      { key: FESTIVAL_SETTINGS_KEY },
      {
        $setOnInsert: {
          key: FESTIVAL_SETTINGS_KEY,
          registrationsLocked: false,
          isEventEditingOpen: true,
          lockedEvents: [],
          showAnnouncements: true,
        },
      },
      { new: true, upsert: true }
    ).lean();
  }

  return {
    key: setting?.key || FESTIVAL_SETTINGS_KEY,
    registrationsLocked: Boolean(setting?.registrationsLocked),
    isEventEditingOpen: setting?.isEventEditingOpen !== false,
    lockedEvents: Array.isArray(setting?.lockedEvents)
      ? setting.lockedEvents
      : [],
    lockMessage:
      setting?.lockMessage ||
      "Registrations for Milaap Edition I are temporarily paused by the organising committee. Stay tuned for slot updates.",
    showAnnouncements: setting?.showAnnouncements !== false,
    heroNotice: setting?.heroNotice || "",
    festDatesText:
      setting?.festDatesText || "Nov 28 – 30, 2026 • Jadavpur University",
  };
}

