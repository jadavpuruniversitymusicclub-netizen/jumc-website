"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ShieldAlert, LogOut, ArrowLeft } from "lucide-react";

export default function AdminPortalBarrier({
  email,
}: {
  email?: string | null;
}) {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center py-28 px-4 sm:px-6 overflow-hidden text-slate-100">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full bg-gradient-to-br from-rose-700/15 via-amber-950/20 to-slate-950/40 blur-[170px]" />
      </div>

      <div className="w-full max-w-md rounded-3xl bg-white/[0.04] border border-rose-500/35 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.65)] overflow-hidden relative z-10">
        <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-amber-400 to-rose-600" />
        <div className="p-8 text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-rose-400">
              Access Denied • Role Barrier
            </span>
            <h1 className="text-xl font-bold text-white font-cinzel">
              Participant Portal Restricted
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/90 font-light leading-relaxed">
              Admin accounts cannot use the participant portal. Please use the
              Admin Login at the top right.
            </p>
            {email && (
              <p className="text-[11px] font-mono text-slate-400 pt-1">
                Signed in as: {email}
              </p>
            )}
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/milaap/sign-in" })}
              className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out &amp; Switch Account</span>
            </button>

            <Link
              href="/milaap"
              className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors pt-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Milaap Home</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
