import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRegisteredEvent {
  eventSlug: string;
  eventName: string;
  category: string;
  teamName?: string;
  role?: string;
  status: "Pending" | "Verified";
}

export interface IParticipant extends Document {
  name: string;
  email: string;
  image?: string;
  phone?: string;
  college?: string;
  department?: string;
  year?: string;
  participantId?: string;
  isRegistered: boolean;
  events: IRegisteredEvent[];
  createdAt: Date;
}

const RegisteredEventSchema = new Schema<IRegisteredEvent>(
  {
    eventSlug: {
      type: String,
      required: true,
      trim: true,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    teamName: {
      type: String,
      default: "",
      trim: true,
    },
    role: {
      type: String,
      default: "Solo / Participant",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Verified"],
      default: "Pending",
    },
  },
  { _id: false }
);

const ParticipantSchema = new Schema<IParticipant>({
  name: {
    type: String,
    required: [true, "Participant name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Participant email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  image: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
    trim: true,
  },
  college: {
    type: String,
    default: "",
    trim: true,
  },
  department: {
    type: String,
    default: "",
    trim: true,
  },
  year: {
    type: String,
    default: "",
    trim: true,
  },
  participantId: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
  events: {
    type: [RegisteredEventSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Participant: Model<IParticipant> =
  mongoose.models.Participant ||
  mongoose.model<IParticipant>("Participant", ParticipantSchema);

export default Participant;
