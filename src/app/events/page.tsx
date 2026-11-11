"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Layers,
  Music,
  Calendar,
  Compass,
  Trophy,
  Flame,
  Clock,
  MapPin,
  Users,
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
  Info
} from "lucide-react";

// ============================================================================
// Top-Level JUMC Events Data Architecture
// ============================================================================

export interface TopLevelEvent {
  id: string;
  title: string;
  subtitle: string;
  category: "Flagship" | "Cultural" | "Music" | "Dance";
  status: "Registrations Open" | "Coming Soon" | "Past Event";
  shortDescription: string;
  date: string;
  venue: string;
  audience: string;
  isMilaap: boolean;
  route?: string;
  gradient: string;
  accentColor: string;
  badge: string;
  details?: {
    overview: string;
    highlights: string[];
    note?: string;
  };
}

const TOP_LEVEL_EVENTS: TopLevelEvent[] = [
  {
    id: "milaap-edition-1",
    title: "Milaap — Edition I",
    subtitle: "Inaugural Flagship Cultural Fest",
    category: "Flagship",
    status: "Registrations Open",
    shortDescription:
      "The premier inter-college cultural extravaganza co-hosted by JUMC and JUDF. Featuring battle of bands, eastern vocals, dance wars, and headline artist showcases.",
    date: "Nov 28 – 30, 2026",
    venue: "Open Air Theatre & Gandhi Bhavan, JU",
    audience: "Open to All Colleges & Universities",
    isMilaap: true,
    route: "/milaap",
    gradient: "from-amber-600/40 via-yellow-600/20 to-red-950/40",
    accentColor: "#f59e0b",
    badge: "Flagship Fest",
    details: {
      overview:
        "Milaap is the historic union of Jadavpur University Music Club and JU Dance Wing. Spanning three electrifying days with music and dance showdowns.",
      highlights: [
        "Eastern & Western Solo Vocals",
        "Battle of Bands & Beatboxing Cypher",
        "Street Dance 1v1 Battles & All-Styles Cypher",
        "Instrumental Showdown & Headliner Pro-Night"
      ],
      note: "Clicking 'View Details' takes you directly to the dedicated Milaap Portal."
    }
  },
  {
    id: "jumc-freshers-2026",
    title: "JUMC Freshers 2026",
    subtitle: "Annual Induction & Acoustic Showcase",
    category: "Cultural",
    status: "Past Event",
    shortDescription:
      "The official welcoming ceremony and orientation musical showcase for freshers, packed with club inductions, acoustic jams, and multi-genre medleys.",
    date: "August 22, 2026",
    venue: "Gandhi Bhavan Auditorium",
    audience: "JU First-Year Batch & Club Members",
    isMilaap: false,
    gradient: "from-purple-900/40 via-pink-900/20 to-slate-950/40",
    accentColor: "#a855f7",
    badge: "Induction Showcase",
    details: {
      overview:
        "JUMC Freshers 2026 celebrated the induction of incoming talents into the Jadavpur University Music Club family. Highlighted by our signature multi-genre musical medley and student registrations.",
      highlights: [
        "Welcome jam sessions across acoustic and rock disciplines",
        "Official executive committee intro & audition announcement",
        "Unplugged collaborative finale with senior club members"
      ],
      note: "Event concluded successfully. Next induction cycle opens August 2027."
    }
  },
  {
    id: "acoustic-night-open-mic",
    title: "Acoustic Night & Open Mic",
    subtitle: "Monthly Unplugged Jam Session",
    category: "Music",
    status: "Coming Soon",
    shortDescription:
      "An intimate unplugged evening celebrating raw student talent, singer-songwriters, instrumentalists, and spoken word under the open sky.",
    date: "Monthly Session • Dec 2026",
    venue: "JU Green Zone / OAT Lawn",
    audience: "All Music Enthusiasts & Performers",
    isMilaap: false,
    gradient: "from-blue-900/40 via-cyan-900/20 to-slate-950/40",
    accentColor: "#38bdf8",
    badge: "Monthly Jam",
    details: {
      overview:
        "A monthly ritual where artists share original compositions, covers, and impromptu vocal improvisations in a supportive acoustic setting.",
      highlights: [
        "15 performance slots on a first-come, first-served basis",
        "Open to acoustic guitars, cajons, keyboards, violins & vocals",
        "No prior club membership required to register for performance slots"
      ],
      note: "Slot registrations open 48 hours prior to the session date."
    }
  },
  {
    id: "beat-drop-dance-workshop",
    title: "Beat Drop: Dance Workshop",
    subtitle: "Urban Choreography & Grooves",
    category: "Dance",
    status: "Past Event",
    shortDescription:
      "An intensive 2-day dance masterclass conducted by invited guest choreographers, focusing on urban grooves, breaking fundamentals, and performance stagecraft.",
    date: "September 14 – 15, 2026",
    venue: "JU Student Activity Centre (SAC)",
    audience: "Beginner & Intermediate Dancers",
    isMilaap: false,
    gradient: "from-emerald-900/40 via-teal-900/20 to-slate-950/40",
    accentColor: "#34d399",
    badge: "Dance Masterclass",
    details: {
      overview:
        "A collaborative workshop organized in tandem with JU Dance Wing. Dancers honed musicality, body isolation techniques, and participated in a concluding cypher session.",
      highlights: [
        "2 days of intensive drills with guest choreographers",
        "Foundational training in popping, locking, and waacking",
        "Concluding collaborative showcase and certificate distribution"
      ],
      note: "Completed session. Look out for Beat Drop Vol. 2 next semester!"
    }
  }
];

const CATEGORIES = ["All", "Flagship", "Cultural", "Music", "Dance"] as const;
type CategoryType = (typeof CATEGORIES)[number];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [selectedEvent, setSelectedEvent] = useState<TopLevelEvent | null>(null);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      All: TOP_LEVEL_EVENTS.length,
      Flagship: 0,
      Cultural: 0,
      Music: 0,
      Dance: 0
    };
    TOP_LEVEL_EVENTS.forEach((ev) => {
      if (ev.category in counts) {
        counts[ev.category as CategoryType] += 1;
      }
    });
    return counts;
  }, []);

  // Filter events by search query and category
  const filteredEvents = useMemo(() => {
    return TOP_LEVEL_EVENTS.filter((event) => {
      // Category filter
      if (selectedCategory !== "All" && event.category !== selectedCategory) {
        return false;
      }

      // Search filter
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

  // Modal body scroll lock and escape listener
  useEffect(() => {
    if (!selectedEvent) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent]);

  return (
    <main className="relative min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-amber-400/30 selection:text-white overflow-x-hidden text-slate-100">
      {/* ── Ambient Background Glows ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full bg-amber-500/[0.08] blur-[160px]" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#E60026]/[0.06] blur-[180px]" />
        <div className="absolute bottom-0 left-[-5%] w-[550px] h-[550px] rounded-full bg-purple-700/[0.05] blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* ── Top Navigation Bar ── */}
        <div className="w-full flex items-center justify-between mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-amber-200/70 hover:text-amber-100 transition-colors bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/20 hover:border-amber-400/40 active:scale-95 touch-manipulation"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/milaap"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-300 uppercase tracking-widest bg-amber-500/10 hover:bg-amber-500/20 px-3.5 py-1.5 rounded-full border border-amber-400/30 transition-all hover:scale-105"
          >
            <Sparkles size={13} className="text-yellow-400 animate-pulse" />
            <span>Milaap Portal</span>
            <ArrowRight size={12} className="text-amber-400" />
          </Link>
        </div>

        {/* ── Header Section ── */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-semibold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Compass size={14} className="text-amber-400" />
            Official JUMC Directory
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white font-serif tracking-tight leading-tight">
            Events &amp;{" "}
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Fests
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300/80 font-light leading-relaxed max-w-2xl mx-auto">
            Discover all flagship festivals, monthly acoustic sessions, workshops,
            and campus inductions curated by Jadavpur University Music Club.
          </p>
        </div>

        {/* ── Desktop Split-Screen Layout (True Srijan-Style Left Sidebar) ── */}
        <div className="flex flex-col md:flex-row gap-8 items-start w-full">
          {/* ================================================================ */}
          {/* LEFT COLUMN: Sticky Desktop Sidebar / Mobile Top Menu Bar        */}
          {/* ================================================================ */}
          <aside className="w-full md:w-72 lg:w-80 shrink-0 md:sticky md:top-24 space-y-6">
            <div className="rounded-3xl bg-black/50 backdrop-blur-xl border border-amber-500/20 p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] space-y-6">
              {/* Search Bar */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-amber-300/90 mb-2.5">
                  Search Directory
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-2xl blur-sm opacity-40 group-focus-within:opacity-100 transition duration-300 pointer-events-none" />
                  <div className="relative flex items-center bg-black/70 border border-amber-500/25 group-focus-within:border-amber-400/70 rounded-2xl px-3.5 py-3 shadow-inner transition-all">
                    <Search
                      size={16}
                      className="text-amber-400/80 mr-2.5 shrink-0 group-focus-within:text-amber-300"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search events..."
                      className="w-full bg-transparent text-white placeholder-slate-400/60 text-sm font-light focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        aria-label="Clear search"
                        className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Category Filter Pills (Vertically Stacked on Desktop) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-300/90">
                    Categories
                  </span>
                  {(selectedCategory !== "All" || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchQuery("");
                      }}
                      className="text-[11px] text-amber-400/80 hover:text-amber-300 underline underline-offset-2 transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div className="flex flex-row flex-wrap md:flex-col gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    const count = categoryCounts[cat];

                    // Render category-specific icon
                    const renderIcon = () => {
                      switch (cat) {
                        case "Flagship":
                          return <Sparkles size={15} />;
                        case "Cultural":
                          return <Compass size={15} />;
                        case "Music":
                          return <Music size={15} />;
                        case "Dance":
                          return <Flame size={15} />;
                        default:
                          return <Layers size={15} />;
                      }
                    };

                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer active:scale-98 ${
                          isSelected
                            ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)] border border-yellow-300"
                            : "bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-amber-200 border border-white/5 hover:border-amber-500/30"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={
                              isSelected ? "text-black" : "text-amber-400/80"
                            }
                          >
                            {renderIcon()}
                          </span>
                          <span>{cat}</span>
                        </div>

                        <span
                          className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                            isSelected
                              ? "bg-black/25 text-black font-extrabold"
                              : "bg-white/10 text-amber-300/90"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Info Callout Card */}
              <div className="p-4 rounded-2xl bg-amber-500/[0.05] border border-amber-400/20 text-xs text-slate-300/90 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-semibold font-mono text-[11px] uppercase tracking-wider">
                  <Info size={14} />
                  <span>Milaap Registration</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300/80">
                  Registrations for Milaap Edition I competitions are active.
                  Access the dedicated portal to register solo or band entries.
                </p>
                <Link
                  href="/milaap"
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 hover:text-amber-200 pt-1 group"
                >
                  <span>Go to Milaap Fest</span>
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </aside>

          {/* ================================================================ */}
          {/* RIGHT COLUMN: Event Cards Grid Content                           */}
          {/* ================================================================ */}
          <div className="flex-1 w-full space-y-6">
            {/* Status bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <div>
                Showing{" "}
                <strong className="text-amber-300 font-mono">
                  {filteredEvents.length}
                </strong>{" "}
                {filteredEvents.length === 1 ? "event" : "events"}
                {selectedCategory !== "All" && (
                  <span>
                    {" "}
                    in <span className="text-white font-medium">{selectedCategory}</span>
                  </span>
                )}
                {searchQuery && (
                  <span>
                    {" "}
                    matching &ldquo;
                    <span className="text-white">{searchQuery}</span>&rdquo;
                  </span>
                )}
              </div>

              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="text-amber-400/80 hover:text-amber-300 transition-colors cursor-pointer text-xs underline underline-offset-4"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Event Cards Grid */}
            {filteredEvents.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredEvents.map((event) => {
                    const isOpen = event.status === "Registrations Open";
                    const isPast = event.status === "Past Event";

                    return (
                      <motion.div
                        key={event.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        style={{ willChange: "transform, opacity" }}
                        className="group relative flex flex-col justify-between rounded-3xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 hover:border-amber-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] transition-all duration-300 transform-gpu"
                      >
                        {/* Top Banner Gradient */}
                        <div
                          className={`relative h-28 w-full bg-gradient-to-br ${event.gradient} p-5 flex flex-col justify-between overflow-hidden border-b border-white/5`}
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

                          {/* Hover Ambient Light */}
                          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-400/20 blur-2xl group-hover:bg-amber-400/40 transition-colors pointer-events-none" />

                          {/* Top Badges */}
                          <div className="relative z-10 flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30">
                              {event.badge}
                            </span>

                            <span
                              className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md border ${
                                isOpen
                                  ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/40"
                                  : isPast
                                  ? "bg-slate-900/80 text-slate-300 border-slate-700/50"
                                  : "bg-amber-950/70 text-amber-300 border-amber-500/40"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isOpen
                                    ? "bg-emerald-400 animate-pulse"
                                    : isPast
                                    ? "bg-slate-400"
                                    : "bg-amber-400"
                                }`}
                              />
                              {event.status}
                            </span>
                          </div>

                          {/* Date & Venue Bar */}
                          <div className="relative z-10 flex items-center justify-between text-[11px] text-amber-200/90 font-mono">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} className="text-amber-400" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1.5 truncate max-w-[150px]">
                              <MapPin size={12} className="text-amber-400 shrink-0" />
                              <span className="truncate">{event.venue}</span>
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors font-serif tracking-tight leading-snug mb-1">
                              {event.title}
                            </h3>
                            <p className="text-xs text-amber-300/70 font-mono tracking-wider uppercase mb-3">
                              {event.subtitle}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300/85 font-light leading-relaxed">
                              {event.shortDescription}
                            </p>
                          </div>

                          {/* Target Audience Pill */}
                          <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[11px] text-slate-400">
                            <Users size={13} className="text-amber-400/80 shrink-0" />
                            <span className="truncate">{event.audience}</span>
                          </div>

                          {/* Task 3 Routing Logic:
                              Milaap card routes directly to /milaap WITHOUT opening modal!
                              Other cards open the interactive details modal. */}
                          {event.isMilaap ? (
                            <Link
                              href="/milaap"
                              className="w-full mt-2 group/btn relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-98 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                            >
                              <Sparkles size={14} className="text-black" />
                              <span>Explore Milaap Portal</span>
                              <ArrowRight
                                size={14}
                                className="group-hover/btn:translate-x-1 transition-transform"
                              />
                            </Link>
                          ) : (
                            <button
                              onClick={() => setSelectedEvent(event)}
                              className="w-full mt-2 group/btn relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 border border-amber-400/30 hover:border-amber-300 text-amber-200 hover:text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 active:scale-98 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                            >
                              <BookOpen
                                size={14}
                                className="group-hover/btn:rotate-12 transition-transform duration-200"
                              />
                              <span>
                                {isPast
                                  ? "View Event Retrospective"
                                  : "View Details & Info"}
                              </span>
                              <ArrowUpRight
                                size={14}
                                className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                              />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* Empty State */
              <div className="w-full py-16 px-6 text-center rounded-3xl bg-black/40 backdrop-blur-md border border-amber-500/20 space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-300">
                  <Search size={20} />
                </div>
                <h3 className="text-lg font-bold text-white font-serif">
                  No matching events found
                </h3>
                <p className="text-xs text-slate-400 font-light max-w-sm mx-auto">
                  We couldn&apos;t find any events matching your selected category or
                  search terms. Try clearing your filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Interactive Details Modal for Non-Milaap Events                  */}
      {/* ================================================================ */}
      <AnimatePresence>
        {selectedEvent && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ willChange: "opacity" }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-transparent -z-10 transform-gpu"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              style={{ willChange: "transform, opacity" }}
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-2xl max-h-[85vh] bg-[#160407]/95 border-2 border-amber-400/60 rounded-3xl shadow-[0_0_65px_rgba(245,158,11,0.35)] overflow-hidden flex flex-col my-auto transform-gpu"
            >
              {/* Gold Top Accent Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />

              {/* Modal Header */}
              <div className="relative px-6 py-5 border-b border-amber-500/20 bg-[#120305]/80 backdrop-blur-md flex items-start justify-between gap-4 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {selectedEvent.category}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {selectedEvent.badge}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white font-serif">
                    {selectedEvent.title}
                  </h2>
                  <p className="text-xs text-amber-300/70 font-mono">
                    {selectedEvent.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div
                data-lenis-prevent
                className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 font-light"
              >
                {/* Meta Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-xs">
                  <div className="flex items-center gap-2 text-amber-200">
                    <Calendar size={15} className="text-amber-400 shrink-0" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-200">
                    <MapPin size={15} className="text-amber-400 shrink-0" />
                    <span className="truncate">{selectedEvent.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 sm:col-span-2">
                    <Users size={15} className="text-amber-400 shrink-0" />
                    <span>Audience: {selectedEvent.audience}</span>
                  </div>
                </div>

                {/* Event Overview */}
                {selectedEvent.details?.overview && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-300">
                      Event Overview
                    </h3>
                    <p className="leading-relaxed text-slate-300/90 text-xs sm:text-sm">
                      {selectedEvent.details.overview}
                    </p>
                  </div>
                )}

                {/* Highlights */}
                {selectedEvent.details?.highlights && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-300">
                      Key Highlights &amp; Activities
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm">
                      {selectedEvent.details.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            size={14}
                            className="text-amber-400 shrink-0 mt-0.5"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Note */}
                {selectedEvent.details?.note && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                    <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <span>{selectedEvent.details.note}</span>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-amber-500/20 bg-[#120305]/80 flex items-center justify-between gap-4 shrink-0">
                <span className="text-[11px] font-mono text-slate-400">
                  Status:{" "}
                  <strong className="text-amber-300">
                    {selectedEvent.status}
                  </strong>
                </span>

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
