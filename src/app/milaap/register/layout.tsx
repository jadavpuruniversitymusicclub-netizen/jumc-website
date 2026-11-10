import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Registration — Milaap Edition I",
  description:
    "Complete your participant registration and select competitions for Milaap Edition I by JUMC & JUDF.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MilaapRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

