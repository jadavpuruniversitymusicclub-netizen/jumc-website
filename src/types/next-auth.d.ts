import { DefaultSession } from "next-auth";

export type UserRole = "admin" | "user";

export interface SessionTeamMember {
  name: string;
  phone: string;
}

export interface SessionRegisteredEvent {
  eventSlug: string;
  eventName: string;
  category: string;
  teamName?: string;
  role?: string;
  teamMembers?: SessionTeamMember[];
  status: "Pending" | "Verified";
  attended?: boolean;
  attendedAt?: string | null;
  registeredAt?: string;
}

export interface SessionParticipant {
  id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  college?: string;
  year?: string;
  participantId?: string;
  isRegistered: boolean;
  events: SessionRegisteredEvent[];
  createdAt?: string;
}

declare module "next-auth" {
  interface Session {
    role: UserRole;
    isRegistered: boolean;
    participant: SessionParticipant | null;
    user: {
      id?: string;
      role: UserRole;
      isRegistered: boolean;
      participant?: SessionParticipant | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string | null;
    role?: UserRole;
    isRegistered?: boolean;
  }
}
