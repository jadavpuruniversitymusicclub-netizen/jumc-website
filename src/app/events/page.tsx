"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Sparkles,
  ArrowLeft,
  Filter,
  Layers,
  Music,
  Calendar,
  Compass
} from "lucide-react";
import { MILAAP_EVENTS, MilaapEvent } from "@/data/milaapEvents";
import EventCard from "@/components/events/EventCard";
import EventRulebookModal from "@/components/events/EventRulebookModal";

const CATEGORIES = ["All", "Music", "Dance", "Flagship"] as const;
type CategoryType = (typeof CATEGORIES)[number];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [selectedEvent, setSelectedEvent] = useState<MilaapEvent | null>(null);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      All: MILAAP_EVENTS.length,
      Music: 0,
      Dance: 0,
      Flagship: 0,
    };
    MILAAP_EVENTS.forEach((ev) => {
      if (ev.category in counts) {
        counts[ev.category as CategoryType] += 1;
      }
    });
    return counts;
  }, []);

  // Filter events by search query and category
  const filteredEvents = useMemo(() => {
    return MILAAP_EVENTS.filter((event) => {
      // Category match
      if (selectedCategory !== "All" && event.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesSubtitle = event.subtitle.toLowerCase().includes(query);
        const matchesDesc = event.shortDescription.toLowerCase().includes(query);
        const matchesVenue = event.venue.toLowerCase().includes(query);
        const matchesCategory = event.category.toLowerCase().includes(query);

        return (
          matchesTitle ||
          matchesSubtitle ||
          matchesDesc ||
          matchesVenue ||
          matchesCategory
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-amber-400/30 selection:text-white overflow-x-hidden">
      {/* ── Ambient Background Glows ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[850px] h-[500px] rounded-full bg-amber-500/[0.08] blur-[150px]" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#E60026]/[0.06] blur-[180px]" />
        <div className="absolute bottom-0 left-[-5%] w-[500px] h-[500px] rounded-full bg-purple-600/[0.05] blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* ── Back to Home / Milaap Portal Link ── */}
        <div className="w-full flex items-center justify-between mb-8">
          <Link
            href="/milaap"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-amber-200/70 hover:text-amber-100 transition-colors bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/20 hover:border-amber-400/40 active:scale-95 touch-manipulation"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Milaap Festival Portal</span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-300/80 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Sparkles size={12} className="text-yellow-400" /> Nov 28 – 30, 2026
          </span>
        </div>

        {/* ── Header Section ── */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-semibold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Compass size={14} className="text-amber-400" />
            Milaap 2026 Event Directory
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white font-serif tracking-tight leading-tight">
            Explore{" "}
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Competitions
            </span>{" "}
            &amp; Stages
          </h1>

          <p className="text-sm sm:text-base text-slate-300/80 font-light leading-relaxed max-w-2xl mx-auto">
            Discover the full roster of music, dance, and flagship cultural
            events at Milaap Edition I. Review official rules, time limits, and
            team constraints before taking the stage.
          </p>
        </div>

        {/* ── Top Section: Srijan-Style Centered Search Bar ── */}
        <div className="w-full max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-2xl blur-md opacity-40 group-focus-within:opacity-100 transition duration-300 pointer-events-none" />
            <div className="relative flex items-center bg-black/60 backdrop-blur-xl border border-amber-500/25 group-focus-within:border-amber-400/60 rounded-2xl px-4 py-3.5 shadow-xl transition-all">
              <Search
                size={18}
                className="text-amber-400/80 mr-3 shrink-0 group-focus-within:text-amber-300"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by title, genre, venue, or keyword..."
                className="w-full bg-transparent text-white placeholder-slate-400/60 text-sm sm:text-base font-light focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Srijan-Style Category Filter Pills ── */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 w-full max-w-3xl">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat];

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 active:scale-95 ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.45)] border border-yellow-300"
                    : "bg-black/40 backdrop-blur-md text-amber-200/80 hover:text-amber-100 border border-amber-500/20 hover:border-amber-400/40 hover:bg-black/60"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-black/25 text-black font-extrabold"
                      : "bg-white/10 text-amber-300"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Results Info Bar ── */}
        <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-6 px-1">
          <span>
            Showing{" "}
            <strong className="text-amber-300 font-mono">
              {filteredEvents.length}
            </strong>{" "}
            {filteredEvents.length === 1 ? "event" : "events"}
            {selectedCategory !== "All" && (
              <span>
                {" "}
                in <span className="text-white">{selectedCategory}</span>
              </span>
            )}
            {searchQuery && (
              <span>
                {" "}
                matching &ldquo;<span className="text-white">{searchQuery}</span>&rdquo;
              </span>
            )}
          </span>

          {(searchQuery || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-amber-400/80 hover:text-amber-300 transition-colors cursor-pointer text-xs underline underline-offset-4"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* ── Responsive Event Cards Grid ── */}
        {filteredEvents.length > 0 ? (
          <motion.div
            layout
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onOpenRulebook={(ev) => setSelectedEvent(ev)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State */
          <div className="w-full max-w-md mx-auto py-16 px-6 text-center rounded-3xl bg-black/40 backdrop-blur-md border border-amber-500/20 space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-300">
              <Search size={20} />
            </div>
            <h3 className="text-lg font-bold text-white font-serif">
              No matching events found
            </h3>
            <p className="text-xs text-slate-400 font-light">
              We couldn&apos;t find any competitions matching your current filters.
              Try searching for different keywords or clear your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
            >
              Clear Search &amp; Filters
            </button>
          </div>
        )}
      </div>

      {/* ── Interactive Rulebook Modal ── */}
      <EventRulebookModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </main>
  );
}
