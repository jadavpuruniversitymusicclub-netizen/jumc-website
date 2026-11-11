"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Sparkles,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { MilaapEvent } from "@/data/milaapEvents";

interface EventRulebookModalProps {
  event: MilaapEvent | null;
  onClose: () => void;
}

export default function EventRulebookModal({
  event,
  onClose,
}: EventRulebookModalProps) {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!event) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  const isOpen = event.status === "Registrations Open";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Transparent click-outside backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-transparent -z-10"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="relative w-full max-w-3xl max-h-[88vh] bg-[#160407]/95 border-2 border-amber-400/60 rounded-3xl shadow-[0_0_65px_rgba(245,158,11,0.35)] overflow-hidden flex flex-col my-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rulebook-modal-title"
        >
          {/* Top Gold Gradient Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />

          {/* Sticky Modal Header */}
          <div className="relative px-6 py-5 border-b border-amber-500/20 bg-[#120305]/80 backdrop-blur-md flex items-start justify-between gap-4 shrink-0">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {event.category}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    isOpen
                      ? "bg-emerald-950/60 text-emerald-300 border-emerald-500/40"
                      : "bg-amber-950/60 text-amber-300 border-amber-500/40"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isOpen ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                    }`}
                  />
                  {event.status}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2
                id="rulebook-modal-title"
                className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-serif tracking-tight"
              >
                {event.title}
              </h2>
              <p className="text-xs sm:text-sm text-amber-200/60 font-light mt-0.5">
                {event.subtitle}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close rulebook modal"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-amber-500/20 text-amber-200 hover:text-white flex items-center justify-center transition-colors active:scale-90 shrink-0 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="px-6 py-6 overflow-y-auto space-y-6 text-slate-200 font-light text-sm custom-scrollbar">
            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/40 border border-amber-500/15 rounded-2xl p-4">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-amber-400/80">
                  <Users size={12} className="text-amber-400" /> Team Size
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {event.teamSize}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-amber-400/80">
                  <Clock size={12} className="text-amber-400" /> Time Limit
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {event.timeLimit}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-amber-400/80">
                  <Trophy size={12} className="text-amber-400" /> Prize Pool
                </span>
                <span className="text-xs sm:text-sm font-semibold text-amber-300">
                  {event.prizePool}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-amber-400/80">
                  <Calendar size={12} className="text-amber-400" /> Date
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {event.date}
                </span>
              </div>
            </div>

            {/* Venue & Timing Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/15 text-xs text-amber-100">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-rose-400 shrink-0" />
                <span>
                  <strong className="text-amber-300">Venue:</strong> {event.venue}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-amber-400 shrink-0" />
                <span>
                  <strong className="text-amber-300">Schedule:</strong> {event.time}
                </span>
              </div>
            </div>

            {/* Section 1: Overview */}
            <div>
              <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-amber-300 mb-2 flex items-center gap-2">
                <BookOpen size={15} /> Event Overview
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm bg-black/20 p-4 rounded-xl border border-white/5">
                {event.rulebook.overview}
              </p>
            </div>

            {/* Section 2: Rules & Regulations */}
            <div>
              <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-amber-300 mb-3 flex items-center gap-2">
                <ShieldCheck size={16} /> Official Rules & Guidelines
              </h3>
              <ul className="space-y-2.5">
                {event.rulebook.rules.map((rule, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 bg-black/30 border border-amber-500/10 rounded-xl p-3.5 hover:border-amber-400/25 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono font-semibold">
                      {idx + 1}
                    </span>
                    <span className="text-slate-200 text-sm leading-relaxed">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3: Judging Criteria */}
            <div>
              <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-amber-300 mb-3 flex items-center gap-2">
                <CheckCircle2 size={15} /> Judging & Evaluation Criteria
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {event.rulebook.judgingCriteria.map((crit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 bg-black/20 border border-white/5 rounded-xl px-3.5 py-3"
                  >
                    <Sparkles size={14} className="text-amber-400 shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-300">
                      {crit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Coordinators */}
            {event.rulebook.coordinators && event.rulebook.coordinators.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-300/80 mb-3">
                  Event Inquiries & Coordination
                </h3>
                <div className="flex flex-wrap gap-3">
                  {event.rulebook.coordinators.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 px-4 py-2.5 rounded-xl bg-black/40 border border-amber-500/20 text-xs"
                    >
                      <div>
                        <p className="font-semibold text-white">{c.name}</p>
                        <p className="text-[10px] text-amber-300/60 uppercase tracking-wider font-mono">
                          {c.club}
                        </p>
                      </div>
                      <a
                        href={`tel:${c.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-200 transition-colors font-mono font-medium"
                      >
                        <Phone size={12} />
                        {c.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Modal Footer with Actions */}
          <div className="px-6 py-4 border-t border-amber-500/20 bg-[#120305]/90 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium tracking-wide transition-all cursor-pointer"
            >
              Close Rulebook
            </button>

            {isOpen ? (
              <Link
                href="/milaap/sign-in"
                className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>Register Now</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-950/40 border border-amber-500/20 text-amber-300/60 font-semibold text-xs tracking-wider uppercase cursor-not-allowed"
              >
                Registrations Opening Soon
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

