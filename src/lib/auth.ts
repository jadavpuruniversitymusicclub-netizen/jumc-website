import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/mongodb";
import Participant from "@/models/Participant";
import type { SessionParticipant, UserRole } from "@/types/next-auth";

const BOOTSTRAP_ADMIN_EMAILS = [
  "maxjoy146@gmail.com",
  "jadavpuruniversitymusicclub@gmail.com",
  "jumusicclub@gmail.com",
];

const ENV_ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const ADMIN_EMAILS = Array.from(
  new Set([...BOOTSTRAP_ADMIN_EMAILS, ...ENV_ADMIN_EMAILS])
);

function isBootstrapAdmin(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

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
            role: isBootstrapAdmin(email) ? "admin" : "user",
            isRegistered: false,
            events: [],
          });
        } else {
          let dirty = false;
          if (user.image && existing.image !== user.image) {
            existing.image = user.image;
            dirty = true;
          }
          // Ensure legacy docs created prior to role field have a valid role
          if (!existing.role) {
            existing.role = isBootstrapAdmin(email) ? "admin" : "user";
            dirty = true;
          }
          if (dirty) {
            await existing.save();
          }
        }

        return true;
      } catch (error) {
        console.error("[NextAuth signIn error]:", error);
        return true;
      }
    },

    async jwt({ token, user }) {
      const email = (user?.email || token.email || "").toLowerCase().trim();
      if (email) {
        token.email = email;
        try {
          await connectToDatabase();
          const doc = await Participant.findOne({ email })
            .select("role isRegistered")
            .lean();
          token.role =
            doc?.role === "admin"
              ? "admin"
              : doc?.role === "user"
              ? "user"
              : isBootstrapAdmin(email)
              ? "admin"
              : "user";
          token.isRegistered = Boolean(doc?.isRegistered);
        } catch {
          token.role =
            token.role || (isBootstrapAdmin(email) ? "admin" : "user");
        }
      }
      return token;
    },

    async session({ session, token }) {
      const email = (session.user?.email || token.email || "")
        .toLowerCase()
        .trim();

      if (!email) {
        session.role = "user";
        session.isRegistered = false;
        session.participant = null;
        if (session.user) {
          session.user.role = "user";
          session.user.isRegistered = false;
          session.user.participant = null;
        }
        return session;
      }

      try {
        await connectToDatabase();
        const doc = await Participant.findOne({ email }).lean();

        const resolvedRole: UserRole =
          doc?.role === "admin"
            ? "admin"
            : doc?.role === "user"
            ? "user"
            : isBootstrapAdmin(email)
            ? "admin"
            : "user";

        if (doc) {
          const participantData: SessionParticipant = {
            id: String(doc._id),
            name: doc.name,
            email: doc.email,
            image: doc.image || session.user?.image || "",
            phone: doc.phone || "",
            college: doc.college || "",
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

          session.role = resolvedRole;
          session.isRegistered = participantData.isRegistered;
          session.participant = participantData;
          if (session.user) {
            session.user.id = participantData.id;
            session.user.role = resolvedRole;
            session.user.isRegistered = participantData.isRegistered;
            session.user.participant = participantData;
            if (participantData.name) {
              session.user.name = participantData.name;
            }
          }
        } else {
          session.role = resolvedRole;
          session.isRegistered = false;
          session.participant = null;
          if (session.user) {
            session.user.role = resolvedRole;
            session.user.isRegistered = false;
            session.user.participant = null;
          }
        }
      } catch (error) {
        console.error("[NextAuth session error]:", error);
        const fallbackRole: UserRole = isBootstrapAdmin(email)
          ? "admin"
          : "user";
        session.role = fallbackRole;
        session.isRegistered = false;
        session.participant = null;
        if (session.user) {
          session.user.role = fallbackRole;
          session.user.isRegistered = false;
          session.user.participant = null;
        }
      }

      return session;
    },
  },
};
