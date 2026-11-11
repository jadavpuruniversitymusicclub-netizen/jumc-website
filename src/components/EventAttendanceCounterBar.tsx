"use client";

import React from "react";
import { CheckCircle2, Users } from "lucide-react";
import type { EventAttendanceStat } from "@/app/admin/dashboard/actions";

interface EventAttendanceCounterBarProps {
  stats: EventAttendanceStat[];
  loading?: boolean;
}

export default function EventAttendanceCounterBar({
  stats,
  loading = false,
}: EventAttendanceCounterBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white font-cinzel">
            Live Per-Event Registration &amp; Attendance
          </h2>
          <p className="text-[11px] text-slate-400">
            Real-time headcount across Milaap Edition I competitions
          </p>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/30">
          {stats.length} Active Events
        </span>
      </div>

      {loading && stats.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#1a0b07]/75 border border-amber-500/20 p-4 space-y-3 animate-pulse"
            >
              <div className="h-4 w-3/4 rounded bg-white/10" />
              <div className="h-3 w-1/2 rounded bg-white/5" />
              <div className="h-2 w-full rounded bg-white/10" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {stats.map((stat) => {
            const rate =
              stat.totalRegistered > 0
                ? Math.round((stat.totalAttended / stat.totalRegistered) * 100)
                : 0;

            return (
              <div
                key={stat.eventSlug}
                className="rounded-2xl bg-gradient-to-b from-[#24100a]/90 to-[#160805]/95 border border-amber-500/25 hover:border-amber-400/50 p-4 flex flex-col justify-between gap-3 shadow-lg transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/25">
                      {stat.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-300">
                      {rate}%
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white font-serif leading-snug line-clamp-2">
                    {stat.eventName}
                  </h3>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="inline-flex items-center gap-1 text-amber-200/90">
                      <Users className="w-3 h-3 text-amber-400" />
                      Registered:{" "}
                      <strong className="text-white">
                        {stat.totalRegistered}
                      </strong>
                    </span>

                    <span className="inline-flex items-center gap-1 text-emerald-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Attended:{" "}
                      <strong className="text-emerald-200 font-bold">
                        {stat.totalAttended}
                      </strong>
                    </span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-black/60 border border-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                      style={{
                        width: `${stat.totalRegistered > 0 ? Math.max(rate, stat.totalAttended > 0 ? 6 : 0) : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

