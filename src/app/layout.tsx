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
  applicationName: "JUMC",
  icons: {
    icon: "/jumc-logo.jpeg",
    shortcut: "/jumc-logo.jpeg",
    apple: "/jumc-logo.jpeg",
  },
  title: {
    default: "JUMC — Jadavpur University Music Club",
    template: "%s",
  },
  description:
    "Official portal of JUMC (Jadavpur University Music Club). Register for Milaap Edition I, the flagship cultural fest by JU Music Club & JU Dance Wing.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "JUMC",
  alternateName: ["JU Music Club", "Jadavpur University Music Club", "Milaap JU"],
  url: "https://jumc.vercel.app/",
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
