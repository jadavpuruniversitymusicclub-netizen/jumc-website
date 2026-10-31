import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in to Milaap Edition I',
  description:
    'Register for Milaap Edition I, the flagship cultural fest by JU Music Club (JUMC) & JU Dance Wing (JUDF). Complete your participant registration and festival entry.',
  alternates: {
    canonical: '/milaap/sign-in',
  },
};

export default function MilaapSignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
