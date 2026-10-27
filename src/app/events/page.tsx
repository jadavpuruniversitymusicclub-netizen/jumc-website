import { Metadata } from 'next';
import EventsPortal from '@/components/events/EventsPortal';

export const metadata: Metadata = {
  title: 'Events & Competitions | JUMC & JUDW | Jadavpur University',
  description:
    'Discover upcoming cultural fests, music battles, dance battles, and workshops hosted by Jadavpur University Music Club (JUMC) & JU Dance Wing (JUDW). Featuring flagship fest milaap — EDITION I.',
  keywords: [
    'JUMC',
    'JUDW',
    'Jadavpur University',
    'milaap',
    'milaap EDITION I',
    'JUMC Events',
    'Kolkata College Fests',
    'INDAK',
    'Eastern Light Vocals',
    'Battle of the Bands',
    'Dance Battles',
  ],
  openGraph: {
    title: 'Events & Competitions | JUMC & JUDW',
    description:
      'Official events portal of Jadavpur University Music Club & JU Dance Wing. Explore milaap — EDITION I, competition rulebooks, and registration portals.',
    url: 'https://jumc.in/events',
    siteName: 'JUMC — Jadavpur University Music Club',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events & Competitions | JUMC & JUDW',
    description:
      'Explore upcoming cultural fests, music battles, dance battles, and workshops hosted by JUMC & JUDW.',
  },
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#020617]/95 selection:bg-[#E60026]/30 selection:text-white">
      <EventsPortal />
    </main>
  );
}
