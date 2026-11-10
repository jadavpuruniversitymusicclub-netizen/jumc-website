"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Megaphone,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";

interface AnnouncementItem {
  _id: string;
  title: string;
  message: string;
  priority: "info" | "urgent" | "success";
  createdAt: string;
}

interface FestivalSettingPublic {
  registrationsLocked: boolean;
  lockMessage: string;
  showAnnouncements: boolean;
  heroNotice: string;
  festDatesText: string;
}

export default function MilaapAnnouncements({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [setting, setSetting] = useState<FestivalSettingPublic | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/milaap/announcements", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setAnnouncements(
          Array.isArray(data.announcements) ? data.announcements : []
        );
        setSetting(data.setting || null);
        setLoaded(true);
      })
      .catch(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!loaded) {
    if (compact) return null;
    return (
      <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 text-xs text-slate-400">
        Loading live festival announcements...
      </div>
    );
  }

  const showBlock = setting?.showAnnouncements !== false;
  const visibleAnnouncements = showBlock ? announcements : [];
  const hasNotice = Boolean(setting?.heroNotice?.trim());
  const isLocked = Boolean(setting?.registrationsLocked);

  if (
    compact &&
    visibleAnnouncements.length === 0 &&
    !hasNotice &&
    !isLocked
  ) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={
        compact
          ? "w-full max-w-4xl mx-auto px-2 mb-8 relative z-10 space-y-3"
          : "rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-4"
      }
    >
      {!compact && (
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 block mb-1">
              Organisers Broadcast
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white font-cinzel flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-amber-400" />
              <span>Live Updates &amp; Announcements</span>
            </h2>
          </div>
          {setting?.festDatesText && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-200/80 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/25">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {setting.festDatesText}
            </span>
          )}
        </div>
      )}

      {/* Global Lock Notice if enabled */}
      {isLocked && (
        <div className="rounded-2xl bg-rose-950/60 border border-rose-500/40 backdrop-blur-xl p-4 flex items-start gap-3 shadow-[0_0_25px_rgba(244,63,94,0.18)]">
          <Lock className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
              Registrations Paused
            </p>
            <p className="text-xs sm:text-sm text-rose-100/90 font-light mt-0.5">
              {setting?.lockMessage ||
                "Registrations are temporarily locked by the organisers."}
            </p>
          </div>
        </div>
      )}

      {/* Homepage Notice Banner if set */}
      {hasNotice && (
        <div className="rounded-2xl bg-amber-500/10 border border-amber-400/35 backdrop-blur-xl p-4 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-amber-100 font-light leading-relaxed">
            {setting?.heroNotice}
          </p>
        </div>
      )}

      {/* Announcements List */}
      {visibleAnnouncements.length === 0 ? (
        !compact && (
          <p className="text-xs sm:text-sm text-slate-400 font-light py-2">
            No active announcements right now. Check back here for stage slot
            schedules and soundcheck timings.
          </p>
        )
      ) : (
        <div className="space-y-3">
          {visibleAnnouncements.map((item) => {
            const isUrgent = item.priority === "urgent";
            const isSuccess = item.priority === "success";

            return (
              <div
                key={item._id}
                className={`rounded-2xl p-4 backdrop-blur-xl border flex items-start gap-3 transition-all ${
                  isUrgent
                    ? "bg-rose-950/45 border-rose-500/40 text-rose-100"
                    : isSuccess
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-100"
                    : "bg-black/45 border-amber-500/30 text-amber-100"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isUrgent ? (
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  ) : isSuccess ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Megaphone className="w-4 h-4 text-amber-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold tracking-wide text-white">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono opacity-65">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200/85 font-light mt-1 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
}
