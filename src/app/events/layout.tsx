import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MILAAP EDITION I | JUMC Events',
  description:
    'The next chapter of our cultural journey at JU is here. Join us on Nov 28–30, 2026 for bigger musical showdowns, dance battles, and pro-night performances.',
  alternates: {
    canonical: '/events',
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

