"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
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
  Star,
  Trophy,
  Mic2,
  Guitar,
  Drum,
  PartyPopper,
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

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ====================================================================
   PART 2: 60FPS HARDWARE-ACCELERATED MOTION WRAPPERS
   ==================================================================== */

// 2.1 — MorphTextReveal: Pure opacity/y GPU transform with once: true
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={`transform-gpu will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

// 2.2 — SvgMorphFrame: Gentle 3D float + one-time scroll reveal
function SvgMorphFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.88,
        clipPath: "inset(15% 15% 15% 15% round 24px)",
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0% round 24px)",
      }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={`relative transform-gpu will-change-transform ${className}`}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotateZ: [0, 0.8, 0, -0.8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="border border-amber-400/30 bg-gradient-to-b from-amber-500/10 to-transparent p-3 rounded-2xl shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden transform-gpu will-change-transform"
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
   COMPETITION DATA
   ==================================================================== */

const competitions = [
  {
    title: "EASTERN LIGHT VOCALS & CLASSICAL",
    desc: "Solo Singing • Ragapradhan & Semi-Classical",
    icon: <Mic2 size={20} />,
  },
  {
    title: "WESTERN VOCALS & ACOUSTIC JAM",
    desc: "Solo & Duet • Pop, Rock, Soul & Unplugged",
    icon: <Music size={20} />,
  },
  {
    title: "INSTRUMENTAL SHOWDOWN",
    desc: "Eastern & Western Solo/Duet Instrumentals",
    icon: <Guitar size={20} />,
  },
  {
    title: "BATTLE OF BANDS",
    desc: "Flagship Band Showcase • Amplified Live Stage",
    icon: <Drum size={20} />,
  },
  {
    title: "INDAK: EASTERN & FOLK DANCE",
    desc: "Classical & Folk Group/Solo • Odissi, Kathak, Bharatanatyam, Manipuri",
    icon: <Footprints size={20} />,
  },
  {
    title: "WESTERN & STREET DANCE BATTLE",
    desc: "Hip-Hop, Afro, Breaking, Popping & Contemporary",
    icon: <Star size={20} />,
  },
  {
    title: "CHOREOGRAPHY & DUET SHOWCASE",
    desc: "Thematic Storytelling & Fusion Dance",
    icon: <Trophy size={20} />,
  },
  {
    title: "PRO-NIGHT & CULTURAL GALA",
    desc: "Headline Artist Performances & Felicitation",
    icon: <PartyPopper size={20} />,
  },
];

/* ====================================================================
   FIX 3 & 4: MATHEMATICALLY LOCKED NODE COORDINATES & WINDING SVG PATH
   ==================================================================== */

const nodePositions: {
  x: number;
  y: number;
  cardSide: "left" | "right";
  threshold: number;
}[] = [
  { x: 580, y: 200, cardSide: "left", threshold: 0.08 },
  { x: 420, y: 440, cardSide: "right", threshold: 0.19 },
  { x: 580, y: 680, cardSide: "left", threshold: 0.30 },
  { x: 420, y: 920, cardSide: "right", threshold: 0.42 },
  { x: 580, y: 1160, cardSide: "left", threshold: 0.53 },
  { x: 420, y: 1400, cardSide: "right", threshold: 0.65 },
  { x: 580, y: 1640, cardSide: "left", threshold: 0.76 },
  { x: 420, y: 1880, cardSide: "right", threshold: 0.88 },
];

const windingPath =
  "M 500 50 C 530 90, 620 140, 580 200 C 540 260, 380 380, 420 440 C 460 500, 620 620, 580 680 C 540 740, 380 860, 420 920 C 460 980, 620 1100, 580 1160 C 540 1220, 380 1340, 420 1400 C 460 1460, 620 1580, 580 1640 C 540 1700, 380 1820, 420 1880 C 450 1930, 530 1960, 510 2010 C 490 2055, 435 2040, 445 1995 C 452 1965, 468 2040, 468 2115";

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
  { src: "/judf-group.svg", alt: "INDAK Flagship Dance Festival" },
];

/* ====================================================================
   CONTACT DATA
   ==================================================================== */

const jumcContacts = [
  { name: "Rupam Banerjee", phone: "9830150097" },
  { name: "Danish Mollah", phone: "8777472449" },
  { name: "Rupkatha Chakravartty", phone: "9830911434" },
  { name: "Aditya Bhattacharyya", phone: "6290921928" },
];

const judfContacts = [
  { name: "Tanisha Das", phone: "88374 13287" },
  { name: "Sreeza Ghosh Dastidar", phone: "75968 29552" },
  { name: "Ashmita Chatterjee", phone: "6289992523" },
  { name: "Prajita Kundu", phone: "84201 98575" },
];

/* ====================================================================
   MAIN PAGE COMPONENT
   ==================================================================== */

export default function MilaapPage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // OPTIMIZATION 2: Exact Center Scroll Sync with tightened spring dynamics
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const smoothTimelineProgress = useSpring(timelineProgress, {
    stiffness: 280,
    damping: 38,
    mass: 0.15,
    restDelta: 0.001,
  });

  // Sponsorship tab state
  const [activeTab, setActiveTab] = useState<SponsorTabKey>("pr");

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
    <main className="relative min-h-screen flex flex-col items-center pt-28 pb-0 px-4 overflow-x-hidden">
      {/* ================================================================
          PART 1: HERO SECTION
          ================================================================ */}

      {/* Back to Events */}
      <Link
        href="/events"
        className="group flex items-center gap-2 text-xs uppercase tracking-wider text-amber-200/70 hover:text-amber-100 transition-colors mb-6 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/20 active:scale-95 touch-manipulation"
      >
        <ArrowLeft
          size={14}
          className="group-hover:-translate-x-1 transition-transform"
        />
        BACK TO EVENTS DIRECTORY
      </Link>

      {/* Golden Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-amber-300/90 mb-4 relative z-10"
      >
        <Sparkles size={14} className="text-yellow-400" />
        INAUGURAL FLAGSHIP EDITION • 2026
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="MilaapFont text-7xl sm:text-8xl md:text-9xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_4px_32px_rgba(245,158,11,0.35)] mb-2 select-none transform-gpu relative z-10 px-4"
      >
        milaap
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="tracking-[0.45em] text-yellow-400 text-sm font-serif mb-3 relative z-10"
      >
        EDITION I
      </motion.p>

      {/* FIX 1: Prominent Bold "JUMC" & "JUDF" in Hero Credit Line */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-amber-100/80 font-medium tracking-[0.28em] text-xs md:text-sm uppercase flex items-center justify-center gap-2.5 sm:gap-3 mb-8 flex-wrap relative z-10 px-4"
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
        transition={{ delay: 1.0, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center gap-3 mb-4 relative z-10"
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
        <button className="px-7 py-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-amber-400/30 text-amber-200 text-sm tracking-wide hover:bg-black/60 hover:border-amber-400/50 active:scale-95 touch-manipulation transition-all duration-300 flex items-center gap-2 transform-gpu cursor-pointer">
          <Footprints size={16} />
          ALREADY REGISTERED?
          <ChevronRight size={14} />
        </button>
      </motion.div>

      {/* Soulful One-Line Tagline Under Registration Buttons */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-3 mb-16 px-4 text-center text-xs sm:text-sm md:text-base tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light bg-gradient-to-r from-amber-200/40 via-amber-300/90 to-amber-200/40 bg-clip-text text-transparent select-none max-w-3xl mx-auto relative z-10"
      >
        Where Melody Meets Rhythm • Two Legacies, One Heartbeat
      </motion.p>

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
                  Its signature annual festival, INDAK, has featured guest
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
                </motion.div>

                {/* 4. Facebook Card */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
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
            PART 5: 60FPS ZERO RE-RENDER WINDING SVG TIMELINE (FIX 1-4)
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

        {/* Unified Coordinate Timeline Container (1000 x 2300 viewBox) */}
        <div
          ref={timelineRef}
          className="relative w-full max-w-5xl mx-auto h-[2100px] md:h-[2300px] py-10 transform-gpu"
        >
          {/* Central Responsive SVG Canvas */}
          <svg
            viewBox="0 0 1000 2300"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient
                id="goldGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>

            {/* Base Faint Path */}
            <path
              d={windingPath}
              stroke="rgba(245, 209, 66, 0.15)"
              strokeWidth="2.5"
              fill="none"
            />

            {/* Active Scroll-Drawn Glowing Path */}
            <motion.path
              d={windingPath}
              stroke="url(#goldGradient)"
              strokeWidth="4"
              fill="none"
              filter="drop-shadow(0 0 10px rgba(245,209,66,0.85))"
              style={{ pathLength: smoothTimelineProgress }}
            />

            {/* Nodes & Horizontal Connector Lines Driven Strictly via MotionValue */}
            {nodePositions.map((node, idx) => (
              <SvgTimelineNode
                key={idx}
                node={node}
                scrollProgress={smoothTimelineProgress}
              />
            ))}

            {/* Terminal Dot Just Above the 'i' of 'milaap' at (468, 2115) */}
            <SvgTerminalDot scrollProgress={smoothTimelineProgress} />
          </svg>

          {/* HTML Competition Cards with Direct MotionValue Transform */}
          {competitions.map((comp, idx) => {
            const node = nodePositions[idx];
            return (
              <CompetitionCard
                key={idx}
                comp={comp}
                node={node}
                idx={idx}
                scrollProgress={smoothTimelineProgress}
              />
            );
          })}

          {/* Glowing Finale Emblem at top: 93%, directly beneath the path termination dot */}
          <TimelineFinale scrollProgress={smoothTimelineProgress} />
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
            <div className="relative w-full max-w-3xl mx-auto">
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

        {/* 7B: Core Committee */}
        <GoldenDivider />
        <MorphTextReveal>
          <section className="w-full max-w-6xl mx-auto mb-0">
            <div className="text-center mb-10">
              <h2 className="MilaapFont text-4xl sm:text-5xl md:text-6xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent mb-3">
                core committee
              </h2>
              <p className="text-amber-200/50 text-[10px] tracking-[0.35em] uppercase font-serif">
                THE ORGANISING BODY
              </p>
            </div>

            {/* JUMC Section */}
            <p className="text-amber-300/60 text-[11px] tracking-[0.25em] uppercase mb-4 text-center font-serif">
              JADAVPUR UNIVERSITY MUSIC CLUB
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { name: "Rupam Banerjee", role: "President" },
                { name: "Danish Mollah", role: "Vice President" },
                { name: "Rupkatha Chakravartty", role: "Secretary" },
                { name: "Aditya Bhattacharyya", role: "Treasurer" },
              ].map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="relative bg-[#24060a]/80 backdrop-blur-md border border-amber-500/20 rounded-2xl p-5 shadow-xl group hover:border-amber-400/40 transition-all duration-300 transform-gpu"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center mb-3">
                      <span className="text-amber-300 text-lg font-serif">
                        {m.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-amber-100 font-medium text-sm tracking-wide mb-1">
                      {m.name}
                    </h3>
                    <p className="text-amber-400/80 text-xs tracking-[0.15em] uppercase font-medium">
                      {m.role}
                    </p>
                    <p className="text-amber-200/40 text-[10px] tracking-[0.2em] uppercase mt-1">
                      JUMC
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* JUDF Section */}
            <p className="text-amber-300/60 text-[11px] tracking-[0.25em] uppercase mb-4 text-center font-serif">
              JADAVPUR UNIVERSITY DANCE WING
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Tanisha Das", role: "President" },
                { name: "Sreeza Ghosh Dastidar", role: "Vice President" },
                { name: "Ashmita Chatterjee", role: "Secretary" },
                { name: "Prajita Kundu", role: "Treasurer" },
              ].map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="relative bg-[#24060a]/80 backdrop-blur-md border border-amber-500/20 rounded-2xl p-5 shadow-xl group hover:border-amber-400/40 transition-all duration-300 transform-gpu"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center mb-3">
                      <span className="text-amber-300 text-lg font-serif">
                        {m.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-amber-100 font-medium text-sm tracking-wide mb-1">
                      {m.name}
                    </h3>
                    <p className="text-amber-400/80 text-xs tracking-[0.15em] uppercase font-medium">
                      {m.role}
                    </p>
                    <p className="text-amber-200/40 text-[10px] tracking-[0.2em] uppercase mt-1">
                      JUDF
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </MorphTextReveal>

        {/* ================================================================
            PART 8: VERBATIM CONTACT US & GRAND RISING WATERMARK FOOTER
            ================================================================ */}
        <GoldenDivider />

        {/* 8A: Contact Us Section */}
        <MorphTextReveal>
          <section className="bg-[#24060a]/80 backdrop-blur-md border border-amber-500/25 rounded-3xl p-8 md:p-12 shadow-2xl mb-0 transform-gpu">
            <div className="text-center mb-10">
              <h2 className="MilaapFont text-4xl sm:text-5xl md:text-6xl bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent mb-3">
                contact us
              </h2>
              <p className="text-amber-200/50 text-[10px] tracking-[0.35em] uppercase font-serif">
                REACH OUT TO OUR COORDINATORS
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Column 1: JUMC Coordinators */}
              <div>
                <p className="text-amber-300/60 text-[11px] tracking-[0.25em] uppercase mb-5 text-center font-serif">
                  JUMC COORDINATORS
                </p>
                <div className="space-y-3">
                  {jumcContacts.map((c) => (
                    <div
                      key={c.name}
                      className="bg-[#1a0505]/50 border border-amber-500/15 rounded-2xl p-4 flex items-center justify-between group hover:border-amber-400/30 transition-all transform-gpu"
                    >
                      <div>
                        <p className="text-amber-100 text-sm font-medium">
                          {c.name}
                        </p>
                        <p className="text-amber-200/50 text-xs mt-0.5">
                          {c.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:+91${c.phone.replace(/\s/g, "")}`}
                          className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-400/25 flex items-center justify-center text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/40 active:scale-90 touch-manipulation transition-all"
                          title={`Call ${c.name}`}
                        >
                          <Phone size={14} />
                        </a>
                        <a
                          href={`https://wa.me/91${c.phone.replace(/\s/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-green-500/10 border border-green-400/25 flex items-center justify-center text-green-300 hover:bg-green-500/20 hover:border-green-400/40 active:scale-90 touch-manipulation transition-all"
                          title={`WhatsApp ${c.name}`}
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: JUDF Coordinators */}
              <div>
                <p className="text-amber-300/60 text-[11px] tracking-[0.25em] uppercase mb-5 text-center font-serif">
                  JUDF COORDINATORS
                </p>
                <div className="space-y-3">
                  {judfContacts.map((c) => (
                    <div
                      key={c.name}
                      className="bg-[#1a0505]/50 border border-amber-500/15 rounded-2xl p-4 flex items-center justify-between group hover:border-amber-400/30 transition-all transform-gpu"
                    >
                      <div>
                        <p className="text-amber-100 text-sm font-medium">
                          {c.name}
                        </p>
                        <p className="text-amber-200/50 text-xs mt-0.5">
                          {c.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:+91${c.phone.replace(/\s/g, "")}`}
                          className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-400/25 flex items-center justify-center text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/40 active:scale-90 touch-manipulation transition-all"
                          title={`Call ${c.name}`}
                        >
                          <Phone size={14} />
                        </a>
                        <a
                          href={`https://wa.me/91${c.phone.replace(/\s/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-green-500/10 border border-green-400/25 flex items-center justify-center text-green-300 hover:bg-green-500/20 hover:border-green-400/40 active:scale-90 touch-manipulation transition-all"
                          title={`WhatsApp ${c.name}`}
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
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
                { label: "Home", href: "/" },
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
            <div className="flex items-center gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-black/30 border border-amber-500/20 flex items-center justify-center text-amber-200/60 transition-all duration-300 hover:bg-pink-500/20 hover:border-pink-400/40 hover:text-pink-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] active:scale-90 touch-manipulation transform-gpu"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full bg-black/30 border border-amber-500/20 flex items-center justify-center text-amber-200/60 transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-400/40 hover:text-blue-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-90 touch-manipulation transform-gpu"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-11 h-11 rounded-full bg-black/30 border border-amber-500/20 flex items-center justify-center text-amber-200/60 transition-all duration-300 hover:bg-red-500/20 hover:border-red-400/40 hover:text-red-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-90 touch-manipulation transform-gpu"
              >
                <YouTubeIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:jumusicclub@gmail.com"
                aria-label="Email"
                className="w-11 h-11 rounded-full bg-black/30 border border-amber-500/20 flex items-center justify-center text-amber-200/60 transition-all duration-300 hover:bg-amber-500/20 hover:border-amber-400/40 hover:text-amber-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-90 touch-manipulation transform-gpu"
              >
                <Mail size={18} />
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

        {/* ── Massive Rising Watermark (once: true) ── */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="w-full text-center select-none pointer-events-none transform-gpu will-change-transform"
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
   SUB-COMPONENT: SvgTimelineNode (ZERO STATE / DRIVEN BY MOTIONVALUE)
   ==================================================================== */

function SvgTimelineNode({
  node,
  scrollProgress,
}: {
  node: (typeof nodePositions)[0];
  scrollProgress: MotionValue<number>;
}) {
  const connectorEndX = node.cardSide === "left" ? node.x - 70 : node.x + 70;
  const tStart = Math.max(0, node.threshold - 0.05);
  const tEnd = node.threshold;

  // Direct 60FPS GPU transforms without React re-renders
  const lineOpacity = useTransform(scrollProgress, [tStart, tEnd], [0.2, 1]);
  const circleScale = useTransform(scrollProgress, [tStart, tEnd], [0.85, 1.25]);
  const circleFill = useTransform(scrollProgress, [tStart, tEnd], ["#24060a", "#f59e0b"]);
  const circleStroke = useTransform(scrollProgress, [tStart, tEnd], ["rgba(245, 209, 66, 0.35)", "#fef08a"]);
  const haloOpacity = useTransform(scrollProgress, [tStart, tEnd, tEnd + 0.08], [0, 0.8, 0.4]);

  return (
    <g>
      {/* Horizontal Connector Line */}
      <motion.line
        x1={node.x}
        y1={node.y}
        x2={connectorEndX}
        y2={node.y}
        stroke="url(#goldGradient)"
        strokeWidth={2.5}
        style={{ opacity: lineOpacity }}
        filter="drop-shadow(0 0 6px rgba(245,209,66,0.7))"
      />
      {/* Connector tip dot */}
      <motion.circle
        cx={connectorEndX}
        cy={node.y}
        r={3}
        fill="#fbbf24"
        style={{ opacity: lineOpacity }}
      />
      {/* Outer pulsing halo */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={16}
        fill="rgba(245, 158, 11, 0.25)"
        filter="drop-shadow(0 0 12px rgba(245,158,11,0.8))"
        style={{ opacity: haloOpacity }}
      />
      {/* Node circle locked to curve */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={8}
        strokeWidth={2.5}
        filter="drop-shadow(0 0 10px rgba(245,209,66,0.9))"
        style={{
          scale: circleScale,
          fill: circleFill,
          stroke: circleStroke,
          transformOrigin: `${node.x}px ${node.y}px`,
        }}
      />
      {/* Center pinpoint */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={3}
        fill="#ffffff"
        style={{ opacity: lineOpacity }}
      />
    </g>
  );
}

/* ====================================================================
   SUB-COMPONENT: SvgTerminalDot (ZERO STATE / DRIVEN BY MOTIONVALUE)
   ==================================================================== */

function SvgTerminalDot({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const dotOpacity = useTransform(scrollProgress, [0.91, 0.95], [0.25, 1]);
  const dotScale = useTransform(scrollProgress, [0.91, 0.95], [0.8, 1.25]);

  return (
    <g>
      <motion.circle
        cx={468}
        cy={2115}
        r={14}
        fill="rgba(245, 158, 11, 0.3)"
        filter="drop-shadow(0 0 12px rgba(245,158,11,0.85))"
        style={{ opacity: dotOpacity }}
      />
      <motion.circle
        cx={468}
        cy={2115}
        r={5}
        fill="#fbbf24"
        stroke="#fef08a"
        strokeWidth={2}
        filter="drop-shadow(0 0 8px rgba(245,209,66,0.9))"
        style={{
          opacity: dotOpacity,
          scale: dotScale,
          transformOrigin: "468px 2115px",
        }}
      />
      <motion.circle
        cx={468}
        cy={2115}
        r={2}
        fill="#ffffff"
        style={{ opacity: dotOpacity }}
      />
    </g>
  );
}

/* ====================================================================
   SUB-COMPONENT: Competition Card (ZERO STATE / DRIVEN BY MOTIONVALUE)
   ==================================================================== */

function CompetitionCard({
  comp,
  node,
  idx,
  scrollProgress,
}: {
  comp: (typeof competitions)[0];
  node: (typeof nodePositions)[0];
  idx: number;
  scrollProgress: MotionValue<number>;
}) {
  const tStart = Math.max(0, node.threshold - 0.05);
  const tEnd = node.threshold;

  // Direct 60FPS GPU transforms - ZERO React re-renders on scroll
  const cardOpacity = useTransform(scrollProgress, [tStart, tEnd], [0.25, 1]);
  const cardScale = useTransform(scrollProgress, [tStart, tEnd], [0.92, 1]);

  const topPercent = (node.y / 2300) * 100;

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        top: `${topPercent}%`,
        transform: "translateY(-50%)",
        ...(node.cardSide === "left"
          ? { right: `calc(${100 - (node.x - 70) / 10}% + 8px)` }
          : { left: `calc(${(node.x + 70) / 10}% + 8px)` }),
      }}
    >
      <motion.div
        style={{
          opacity: cardOpacity,
          scale: cardScale,
        }}
        className="bg-[#24060a]/80 backdrop-blur-md border border-amber-500/25 rounded-2xl p-4 sm:p-5 shadow-2xl w-[210px] sm:w-[260px] md:w-[320px] transform-gpu will-change-transform"
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
            {comp.icon}
          </span>
          <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full border bg-amber-500/20 text-amber-300 border-amber-400/40">
            {String(idx + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-xs sm:text-sm font-semibold tracking-wide mb-1.5 text-amber-100">
          {comp.title}
        </h3>
        <p className="text-[10px] sm:text-xs leading-relaxed text-amber-200/70 font-light">
          {comp.desc}
        </p>
      </motion.div>
    </div>
  );
}

/* ====================================================================
   SUB-COMPONENT: Timeline Finale Emblem (ZERO STATE / DRIVEN BY MOTIONVALUE)
   ==================================================================== */

function TimelineFinale({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const finaleOpacity = useTransform(scrollProgress, [0.92, 0.96], [0.35, 1]);
  const finaleScale = useTransform(scrollProgress, [0.92, 0.96], [0.92, 1.15]);

  return (
    <div className="absolute top-[93%] left-1/2 -translate-x-1/2 pointer-events-none select-none text-center">
      <motion.div
        style={{
          opacity: finaleOpacity,
          scale: finaleScale,
        }}
        className="transform-gpu will-change-transform"
      >
        <span className="MilaapFont text-5xl md:text-6xl tracking-wider bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(245,209,66,0.95)]">
          milaap
        </span>
      </motion.div>
    </div>
  );
}
