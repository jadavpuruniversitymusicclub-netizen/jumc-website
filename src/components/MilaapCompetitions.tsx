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
  ShieldAlert,
  MapPin,
  Calendar,
  Flame,
  Mic2,
  Guitar,
  Drum,
  Award
} from "lucide-react";

/* ====================================================================
   COMPETITIONS DATA (MILAAP OFFICIAL PDF SPECIFICATION)
   ==================================================================== */

export interface MilaapCompetition {
  id: string;
  title: string;
  category: "Music" | "Dance";
  format: "Solo" | "Solo/Duet" | "Group" | "Group/Solo";
  shortDescription: string;
  timeLimit: string;
  teamSize: string;
  prizePool: string;
  date: string;
  venue: string;
  gradient: string;
  accentColor: string;
  rulebook: {
    overview: string;
    constraints: string[];
    timeLimits: string;
    rules: string[];
    judgingCriteria: string[];
  };
}

export const MILAAP_COMPETITIONS: MilaapCompetition[] = [
  {
    id: "eastern-light-vocals",
    title: "Eastern Light Vocals & Classical",
    category: "Music",
    format: "Solo",
    shortDescription:
      "Solo classical, semi-classical, Rabindrasangeet, and regional folk vocal showcase celebrating the soul of Indian music.",
    timeLimit: "5 Mins Performance + 2 Mins Setup",
    teamSize: "Solo (1 Singer + up to 2 Accompanists)",
    prizePool: "₹20,000",
    date: "Nov 28, 2026",
    venue: "Gandhi Bhavan Auditorium",
    gradient: "from-amber-600/30 via-yellow-950/40 to-neutral-950",
    accentColor: "#F59E0B",
    rulebook: {
      overview:
        "Eastern Light Vocals invites vocalists to showcase the depth and heritage of Indian vocal music, from classical Khayal and Thumri to Rabindrasangeet, Ghazal, and regional folk.",
      constraints: [
        "Solo vocalists only with valid college student ID card.",
        "Maximum 2 live acoustic accompanists (e.g. Harmonium, Tabla) or 1 standard karaoke/tanpura track.",
        "Pre-recorded vocal backing or auto-tuned audio tracks are strictly banned."
      ],
      timeLimits:
        "5 minutes performance time with 2 minutes setup/soundcheck. Overtime leads to penalty deductions.",
      rules: [
        "Permitted genres: Classical (Khayal/Dhrupad), Semi-Classical (Thumri/Dadra), Ghazal, Rabindrasangeet, Nazrulgeeti, or Regional Folk.",
        "A tanpura drone (acoustic or electronic tanpura droid) is mandatory for classical presentations.",
        "Backing tracks (if any) must be submitted in MP3 format at the sound desk 45 minutes prior to the slot.",
        "Judges' decisions are final, binding, and irrevocable."
      ],
      judgingCriteria: [
        "Sur, Shruti, and pitch accuracy (35%)",
        "Taal, Laya, and rhythmic precision (25%)",
        "Bhava, emotional expression, and voice modulation (25%)",
        "Song selection and overall presentation (15%)"
      ]
    }
  },
  {
    id: "western-vocals",
    title: "Western Vocals",
    category: "Music",
    format: "Solo",
    shortDescription:
      "Solo vocal showdown celebrating Pop, Rock, Soul, R&B, Jazz, and acoustic singer-songwriter anthems.",
    timeLimit: "5 Mins Total Stage Time",
    teamSize: "Solo (1 Performer)",
    prizePool: "₹20,000",
    date: "Nov 28, 2026",
    venue: "Worldview Amphitheatre",
    gradient: "from-blue-600/30 via-indigo-950/40 to-black",
    accentColor: "#3B82F6",
    rulebook: {
      overview:
        "Western Vocals is the platform for vocal dynamics, expressive tone, and acoustic interpretations in the scenic open-air campus amphitheatre.",
      constraints: [
        "Solo vocalists only. Participants may self-accompany on acoustic guitar or keyboard, or bring 1 accompanist.",
        "Instrumental backing tracks without lead vocals allowed via 3.5mm jack or USB drive.",
        "Valid college ID is mandatory for registration check-in."
      ],
      timeLimits:
        "Strict 5 minutes total stage time including stage entrance and mic check.",
      rules: [
        "Eligible genres: Pop, Rock, Soul, Blues, Country, Jazz, Ballads, and Acoustic Indie.",
        "Original compositions and creative cover rearrangements are actively encouraged and earn bonus points.",
        "Backing tracks containing backing vocal stems or pitch correction are strictly disqualified.",
        "All competitors must report at least 30 minutes before the scheduled time slot."
      ],
      judgingCriteria: [
        "Vocal range, tone quality, and pitch stability (35%)",
        "Dynamics, breath control, and expression (25%)",
        "Stage presence and audience connection (25%)",
        "Clarity of diction and interpretation (15%)"
      ]
    }
  },
  {
    id: "instrumental",
    title: "Instrumental",
    category: "Music",
    format: "Solo/Duet",
    shortDescription:
      "Solo and duet virtuosity across frets, keys, winds, and percussions in Eastern and Western disciplines.",
    timeLimit: "6 Mins Performance Time",
    teamSize: "Solo or Duet (1 – 2 Musicians)",
    prizePool: "₹18,000",
    date: "Nov 29, 2026",
    venue: "Gandhi Bhavan Auditorium",
    gradient: "from-amber-700/30 via-purple-950/40 to-stone-950",
    accentColor: "#F59E0B",
    rulebook: {
      overview:
        "The Instrumental Showdown puts the spotlight on pure instrumental skill—from screaming guitar solos and soaring violin melodies to intricate sitar meends and complex percussive grooves.",
      constraints: [
        "Solo performer or duet (maximum 2 performers on stage).",
        "Drone/tanpura box is allowed for Eastern instruments.",
        "Backing rhythm tracks and auto-accompaniment modes are barred."
      ],
      timeLimits:
        "6 minutes total stage time. A warning indicator is flashed at 5 minutes.",
      rules: [
        "Any acoustic or electric instrument is eligible (Sitar, Guitar, Flute, Violin, Keyboard, Drums, Percussion, etc.).",
        "Keyboards must be played in real-time; auto-accompaniment modes (arpeggiators/styles) are barred.",
        "Instrumentalists must bring their own cables, processors, and instruments. Amplifiers and standard drum kit provided.",
        "Judging is calibrated across both classical disciplines and modern progressive/fusion styles."
      ],
      judgingCriteria: [
        "Technical virtuosity, speed, and accuracy (35%)",
        "Rhythmic groove, improvisational depth, and cadence (30%)",
        "Tone purity, dynamics, and articulation (20%)",
        "Difficulty of repertoire (15%)"
      ]
    }
  },
  {
    id: "battle-of-bands",
    title: "Battle of the Bands",
    category: "Music",
    format: "Group",
    shortDescription:
      "The premier collegiate amplified live rock, metal, and fusion band competition on the main festival stage.",
    timeLimit: "15 Mins Performance + 5 Mins Soundcheck",
    teamSize: "3 – 8 Members per Band",
    prizePool: "₹40,000",
    date: "Nov 29, 2026",
    venue: "Open Air Theatre (OAT)",
    gradient: "from-red-600/30 via-amber-950/40 to-stone-950",
    accentColor: "#EF4444",
    rulebook: {
      overview:
        "Battle of the Bands is the centerpiece of Milaap’s musical lineup. From indie rock to heavy metal and classical-fusion, bands battle for state-wide supremacy on an industry-grade amplified stage.",
      constraints: [
        "Minimum 3, maximum 8 members. Cross-college band combinations are allowed.",
        "All members must carry valid collegiate student ID cards."
      ],
      timeLimits:
        "Strict 20 minutes total stage time (15 mins performance + 5 mins setup/soundcheck). A warning bell rings at 13 mins of performance.",
      rules: [
        "A standard 5-piece drumkit, bass amplifier, and two guitar amplifiers will be provided on stage.",
        "Bands must bring their own instruments (guitars, keyboards, processors, cables, drum sticks).",
        "Bands may perform original compositions or covers. Original compositions carry bonus evaluation points.",
        "Backing tracks and pre-recorded synth sequences are strictly prohibited; all sound must be produced live.",
        "Foul language or derogatory stage conduct leads to immediate disqualification."
      ],
      judgingCriteria: [
        "Tightness, rhythmic locking, and musical arrangement (30%)",
        "Vocal dynamics, instrumental dexterity, and solo execution (30%)",
        "Originality, crowd response, and stage command (25%)",
        "Time management and stage discipline (15%)"
      ]
    }
  },
  {
    id: "indak-eastern-dance",
    title: "INDAK: Eastern Group Dance",
    category: "Dance",
    format: "Group",
    shortDescription:
      "JUDF's signature group dance competition celebrating Indian Classical and vibrant regional Folk choreography.",
    timeLimit: "8 – 12 Mins on Stage",
    teamSize: "6 – 16 Dancers per Team",
    prizePool: "₹35,000",
    date: "Nov 29, 2026",
    venue: "Open Air Theatre (OAT)",
    gradient: "from-purple-600/30 via-rose-950/40 to-black",
    accentColor: "#A855F7",
    rulebook: {
      overview:
        "INDAK is the flagship dance festival of JUDF, uniting Kathak, Bharatanatyam, Odissi, Manipuri, and vibrant folk traditions in breathtaking group formations under festival stage lights.",
      constraints: [
        "Teams must have 6 to 16 dancers on stage.",
        "Valid student ID cards required for all team members.",
        "Empty stage to cleared stage protocol must be completed within 2 minutes."
      ],
      timeLimits:
        "8 to 12 minutes performance window on stage. Negative marking applies for exceeding 12 minutes.",
      rules: [
        "Accepted dance styles: Bharatanatyam, Kathak, Odissi, Manipuri, Mohiniyattam, Folk (Bhangra, Garba, Chhau, Bihu, Lavani, etc.).",
        "Fusion between multiple classical or folk styles is welcomed with a coherent thematic narrative.",
        "Fire, water, live flames, powders, and hazardous props are strictly prohibited on stage.",
        "Soundtracks must be submitted in MP3 format (320kbps) on a USB drive at least 2 hours before the event."
      ],
      judgingCriteria: [
        "Synchronization, formation transitions, and spatial choreography (30%)",
        "Abhinaya, expressions, mudras, and posture authenticity (30%)",
        "Costume, aesthetics, and thematic representation (20%)",
        "Rhythm adherence, stamina, and energy flow (20%)"
      ]
    }
  },
  {
    id: "street-dance-battle",
    title: "Street Dance Battle",
    category: "Dance",
    format: "Group/Solo",
    shortDescription:
      "High-octane 1v1 and 2v2 street dance battles spanning Hip-Hop, Breaking, Popping, Krump, Afro, and All-Styles.",
    timeLimit: "45s per Round (Call-outs in Finals)",
    teamSize: "1v1 Solo or 2v2 Crew Duo",
    prizePool: "₹22,000",
    date: "Nov 29, 2026",
    venue: "Gandhi Bhavan Lawns & Cypher Arena",
    gradient: "from-emerald-600/30 via-teal-950/40 to-slate-950",
    accentColor: "#10B981",
    rulebook: {
      overview:
        "The Street Dance Battle is the ultimate test of musicality, freestyle spontaneity, and athletic execution. Dancers battle round-by-round to live beats spun by our resident battle DJ.",
      constraints: [
        "Solo (1v1) or Duos (2v2) registered in advance.",
        "Open to all verified college dancers with valid student credentials."
      ],
      timeLimits:
        "Preliminary round: 45s cypher run. Quarter/Semi-finals: 2 rounds of 45s each. Finals: 3 rounds.",
      rules: [
        "DJ drops random tracks (Hip-hop, Funk, Breaks, Trap, Afro, House). No pre-choreographed routines.",
        "Physical contact, unsportsmanlike behavior, or aggressive touching leads to immediate elimination.",
        "Top 16 dancers from open cyphers qualify for 1v1 knockouts; top 8 duos qualify for 2v2 knockouts.",
        "Decisions by the guest judges are instantaneous, impartial, and irrevocable."
      ],
      judgingCriteria: [
        "Musicality, beat response, and rhythm texture (35%)",
        "Technique, foundation, and body control (30%)",
        "Originality, freestyle innovation, and personality (25%)",
        "Battle attitude and crowd interaction (10%)"
      ]
    }
  }
];

/* ====================================================================
   HELPER ICON SELECTOR
   ==================================================================== */

function CompetitionCategoryIcon({
  title,
  category
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
              ease: [0.22, 1, 0.36, 1]
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
