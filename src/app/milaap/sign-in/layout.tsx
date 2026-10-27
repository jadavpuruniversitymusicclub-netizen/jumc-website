import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register for Milaap Edition I | JUMC & JUDW',
  description:
    'Participant registration and sign-in portal for Milaap Edition I, the premier cultural fest organized by Jadavpur University Music Club (JUMC) and JU Dance Wing (JUDF).',
  keywords: [
    'Milaap registration',
    'Milaap sign in',
    'Milaap Edition I',
    'JUMC participant register',
    'JUDW registration',
    'Jadavpur University fest registration',
    'cultural fest Kolkata registration'
  ],
  alternates: { canonical: 'https://jumc.vercel.app/milaap/sign-in' },
  openGraph: {
    title: 'Register for Milaap Edition I | JUMC & JUDW',
    description:
      'Participant registration and sign-in portal for Milaap Edition I by JUMC & JUDW at Jadavpur University.',
    url: 'https://jumc.vercel.app/milaap/sign-in',
    siteName: 'JUMC - Jadavpur University Music Club',
    locale: 'en_IN',
    type: 'website'
  }
};

export default function MilaapSignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
