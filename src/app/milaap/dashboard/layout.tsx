import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participant Dashboard — Milaap Edition I",
  description:
    "View your Milaap Participant ID pass, verification status, and manage your competition registrations.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MilaapDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

