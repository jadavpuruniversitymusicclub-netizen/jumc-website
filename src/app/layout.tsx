import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import VideoBackground from "@/components/VideoBackground";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jumc.vercel.app"),
  applicationName: "JUMC - Jadavpur University Music Club",
  icons: {
    icon: "/jumc-logo.jpeg",
    shortcut: "/jumc-logo.jpeg",
    apple: "/jumc-logo.jpeg",
  },
  title: {
    default: "JUMC - Jadavpur University Music Club | Official Portal",
    template: "%s | JUMC - Jadavpur University Music Club",
  },
  description:
    "JUMC - Jadavpur University Music Club official website. Explore JU Music Club's campus legacy since 1955, core artists, upcoming concerts, and register for Milaap Edition I presented by JUMC & JUDF.",
  keywords: [
    "JUMC",
    "JUMC - Jadavpur University Music Club",
    "Jadavpur University Music Club",
    "JU Music Club",
    "Jadavpur University",
    "Milaap Edition I",
    "JU Dance Wing",
    "JUDF",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JUMC - Jadavpur University Music Club | Official Portal",
    description:
      "Official platform of JUMC - Jadavpur University Music Club. Discover JUMC events, collective legacy, and Milaap Edition I with JU Dance Wing.",
    url: "https://jumc.vercel.app/",
    siteName: "JUMC - Jadavpur University Music Club",
    type: "website",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "JUMC - Jadavpur University Music Club",
      alternateName: [
        "JUMC",
        "JU Music Club",
        "Jadavpur University Music Club",
        "Milaap JU",
      ],
      url: "https://jumc.vercel.app/",
    },
    {
      "@type": "MusicGroup",
      name: "JUMC - Jadavpur University Music Club",
      url: "https://jumc.vercel.app/",
      sameAs: ["https://www.instagram.com/ju_music_club/"],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <AuthProvider>
          <VideoBackground />
          <Header />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
