import { DefaultSession } from "next-auth";

export interface SessionRegisteredEvent {
  eventSlug: string;
  eventName: string;
  category: string;
  teamName?: string;
  role?: string;
  status: "Pending" | "Verified";
}

export interface SessionParticipant {
  id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  college?: string;
  department?: string;
  year?: string;
  participantId?: string;
  isRegistered: boolean;
  events: SessionRegisteredEvent[];
  createdAt?: string;
}

declare module "next-auth" {
  interface Session {
    isRegistered: boolean;
    participant: SessionParticipant | null;
    user: {
      id?: string;
      isRegistered: boolean;
      participant?: SessionParticipant | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string | null;
    isRegistered?: boolean;
  }
}
