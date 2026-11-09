"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  BookOpen,
  ArrowUpRight,
  Music,
  Sparkles
} from "lucide-react";
import { MilaapEvent } from "@/data/milaapEvents";

interface EventCardProps {
  event: MilaapEvent;
  onOpenRulebook: (event: MilaapEvent) => void;
}

export default function EventCard({ event, onOpenRulebook }: EventCardProps) {
  const isOpen = event.status === "Registrations Open";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between rounded-3xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 hover:border-amber-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.22)] transition-all duration-300"
    >
      {/* Top Banner Gradient & Aesthetic Header */}
      <div className={`relative h-28 w-full bg-gradient-to-br ${event.gradient} p-5 flex flex-col justify-between overflow-hidden border-b border-white/5`}>
        {/* Subtle grid pattern / shimmer */}
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

        {/* Ambient Top Glow on Hover */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-400/20 blur-2xl group-hover:bg-amber-400/40 transition-colors pointer-events-none" />

        {/* Top Badges Row */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          {/* Category Badge */}
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-amber-300 border border-amber-400/30">
            {event.category}
          </span>

          {/* Status Badge */}
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md border ${
              isOpen
                ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/40"
                : "bg-amber-950/70 text-amber-300 border-amber-500/40"
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

        {/* Venue & Date Overlay */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-amber-200/80 font-mono">
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-amber-400" /> {event.date}
          </span>
          <span className="flex items-center gap-1">
            <Trophy size={12} className="text-amber-400" /> {event.prizePool}
          </span>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors font-serif tracking-tight leading-snug mb-1">
            {event.title}
          </h3>
          <p className="text-xs text-amber-300/70 font-mono tracking-wider uppercase mb-3">
            {event.subtitle}
          </p>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-slate-300/90 font-light leading-relaxed line-clamp-2">
            {event.shortDescription}
          </p>
        </div>

        {/* Meta Specs Pills */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1.5 rounded-lg border border-white/5">
            <Users size={13} className="text-amber-400/80 shrink-0" />
            <span className="truncate">{event.teamSize}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1.5 rounded-lg border border-white/5">
            <Clock size={13} className="text-amber-400/80 shrink-0" />
            <span className="truncate">{event.timeLimit}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onOpenRulebook(event)}
          className="w-full mt-2 group/btn relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 border border-amber-400/30 hover:border-amber-300 text-amber-200 hover:text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
        >
          <BookOpen size={14} className="group-hover/btn:rotate-12 transition-transform duration-200" />
          <span>View Details & Rulebook</span>
          <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

