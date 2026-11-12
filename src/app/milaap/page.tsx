"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import MilaapCompetitions from "@/components/MilaapCompetitions";
import MilaapAnnouncements from "@/components/MilaapAnnouncements";
import EventRulebookModal from "@/components/events/EventRulebookModal";
import { MILAAP_EVENTS, type MilaapEvent } from "@/data/milaapEvents";
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
   COMPETITION DATA & MATHEMATICAL C^1-CONTINUOUS SPLINE GEOMETRY
   ==================================================================== */

const competitions = [
  {
    id: "eastern-light-vocals",
    title: "Eastern Light Vocals & Classical",
    desc: "Solo Singing • Ragapradhan & Semi-Classical",
  },
  {
    id: "western-vocals",
    title: "Western Vocals & Acoustic Jam",
    desc: "Solo & Duet • Pop, Rock, Soul & Unplugged",
  },
  {
    id: "instrumental-showdown",
    title: "Instrumental Showdown",
    desc: "Eastern & Western Solo/Duet Instrumentals",
  },
  {
    id: "battle-of-bands",
    title: "Battle of the Bands",
    desc: "Flagship Band Showcase • Amplified Live Stage",
  },
  {
    id: "street-dance-battle",
    title: "Western & Street Dance Battle",
    desc: "Hip-Hop, Afro, Breaking, Popping & Contemporary",
  },
  {
    id: "choreography-showcase",
    title: "Choreography & Duet Showcase",
    desc: "Thematic Storytelling & Fusion Dance",
  },
];

/* Parametric C^1-Continuous Curvy Sinusoidal Spline + Terminal Sigma (Σ) Flourish
   Regime I:   Top Calligraphic Ribbon Flourish (Y in [25, 290])
   Regime II:  Harmonic S-Wave through the 6 events (Y in [290, 1640], X alternating 700 & 300)
   Regime III: Terminal Sigma (Σ) curve ending directly at the light point (500, 2260) */
const srijanSplinePath =
  "M 340 25 C 580 5, 760 35, 650 85 C 540 135, 290 120, 350 175 C 410 225, 580 210, 680 290 C 780 370, 760 450, 500 495 C 240 540, 220 500, 300 560 C 380 620, 220 710, 500 765 C 780 820, 780 770, 700 830 C 620 890, 780 980, 500 1035 C 220 1090, 220 1040, 300 1100 C 380 1160, 220 1250, 500 1305 C 780 1360, 780 1310, 700 1370 C 620 1430, 780 1520, 500 1575 C 220 1630, 220 1580, 300 1640 C 380 1710, 740 1730, 690 1820 C 640 1900, 350 1900, 360 1980 C 370 2060, 710 2050, 670 2130 C 635 2200, 500 2210, 500 2260";

const srijanMilestones = [
  { y: 290, cardSide: "right" as const, threshold: 0.191 }, // Event 0: Right peak at X=700 (70%)
  { y: 560, cardSide: "left" as const, threshold: 0.310 },  // Event 1: Left trough at X=300 (30%)
  { y: 830, cardSide: "right" as const, threshold: 0.420 }, // Event 2: Right peak at X=700 (70%)
  { y: 1100, cardSide: "left" as const, threshold: 0.530 }, // Event 3: Left trough at X=300 (30%)
  { y: 1370, cardSide: "right" as const, threshold: 0.641 }, // Event 4: Right peak at X=700 (70%)
  { y: 1640, cardSide: "left" as const, threshold: 0.751 }, // Event 5: Left trough at X=300 (30%)
];

const srijanTimelineTotalHeight = 2400;

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
    x: 340,
    y: 25,
  });
  const [pathLength, setPathLength] = useState(5733);

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

  // Selected Event Rulebook Modal state
  const [selectedRulebookEvent, setSelectedRulebookEvent] =
    useState<MilaapEvent | null>(null);

  const handleOpenRulebook = (comp: (typeof competitions)[0]) => {
    const matched =
      MILAAP_EVENTS.find((e) => e.id === comp.id) ||
      MILAAP_EVENTS.find((e) =>
        e.title.toLowerCase().includes(comp.title.toLowerCase().slice(0, 10))
      ) ||
      MILAAP_EVENTS[0];
    setSelectedRulebookEvent(matched);
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
            PART 5: SRIJAN-STYLE FLOATING TYPOGRAPHY & SERPENTINE S-CURVE TIMELINE
            ================================================================ */}
        <GoldenDivider />
        <MorphTextReveal>
          <div className="text-center mb-8">
            <p className="text-amber-200/50 text-[10px] tracking-[0.35em] uppercase mb-3 font-serif">
              THE CULTURAL ARENA
            </p>
            <h2 className="MilaapFont text-4xl sm:text-5xl md:text-6xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
              explore competitions at milaap
            </h2>
          </div>
        </MorphTextReveal>

        {/* Responsive Srijan-Style Floating Typography Timeline (Single Layout for Mobile & Desktop) */}
        <div
          ref={timelineRef}
          className="relative w-full max-w-4xl mx-auto px-4 sm:px-8 h-[2000px] sm:h-[2200px] md:h-[2400px] overflow-visible transform-gpu"
        >
          {/* Full-Height Absolute Calligraphic S-Curve SVG */}
          <svg
            viewBox="0 0 1000 2400"
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

            {/* Background Guide Path */}
            <path
              d={srijanSplinePath}
              stroke="rgba(245, 158, 11, 0.15)"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
              fill="none"
            />

            {/* Scroll-Animated Foreground Path (Deterministic Arc-Length Parameterization) */}
            <path
              ref={svgPathRef}
              d={srijanSplinePath}
              stroke="url(#calligraphicGoldGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              fill="none"
              style={{
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength * (1 - scrollProgress),
                filter: "drop-shadow(0 0 14px rgba(251, 191, 36, 0.95))",
                transition: "stroke-dashoffset 0.04s linear",
              }}
            />

            {/* Travelling Glowing Orb / Comet Head along B(u) */}
            {headPoint && scrollProgress > 0.005 && (
              <g className="pointer-events-none">
                {/* Outer Halo */}
                <circle
                  cx={headPoint.x}
                  cy={headPoint.y}
                  r="14"
                  fill="#fde047"
                  opacity="0.35"
                  filter="drop-shadow(0 0 10px #f59e0b)"
                />
                {/* Core Glowing Orb */}
                <circle
                  cx={headPoint.x}
                  cy={headPoint.y}
                  r="7"
                  fill="#fffbeb"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  filter="drop-shadow(0 0 12px #fbbf24)"
                />
              </g>
            )}
          </svg>

          {/* Floating Samarkan Typography Rows with Dotted Lines and Node Dots */}
          {competitions.map((comp, idx) => (
            <SrijanTimelineRow
              key={comp.id}
              comp={comp}
              milestone={srijanMilestones[idx]}
              totalHeight={srijanTimelineTotalHeight}
              scrollProgress={scrollProgress}
              onOpenRulebook={handleOpenRulebook}
            />
          ))}

          {/* Locked Terminal Glowing Light Point & milaap Emblem at (500, 2260) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-center pointer-events-none select-none z-20"
            style={{ top: `${(2260 / srijanTimelineTotalHeight) * 100}%` }}
          >
            {/* Terminal Light Point docked at (500, 2260) */}
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

        {/* ── Competitions at Milaap & Rulebooks Section ── */}
        <GoldenDivider />
        <MorphTextReveal>
          <MilaapCompetitions />
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

      {/* Milaap Event Rulebook Modal */}
      <EventRulebookModal
        event={selectedRulebookEvent}
        onClose={() => setSelectedRulebookEvent(null)}
      />
    </main>
  );
}

/* ====================================================================
   SUB-COMPONENT: SRIJAN-STYLE FLOATING TYPOGRAPHY TIMELINE ROW
   ==================================================================== */

function SrijanTimelineRow({
  comp,
  milestone,
  totalHeight,
  scrollProgress,
  onOpenRulebook,
}: {
  comp: (typeof competitions)[0];
  milestone: (typeof srijanMilestones)[0];
  totalHeight: number;
  scrollProgress: number;
  onOpenRulebook: (comp: (typeof competitions)[0]) => void;
}) {
  const isReached = scrollProgress >= milestone.threshold;
  const topPercent = (milestone.y / totalHeight) * 100;
  const isRightNode = milestone.cardSide === "right"; // Dot at X=700 (70%), text on left

  return (
    <div
      className={`absolute left-0 right-0 -translate-y-1/2 flex items-center transition-all duration-500 pointer-events-auto ${
        isReached ? "opacity-100 scale-[1.02]" : "opacity-75 scale-100"
      }`}
      style={{ top: `${topPercent}%` }}
    >
      {isRightNode ? (
        // Right-Side Node Row (Left Text -> Dotted Line -> Right Node Dot at X=700 / 70%)
        <>
          <div className="w-[70%] flex items-center min-w-0">
            <button
              onClick={() => onOpenRulebook(comp)}
              className="group text-left cursor-pointer transition-transform duration-300 hover:scale-[1.03] focus:outline-none shrink-0 max-w-[68%] sm:max-w-none"
            >
              <h3 className="font-samarkan text-2xl sm:text-4xl md:text-5xl text-[#fde68a] drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] [text-shadow:0_0_20px_rgba(245,158,11,0.55)] tracking-wide leading-tight transition-all duration-500 group-hover:text-yellow-200">
                {comp.title.toLowerCase()}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-amber-100/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] font-normal tracking-wider mt-1">
                {comp.desc}
              </p>
            </button>
            <div className="flex-1 border-b-2 border-dotted border-amber-300/70 mx-3 sm:mx-6 h-[1px]" />
            <span
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shrink-0 transition-all duration-500 transform-gpu ${
                isReached
                  ? "bg-amber-100 border-2 border-yellow-300 shadow-[0_0_20px_#fbbf24] scale-125"
                  : "bg-amber-900/60 border border-amber-400/40 shadow-[0_0_8px_rgba(245,158,11,0.3)] scale-90"
              }`}
            />
          </div>
          <div className="w-[30%]" />
        </>
      ) : (
        // Left-Side Node Row (Left Node Dot at X=300 / 30% -> Dotted Line -> Right Text)
        <>
          <div className="w-[30%] flex items-center justify-end min-w-0">
            <span
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shrink-0 transition-all duration-500 transform-gpu ${
                isReached
                  ? "bg-amber-100 border-2 border-yellow-300 shadow-[0_0_20px_#fbbf24] scale-125"
                  : "bg-amber-900/60 border border-amber-400/40 shadow-[0_0_8px_rgba(245,158,11,0.3)] scale-90"
              }`}
            />
          </div>
          <div className="w-[70%] flex items-center min-w-0">
            <div className="flex-1 border-b-2 border-dotted border-amber-300/70 mx-3 sm:mx-6 h-[1px]" />
            <button
              onClick={() => onOpenRulebook(comp)}
              className="group text-right cursor-pointer transition-transform duration-300 hover:scale-[1.03] focus:outline-none shrink-0 max-w-[68%] sm:max-w-none"
            >
              <h3 className="font-samarkan text-2xl sm:text-4xl md:text-5xl text-[#fde68a] drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] [text-shadow:0_0_20px_rgba(245,158,11,0.55)] tracking-wide leading-tight transition-all duration-500 group-hover:text-yellow-200">
                {comp.title.toLowerCase()}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-amber-100/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] font-normal tracking-wider mt-1">
                {comp.desc}
              </p>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
