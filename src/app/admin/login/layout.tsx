import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login — Milaap Edition I | JUMC",
  description: "Authorized administrator sign-in for Milaap Edition I.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

