import type { Metadata } from "next";
import MilaapClientLayout from "./MilaapClientLayout";

export const metadata: Metadata = {
  title: "Milaap Edition I — Cultural Fest",
  description:
    "Register for Milaap Edition I, the flagship cultural fest by JU Music Club (JUMC) & JU Dance Wing (JUDF). Hands-on musical showdowns, dance battles, and more.",
  keywords: [
    "milaap ju",
    "Milaap Edition I",
    "JUMC",
    "JUDF",
    "JU Music Club",
    "Jadavpur University cultural fest",
  ],
  alternates: {
    canonical: "/milaap",
  },
  openGraph: {
    title: "Milaap Edition I — Cultural Fest",
    description:
      "Register for Milaap Edition I, the flagship cultural fest by JU Music Club (JUMC) & JU Dance Wing (JUDF).",
    url: "https://jumc.vercel.app/milaap",
    siteName: "JUMC",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "JUMC",
      "item": "https://jumc.vercel.app/",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Milaap Edition I",
      "item": "https://jumc.vercel.app/milaap",
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Sign in to Milaap Edition I",
      "item": "https://jumc.vercel.app/milaap/sign-in",
    },
  ],
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Milaap Edition I — Cultural Fest",
  description:
    "Register for Milaap Edition I, the flagship cultural fest by JU Music Club (JUMC) & JU Dance Wing (JUDF). Hands-on musical showdowns, dance battles, and pro-night performances.",
  startDate: "2026-11-28T09:00:00+05:30",
  endDate: "2026-11-30T22:00:00+05:30",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Jadavpur University Main Campus",
    address: {
      "@type": "PostalAddress",
      streetAddress: "188, Raja S.C. Mallick Road",
      addressLocality: "Kolkata",
      postalCode: "700032",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
  },
  organizer: [
    {
      "@type": "Organization",
      name: "JUMC (Jadavpur University Music Club)",
      url: "https://jumc.vercel.app/",
    },
    {
      "@type": "Organization",
      name: "JUDF (JU Dance Forum / Dance Wing)",
      url: "https://jumc.vercel.app/milaap",
    },
  ],
  image: "https://jumc.vercel.app/jumc-logo.jpeg",
  offers: {
    "@type": "Offer",
    url: "https://jumc.vercel.app/milaap/sign-in",
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    validFrom: "2026-10-01T00:00:00+05:30",
  },
};

export default function MilaapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <MilaapClientLayout>{children}</MilaapClientLayout>
    </>
  );
}
