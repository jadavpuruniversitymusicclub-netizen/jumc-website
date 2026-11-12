"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  Loader2,
  ArrowLeft,
  LogOut,
  Crown,
  LayoutDashboard,
} from "lucide-react";
import MilaapBrand from "@/components/MilaapBrand";

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

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);

  const role = session?.user?.role ?? session?.role;
  const isAdmin = status === "authenticated" && role === "admin";
  const isDenied = status === "authenticated" && role !== "admin";

  useEffect(() => {
    if (isAdmin) {
      router.replace("/admin/dashboard");
    }
  }, [isAdmin, router]);

  const handleAdminSignIn = async () => {
    setSigningIn(true);
    try {
      await signIn("google", { callbackUrl: "/admin/dashboard" });
    } catch {
      setSigningIn(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center py-28 px-4 sm:px-6 overflow-hidden text-slate-100">
      {/* Ambient glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[780px] h-[780px] rounded-full bg-gradient-to-br from-amber-600/15 via-rose-950/25 to-slate-950/40 blur-[170px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[450px] h-[450px] rounded-full bg-[#E60026]/12 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ willChange: "transform, opacity" }}
        className="w-full max-w-md relative z-10 transform-gpu"
      >
        {/* Back Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/milaap"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-widest text-slate-300 hover:text-amber-300 hover:border-amber-400/50 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Milaap Home</span>
          </Link>
        </div>

        {/* Admin Portal Card */}
        <div className="rounded-3xl bg-white/5 border border-amber-500/25 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.65)] overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-400 to-rose-500" />

          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/10 text-center space-y-3">
            <div className="flex justify-center">
              <MilaapBrand
                size="sm"
                showSubtitle={false}
                centered
                animate={false}
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-[0.22em]">
              <Crown className="w-3 h-3" />
              Admin Portal
            </div>
            <h1 className="text-2xl font-extrabold text-white font-cinzel">
              Milaap Admin Login
            </h1>
            <p className="text-xs text-slate-300/75 font-light">
              Dedicated coordinator authentication portal for JUMC &amp; JUDF
              administrators.
            </p>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6">
            {status === "loading" || isAdmin ? (
              <div className="py-8 flex flex-col items-center justify-center gap-3 text-center">
                <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
                <p className="text-xs font-mono uppercase tracking-widest text-amber-200/80">
                  {isAdmin
                    ? "Admin Verified — Routing to Dashboard..."
                    : "Checking session role in MongoDB..."}
                </p>
              </div>
            ) : isDenied ? (
              /* User Barrier on /admin/login */
              <div className="space-y-5 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400">
                  <ShieldAlert className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-rose-400">
                    Access Denied • User Account
                  </span>
                  <h2 className="text-lg font-bold text-white font-cinzel mt-1">
                    Admin Privileges Required
                  </h2>
                  <p className="text-xs text-slate-300/80 font-light mt-2 leading-relaxed">
                    Signed in as{" "}
                    <strong className="text-white">
                      {session?.user?.email}
                    </strong>{" "}
                    (<code className="text-amber-300">role: &quot;user&quot;</code>).
                    This portal is reserved strictly for festival admins.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                    href="/milaap/dashboard"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Go to Participant Dashboard</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out &amp; Sign in as Admin</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Unauthenticated Admin Login CTA */
              <>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-300/85 font-light space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold font-mono text-[11px] uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>MongoDB RBAC Enforcement</span>
                  </div>
                  <p className="leading-relaxed">
                    Sign in exclusively via this Admin Portal to authenticate
                    your organizer role and manage registrations, verification,
                    and God Mode controls.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAdminSignIn}
                  disabled={signingIn}
                  className="w-full py-4 px-5 rounded-xl bg-white hover:bg-amber-50 text-slate-900 font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(245,158,11,0.28)] flex items-center justify-center gap-3 disabled:opacity-65 cursor-pointer border border-amber-300/60"
                >
                  {signingIn ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
                      <span>Verifying Admin Google Account...</span>
                    </>
                  ) : (
                    <>
                      <GoogleLogo className="w-5 h-5 shrink-0" />
                      <span>Sign in with Google (Admin Portal)</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
