"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  BookOpen,
  Sparkles,
  Music,
  Footprints,
  Clock,
  Users,
  Trophy,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Calendar,
  Flame,
  Mic2,
  Guitar,
  Drum,
  Award,
} from "lucide-react";
import {
  MILAAP_COMPETITIONS,
  type MilaapCompetition,
} from "@/data/milaapCompetitions";

export type { MilaapCompetition };
export { MILAAP_COMPETITIONS };

/* ====================================================================
   HELPER ICON SELECTOR
   ==================================================================== */

function CompetitionCategoryIcon({
  title,
  category,
}: {
  title: string;
  category: "Music" | "Dance";
}) {
  if (title.includes("Vocals")) return <Mic2 size={20} />;
  if (title.includes("Instrumental")) return <Guitar size={20} />;
  if (title.includes("Bands")) return <Drum size={20} />;
  if (title.includes("INDAK")) return <Footprints size={20} />;
  if (title.includes("Street")) return <Flame size={20} />;
  return category === "Music" ? <Music size={20} /> : <Footprints size={20} />;
}

/* ====================================================================
   MAIN COMPONENT: MilaapCompetitions
   ==================================================================== */

export default function MilaapCompetitions() {
  const [selectedComp, setSelectedComp] = useState<MilaapCompetition | null>(
    null
  );

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!selectedComp) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedComp(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedComp]);

  return (
    <section id="competitions" className="w-full max-w-6xl mx-auto py-8">
      {/* ── Section Header ── */}
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[11px] font-mono font-semibold uppercase tracking-[0.25em] shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <Sparkles size={13} className="text-yellow-400" />
          MILAAP 2026 • OFFICIAL RULEBOOKS
        </div>

        <h2 className="MilaapFont text-4xl sm:text-5xl md:text-6xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
          competitions at milaap
        </h2>

        <p className="text-amber-100/75 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
          Review official stage rules, constraints, time limits, and judging
          criteria for all music and dance competitions before registering.
        </p>
      </div>

      {/* ── Responsive Competitions Grid (1 col mobile, 2 tablet, 3 desktop) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {MILAAP_COMPETITIONS.map((comp, idx) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.45,
              delay: idx * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col justify-between rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-amber-500/20 hover:border-amber-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.22)] transition-all duration-300 transform-gpu"
          >
            {/* Top Gradient Header */}
            <div
              className={`relative h-28 w-full bg-gradient-to-br ${comp.gradient} p-5 flex flex-col justify-between overflow-hidden border-b border-amber-500/20`}
            >
              {/* Subtle background texture */}
              <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

              {/* Ambient Hover Glow */}
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-amber-400/20 blur-2xl group-hover:bg-amber-400/40 transition-colors pointer-events-none" />

              {/* Top Badges Row */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    {comp.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-yellow-200 border border-amber-400/30">
                    {comp.format}
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-black/50 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                  <CompetitionCategoryIcon
                    title={comp.title}
                    category={comp.category}
                  />
                </div>
              </div>

              {/* Specs pill row */}
              <div className="relative z-10 flex items-center justify-between text-[11px] text-amber-200/90 font-mono">
                <span className="flex items-center gap-1">
                  <Trophy size={12} className="text-amber-400" />
                  {comp.prizePool}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-amber-400" />
                  {comp.date}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors font-serif tracking-tight leading-snug mb-2">
                  {comp.title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-100/70 font-light leading-relaxed line-clamp-2">
                  {comp.shortDescription}
                </p>
              </div>

              {/* Meta constraints preview */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-500/15 text-[11px] text-amber-200/70">
                <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1.5 rounded-lg border border-amber-500/10 truncate">
                  <Users size={12} className="text-amber-400 shrink-0" />
                  <span className="truncate">{comp.teamSize}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1.5 rounded-lg border border-amber-500/10 truncate">
                  <Clock size={12} className="text-amber-400 shrink-0" />
                  <span className="truncate">{comp.timeLimit}</span>
                </div>
              </div>

              {/* Read Rulebook Trigger Button */}
              <button
                onClick={() => setSelectedComp(comp)}
                className="w-full mt-2 group/btn relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 border border-amber-400/30 hover:border-amber-300 text-amber-200 hover:text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              >
                <BookOpen
                  size={14}
                  className="group-hover/btn:rotate-12 transition-transform duration-200"
                />
                <span>Read Rulebook</span>
                <ArrowRight
                  size={14}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================================================================
          RULEBOOK MODAL (FRAMER MOTION / DEEP GLASSMORPHISM)
          ================================================================ */}
      <AnimatePresence>
        {selectedComp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
            {/* Deep Dim/Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedComp(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl -z-10"
            />

            {/* Central Glassmorphic Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative w-full max-w-2xl max-h-[88vh] bg-[#160407]/95 border border-amber-500/40 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col my-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="rulebook-title"
            >
              {/* Top Gold Gradient Accent Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />

              {/* Modal Header */}
              <div className="relative px-6 py-5 border-b border-amber-500/20 bg-[#120305]/90 backdrop-blur-md flex items-start justify-between gap-4 shrink-0">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      {selectedComp.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-yellow-200 border border-white/10">
                      {selectedComp.format}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300/70">
                      Prize: {selectedComp.prizePool}
                    </span>
                  </div>

                  <h3
                    id="rulebook-title"
                    className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight leading-snug"
                  >
                    {selectedComp.title}
                  </h3>
                  <p className="text-xs text-amber-200/60 font-light mt-0.5">
                    Official Milaap Edition I Rulebook &amp; Stage Guidelines
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedComp(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10 active:scale-90"
                  aria-label="Close rulebook modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Rulebook Content */}
              <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-200 font-light selection:bg-amber-400/30">
                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-amber-500/20 text-xs">
                  <div className="flex items-center gap-2 text-amber-200">
                    <Calendar size={14} className="text-amber-400 shrink-0" />
                    <span>{selectedComp.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-200">
                    <MapPin size={14} className="text-amber-400 shrink-0" />
                    <span className="truncate">{selectedComp.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users size={14} className="text-amber-400 shrink-0" />
                    <span>Team: {selectedComp.teamSize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock size={14} className="text-amber-400 shrink-0" />
                    <span>Time: {selectedComp.timeLimit}</span>
                  </div>
                </div>

                {/* 1. Overview */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-amber-400" />
                    Overview
                  </h4>
                  <p className="leading-relaxed text-slate-300/90 text-xs sm:text-sm">
                    {selectedComp.rulebook.overview}
                  </p>
                </div>

                {/* 2. Team Constraints & Eligibility */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Users size={13} className="text-amber-400" />
                    Constraints &amp; Eligibility
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    {selectedComp.rulebook.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={14}
                          className="text-amber-400 shrink-0 mt-0.5"
                        />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Official Rules */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <BookOpen size={13} className="text-amber-400" />
                    Official Rules
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm">
                    {selectedComp.rulebook.rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-300 font-mono text-[10px] flex items-center justify-center shrink-0 border border-amber-400/30 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Judging Criteria */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Award size={13} className="text-amber-400" />
                    Judging Criteria
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedComp.rulebook.judgingCriteria.map((crit, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-black/40 border border-amber-500/15 text-xs text-amber-200/90 flex items-start gap-2"
                      >
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{crit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer with Primary CTA */}
              <div className="px-6 py-4 border-t border-amber-500/20 bg-[#120305]/95 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <button
                  onClick={() => setSelectedComp(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer border border-white/10 order-2 sm:order-1"
                >
                  Close Rulebook
                </button>

                <Link
                  href="/milaap/sign-in"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-red-900/40 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] active:scale-95 flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  <span>Register for this Event</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
