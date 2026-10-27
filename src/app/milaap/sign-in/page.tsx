import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import SignInClient from './SignInClient';

export const metadata: Metadata = {
  title: 'Milaap Edition I - Register & Sign In - JUMC',
  description:
    'Participant registration and sign-in portal for Milaap Edition I, the premier cultural fest organized by Jadavpur University Music Club (JUMC) and JU Dance Wing (JUDF).',
  keywords: [
    'Milaap registration',
    'Milaap sign in',
    'Milaap Edition I',
    'JUMC participant register',
    'JUDW registration',
    'Jadavpur University fest sign in'
  ],
  alternates: {
    canonical: 'https://jumc.vercel.app/milaap/sign-in'
  },
  openGraph: {
    title: 'Milaap Edition I - Register & Sign In - JUMC',
    description:
      'Participant registration and sign-in portal for Milaap Edition I by JUMC & JUDW at Jadavpur University.',
    url: 'https://jumc.vercel.app/milaap/sign-in',
    siteName: 'JUMC - Jadavpur University Music Club',
    locale: 'en_IN',
    type: 'website'
  }
};

export default function MilaapSignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-amber-400 font-mono text-sm">Loading Milaap Portal...</div>}>
      <SignInClient />
    </Suspense>
  );
}
