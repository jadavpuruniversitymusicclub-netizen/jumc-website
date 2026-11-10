import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/mongodb";
import Participant from "@/models/Participant";
import type { SessionParticipant } from "@/types/next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/milaap/sign-in",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      try {
        await connectToDatabase();
        const email = user.email.toLowerCase().trim();
        const existing = await Participant.findOne({ email });

        if (!existing) {
          await Participant.create({
            name: user.name || "Milaap Participant",
            email,
            image: user.image || "",
            isRegistered: false,
            events: [],
          });
        } else if (user.image && existing.image !== user.image) {
          existing.image = user.image;
          await existing.save();
        }

        return true;
      } catch (error) {
        console.error("[NextAuth signIn error]:", error);
        // Allow sign-in to proceed so session callback can handle fallback safely,
        // or inspect server logs if DB connection needs whitelisting.
        return true;
      }
    },

    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email.toLowerCase().trim();
      }
      return token;
    },

    async session({ session, token }) {
      const email = (session.user?.email || token.email || "")
        .toLowerCase()
        .trim();

      if (!email) {
        session.isRegistered = false;
        session.participant = null;
        if (session.user) {
          session.user.isRegistered = false;
          session.user.participant = null;
        }
        return session;
      }

      try {
        await connectToDatabase();
        const doc = await Participant.findOne({ email }).lean();

        if (doc) {
          const participantData: SessionParticipant = {
            id: String(doc._id),
            name: doc.name,
            email: doc.email,
            image: doc.image || session.user?.image || "",
            phone: doc.phone || "",
            college: doc.college || "",
            department: doc.department || "",
            year: doc.year || "",
            participantId: doc.participantId || undefined,
            isRegistered: Boolean(doc.isRegistered),
            events: Array.isArray(doc.events)
              ? doc.events.map((ev) => ({
                  eventSlug: ev.eventSlug,
                  eventName: ev.eventName,
                  category: ev.category,
                  teamName: ev.teamName || "",
                  role: ev.role || "Participant",
                  status: ev.status === "Verified" ? "Verified" : "Pending",
                }))
              : [],
            createdAt: doc.createdAt
              ? new Date(doc.createdAt).toISOString()
              : undefined,
          };

          session.isRegistered = participantData.isRegistered;
          session.participant = participantData;
          if (session.user) {
            session.user.id = participantData.id;
            session.user.isRegistered = participantData.isRegistered;
            session.user.participant = participantData;
            if (participantData.name) {
              session.user.name = participantData.name;
            }
          }
        } else {
          session.isRegistered = false;
          session.participant = null;
          if (session.user) {
            session.user.isRegistered = false;
            session.user.participant = null;
          }
        }
      } catch (error) {
        console.error("[NextAuth session error]:", error);
        session.isRegistered = false;
        session.participant = null;
        if (session.user) {
          session.user.isRegistered = false;
          session.user.participant = null;
        }
      }

      return session;
    },
  },
};
