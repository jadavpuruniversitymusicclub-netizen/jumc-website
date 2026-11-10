import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFestivalSetting extends Document {
  key: string;
  registrationsLocked: boolean;
  lockedEvents: string[];
  lockMessage: string;
  showAnnouncements: boolean;
  heroNotice: string;
  festDatesText: string;
  updatedBy: string;
  updatedAt: Date;
}

const FestivalSettingSchema = new Schema<IFestivalSetting>({
  key: {
    type: String,
    default: "milaap-edition-1",
    unique: true,
  },
  registrationsLocked: {
    type: Boolean,
    default: false,
  },
  lockedEvents: {
    type: [String],
    default: [],
  },
  lockMessage: {
    type: String,
    default:
      "Registrations for Milaap Edition I are temporarily paused by the organising committee. Stay tuned for slot updates.",
    trim: true,
  },
  showAnnouncements: {
    type: Boolean,
    default: true,
  },
  heroNotice: {
    type: String,
    default: "",
    trim: true,
  },
  festDatesText: {
    type: String,
    default: "Nov 28 – 30, 2026 • Jadavpur University",
    trim: true,
  },
  updatedBy: {
    type: String,
    default: "System",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const FestivalSetting: Model<IFestivalSetting> =
  mongoose.models.FestivalSetting ||
  mongoose.model<IFestivalSetting>("FestivalSetting", FestivalSettingSchema);

export default FestivalSetting;

