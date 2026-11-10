import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  message: string;
  priority: "info" | "urgent" | "success";
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>({
  title: {
    type: String,
    required: [true, "Announcement title is required"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Announcement message is required"],
    trim: true,
  },
  priority: {
    type: String,
    enum: ["info", "urgent", "success"],
    default: "info",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: String,
    default: "Admin",
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Announcement: Model<IAnnouncement> =
  mongoose.models.Announcement ||
  mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);

export default Announcement;
