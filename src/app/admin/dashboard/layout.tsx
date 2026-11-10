import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Command Center — Milaap Edition I | JUMC",
  description:
    "Manage registrations, verify participants, toggle festival controls, and broadcast announcements.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

