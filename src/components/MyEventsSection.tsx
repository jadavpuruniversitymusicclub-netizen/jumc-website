"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  PlusCircle,
  RefreshCw,
  Sparkles,
  Users,
} from "lucide-react";
import { MILAAP_COMPETITIONS } from "@/data/milaapCompetitions";
import type { MyEventItem } from "@/app/api/milaap/my-events/route";

interface MyEventsSectionProps {
  onOpenEditor: () => void;
  refreshKey?: number;
}

function formatRegistrationDate(isoDate?: string): string {
  if (!isoDate) return "Registered";
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return "Registered";
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

async function requestMyEvents(): Promise<{
  events: MyEventItem[];
  error: string;
}> {
  const res = await fetch("/api/milaap/my-events", { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) {
    return {
      events: [],
      error: data.error || "Unable to load your registered events.",
    };
  }
  return {
    events: Array.isArray(data.events) ? data.events : [],
    error: "",
  };
}

export default function MyEventsSection({
  onOpenEditor,
  refreshKey = 0,
}: MyEventsSectionProps) {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<MyEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userEmail = session?.user?.email;
  const isLoading =
    status === "loading" || (status === "authenticated" && loading);

  useEffect(() => {
    if (status !== "authenticated" || !userEmail) return;
    let cancelled = false;

    requestMyEvents()
      .then((result) => {
        if (cancelled) return;
        setEvents(result.events);
        setError(result.error);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Network error while loading your registered events.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [status, userEmail, refreshKey]);

  const handleRefresh = async () => {
    if (!userEmail) return;
    setLoading(true);
    setError("");
    try {
      const result = await requestMyEvents();
      setEvents(result.events);
      setError(result.error);
    } catch {
      setError("Network error while loading your registered events.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      aria-labelledby="my-events-heading"
      className="lg:col-span-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6"
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 block mb-1">
            Your Stage Lineup
          </span>
          <h2
            id="my-events-heading"
            className="text-xl sm:text-2xl font-bold text-white font-cinzel flex items-center gap-2.5"
          >
            <span>My Events</span>
            {!isLoading && (
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                {events.length}
              </span>
            )}
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            title="Refresh registered events"
            aria-label="Refresh registered events"
            className="inline-flex items-center justify-center p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-amber-300 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin text-amber-400" : ""}`}
            />
          </button>

          <button
            type="button"
            onClick={onOpenEditor}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add / Edit Events</span>
          </button>
        </div>
      </div>

      {/* Loading State: Spinner + Skeleton Loader Cards */}
      {isLoading ? (
        <div className="space-y-5">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-amber-300/80">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            <span>Loading your registered events...</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1].map((idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-black/40 border border-white/10 p-5 space-y-4 animate-pulse"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="h-5 w-24 rounded-full bg-white/10" />
                  <div className="h-5 w-20 rounded-full bg-white/10" />
                </div>
                <div className="space-y-2">
                  <div className="h-5 w-3/4 rounded-lg bg-white/10" />
                  <div className="h-3.5 w-1/2 rounded-lg bg-white/5" />
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="h-3 w-28 rounded bg-white/5" />
                  <div className="h-3 w-24 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        /* Error State */
        <div className="py-10 px-4 text-center space-y-4 rounded-2xl bg-rose-500/10 border border-rose-500/30">
          <p className="text-xs sm:text-sm text-rose-200">{error}</p>
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-xs font-mono uppercase tracking-wider text-rose-100 cursor-pointer transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      ) : events.length === 0 ? (
        /* Empty State */
        <div className="py-14 px-6 text-center flex flex-col items-center justify-center space-y-5 rounded-2xl bg-black/30 border border-white/[0.07]">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 max-w-md">
            <p className="text-sm sm:text-base font-medium text-slate-200">
              You haven&apos;t registered for any events yet.
            </p>
            <p className="text-xs text-slate-400 font-light">
              Explore all festival competitions and book your stage slot for
              Milaap Edition I.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          >
            <span>Browse Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Responsive Event Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev, idx) => {
            const catalogComp = MILAAP_COMPETITIONS.find(
              (c) => c.id === ev.eventSlug
            );
            const isVerified = ev.status === "Verified";

            return (
              <motion.article
                key={`${ev.eventSlug}-${idx}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 20,
                  delay: idx * 0.05,
                }}
                style={{ willChange: "transform, opacity" }}
                className="rounded-2xl bg-black/45 border border-amber-500/20 hover:border-amber-400/50 p-5 flex flex-col justify-between gap-4 transition-colors transform-gpu"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 border border-amber-400/25">
                      {ev.category}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        isVerified
                          ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/40"
                          : "bg-amber-950/70 text-amber-300 border-amber-500/40"
                      }`}
                    >
                      {isVerified ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-400" />
                      )}
                      {ev.status}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white font-serif leading-snug">
                    {ev.eventName}
                  </h3>

                  {/* Registration Date */}
                  <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-200/80">
                    <CalendarCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      Registered:{" "}
                      <strong className="text-white font-medium">
                        {formatRegistrationDate(ev.registeredAt)}
                      </strong>
                    </span>
                  </p>

                  {(ev.teamName || ev.role) && (
                    <div className="mt-2.5 space-y-1 text-xs text-slate-300/90">
                      {ev.teamName && (
                        <p className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>
                            Team:{" "}
                            <strong className="text-amber-200 font-medium">
                              {ev.teamName}
                            </strong>
                          </span>
                        </p>
                      )}
                      {ev.role && (
                        <p className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Role: {ev.role}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {catalogComp && (
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {catalogComp.date}
                    </span>
                    <span className="flex items-center gap-1 truncate max-w-[180px]">
                      <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{catalogComp.venue}</span>
                    </span>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
}

