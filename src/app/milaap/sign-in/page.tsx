"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  LayoutDashboard,
} from "lucide-react";
import MilaapBrand from "@/components/MilaapBrand";
import AdminPortalBarrier from "@/components/AdminPortalBarrier";

function GoogleLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
      />
    </svg>
  );
}

function SignInContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [signingIn, setSigningIn] = useState(false);

  const authError = searchParams.get("error");
  const role = session?.user?.role ?? session?.role;
  const isAdmin = status === "authenticated" && role === "admin";
  const isRegistered = Boolean(
    session?.user?.isRegistered ?? session?.isRegistered
  );

  // Smart routing flow once Google authentication succeeds (strictly non-admin users only)
  useEffect(() => {
    if (status === "authenticated") {
      if (role === "admin") {
        // Strict Entry Separation: never route admins via /milaap/sign-in
        return;
      }
      if (isRegistered) {
        router.replace("/milaap/dashboard");
      } else {
        router.replace("/milaap/register");
      }
    }
  }, [status, role, isRegistered, router]);

  if (isAdmin) {
    return <AdminPortalBarrier email={session?.user?.email} />;
  }

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    try {
      await signIn("google", { callbackUrl: "/milaap/sign-in" });
    } catch {
      setSigningIn(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center py-28 px-4 sm:px-6 overflow-hidden text-slate-100">
      {/* Background ambient glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full bg-gradient-to-br from-amber-600/15 via-rose-950/20 to-blue-950/35 blur-[170px]" />
        <div className="absolute bottom-[5%] -right-[5%] w-[480px] h-[480px] rounded-full bg-[#E60026]/12 blur-[150px]" />
        <div className="absolute bottom-[30%] -left-[8%] w-[400px] h-[400px] rounded-full bg-blue-900/18 blur-[140px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/milaap"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-widest text-slate-300 hover:text-amber-300 hover:border-amber-400/50 transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>
              Back to{" "}
              <span className="font-samarkan MilaapFont text-sm normal-case tracking-normal">
                milaap
              </span>{" "}
              Home
            </span>
          </Link>
        </div>

        {/* Main Glassmorphic Sign-In Card */}
        <div className="rounded-3xl bg-white/[0.04] border border-amber-500/25 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Top Gold Accent Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600" />

          {/* Header */}
          <div className="relative px-8 pt-8 pb-6 border-b border-white/[0.07] text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.07] to-transparent pointer-events-none" />

            <div className="relative z-10 flex justify-center mb-4">
              <MilaapBrand
                size="sm"
                showSubtitle={false}
                centered
                animate={false}
              />
            </div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.28em] text-amber-400 mb-1.5">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                Official Participant Portal
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white font-cinzel leading-tight">
                Sign in to{" "}
                <span className="font-samarkan MilaapFont text-2xl sm:text-3xl text-amber-300 normal-case tracking-normal">
                  milaap
                </span>{" "}
                Edition I
              </h1>
              <p className="mt-2 text-xs text-slate-300/75 font-light leading-relaxed">
                Verify your identity with Google to register for events or access
                your personal Milaap pass &amp; dashboard.
              </p>
            </div>
          </div>

          {/* Card Body */}
          <div className="px-8 py-8 space-y-6">
            {status === "loading" ? (
              <div className="py-10 flex flex-col items-center justify-center gap-3 text-center">
                <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
                <p className="text-xs font-mono uppercase tracking-widest text-amber-200/80">
                  Checking authentication status...
                </p>
              </div>
            ) : status === "authenticated" ? (
              <div className="py-8 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white font-cinzel">
                    Signed in as {session?.user?.name}
                  </h2>
                  <p className="text-xs text-amber-200/75 mt-1">
                    {isRegistered
                      ? "Account found! Taking you to your Participant Dashboard..."
                      : "First-time participant detected! Opening Registration Form..."}
                  </p>
                </div>
                <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                <Link
                  href={isRegistered ? "/milaap/dashboard" : "/milaap/register"}
                  className="text-[11px] font-mono text-amber-300 underline underline-offset-4 hover:text-amber-200"
                >
                  Click here if not redirected automatically
                </Link>
              </div>
            ) : (
              <>
                {/* Error Alert if OAuth Failed */}
                {authError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Authentication Issue</p>
                      <p className="text-rose-200/80 font-light mt-0.5">
                        Could not complete Google Sign-In ({authError}). Please
                        try again.
                      </p>
                    </div>
                  </div>
                )}

                {/* Smart Flow Overview Pills */}
                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/15 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-400/25 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-amber-100">
                        New Participant?
                      </p>
                      <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                        Sign in with Google to pre-fill your profile, pick your
                        competitions, and claim your Participant ID.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/15 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                      <LayoutDashboard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-amber-100">
                        Already Registered?
                      </p>
                      <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                        Continue with the same Google account to jump straight
                        to your Dashboard and manage events.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Continue with Google Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={signingIn}
                  className="w-full py-4 px-5 rounded-xl bg-white hover:bg-amber-50 text-slate-900 font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(245,158,11,0.28)] flex items-center justify-center gap-3 disabled:opacity-65 disabled:cursor-not-allowed cursor-pointer border border-amber-300/60"
                >
                  {signingIn ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
                      <span>Connecting to Google...</span>
                    </>
                  ) : (
                    <>
                      <GoogleLogo className="w-5 h-5 shrink-0" />
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-light">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                  <span>
                    Free entry • Verified via Google OAuth • Valid Student ID
                    mandatory on fest day
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Card Footer */}
          <div className="px-8 pb-6 pt-4 border-t border-white/[0.06] text-center bg-black/20">
            <Link
              href="/milaap#competitions"
              className="text-xs text-slate-400 hover:text-amber-300 transition-colors font-light"
            >
              Want to check rules first?{" "}
              <span className="text-amber-300 font-medium underline underline-offset-4">
                Browse Competitions &amp; Rulebooks
              </span>
            </Link>
          </div>
        </div>

        {/* Outer Note */}
        <p className="mt-5 text-center text-[11px] text-slate-400 font-light">
          Need help?{" "}
          <a
            href="mailto:jumusicclub@gmail.com"
            className="text-amber-400 hover:underline"
          >
            jumusicclub@gmail.com
          </a>{" "}
          • Organised by{" "}
          <span className="text-white font-semibold">JUMC</span> &amp;{" "}
          <span className="text-amber-300 font-semibold">JUDF</span>
        </p>
      </div>
    </main>
  );
}

export default function MilaapSignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-amber-200">
          <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
