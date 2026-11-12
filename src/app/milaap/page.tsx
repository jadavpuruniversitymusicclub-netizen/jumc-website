"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import MilaapAnnouncements from "@/components/MilaapAnnouncements";
import {
  ArrowLeft,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Music,
  Footprints,
  Users,
  Eye,
  Phone,
  Mail,
  MapPin,
  Crown,
  Calendar,
  Clock,
  Trophy,
  BookOpen,
  Download,
  ChevronDown,
} from "lucide-react";

/* ====================================================================
   INLINE SOCIAL & BRAND ICONS (ZERO DEPENDENCY / ULTRA CRISP)
   ==================================================================== */

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
  );
}

/* ====================================================================
   PART 2: 60FPS HARDWARE-ACCELERATED MOTION WRAPPERS
   ==================================================================== */

// 2.1 — MorphTextReveal: Pure opacity/y GPU transform with spring physics (once: true)
function MorphTextReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      }}
      style={{ willChange: "transform, opacity" }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

// 2.2 — SvgMorphFrame: Pure GPU scale/opacity spring reveal + smooth gentle float (no clipPath repaint)
function SvgMorphFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      style={{ willChange: "transform, opacity" }}
      className={`relative transform-gpu ${className}`}
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotateZ: [0, 0.6, 0, -0.6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ willChange: "transform" }}
        className="border border-amber-400/30 bg-gradient-to-b from-amber-500/10 to-transparent p-3 rounded-2xl shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden transform-gpu"
      >
        <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-400/50 rounded-tl-xl pointer-events-none" />
        <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-400/50 rounded-tr-xl pointer-events-none" />
        <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-400/50 rounded-bl-xl pointer-events-none" />
        <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-400/50 rounded-br-xl pointer-events-none" />
        {children}
      </motion.div>
    </motion.div>
  );
}

// 2.3 — AnimatedCounter: Runs once on scroll enter without continuous re-renders
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);
      setDisplayValue(current);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue >= 1000
        ? (displayValue / 1000).toFixed(1) + "k"
        : displayValue}
      {suffix}
    </span>
  );
}

/* ====================================================================
   SECTION DIVIDER ORNAMENT
   ==================================================================== */

function GoldenDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-16 md:my-20">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/40" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="transform-gpu will-change-transform"
      >
        <Sparkles size={16} className="text-amber-400/50" />
      </motion.div>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/40" />
    </div>
  );
}

/* ====================================================================
   UNIFIED MILAAP EVENT DATA & 2.5D HELICAL LOOP SPLINE GEOMETRY
   ==================================================================== */

export interface UnifiedMilaapItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Music" | "Dance" | "Flagship" | "Special";
  isCompetition: boolean;
  prizePool?: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  timeLimit: string;
  description: string;
  rulebook?: {
    overview: string;
    teamConstraints?: string;
    timeConstraints?: string;
    rules: string[];
    judgingCriteria: string[];
    coordinators?: { name: string; phone: string; club: string }[];
  };
}

const unifiedMilaapEvents: UnifiedMilaapItem[] = [
  {
    id: "eastern-light-vocals",
    title: "Eastern Light Vocals & Classical",
    subtitle: "Solo Singing • Ragapradhan & Semi-Classical",
    category: "Music",
    isCompetition: true,
    prizePool: "₹20,000",
    date: "Nov 28, 2026",
    time: "11:00 AM – 03:30 PM",
    venue: "Gandhi Bhavan Auditorium",
    teamSize: "Solo (1 Singer + up to 2 Accompanists)",
    timeLimit: "5 Mins + 2 Mins Soundcheck",
    description:
      "Solo classical and light vocal arena honoring the foundational legacy of founder Kabir Suman and legendary Indian vocal traditions.",
    rulebook: {
      overview:
        "Eastern Light Vocals invites vocalists to showcase the depth of Indian music—from Khayal, Thumri, and Ghazal to Rabindrasangeet, Nazrulgeeti, and contemporary light compositions.",
      teamConstraints:
        "1 vocalist with up to 2 live instrumental accompanists (e.g., Tabla, Harmonium, Tanpura) or standard karaoke/tanpura track.",
      timeConstraints:
        "5 minutes performance time with 2 minutes setup. Overtime results in negative scoring.",
      rules: [
        "Participants can choose Indian Classical, Semi-Classical, Ghazal, Rabindrasangeet, or Regional Folk.",
        "A tanpura droid or acoustic tanpura is mandatory for classical presentations.",
        "Pre-recorded vocal backing or auto-tuned audio tracks are strictly banned.",
        "Participants must submit their track (if using an audio backing) at the registration desk 45 minutes prior.",
      ],
      judgingCriteria: [
        "Sur, Shruti, and pitch accuracy (35%).",
        "Taal, Laya, and rhythmic precision (25%).",
        "Bhava, emotional expression, and voice modulation (25%).",
        "Song selection and overall presentation (15%).",
      ],
      coordinators: [
        { name: "Aditya Bhattacharyya", phone: "+91 62909 21928", club: "JUMC Coordinator" },
      ],
    },
  },
  {
    id: "western-vocals",
    title: "Western Vocals & Acoustic Jam",
    subtitle: "Solo & Duet • Pop, Rock, Soul & Unplugged",
    category: "Music",
    isCompetition: true,
    prizePool: "₹20,000",
    date: "Nov 28, 2026",
    time: "04:00 PM – 07:30 PM",
    venue: "Worldview Amphitheatre",
    teamSize: "Solo (1) or Duet (2 Performers)",
    timeLimit: "5 Minutes Total Stage Time",
    description:
      "Solo and duet vocal showcase celebrating Pop, Rock, Soul, R&B, Jazz, and organic acoustic arrangements in the amphitheatre.",
    rulebook: {
      overview:
        "Western Vocals & Acoustic Jam is the platform for raw vocal power, vocal harmonies, and unplugged instrumentals in the scenic open-air campus amphitheatre.",
      teamConstraints: "Solo vocalist or vocal duet (maximum 2 performers on stage).",
      timeConstraints: "Strict 5-minute performance window.",
      rules: [
        "Performers may self-accompany on acoustic guitar or keyboard, or bring 1 accompanist.",
        "Instrumental backing tracks without lead vocals are permitted via 3.5mm jack or Bluetooth.",
        "Genres: Pop, Rock, Country, Soul, Blues, Jazz, Ballads, and Acoustic Indie.",
        "Original compositions and creative cover rearrangements are actively encouraged.",
      ],
      judgingCriteria: [
        "Vocal range, tone quality, and pitch stability (35%).",
        "Harmonic coordination (for duets) and dynamics (25%).",
        "Acoustic arrangement and stage presence (25%).",
        "Clarity of diction and interpretation (15%).",
      ],
      coordinators: [
        { name: "Aditya Bhattacharyya", phone: "+91 62909 21928", club: "JUMC Coordinator" },
      ],
    },
  },
  {
    id: "instrumental-showdown",
    title: "Instrumental Showdown",
    subtitle: "Eastern & Western Solo/Duet Instrumentals",
    category: "Music",
    isCompetition: true,
    prizePool: "₹18,000",
    date: "Nov 29, 2026",
    time: "11:00 AM – 02:30 PM",
    venue: "Gandhi Bhavan Auditorium",
    teamSize: "Solo (1 Performer + Optional Tanpura)",
    timeLimit: "6 Minutes Performance Time",
    description:
      "Solo instrumental duel celebrating dexterous fretwork, percussive mastery, and soulful wind melodies across all disciplines.",
    rulebook: {
      overview:
        "The Instrumental Showdown puts the spotlight solely on the instrument and player. Whether it is the soaring notes of a violin, lightning guitar solos, intricate sitar meends, or complex tabla kaydas.",
      teamConstraints: "Solo performer only. A drone/tanpura track is allowed for Eastern instruments.",
      timeConstraints: "6 minutes total stage time. No backing rhythm tracks allowed.",
      rules: [
        "Any acoustic or electric instrument is eligible (Sitar, Guitar, Flute, Violin, Keyboard, Drums, Percussion).",
        "Keyboards must be played in real-time; auto-accompaniment modes (arpeggiators/styles) are barred.",
        "Judging is calibrated across both classical disciplines and modern progressive/fusion styles.",
        "Instrumentalists must bring their own cables, processors, and instruments.",
      ],
      judgingCriteria: [
        "Technical virtuosity, speed, and accuracy (35%).",
        "Rhythmic groove, improvisational depth, and cadence (30%).",
        "Tone purity, dynamics, and articulation (20%).",
        "Difficulty of repertoire (15%).",
      ],
      coordinators: [
        { name: "Aditya Bhattacharyya", phone: "+91 62909 21928", club: "JUMC Coordinator" },
      ],
    },
  },
  {
    id: "battle-of-bands",
    title: "Battle of the Bands",
    subtitle: "Flagship Band Showcase • Amplified Live Stage",
    category: "Music",
    isCompetition: true,
    prizePool: "₹40,000",
    date: "Nov 29, 2026",
    time: "02:00 PM – 07:00 PM",
    venue: "Open Air Theatre (OAT)",
    teamSize: "3 – 8 Members per Band",
    timeLimit: "15 Mins Performance + 5 Mins Soundcheck",
    description:
      "The high-octane collegiate band showdown on the Open Air Theatre main stage. Plug in, turn up the gain, and electrify the crowd.",
    rulebook: {
      overview:
        "Battle of the Bands is the crown jewel of Milaap's musical lineup. From indie rock to heavy metal and classical-fusion, bands battle for state-wide supremacy on an industry-grade amplified stage.",
      teamConstraints: "Minimum 3, maximum 8 members. Cross-college combinations are allowed.",
      timeConstraints:
        "Strict 20 minutes total stage time (15 mins performance + 5 mins setup/soundcheck). A warning bell rings at 13 mins.",
      rules: [
        "A standard 5-piece drumkit, bass amplifier, and two guitar amplifiers will be provided on stage.",
        "Bands must bring their own instruments (guitars, keyboards, processors, cables, drum sticks).",
        "Bands may perform original compositions or covers. Original compositions carry bonus evaluation points.",
        "Backing tracks and pre-recorded synth sequences are strictly prohibited; all sound must be live.",
        "Any foul language, offensive lyrics, or disrespectful stage conduct will lead to immediate disqualification.",
      ],
      judgingCriteria: [
        "Tightness, rhythmic locking, and musical arrangement (30%).",
        "Vocal dynamics, instrumental dexterity, and solo execution (30%).",
        "Originality, crowd response, and stage command (25%).",
        "Time management and stage etiquette (15%).",
      ],
      coordinators: [
        { name: "Aditya Bhattacharyya", phone: "+91 62909 21928", club: "JUMC Coordinator" },
      ],
    },
  },
  {
    id: "street-dance-battle",
    title: "Western & Street Dance Battle",
    subtitle: "Hip-Hop, Afro, Breaking, Popping & Contemporary",
    category: "Dance",
    isCompetition: true,
    prizePool: "₹22,000",
    date: "Nov 29, 2026",
    time: "02:00 PM – 06:00 PM",
    venue: "Gandhi Bhavan Lawns & Cypher Arena",
    teamSize: "1v1 Solo or 2v2 Crew Duo",
    timeLimit: "45s per Round (Call-outs in Finals)",
    description:
      "Electrifying 1v1 and 2v2 street dance battles spanning Hip-Hop, Breaking, Popping, Krump, Afro, and Waacking judged by battle veterans.",
    rulebook: {
      overview:
        "The Street Dance Battle is the ultimate test of musicality, freestyle spontaneity, and athletic execution. Dancers battle round-by-round to live beats spun by our resident battle DJ.",
      teamConstraints: "Solo (1v1) or Duos (2v2) registered in advance.",
      timeConstraints: "Preliminary round: 45s cypher run. Quarter/Semi-finals: 2 rounds of 45s each.",
      rules: [
        "DJ drops random tracks (Hip-hop, Funk, Breaks, Trap, Afro, House). No pre-choreographed songs.",
        "Physical contact, unsportsmanlike behavior, or aggressive touching leads to immediate elimination.",
        "Top 16 dancers from open cyphers qualify for 1v1 knockouts; top 8 duos qualify for 2v2 knockouts.",
        "Decisions by the guest judges are instantaneous and irrevocable.",
      ],
      judgingCriteria: [
        "Musicality, beat response, and rhythm texture (35%).",
        "Technique, foundation, and control (30%).",
        "Originality, freestyle innovation, and personality (25%).",
        "Battle aggression and crowd interaction (10%).",
      ],
      coordinators: [
        { name: "Tanisha Das", phone: "+91 88374 13287", club: "JUDF Coordinator" },
      ],
    },
  },
  {
    id: "choreography-showcase",
    title: "Choreography & Duet Showcase",
    subtitle: "Thematic Storytelling & Fusion Dance",
    category: "Dance",
    isCompetition: true,
    prizePool: "₹25,000",
    date: "Nov 30, 2026",
    time: "11:00 AM – 03:00 PM",
    venue: "Gandhi Bhavan Auditorium",
    teamSize: "2 – 8 Performers per Act",
    timeLimit: "6 – 9 Minutes on Stage",
    description:
      "Thematic storytelling and contemporary fusion dance through synchronized duets, lyrical movements, and choreographed emotional drama.",
    rulebook: {
      overview:
        "This competition challenges choreographers to weave narrative, emotive depth, and contemporary movement into a theatrical stage production.",
      teamConstraints: "2 to 8 dancers. Open to all collegiate teams.",
      timeConstraints: "6 to 9 minutes including stage setup.",
      rules: [
        "Choreographies must follow a defined concept or storyline (brief synopsis to be read out by MC).",
        "Fusion across Contemporary, Ballet, Lyrical Jazz, Urban, and Semi-Classical is encouraged.",
        "Props must be declared during registration; no glitter, confetti, or messy substances permitted on stage.",
      ],
      judgingCriteria: [
        "Choreographic complexity and thematic translation (35%).",
        "Synchronization, partnering, and lift mechanics (30%).",
        "Emotional resonance and stage presence (25%).",
        "Costume and music edit seamlessness (10%).",
      ],
      coordinators: [
        { name: "Tanisha Das", phone: "+91 88374 13287", club: "JUDF Coordinator" },
      ],
    },
  },
  {
    id: "folk-jugalbandi-showcase",
    title: "Classical & Folk Jugalbandi Showcase",
    subtitle: "Baul, Bhatiyali & Classical Fusion Extravaganza",
    category: "Special",
    isCompetition: false,
    date: "Nov 28, 2026",
    time: "07:30 PM – 09:30 PM",
    venue: "Open Air Theatre (OAT)",
    teamSize: "Curated Ensemble & Guest Maestros",
    timeLimit: "2-Hour Inaugural Mainstage Showcase",
    description:
      "An exclusive inaugural jugalbandi weaving rural Bengal's folk traditions, baul mysticism, and Indian classical ragas featuring master instrumentalists and vocalists.",
    rulebook: {
      overview:
        "An inaugural evening showcase bringing together folk legends, Baul practitioners, and student instrumentalists in an unrehearsed, soul-stirring musical dialogue.",
      rules: [
        "Open access to all registered Milaap delegates and university students.",
        "Seating on first-come, first-served basis at Open Air Theatre.",
        "Audience participation and live singalongs are wholeheartedly encouraged.",
      ],
      judgingCriteria: [
        "Non-competitive celebration of Bengal's living cultural heritage.",
      ],
      coordinators: [
        { name: "Aditya Bhattacharyya", phone: "+91 62909 21928", club: "JUMC Coordinator" },
        { name: "Tanisha Das", phone: "+91 88374 13287", club: "JUDF Coordinator" },
      ],
    },
  },
  {
    id: "pro-night-gala",
    title: "Headline Artist Performances & Felicitation",
    subtitle: "Grand Finale Pro-Night & Official Trophy Ceremony",
    category: "Flagship",
    isCompetition: false,
    date: "Nov 30, 2026",
    time: "05:00 PM – 10:00 PM",
    venue: "Jadavpur University Main Stadium",
    teamSize: "All Registered Delegates & Campus Community",
    timeLimit: "5-Hour Star Concert & Awards",
    description:
      "The star-studded climax of Milaap Edition I! Witness top national touring headliners live on the massive festival mainstage, followed by the official trophy distribution honoring all festival champions.",
    rulebook: {
      overview:
        "The grand finale of Milaap Edition I! A celebratory evening uniting thousands of college students for the trophy award ceremony, followed by an unforgettable live performance from a top national headliner.",
      teamConstraints: "Open entry to all registered festival participants and valid college ID holders.",
      timeConstraints: "Gates open at 04:30 PM. Final entry closes at 07:00 PM.",
      rules: [
        "Valid physical student ID card and festival entry wristband/QR pass are required at all security check gates.",
        "Strictly no outside food, alcohol, or prohibited items allowed inside the stadium arena.",
        "All general campus safety and Kolkata police event guidelines strictly enforced.",
      ],
      judgingCriteria: [
        "Grand Trophy Distribution across all Milaap 2026 winners and runner-ups.",
      ],
      coordinators: [
        { name: "Aditya Bhattacharyya", phone: "+91 62909 21928", club: "JUMC Coordinator" },
        { name: "Tanisha Das", phone: "+91 88374 13287", club: "JUDF Coordinator" },
      ],
    },
  },
];

/* 2.5D Helical Loop Spline Geometry (viewBox: 0 0 1000 3200)
   Regime I:   Top Calligraphic Ribbon Flourish (Y in [20, 230])
   Regime II:  Helical Coils at 8 Milestones (Y in [260, 2738], loop-de-loop coils at X=720 and X=280)
   Regime III: Terminal Greek Sigma (Σ) curve ending with vertical tangent at (500, 3120) */
const helicalSplinePrimary =
  "M 360 20 C 580 5, 760 30, 660 75 C 560 120, 310 110, 360 160 C 410 205, 590 195, 680 230 C 720 245, 755 250, 760 275 C 765 305, 725 320, 685 300 C 650 280, 665 245, 705 250 C 745 255, 740 305, 700 350 C 660 395, 440 437, 320 584 C 280 599, 245 604, 240 629 C 235 659, 275 674, 315 654 C 350 634, 335 599, 295 604 C 255 609, 260 659, 300 704 C 340 749, 560 791, 680 938 C 720 953, 755 958, 760 983 C 765 1013, 725 1028, 685 1008 C 650 988, 665 953, 705 958 C 745 963, 740 1013, 700 1058 C 660 1103, 440 1145, 320 1292 C 280 1307, 245 1312, 240 1337 C 235 1367, 275 1382, 315 1362 C 350 1342, 335 1307, 295 1312 C 255 1317, 260 1367, 300 1412 C 340 1457, 560 1499, 680 1646 C 720 1661, 755 1666, 760 1691 C 765 1721, 725 1736, 685 1716 C 650 1696, 665 1661, 705 1666 C 745 1671, 740 1721, 700 1766 C 660 1811, 440 1853, 320 2000 C 280 2015, 245 2020, 240 2045 C 235 2075, 275 2090, 315 2070 C 350 2050, 335 2015, 295 2020 C 255 2025, 260 2075, 300 2120 C 340 2165, 560 2207, 680 2354 C 720 2369, 755 2374, 760 2399 C 765 2429, 725 2444, 685 2424 C 650 2404, 665 2369, 705 2374 C 745 2379, 740 2429, 700 2474 C 660 2519, 440 2561, 320 2708 C 280 2723, 245 2728, 240 2753 C 235 2783, 275 2798, 315 2778 C 350 2758, 335 2723, 295 2728 C 255 2733, 260 2783, 300 2828 C 350 2865, 460 2880, 580 2875 C 650 2870, 710 2890, 680 2930 C 650 2970, 480 2980, 430 3000 C 490 3020, 660 3030, 680 3065 C 695 3090, 620 3110, 500 3120";

/* Secondary Phase-Shifted Counter-Helix Strand creating 3D double-helix depth */
const helicalSplineSecondary =
  "M 640 20 C 420 5, 240 30, 340 75 C 440 120, 690 110, 640 160 C 590 205, 410 195, 320 230 C 280 245, 245 250, 240 275 C 235 305, 275 320, 315 300 C 350 280, 335 245, 295 250 C 255 255, 260 305, 300 350 C 340 395, 560 437, 680 584 C 720 599, 755 604, 760 629 C 765 659, 725 674, 685 654 C 650 634, 665 599, 705 604 C 745 609, 740 659, 700 704 C 660 749, 440 791, 320 938 C 280 953, 245 958, 240 983 C 235 1013, 275 1028, 315 1008 C 350 988, 335 953, 295 958 C 255 963, 260 1013, 300 1058 C 340 1103, 560 1145, 680 1292 C 720 1307, 755 1312, 760 1337 C 765 1367, 725 1382, 685 1362 C 650 1342, 665 1307, 705 1312 C 745 1317, 740 1367, 700 1412 C 660 1457, 440 1499, 320 1646 C 280 1661, 245 1666, 240 1691 C 235 1721, 275 1736, 315 1716 C 350 1696, 335 1661, 295 1666 C 255 1671, 260 1721, 300 1766 C 340 1811, 560 1853, 680 2000 C 720 2015, 755 2020, 760 2045 C 765 2075, 725 2090, 685 2070 C 650 2050, 665 2015, 705 2020 C 745 2025, 740 2075, 700 2120 C 660 2165, 440 2207, 320 2354 C 280 2369, 245 2374, 240 2399 C 235 2429, 275 2444, 315 2424 C 350 2404, 335 2369, 295 2374 C 255 2379, 260 2429, 300 2474 C 340 2519, 560 2561, 680 2708 C 720 2723, 755 2728, 760 2753 C 765 2783, 725 2798, 685 2778 C 650 2758, 665 2723, 705 2728 C 745 2733, 740 2783, 700 2828 C 650 2865, 540 2880, 420 2875 C 350 2870, 290 2890, 320 2930 C 350 2970, 520 2980, 570 3000 C 510 3020, 340 3030, 320 3065 C 305 3090, 380 3110, 500 3120";

const helicalMilestones = [
  { y: 260, cardSide: "right" as const, threshold: 0.156 }, // Node 0: Right loop at X=720
  { y: 614, cardSide: "left" as const, threshold: 0.256 },  // Node 1: Left loop at X=280
  { y: 968, cardSide: "right" as const, threshold: 0.355 }, // Node 2: Right loop at X=720
  { y: 1322, cardSide: "left" as const, threshold: 0.455 }, // Node 3: Left loop at X=280
  { y: 1676, cardSide: "right" as const, threshold: 0.554 }, // Node 4: Right loop at X=720
  { y: 2030, cardSide: "left" as const, threshold: 0.654 }, // Node 5: Left loop at X=280
  { y: 2384, cardSide: "right" as const, threshold: 0.753 }, // Node 6: Right loop at X=720
  { y: 2738, cardSide: "left" as const, threshold: 0.853 }, // Node 7: Left loop at X=280
];

const helicalTimelineTotalHeight = 3200;

/* ====================================================================
   SPONSORSHIP DATA
   ==================================================================== */

const sponsorSlabs = [
  {
    tier: "TITLE SPONSOR",
    price: "₹1,00,000",
    isFeatured: true,
    desc: "Your name is present alongside the event title, catching all the passing eyes as the centre of attention. From the mainstage backdrop, banners, standees and dedicated features on our social media pages, your brand becomes synonymous with our event. This includes allocated spaces for stalls, as well as special mentions during the event proceedings and in its social media coverage.",
  },
  {
    tier: "ASSOCIATE SPONSOR",
    price: "₹50,000",
    isFeatured: false,
    desc: "As a contributor to our founding edition, your brand is highlighted across posters, banners and standees, a shared stall space, along with on-stage mentions and featuring in our social media coverage.",
  },
  {
    tier: "EVENT SPONSOR",
    price: "₹25,000",
    isFeatured: false,
    desc: "Your brand is credited as the Event Partner, as the gears that drive the machine. With your logo on the event posters, banners, and sound setup area alike, you also get on-stage announcements and coverage on our social media handles.",
  },
  {
    tier: "STALL PARTNER",
    price: "₹20,000",
    isFeatured: false,
    desc: "Showcase your brand directly to attendees with a prime stall location on the JU campus, offering opportunities to promote and sell your products. Gain brand visibility through event promotions, social media outreach, and customized stall branding.",
  },
];

/* ====================================================================
   SPONSORSHIP MATRIX DATA
   ==================================================================== */

type SponsorTabKey = "pr" | "web" | "venue" | "stall";

const sponsorTabs: { key: SponsorTabKey; label: string }[] = [
  { key: "pr", label: "PR Benefits" },
  { key: "web", label: "Web Benefits" },
  { key: "venue", label: "Venue Benefits" },
  { key: "stall", label: "Stall Partner" },
];

const prBenefits = [
  {
    benefit: "Introduction as the Title Sponsor of MILAAP'26",
    title: true,
    associate: false,
    event: false,
  },
  {
    benefit:
      "Primary mention on Event Posters/ Banners/ Standees/ Flexes across JU campus",
    title: true,
    associate: true,
    event: true,
  },
  {
    benefit:
      "Opportunity to share printed/E-pamphlets and coupons of the brand to all invitees",
    title: true,
    associate: true,
    event: true,
  },
  {
    benefit:
      "Special mention as the Title/Associate Sponsor of MILAAP'26 during all print media coverage",
    title: true,
    associate: true,
    event: false,
  },
];

const webBenefits = [
  {
    benefit: "Permanent recognition on our website as a Sponsor of MILAAP'26",
    title: true,
    associate: true,
    event: true,
  },
  {
    benefit:
      "Customized social media posts across all platforms announcing the brand as our Title/Associate Sponsor",
    title: true,
    associate: true,
    event: false,
  },
  {
    benefit: "Video form social media promotion for the brand",
    title: true,
    associate: true,
    event: false,
  },
  {
    benefit:
      "Hyperlinked logo on the MILAAP website to redirect to all company handles",
    title: true,
    associate: true,
    event: true,
  },
];

const venueBenefits = [
  {
    benefit: "Interactive floor time/workshops",
    title: true,
    associate: false,
    event: false,
  },
  {
    benefit: "Provision of stalls for student interaction",
    title: true,
    associate: true,
    event: false,
  },
  {
    benefit:
      "Opportunity to conduct surveys amongst all the participating students and Club members",
    title: true,
    associate: true,
    event: true,
  },
  {
    benefit:
      "Provision to showcase company products during the competition",
    title: true,
    associate: true,
    event: true,
  },
  {
    benefit: "Mention during keynote address of MILAAP'26",
    title: true,
    associate: true,
    event: true,
  },
];

/* ====================================================================
   CAROUSEL IMAGES DATA
   ==================================================================== */

const carouselItems = [
  { src: "/jumc-group.svg", alt: "JUMC Team — Musical Excellence" },
  { src: "/judf-group.svg", alt: "JUDF Team — Dance & Rhythm" },
  { src: "/reach-group.svg", alt: "JUMC × JUDF — Digital & Campus Impact" },
  { src: "/jumc-group.svg", alt: "Iqraar Band & JUMC Live Showcase" },
  { src: "/judf-group.svg", alt: "JUDF Team — Ensemble & Choreography" },
];

/* ====================================================================
   CONTACT DATA (COORDINATORS)
   ==================================================================== */

const festivalCoordinators = [
  {
    name: "Aditya Bhattacharyya",
    club: "JUMC",
    clubName: "Jadavpur University Music Club",
    phone: "+91 62909 21928",
    tel: "+916290921928",
    instagramHandle: "@ju_music_club",
    instagramUrl: "https://www.instagram.com/ju_music_club/",
  },
  {
    name: "Tanisha Das",
    club: "JUDF",
    clubName: "JU Dance Wing",
    phone: "+91 88374 13287",
    tel: "+918837413287",
    instagramHandle: "@ju_dance_wing",
    instagramUrl: "https://www.instagram.com/ju_dance_wing/",
  },
];

/* ====================================================================
   MAIN PAGE COMPONENT
   ==================================================================== */

export default function MilaapPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);

  // Deterministic DOM-measured scroll progress engine u in [0, 1]
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headPoint, setHeadPoint] = useState<{ x: number; y: number } | null>({
    x: 360,
    y: 20,
  });
  const [pathLength, setPathLength] = useState(8579);

  useEffect(() => {
    let rafId: number | null = null;
    let currentU = 0;
    let targetU = 0;

    const measurePath = () => {
      if (svgPathRef.current) {
        const len = svgPathRef.current.getTotalLength();
        if (len > 0) {
          setPathLength(len);
        }
      }
    };

    const updateScrollProgress = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.65; // Drawing head stays at 65% of viewport height
      const rawProgress = (triggerY - rect.top) / Math.max(rect.height, 1);
      targetU = Math.min(1, Math.max(0, rawProgress));

      if (rafId === null) {
        rafId = requestAnimationFrame(renderLoop);
      }
    };

    const renderLoop = () => {
      const diff = targetU - currentU;
      if (Math.abs(diff) < 0.001) {
        currentU = targetU;
      } else {
        currentU += diff * 0.2; // Smooth 60fps exponential damping
      }

      setScrollProgress(currentU);

      if (svgPathRef.current) {
        const total = svgPathRef.current.getTotalLength() || pathLength;
        const pt = svgPathRef.current.getPointAtLength(currentU * total);
        if (pt) {
          setHeadPoint({ x: pt.x, y: pt.y });
        }
      }

      if (Math.abs(targetU - currentU) > 0.0005) {
        rafId = requestAnimationFrame(renderLoop);
      } else {
        rafId = null;
      }
    };

    measurePath();
    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", () => {
      measurePath();
      updateScrollProgress();
    });

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [pathLength]);

  // Sponsorship tab state
  const [activeTab, setActiveTab] = useState<SponsorTabKey>("pr");

  // Inline Rulebook Accordion state
  const [expandedRulebookId, setExpandedRulebookId] = useState<string | null>(
    null
  );

  const toggleRulebook = (id: string) => {
    setExpandedRulebookId((prev) => (prev === id ? null : id));
  };

  const handleDownloadRulebookPdf = async (event: UnifiedMilaapItem) => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Background banner
    doc.setFillColor(18, 4, 7);
    doc.rect(0, 0, 210, 297, "F");

    // Golden header accent bar
    doc.setFillColor(245, 158, 11);
    doc.rect(0, 0, 210, 4, "F");

    // Header Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(245, 158, 11);
    doc.text("MILAAP — EDITION I • OFFICIAL RULEBOOK & GUIDELINES", 15, 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(180, 180, 180);
    doc.text(
      "Jadavpur University Music Club (JUMC) × JU Dance Wing (JUDF)",
      15,
      22
    );

    // Divider
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.4);
    doc.line(15, 26, 195, 26);

    // Event Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text(event.title, 15, 36);

    // Subtitle
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(253, 230, 138);
    doc.text(event.subtitle, 15, 42);

    // Metadata Box
    doc.setFillColor(30, 10, 12);
    doc.setDrawColor(245, 158, 11);
    doc.roundedRect(15, 47, 180, 28, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(245, 158, 11);
    doc.text("Category:", 20, 54);
    doc.text("Date & Time:", 20, 61);
    doc.text("Venue:", 20, 68);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(240, 240, 240);
    doc.text(
      `${event.category} (${
        event.isCompetition ? "Competitive" : "Non-Competitive Showcase"
      })`,
      45,
      54
    );
    doc.text(`${event.date} • ${event.time}`, 45, 61);
    doc.text(event.venue, 45, 68);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(245, 158, 11);
    doc.text("Team Size:", 115, 54);
    doc.text("Time Limit:", 115, 61);
    if (event.prizePool) doc.text("Prize Pool:", 115, 68);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(240, 240, 240);
    doc.text(event.teamSize, 140, 54);
    doc.text(event.timeLimit, 140, 61);
    if (event.prizePool) doc.text(event.prizePool, 140, 68);

    let currentY = 83;

    // Overview
    if (event.rulebook?.overview) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(245, 158, 11);
      doc.text("EVENT OVERVIEW", 15, currentY);
      currentY += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(220, 220, 220);
      const splitOverview = doc.splitTextToSize(event.rulebook.overview, 180);
      doc.text(splitOverview, 15, currentY);
      currentY += splitOverview.length * 5 + 6;
    }

    // Rules & Regulations
    if (event.rulebook?.rules && event.rulebook.rules.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(245, 158, 11);
      doc.text("STAGE RULES & REGULATIONS", 15, currentY);
      currentY += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(220, 220, 220);
      event.rulebook.rules.forEach((rule, idx) => {
        const splitRule = doc.splitTextToSize(`${idx + 1}.  ${rule}`, 180);
        doc.text(splitRule, 15, currentY);
        currentY += splitRule.length * 4.8 + 2;
      });
      currentY += 4;
    }

    // Judging Criteria
    if (
      event.rulebook?.judgingCriteria &&
      event.rulebook.judgingCriteria.length > 0
    ) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(245, 158, 11);
      doc.text("JUDGING & EVALUATION CRITERIA", 15, currentY);
      currentY += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(220, 220, 220);
      event.rulebook.judgingCriteria.forEach((crit) => {
        const splitCrit = doc.splitTextToSize(`•  ${crit}`, 180);
        doc.text(splitCrit, 15, currentY);
        currentY += splitCrit.length * 4.8 + 2;
      });
      currentY += 4;
    }

    // Coordinators
    if (
      event.rulebook?.coordinators &&
      event.rulebook.coordinators.length > 0
    ) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(245, 158, 11);
      doc.text("EVENT COORDINATORS", 15, currentY);
      currentY += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(220, 220, 220);
      event.rulebook.coordinators.forEach((coord) => {
        doc.text(
          `${coord.name} (${coord.club}) — ${coord.phone}`,
          15,
          currentY
        );
        currentY += 5;
      });
    }

    // Footer bar
    doc.setDrawColor(245, 158, 11, 0.4);
    doc.line(15, 282, 195, 282);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text(
      "Milaap 2026 • Official Document • Jadavpur University Main Campus • www.milaapju.in",
      15,
      288
    );

    doc.save(`${event.id}-rulebook.pdf`);
  };

  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const prevSlide = () =>
    setCarouselIndex((i) =>
      i === 0 ? carouselItems.length - 1 : i - 1
    );
  const nextSlide = () =>
    setCarouselIndex((i) =>
      i === carouselItems.length - 1 ? 0 : i + 1
    );

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-28 pb-0 px-4 sm:px-6 overflow-x-hidden">
      {/* ================================================================
          PART 1: HERO SECTION
          ================================================================ */}

      {/* Internal SEO Navigation & Back to Events */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 relative z-10">
        <Link
          href="/"
          className="group flex items-center gap-2 text-xs uppercase tracking-wider text-amber-200 hover:text-amber-100 transition-colors bg-amber-500/10 hover:bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-400/35 active:scale-95 touch-manipulation transform-gpu"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Return to JUMC Official Home
        </Link>
        <Link
          href="/events"
          className="group flex items-center gap-2 text-xs uppercase tracking-wider text-amber-200/70 hover:text-amber-100 transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/20 active:scale-95 touch-manipulation transform-gpu"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          BACK TO EVENTS DIRECTORY
        </Link>
      </div>

      {/* Golden Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        style={{ willChange: "transform, opacity" }}
        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-amber-300/90 mb-4 relative z-10 transform-gpu"
      >
        <Sparkles size={14} className="text-yellow-400" />
        INAUGURAL FLAGSHIP EDITION • 2026
      </motion.div>

      {/* Screen-reader accessible SEO H1 */}
      <h1 className="sr-only">
        Milaap Edition I — Cultural Fest by JU Music Club (JUMC) &amp; JUDF
      </h1>

      {/* Main Title */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ willChange: "transform, opacity" }}
        className="MilaapFont text-7xl sm:text-8xl md:text-9xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_4px_32px_rgba(245,158,11,0.35)] mb-2 select-none transform-gpu relative z-10 px-4"
      >
        milaap
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        style={{ willChange: "transform, opacity" }}
        className="tracking-[0.45em] text-yellow-400 text-sm font-serif mb-3 relative z-10 transform-gpu"
      >
        EDITION I
      </motion.p>

      {/* FIX 1: Prominent Bold "JUMC" & "JUDF" in Hero Credit Line */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.25 }}
        style={{ willChange: "transform, opacity" }}
        className="text-amber-100/80 font-medium tracking-[0.28em] text-xs md:text-sm uppercase flex items-center justify-center gap-2.5 sm:gap-3 mb-8 flex-wrap relative z-10 px-4 transform-gpu"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 shadow-[0_0_8px_rgba(245,158,11,0.5)] shrink-0" />
        <span>ORGANISED BY</span>
        <span className="font-black text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] text-sm md:text-base">
          JUMC
        </span>
        <span className="text-amber-300/80 font-light">&amp;</span>
        <span className="font-black text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] text-sm md:text-base">
          JUDF
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 shadow-[0_0_8px_rgba(245,158,11,0.5)] shrink-0" />
      </motion.p>

      {/* Immediate CTA Buttons (Crucial Position) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.35 }}
        style={{ willChange: "transform, opacity" }}
        className="flex flex-col sm:flex-row items-center gap-3 mb-4 relative z-10 transform-gpu"
      >
        <Link
          href="/milaap/sign-in"
          className="group relative px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-red-900/40 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-[1.04] active:scale-95 touch-manipulation transition-all duration-300 flex items-center gap-2 transform-gpu"
        >
          <Music size={16} />
          REGISTER FOR MILAAP
          <ChevronRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
        <Link
          href="/milaap/sign-in"
          className="px-7 py-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-amber-400/30 text-amber-200 text-sm tracking-wide hover:bg-black/60 hover:border-amber-400/50 active:scale-95 touch-manipulation transition-all duration-300 flex items-center gap-2 transform-gpu cursor-pointer"
        >
          <Footprints size={16} />
          ALREADY REGISTERED?
          <ChevronRight size={14} />
        </Link>
      </motion.div>

      {/* Soulful One-Line Tagline Under Registration Buttons */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.45 }}
        style={{ willChange: "transform, opacity" }}
        className="mt-3 mb-16 px-4 text-center text-xs sm:text-sm md:text-base tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light bg-gradient-to-r from-amber-200/40 via-amber-300/90 to-amber-200/40 bg-clip-text text-transparent select-none max-w-3xl mx-auto relative z-10 transform-gpu"
      >
        Where Melody Meets Rhythm • Two Legacies, One Heartbeat
      </motion.p>

      {/* Live Organiser Announcements & Registration Status Banner */}
      <MilaapAnnouncements compact />

      {/* ================================================================
          PART 3: ABOUT SECTIONS (LIGHTWEIGHT BACKDROP-BLUR & TRANSFORM-GPU)
          ================================================================ */}

      <div className="w-full max-w-6xl mx-auto space-y-0">
        {/* ── 3A: About the University ── */}
        <GoldenDivider />
        <MorphTextReveal>
          <section className="bg-[#24060a]/80 backdrop-blur-md border border-amber-500/25 rounded-3xl p-8 md:p-12 shadow-2xl transform-gpu">
            <div className="text-center mb-8">
              <p className="text-amber-200/50 text-[10px] tracking-[0.35em] uppercase mb-3 font-serif">
                JADAVPUR UNIVERSITY • EST. 1955
              </p>
              <h2 className="MilaapFont text-4xl sm:text-5xl md:text-6xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                about the university
              </h2>
            </div>
            <p className="text-amber-100/80 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto mb-8 font-light">
              Jadavpur University was established in 1955, as an institution to
              propagate scientific, technical and literary thought in a newly
              independent India. Ranked 9th by NIRF across all Indian State
              Universities, it has been an Institute of Eminence for education
              across disciplines, including arts, science, and engineering.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                "Established 1955",
                "Ranked 9th by NIRF (State Universities)",
                "Institute of Eminence",
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-2 rounded-full text-xs tracking-wide text-amber-200 bg-amber-500/10 border border-amber-400/25"
                >
                  {badge}
                </span>
              ))}
            </div>
          </section>
        </MorphTextReveal>

        {/* ── 3B: About JUMC ── */}
        <GoldenDivider />
        <MorphTextReveal>
          <section className="bg-[#24060a]/80 backdrop-blur-md border border-amber-500/25 rounded-3xl p-8 md:p-12 shadow-2xl transform-gpu">
            <div className="text-center mb-8">
              <p className="text-amber-200/50 text-[10px] tracking-[0.35em] uppercase mb-3 font-serif">
                JADAVPUR UNIVERSITY MUSIC CLUB
              </p>
              <h2 className="MilaapFont text-4xl sm:text-5xl md:text-6xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                about jumc
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column: Exact Verbatim Paragraphs */}
              <div className="space-y-5 text-amber-100/75 text-sm md:text-base leading-relaxed font-light">
                <p>
                  The Jadavpur University Music Club (JUMC) has been celebrating
                  exceptional musical talent since it&apos;s inception. Founded by
                  the renowned singer-songwriter Kabir Suman, the Jadavpur
                  University music club continues empowering students to carry
                  forward its legacy and creative spirit.
                </p>
                <p>
                  Notable alumni the likes Anupam Ray and Madhubanti Bagchi,
                  musicians and scholars such as Pramantha Mohun Tagore,
                  Swarnendu Mondal, Saptak Hossain and Sayor Dabba Ghosh, can
                  all be traced back to our very own JUMC.
                </p>
                <p>
                  In recent years, JUMC has produced &apos;Iqraar&apos; the band,
                  representing Jadavpur University at the IIT Spring Fest, 2024
                  and rising as the winners. Additionally, representatives from
                  JUMC routinely participate in the AIU Youth Festival.
                </p>
                <p>
                  Rupam Banerjee and Ujaan Sengupta (western category), Swarnendu
                  Mondal (instrumental) and Sayan Gayen (Eastern Light Vocals)
                  have all achieved awards for the same in it&apos;s most recent
                  editions.
                </p>
              </div>
              {/* Right Column: SvgMorphFrame */}
              <SvgMorphFrame>
                <img
                  src="/jumc-group.svg"
                  alt="JUMC Team"
                  className="w-full h-auto rounded-xl object-contain"
                />
              </SvgMorphFrame>
            </div>
          </section>
        </MorphTextReveal>

        {/* ── 3C: About JUDF ── */}
        <GoldenDivider />
        <MorphTextReveal>
          <section className="bg-[#24060a]/80 backdrop-blur-md border border-amber-500/25 rounded-3xl p-8 md:p-12 shadow-2xl transform-gpu">
            <div className="text-center mb-8">
              <p className="text-amber-200/50 text-[10px] tracking-[0.35em] uppercase mb-3 font-serif">
                JADAVPUR UNIVERSITY DANCE WING
              </p>
              <h2 className="MilaapFont text-4xl sm:text-5xl md:text-6xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                about judf
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column: SvgMorphFrame (reversed) */}
              <SvgMorphFrame className="order-2 md:order-1">
                <img
                  src="/judf-group.svg"
                  alt="JUDF Team"
                  className="w-full h-auto rounded-xl object-contain"
                />
              </SvgMorphFrame>
              {/* Right Column: Exact Verbatim Paragraphs */}
              <div className="space-y-5 text-amber-100/75 text-sm md:text-base leading-relaxed font-light order-1 md:order-2">
                <p>
                  The Jadavpur University Dance Wing, conventionally known as
                  JUDF, has been working for the last eight years to bring
                  together students across the university and help them embrace
                  their talents. The founder, a passionate student of Jadavpur
                  University itself, started this wing with the idea of uniting
                  different forms of dance to one platform and uplifting those
                  that were lesser known.
                </p>
                <p>
                  JUDF trains students in hip-hop, afro, breaking and popping on
                  the western side, and in Odissi, Bharatanatyam, Kathak and
                  Manipuri on the eastern side. Even though dance is a recent
                  addition to the university&apos;s heritage, JUDF has performed at
                  inter- and intra-college events and has had the honour of
                  performing for NAAC and other distinguished guests.
                </p>
                <p>
                  JUDF&apos;s annual dance showcases have featured guest
                  performances by Laavanya Ghosh, Ranodip Poddar, Deven Khadka,
                  Drabin Chatterjee and Troupe, and The Unknown&apos;s Crew. JUDF&apos;s
                  own home teams took 1st position in both the Eastern/Folk
                  Group Dance and the Western/Contemporary Group Dance
                  categories.
                </p>
                <p>
                  More than a performing group, JUDF is a community, built on
                  the belief that everyone deserves a space to move, create,
                  learn and express themselves.
                </p>
              </div>
            </div>
          </section>
        </MorphTextReveal>

        {/* ================================================================
            PART 4: OUR REACH / IMPACT SECTION
            ================================================================ */}
        <GoldenDivider />
        <MorphTextReveal>
          <section className="bg-[#24060a]/80 backdrop-blur-md border border-amber-500/25 rounded-3xl p-8 md:p-12 shadow-2xl transform-gpu">
            <div className="text-center mb-10">
              <p className="text-amber-200/50 text-[10px] tracking-[0.35em] uppercase mb-3 font-serif">
                JUMC X JUDF • DIGITAL &amp; CAMPUS IMPACT
              </p>
              <h2 className="MilaapFont text-4xl sm:text-5xl md:text-6xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                our reach
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left: reach SVG */}
              <SvgMorphFrame>
                <img
                  src="/reach-group.svg"
                  alt="JUMC x JUDF Reach & Impact"
                  className="w-full h-auto rounded-xl object-contain"
                />
              </SvgMorphFrame>
              {/* Right: 4 Stat Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* 1. Footfall Card */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  style={{ willChange: "transform" }}
                  className="bg-[#1a0505]/60 backdrop-blur-md border border-amber-500/20 rounded-2xl p-5 text-center group hover:border-amber-400/40 transition-all duration-300 shadow-lg transform-gpu"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                    <Users size={22} />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-amber-100 mb-1">
                    <AnimatedCounter value={1500} suffix="+" />
                  </p>
                  <p className="text-amber-200/50 text-[10px] tracking-[0.2em] uppercase">
                    expected footfall
                  </p>
                </motion.div>

                {/* 2. Views Card */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  style={{ willChange: "transform" }}
                  className="bg-[#1a0505]/60 backdrop-blur-md border border-amber-500/20 rounded-2xl p-5 text-center group hover:border-amber-400/40 transition-all duration-300 shadow-lg transform-gpu"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                    <Eye size={22} />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-amber-100 mb-1">
                    <AnimatedCounter value={200000} suffix="+" />
                  </p>
                  <p className="text-amber-200/50 text-[10px] tracking-[0.2em] uppercase">
                    views across platforms
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="w-5 h-5 rounded-full bg-pink-500/10 border border-pink-400/30 flex items-center justify-center text-pink-300">
                      <InstagramIcon className="w-3 h-3" />
                    </span>
                    <span className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-300">
                      <FacebookIcon className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </motion.div>

                {/* 3. Instagram Card */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  style={{ willChange: "transform" }}
                  className="bg-[#1a0505]/60 backdrop-blur-md border border-amber-500/20 rounded-2xl p-5 text-center group hover:border-amber-400/40 transition-all duration-300 shadow-lg transform-gpu"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-pink-500/20 to-amber-500/10 border border-pink-400/30 flex items-center justify-center text-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-amber-100 mb-1">
                    <AnimatedCounter value={2500} suffix="+" />
                  </p>
                  <p className="text-amber-200/50 text-[10px] tracking-[0.2em] uppercase">
                    followers on Instagram
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono">
                    <a
                      href="https://www.instagram.com/ju_music_club/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300/90 hover:text-pink-200 hover:underline"
                    >
                      @ju_music_club
                    </a>
                    <span className="text-amber-400/40">•</span>
                    <a
                      href="https://www.instagram.com/ju_dance_wing/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300/90 hover:text-amber-200 hover:underline"
                    >
                      @ju_dance_wing
                    </a>
                  </div>
                </motion.div>

                {/* 4. Facebook Card */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  style={{ willChange: "transform" }}
                  className="bg-[#1a0505]/60 backdrop-blur-md border border-amber-500/20 rounded-2xl p-5 text-center group hover:border-amber-400/40 transition-all duration-300 shadow-lg transform-gpu"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500/20 to-amber-500/10 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <FacebookIcon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-amber-100 mb-1">
                    <AnimatedCounter value={9000} suffix="+" />
                  </p>
                  <p className="text-amber-200/50 text-[10px] tracking-[0.2em] uppercase">
                    followers on Facebook
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        </MorphTextReveal>

        {/* ================================================================
            PART 5: UNIFIED HELICAL LOOP SHOWCASE & RULEBOOKS
            ================================================================ */}
        <GoldenDivider />
        <MorphTextReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[11px] font-mono font-semibold uppercase tracking-[0.25em] shadow-[0_0_15px_rgba(245,158,11,0.15)] mb-3">
              <Sparkles size={13} className="text-yellow-400" />
              MILAAP 2026 • OFFICIAL EVENTS & RULEBOOKS
            </div>
            <h2 className="MilaapFont text-4xl sm:text-5xl md:text-6xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
              the cultural arena
            </h2>
            <p className="text-amber-100/75 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light mt-2">
              Explore our 6 championship competitions and headline cultural spectacles along the scroll-driven helical pathway. Access official rules, prize pools, and participate directly.
            </p>
          </div>
        </MorphTextReveal>

        {/* Responsive Helical Loop Timeline & Unified Event Showcase */}
        <div
          ref={timelineRef}
          className="relative w-full max-w-5xl mx-auto px-4 sm:px-8 h-[3200px] overflow-visible transform-gpu"
        >
          {/* Full-Height Absolute Calligraphic Helical Loop SVG */}
          <svg
            viewBox="0 0 1000 3200"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
            fill="none"
          >
            <defs>
              <linearGradient
                id="calligraphicGoldGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="25%" stopColor="#fde68a" />
                <stop offset="70%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>

            {/* Secondary Phase-Shifted Counter-Helix Background Strand */}
            <path
              d={helicalSplineSecondary}
              stroke="rgba(245, 158, 11, 0.12)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              vectorEffect="non-scaling-stroke"
              fill="none"
            />

            {/* Primary Background Guide Path */}
            <path
              d={helicalSplinePrimary}
              stroke="rgba(245, 158, 11, 0.18)"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
              fill="none"
            />

            {/* Scroll-Animated Foreground Path */}
            <path
              ref={svgPathRef}
              d={helicalSplinePrimary}
              stroke="url(#calligraphicGoldGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              fill="none"
              style={{
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength * (1 - scrollProgress),
                filter: "drop-shadow(0 0 16px rgba(251, 191, 36, 0.95))",
                transition: "stroke-dashoffset 0.04s linear",
              }}
            />

            {/* Travelling Glowing Orb / Comet Head along B(u) */}
            {headPoint && scrollProgress > 0.005 && (
              <g className="pointer-events-none">
                <circle
                  cx={headPoint.x}
                  cy={headPoint.y}
                  r="16"
                  fill="#fde047"
                  opacity="0.4"
                  filter="drop-shadow(0 0 12px #f59e0b)"
                />
                <circle
                  cx={headPoint.x}
                  cy={headPoint.y}
                  r="7.5"
                  fill="#fffbeb"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  filter="drop-shadow(0 0 14px #fbbf24)"
                />
              </g>
            )}
          </svg>

          {/* Unified Helical Event Cards (Desktop Alternating + Mobile Stacked) */}
          {unifiedMilaapEvents.map((event, idx) => (
            <HelicalEventRow
              key={event.id}
              event={event}
              milestone={helicalMilestones[idx]}
              totalHeight={helicalTimelineTotalHeight}
              scrollProgress={scrollProgress}
              isExpanded={expandedRulebookId === event.id}
              onToggleAccordion={toggleRulebook}
              onDownloadPdf={handleDownloadRulebookPdf}
            />
          ))}

          {/* Locked Terminal Glowing Light Point & milaap Emblem at (500, 3120) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-center pointer-events-none select-none z-20"
            style={{ top: `${(3120 / helicalTimelineTotalHeight) * 100}%` }}
          >
            {/* Terminal Light Point docked at (500, 3120) */}
            <span
              className={`-translate-y-1/2 block w-4 h-4 rounded-full transition-all duration-500 transform-gpu ${
                scrollProgress >= 0.96
                  ? "bg-amber-100 border-2 border-yellow-300 shadow-[0_0_30px_#fde047] scale-125"
                  : "bg-amber-900/60 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.4)] scale-100"
              }`}
            />

            {/* Terminal milaap Wordmark */}
            <span
              className={`font-samarkan text-4xl sm:text-5xl md:text-6xl tracking-wider bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent transition-all duration-500 ${
                scrollProgress >= 0.96
                  ? "opacity-100 drop-shadow-[0_0_28px_rgba(245,209,66,0.95)]"
                  : "opacity-40"
              }`}
            >
              milaap
            </span>
          </div>
        </div>

        {/* ================================================================
            PART 6: SPONSORSHIP SLABS & INTERACTIVE BENEFITS MATRIX
            ================================================================ */}
        <GoldenDivider />

        {/* 6A: 4 Sponsorship Slab Cards */}
        <MorphTextReveal>
          <div className="text-center mb-10">
            <h2 className="MilaapFont text-4xl sm:text-5xl md:text-6xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
              sponsorship slabs
            </h2>
          </div>
        </MorphTextReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {sponsorSlabs.map((slab, idx) => (
            <MorphTextReveal key={slab.tier} delay={idx * 0.08}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{ willChange: "transform" }}
                className={`relative bg-[#24060a]/80 backdrop-blur-md border rounded-3xl p-6 md:p-8 shadow-2xl h-full flex flex-col transition-all duration-300 transform-gpu ${
                  slab.isFeatured
                    ? "border-amber-400/50 shadow-[0_0_40px_rgba(245,158,11,0.2)]"
                    : "border-amber-500/25"
                }`}
              >
                {slab.isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-[10px] font-bold tracking-wider text-black shadow-lg">
                    <Crown size={12} />
                    FEATURED
                  </div>
                )}
                <h3 className="text-amber-200 text-xs tracking-[0.25em] uppercase font-medium mb-2 mt-2">
                  {slab.tier}
                </h3>
                <p className="MilaapFont text-3xl md:text-4xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent mb-4">
                  {slab.price}
                </p>
                <p className="text-amber-100/65 text-sm leading-relaxed flex-1 font-light">
                  {slab.desc}
                </p>
              </motion.div>
            </MorphTextReveal>
          ))}
        </div>

        {/* 6B: Interactive Tabbed Sponsorship Levels Matrix */}
        <MorphTextReveal>
          <section className="bg-[#24060a]/80 backdrop-blur-md border border-amber-500/25 rounded-3xl p-6 md:p-10 shadow-2xl mb-0 transform-gpu">
            <div className="text-center mb-8">
              <p className="text-amber-200/50 text-[10px] tracking-[0.35em] uppercase mb-3 font-serif">
                COMPARE PACKAGES
              </p>
              <h2 className="MilaapFont text-3xl sm:text-4xl md:text-5xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                sponsorship levels
              </h2>
            </div>

            {/* Tab Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {sponsorTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-xl text-xs tracking-wider uppercase font-medium transition-all duration-300 cursor-pointer active:scale-95 touch-manipulation ${
                    activeTab === tab.key
                      ? "bg-amber-500/20 text-amber-200 border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                      : "text-amber-200/50 border border-transparent hover:text-amber-200/80 hover:border-amber-500/20"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content with AnimatePresence - GPU Optimized */}
            <AnimatePresence mode="wait">
              {activeTab === "stall" ? (
                <motion.div
                  key="stall"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="transform-gpu"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* PR Benefits */}
                    <div className="bg-[#1a0505]/50 border border-amber-500/15 rounded-2xl p-6">
                      <h4 className="text-amber-300 text-xs tracking-[0.25em] uppercase font-medium mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        PR BENEFITS
                      </h4>
                      <ul className="space-y-3 text-amber-100/65 text-sm font-light">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          Mention on Event page
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          Posters/Banners/Standees/Flexes across JU campus
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          Opportunity to distribute brand pamphlets and cards to
                          incoming Customers
                        </li>
                      </ul>
                    </div>
                    {/* Web Benefits */}
                    <div className="bg-[#1a0505]/50 border border-amber-500/15 rounded-2xl p-6">
                      <h4 className="text-amber-300 text-xs tracking-[0.25em] uppercase font-medium mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        WEB BENEFITS
                      </h4>
                      <ul className="space-y-3 text-amber-100/65 text-sm font-light">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          Customized and social media posts across all platforms
                          announcing the brand as our Stall Partner
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          Hyperlinked logo on the JUMC website to redirecting to
                          all company handles
                        </li>
                      </ul>
                    </div>
                    {/* Venue Benefits */}
                    <div className="bg-[#1a0505]/50 border border-amber-500/15 rounded-2xl p-6">
                      <h4 className="text-amber-300 text-xs tracking-[0.25em] uppercase font-medium mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        VENUE BENEFITS
                      </h4>
                      <ul className="space-y-3 text-amber-100/65 text-sm font-light">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          Provision to put up stalls and sell company products
                          during the conference at a prime location on JU campus
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          Opportunity to decorate the stall with custom brand
                          posters and banners
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="transform-gpu"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-amber-500/20">
                          <th className="text-left text-amber-200/60 text-xs tracking-[0.2em] uppercase py-3 pr-4 font-medium">
                            Benefit
                          </th>
                          <th className="text-center text-amber-300 text-xs tracking-[0.2em] uppercase py-3 px-3 font-medium">
                            Title
                          </th>
                          <th className="text-center text-amber-300 text-xs tracking-[0.2em] uppercase py-3 px-3 font-medium">
                            Associate
                          </th>
                          <th className="text-center text-amber-300 text-xs tracking-[0.2em] uppercase py-3 px-3 font-medium">
                            Event
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(activeTab === "pr"
                          ? prBenefits
                          : activeTab === "web"
                          ? webBenefits
                          : venueBenefits
                        ).map((row, i) => (
                          <tr
                            key={i}
                            className="border-b border-amber-500/10 hover:bg-amber-500/5 transition-colors"
                          >
                            <td className="text-amber-100/70 py-4 pr-4 font-light">
                              {row.benefit}
                            </td>
                            <td className="text-center py-4 px-3">
                              <span
                                className={`text-lg ${
                                  row.title
                                    ? "text-green-400"
                                    : "text-amber-200/25"
                                }`}
                              >
                                {row.title ? "✔️" : "—"}
                              </span>
                            </td>
                            <td className="text-center py-4 px-3">
                              <span
                                className={`text-lg ${
                                  row.associate
                                    ? "text-green-400"
                                    : "text-amber-200/25"
                                }`}
                              >
                                {row.associate ? "✔️" : "—"}
                              </span>
                            </td>
                            <td className="text-center py-4 px-3">
                              <span
                                className={`text-lg ${
                                  row.event
                                    ? "text-green-400"
                                    : "text-amber-200/25"
                                }`}
                              >
                                {row.event ? "✔️" : "—"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </MorphTextReveal>

        {/* ================================================================
            PART 7: SRIJAN-STYLE "GLIMPSE OF MILAAP" 3D CAROUSEL & CORE TEAM
            ================================================================ */}
        <GoldenDivider />

        {/* 7A: Glimpse Carousel */}
        <MorphTextReveal>
          <section className="bg-[#24060a]/80 backdrop-blur-md border border-amber-500/25 rounded-3xl p-8 md:p-12 shadow-2xl mb-0 transform-gpu">
            <div className="text-center mb-8">
              <h2 className="MilaapFont text-4xl sm:text-5xl md:text-6xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent mb-3">
                glimpse of our legacy
              </h2>
              <p className="text-amber-200/50 text-[10px] tracking-[0.35em] uppercase font-serif">
                JUMC &amp; JUDF PERFORMANCE HIGHLIGHTS
              </p>
            </div>

            {/* 3D Coverflow / Stacked Card Slider */}
            <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
              <div className="relative h-[320px] md:h-[400px] perspective-[1200px] flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  {carouselItems.map((item, i) => {
                    const offset = i - carouselIndex;
                    const absOffset = Math.abs(offset);
                    if (absOffset > 2) return null;

                    return (
                      <motion.div
                        key={`${item.alt}-${i}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          x: offset * 180,
                          scale: 1 - absOffset * 0.15,
                          z: -absOffset * 120,
                          opacity: absOffset > 1 ? 0.3 : 1 - absOffset * 0.3,
                          rotateY: offset * -8,
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute w-[280px] md:w-[380px] h-[240px] md:h-[320px] rounded-2xl overflow-hidden border border-amber-400/20 shadow-xl bg-[#1a0505]/50 backdrop-blur-sm transform-gpu will-change-transform"
                        style={{ zIndex: 10 - absOffset }}
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-contain p-4"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                          <p className="text-amber-200/90 text-xs tracking-wide">
                            {item.alt}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="w-10 h-10 rounded-full bg-black/40 border border-amber-400/30 text-amber-200 flex items-center justify-center hover:bg-amber-500/20 hover:border-amber-400/50 active:scale-90 touch-manipulation transition-all cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-amber-200/60 text-xs tracking-wider bg-black/30 px-3 py-1 rounded-full border border-amber-500/15">
                  {carouselIndex + 1} / {carouselItems.length}
                </span>
                <button
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="w-10 h-10 rounded-full bg-black/40 border border-amber-400/30 text-amber-200 flex items-center justify-center hover:bg-amber-500/20 hover:border-amber-400/50 active:scale-90 touch-manipulation transition-all cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </section>
        </MorphTextReveal>

        {/* ================================================================
            PART 8: CONTACT US & GRAND RISING WATERMARK FOOTER
            ================================================================ */}
        <GoldenDivider />

        {/* 8A: Contact Us Section */}
        <MorphTextReveal>
          <section className="bg-[#24060a]/80 backdrop-blur-md border border-amber-500/25 rounded-3xl p-8 md:p-12 shadow-2xl mb-0 transform-gpu max-w-4xl mx-auto w-full">
            <div className="text-center mb-10">
              <h2 className="MilaapFont text-4xl sm:text-5xl md:text-6xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent mb-3">
                contact us
              </h2>
              <p className="text-amber-200/50 text-[10px] tracking-[0.35em] uppercase font-serif">
                REACH OUT TO OUR COORDINATORS
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {festivalCoordinators.map((c) => (
                <div
                  key={c.name}
                  className="bg-[#1a0505]/60 backdrop-blur-md border border-amber-500/20 hover:border-amber-400/40 rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 shadow-xl transform-gpu"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium bg-amber-500/10 border border-amber-400/25 text-amber-300">
                        {c.club} COORDINATOR
                      </span>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center">
                        <span className="text-amber-300 text-sm font-serif">
                          {c.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-amber-100 font-medium text-lg md:text-xl tracking-wide">
                      {c.name}
                    </h3>
                    <p className="text-amber-200/40 text-[11px] tracking-[0.15em] uppercase font-serif mt-0.5 mb-5">
                      {c.clubName}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-amber-500/15">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-400/25 flex items-center justify-center text-amber-300 group-hover:bg-amber-500/20 group-hover:border-amber-400/50 transition-colors shrink-0">
                          <Phone size={15} />
                        </div>
                        <a
                          href={`tel:${c.tel}`}
                          className="text-amber-200/90 hover:text-amber-300 font-medium text-sm md:text-base tracking-wider transition-colors touch-manipulation"
                        >
                          {c.phone}
                        </a>
                      </div>
                      <a
                        href={`tel:${c.tel}`}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-400/25 text-amber-300 hover:bg-amber-500/25 hover:border-amber-400/50 active:scale-95 text-xs font-medium tracking-wide transition-all touch-manipulation flex items-center gap-1.5"
                      >
                        <Phone size={12} />
                        CALL
                      </a>
                    </div>

                    <a
                      href={c.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-black/35 border border-pink-400/20 hover:border-pink-400/50 hover:bg-pink-500/10 text-xs text-amber-100/90 hover:text-pink-200 transition-all touch-manipulation"
                    >
                      <span className="flex items-center gap-2 font-medium">
                        <InstagramIcon className="w-4 h-4 text-pink-400" />
                        {c.club} Official Instagram ({c.instagramHandle})
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-pink-300">
                        Follow →
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Official Organisers Social Hub */}
            <div className="mt-6 pt-6 border-t border-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-[10px] uppercase tracking-[0.28em] text-amber-300/75 font-serif">
                  OFFICIAL SOCIAL CHANNELS
                </p>
                <p className="text-xs text-amber-100/65 mt-0.5">
                  Stay updated on lineups, reels &amp; live stage schedules from JUMC and JU Dance Wing.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://www.instagram.com/ju_music_club/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500/15 to-amber-500/10 border border-pink-400/35 hover:border-pink-300 text-xs font-medium text-amber-100 hover:text-white transition-all shadow-md"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-400" />
                  <span>JUMC (@ju_music_club)</span>
                </a>
                <a
                  href="https://www.instagram.com/ju_dance_wing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-rose-500/10 border border-amber-400/35 hover:border-amber-300 text-xs font-medium text-amber-100 hover:text-white transition-all shadow-md"
                >
                  <InstagramIcon className="w-4 h-4 text-amber-300" />
                  <span>JU Dance Wing (@ju_dance_wing)</span>
                </a>
              </div>
            </div>
          </section>
        </MorphTextReveal>


        <GoldenDivider />
      </div>

      {/* ================================================================
          8B: GRAND RISING WATERMARK FOOTER
          ================================================================ */}
      <footer className="w-full bg-[#0d0204]/80 backdrop-blur-xl border-t border-amber-500/15 mt-0">
        {/* Top Footer Grid (4 Columns) */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: JUMC x JUDF Identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/JUMC.png"
                alt="JUMC Logo"
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <p className="text-amber-100 font-semibold text-sm tracking-wide">
                  JUMC × JUDF
                </p>
                <p className="text-amber-200/40 text-[10px] tracking-wider uppercase font-serif">
                  MILAAP 2026
                </p>
              </div>
            </div>
            <p className="text-amber-100/50 text-sm leading-relaxed font-light">
              A convergence of melody, rhythm, and cultural heritage — the
              flagship artistic celebration of Jadavpur University.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-amber-300 text-xs tracking-[0.25em] uppercase font-medium mb-5 font-serif">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Return to JUMC Official Home", href: "/" },
                { label: "Events", href: "/events" },
                { label: "Milaap", href: "/milaap" },
                { label: "Register", href: "/milaap/sign-in" },
                { label: "Memories", href: "/memories" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-amber-100/50 text-sm hover:text-amber-200 transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight
                      size={12}
                      className="text-amber-400/40 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Located At */}
          <div>
            <h4 className="text-amber-300 text-xs tracking-[0.25em] uppercase font-medium mb-5 font-serif">
              LOCATED AT
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin
                size={16}
                className="text-amber-400/60 mt-0.5 shrink-0"
              />
              <p className="text-amber-100/50 text-sm leading-relaxed font-light">
                Jadavpur University Main Campus, 188, Raja S.C. Mallick Rd,
                Jadavpur, Kolkata - 700032, West Bengal, India.
              </p>
            </div>
          </div>

          {/* Col 4: Follow Us */}
          <div>
            <h4 className="text-amber-300 text-xs tracking-[0.25em] uppercase font-medium mb-5 font-serif">
              FOLLOW US
            </h4>
            <div className="space-y-2.5">
              <a
                href="https://www.instagram.com/ju_music_club/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JUMC Official Instagram (@ju_music_club)"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-black/35 border border-amber-500/20 text-amber-100/80 transition-all duration-300 hover:bg-pink-500/15 hover:border-pink-400/45 hover:text-pink-200 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] active:scale-95 touch-manipulation transform-gpu"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">JUMC Instagram</p>
                  <p className="text-[11px] font-mono text-amber-200/55 truncate">@ju_music_club</p>
                </div>
              </a>
              <a
                href="https://www.instagram.com/ju_dance_wing/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JU Dance Wing Instagram (@ju_dance_wing)"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-black/35 border border-amber-500/20 text-amber-100/80 transition-all duration-300 hover:bg-amber-500/15 hover:border-amber-400/45 hover:text-amber-200 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95 touch-manipulation transform-gpu"
              >
                <InstagramIcon className="w-4 h-4 text-amber-300 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">JU Dance Wing</p>
                  <p className="text-[11px] font-mono text-amber-200/55 truncate">@ju_dance_wing</p>
                </div>
              </a>
              <a
                href="mailto:jumusicclub@gmail.com"
                aria-label="Email JUMC"
                className="inline-flex items-center gap-2 text-xs text-amber-200/60 hover:text-amber-300 transition-colors pt-1"
              >
                <Mail size={14} className="shrink-0" />
                <span>jumusicclub@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom divider line */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-amber-200/30 text-xs tracking-wide">
            © 2026 JUMC × JUDF — Jadavpur University. All rights reserved.
          </p>
          <p className="text-amber-200/20 text-[10px] tracking-widest uppercase font-serif">
            MILAAP • Edition I
          </p>
        </div>

        {/* ── Massive Rising Watermark (Previous Subtle Style, Proportional Across Viewports) ── */}
        <div className="relative w-full text-center overflow-hidden">
          <motion.div
            initial={{ y: 24, opacity: 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ willChange: "transform, opacity" }}
            className="w-full text-center select-none pointer-events-none transform-gpu"
          >
            <span className="MilaapFont text-[26vw] leading-[0.75] tracking-tight bg-gradient-to-t from-amber-500/10 via-amber-300/40 to-yellow-200/80 bg-clip-text text-transparent inline-block">
              milaap
            </span>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}

/* ====================================================================
   SUB-COMPONENT: UNIFIED HELICAL SHOWCASE & RULEBOOK CARD ROW
   ==================================================================== */

function HelicalEventRow({
  event,
  milestone,
  totalHeight,
  scrollProgress,
  isExpanded,
  onToggleAccordion,
  onDownloadPdf,
}: {
  event: UnifiedMilaapItem;
  milestone: (typeof helicalMilestones)[0];
  totalHeight: number;
  scrollProgress: number;
  isExpanded: boolean;
  onToggleAccordion: (id: string) => void;
  onDownloadPdf: (event: UnifiedMilaapItem) => void;
}) {
  const isReached = scrollProgress >= milestone.threshold;
  const topPercent = (milestone.y / totalHeight) * 100;
  const isRightNode = milestone.cardSide === "right"; // Node at X=720 (72%), card on left

  return (
    <div
      className={`absolute left-0 right-0 -translate-y-1/2 flex items-center transition-all duration-500 pointer-events-auto ${
        isReached ? "opacity-100 scale-100" : "opacity-45 scale-95"
      }`}
      style={{ top: `${topPercent}%` }}
    >
      {isRightNode ? (
        // Right-Side Helical Coil: Card on Left -> Dotted Connector -> Loop Dot at X=720 (72%)
        <div className="w-full flex items-center justify-between">
          <div className="w-full md:w-[58%] lg:w-[54%] min-w-0">
            <div
              className={`relative rounded-2xl p-5 sm:p-6 backdrop-blur-md transition-all duration-300 ${
                event.isCompetition
                  ? "bg-[#1a0905]/90 hover:bg-[#200b06]/95 border border-amber-500/35 hover:border-amber-400/60 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
                  : "bg-gradient-to-br from-[#2b1008]/95 to-[#140603]/95 border-2 border-amber-400/70 shadow-[0_15px_40px_rgba(245,158,11,0.25)]"
              }`}
            >
              {/* Card Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {event.category}
                </span>
                {event.isCompetition && event.prizePool ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-400/40 shadow-[0_0_12px_rgba(234,179,8,0.25)]">
                    <Trophy size={12} className="text-yellow-400" />
                    PRIZE: {event.prizePool}
                  </span>
                ) : (
                  <>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-200 border border-yellow-400/50">
                      🌟 SPECIAL SHOWCASE • NON-COMPETITIVE
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30">
                      🎟️ OPEN TO ALL ATTENDEES
                    </span>
                  </>
                )}
              </div>

              {/* Samarkan Title */}
              <h3 className="font-samarkan text-2xl sm:text-3xl lg:text-4xl text-[#fde68a] drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] [text-shadow:0_0_20px_rgba(245,158,11,0.55)] tracking-wide leading-tight mt-2.5">
                {event.title.toLowerCase()}
              </h3>

              {/* Subtitle */}
              <p className="font-sans text-xs sm:text-sm text-amber-200/90 font-medium tracking-wide mt-1">
                {event.subtitle}
              </p>

              {/* Description */}
              <p className="font-sans text-xs text-amber-100/70 leading-relaxed mt-2 font-light line-clamp-2 sm:line-clamp-none">
                {event.description}
              </p>

              {/* Metadata Chips */}
              <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-amber-500/20 text-[11px] sm:text-xs text-amber-100/80">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-amber-400 shrink-0" />
                  <span className="truncate">{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-amber-400 shrink-0" />
                  <span className="truncate">{event.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-amber-400 shrink-0" />
                  <span className="truncate">{event.venue}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={13} className="text-amber-400 shrink-0" />
                  <span className="truncate">{event.teamSize}</span>
                </div>
              </div>

              {/* Interactive Embedded Rulebook Accordion */}
              {event.rulebook && (
                <div className="mt-3.5 pt-2 border-t border-amber-500/20">
                  <button
                    onClick={() => onToggleAccordion(event.id)}
                    className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/25 text-amber-200 text-xs font-mono font-medium flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen size={14} className="text-amber-400" />
                      <span>Rulebook & Judging Criteria</span>
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transform transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-yellow-300" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden mt-3 pt-3 border-t border-amber-500/15 space-y-3 text-xs"
                      >
                        {event.rulebook.overview && (
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1">
                              Overview
                            </p>
                            <p className="text-amber-100/80 leading-relaxed">
                              {event.rulebook.overview}
                            </p>
                          </div>
                        )}

                        {event.rulebook.rules &&
                          event.rulebook.rules.length > 0 && (
                            <div>
                              <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1.5">
                                Stage Rules
                              </p>
                              <ul className="space-y-1.5">
                                {event.rulebook.rules.map((rule, rIdx) => (
                                  <li
                                    key={rIdx}
                                    className="flex items-start gap-2 text-slate-200/90 leading-relaxed bg-black/30 p-2 rounded-lg border border-amber-500/10"
                                  >
                                    <span className="text-amber-400 font-mono font-bold text-[10px] mt-0.5 shrink-0">
                                      {rIdx + 1}.
                                    </span>
                                    <span>{rule}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {event.rulebook.judgingCriteria &&
                          event.rulebook.judgingCriteria.length > 0 && (
                            <div>
                              <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1.5">
                                Judging Criteria
                              </p>
                              <div className="space-y-1">
                                {event.rulebook.judgingCriteria.map(
                                  (crit, cIdx) => (
                                    <div
                                      key={cIdx}
                                      className="flex items-center gap-1.5 text-slate-300 bg-black/20 px-2.5 py-1.5 rounded-lg border border-white/5"
                                    >
                                      <Sparkles
                                        size={11}
                                        className="text-amber-400 shrink-0"
                                      />
                                      <span>{crit}</span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {event.rulebook.coordinators &&
                          event.rulebook.coordinators.length > 0 && (
                            <div>
                              <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1">
                                Coordinators
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {event.rulebook.coordinators.map(
                                  (coord, coIdx) => (
                                    <div
                                      key={coIdx}
                                      className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/40 border border-amber-500/20 text-[11px]"
                                    >
                                      <span className="text-white font-medium">
                                        {coord.name}
                                      </span>
                                      <a
                                        href={`tel:${coord.phone.replace(
                                          /\s/g,
                                          ""
                                        )}`}
                                        className="text-amber-300 hover:text-amber-200 font-mono flex items-center gap-1"
                                      >
                                        <Phone size={10} />
                                        {coord.phone}
                                      </a>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {/* Download Rulebook PDF Trigger */}
                        <button
                          onClick={() => onDownloadPdf(event)}
                          className="w-full mt-2 py-2 px-3 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 border border-amber-400/40 text-amber-200 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                        >
                          <Download size={13} className="text-yellow-400" />
                          <span>Download Official Rulebook PDF</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Primary Action Button */}
              {event.isCompetition ? (
                <Link
                  href={`/milaap/register?event=${event.id}`}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span>✨ Participate Now →</span>
                </Link>
              ) : (
                <Link
                  href="/milaap/register"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span>🎟️ View Fest Pass / Schedule →</span>
                </Link>
              )}
            </div>
          </div>

          {/* Dotted Connector Line (Desktop) */}
          <div className="hidden md:flex flex-1 border-b-2 border-dotted border-amber-300/70 mx-3 sm:mx-6 h-[1px]" />

          {/* Loop Node Dot at X=720 (72%) */}
          <div className="hidden md:flex items-center shrink-0">
            <span
              className={`w-4 h-4 rounded-full shrink-0 transition-all duration-500 transform-gpu ${
                isReached
                  ? "bg-amber-100 border-2 border-yellow-300 shadow-[0_0_20px_#fbbf24] scale-125"
                  : "bg-amber-900/60 border border-amber-400/40 shadow-[0_0_8px_rgba(245,158,11,0.3)] scale-90"
              }`}
            />
          </div>
        </div>
      ) : (
        // Left-Side Helical Coil: Loop Dot at X=280 (28%) -> Dotted Connector -> Card on Right
        <div className="w-full flex items-center justify-between">
          {/* Loop Node Dot at X=280 (28%) */}
          <div className="hidden md:flex items-center shrink-0">
            <span
              className={`w-4 h-4 rounded-full shrink-0 transition-all duration-500 transform-gpu ${
                isReached
                  ? "bg-amber-100 border-2 border-yellow-300 shadow-[0_0_20px_#fbbf24] scale-125"
                  : "bg-amber-900/60 border border-amber-400/40 shadow-[0_0_8px_rgba(245,158,11,0.3)] scale-90"
              }`}
            />
          </div>

          {/* Dotted Connector Line (Desktop) */}
          <div className="hidden md:flex flex-1 border-b-2 border-dotted border-amber-300/70 mx-3 sm:mx-6 h-[1px]" />

          <div className="w-full md:w-[58%] lg:w-[54%] min-w-0">
            <div
              className={`relative rounded-2xl p-5 sm:p-6 backdrop-blur-md transition-all duration-300 ${
                event.isCompetition
                  ? "bg-[#1a0905]/90 hover:bg-[#200b06]/95 border border-amber-500/35 hover:border-amber-400/60 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
                  : "bg-gradient-to-br from-[#2b1008]/95 to-[#140603]/95 border-2 border-amber-400/70 shadow-[0_15px_40px_rgba(245,158,11,0.25)]"
              }`}
            >
              {/* Card Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {event.category}
                </span>
                {event.isCompetition && event.prizePool ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-400/40 shadow-[0_0_12px_rgba(234,179,8,0.25)]">
                    <Trophy size={12} className="text-yellow-400" />
                    PRIZE: {event.prizePool}
                  </span>
                ) : (
                  <>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-200 border border-yellow-400/50">
                      🌟 SPECIAL SHOWCASE • NON-COMPETITIVE
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30">
                      🎟️ OPEN TO ALL ATTENDEES
                    </span>
                  </>
                )}
              </div>

              {/* Samarkan Title */}
              <h3 className="font-samarkan text-2xl sm:text-3xl lg:text-4xl text-[#fde68a] drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] [text-shadow:0_0_20px_rgba(245,158,11,0.55)] tracking-wide leading-tight mt-2.5">
                {event.title.toLowerCase()}
              </h3>

              {/* Subtitle */}
              <p className="font-sans text-xs sm:text-sm text-amber-200/90 font-medium tracking-wide mt-1">
                {event.subtitle}
              </p>

              {/* Description */}
              <p className="font-sans text-xs text-amber-100/70 leading-relaxed mt-2 font-light line-clamp-2 sm:line-clamp-none">
                {event.description}
              </p>

              {/* Metadata Chips */}
              <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-amber-500/20 text-[11px] sm:text-xs text-amber-100/80">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-amber-400 shrink-0" />
                  <span className="truncate">{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-amber-400 shrink-0" />
                  <span className="truncate">{event.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-amber-400 shrink-0" />
                  <span className="truncate">{event.venue}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={13} className="text-amber-400 shrink-0" />
                  <span className="truncate">{event.teamSize}</span>
                </div>
              </div>

              {/* Interactive Embedded Rulebook Accordion */}
              {event.rulebook && (
                <div className="mt-3.5 pt-2 border-t border-amber-500/20">
                  <button
                    onClick={() => onToggleAccordion(event.id)}
                    className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/25 text-amber-200 text-xs font-mono font-medium flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen size={14} className="text-amber-400" />
                      <span>Rulebook & Judging Criteria</span>
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transform transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-yellow-300" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden mt-3 pt-3 border-t border-amber-500/15 space-y-3 text-xs"
                      >
                        {event.rulebook.overview && (
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1">
                              Overview
                            </p>
                            <p className="text-amber-100/80 leading-relaxed">
                              {event.rulebook.overview}
                            </p>
                          </div>
                        )}

                        {event.rulebook.rules &&
                          event.rulebook.rules.length > 0 && (
                            <div>
                              <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1.5">
                                Stage Rules
                              </p>
                              <ul className="space-y-1.5">
                                {event.rulebook.rules.map((rule, rIdx) => (
                                  <li
                                    key={rIdx}
                                    className="flex items-start gap-2 text-slate-200/90 leading-relaxed bg-black/30 p-2 rounded-lg border border-amber-500/10"
                                  >
                                    <span className="text-amber-400 font-mono font-bold text-[10px] mt-0.5 shrink-0">
                                      {rIdx + 1}.
                                    </span>
                                    <span>{rule}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {event.rulebook.judgingCriteria &&
                          event.rulebook.judgingCriteria.length > 0 && (
                            <div>
                              <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1.5">
                                Judging Criteria
                              </p>
                              <div className="space-y-1">
                                {event.rulebook.judgingCriteria.map(
                                  (crit, cIdx) => (
                                    <div
                                      key={cIdx}
                                      className="flex items-center gap-1.5 text-slate-300 bg-black/20 px-2.5 py-1.5 rounded-lg border border-white/5"
                                    >
                                      <Sparkles
                                        size={11}
                                        className="text-amber-400 shrink-0"
                                      />
                                      <span>{crit}</span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {event.rulebook.coordinators &&
                          event.rulebook.coordinators.length > 0 && (
                            <div>
                              <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1">
                                Coordinators
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {event.rulebook.coordinators.map(
                                  (coord, coIdx) => (
                                    <div
                                      key={coIdx}
                                      className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/40 border border-amber-500/20 text-[11px]"
                                    >
                                      <span className="text-white font-medium">
                                        {coord.name}
                                      </span>
                                      <a
                                        href={`tel:${coord.phone.replace(
                                          /\s/g,
                                          ""
                                        )}`}
                                        className="text-amber-300 hover:text-amber-200 font-mono flex items-center gap-1"
                                      >
                                        <Phone size={10} />
                                        {coord.phone}
                                      </a>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {/* Download Rulebook PDF Trigger */}
                        <button
                          onClick={() => onDownloadPdf(event)}
                          className="w-full mt-2 py-2 px-3 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 border border-amber-400/40 text-amber-200 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                        >
                          <Download size={13} className="text-yellow-400" />
                          <span>Download Official Rulebook PDF</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Primary Action Button */}
              {event.isCompetition ? (
                <Link
                  href={`/milaap/register?event=${event.id}`}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span>✨ Participate Now →</span>
                </Link>
              ) : (
                <Link
                  href="/milaap/register"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span>🎟️ View Fest Pass / Schedule →</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
