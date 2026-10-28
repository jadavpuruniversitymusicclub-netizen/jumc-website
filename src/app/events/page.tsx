import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Events | JUMC & JUDW | Jadavpur University',
  description:
    'Discover Milaap ? Edition I, the flagship cultural fest organised by Jadavpur University Music Club (JUMC) and JU Dance Wing (JUDW). Register now.',
  keywords: [
    'JUMC events',
    'JUDW events',
    'Milaap Edition I',
    'Jadavpur University fest',
    'cultural fest Kolkata 2026',
    'JUMC JUDW flagship',
  ],
  openGraph: {
    title: 'Events | JUMC & JUDW',
    description:
      'Milaap ? Edition I. The flagship cultural fest by Jadavpur University Music Club & JU Dance Wing.',
    url: 'https://jumc.vercel.app/events',
    siteName: 'JUMC ? Jadavpur University Music Club',
    type: 'website',
  },
};

export default function EventsPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center py-28 px-4 selection:bg-amber-400/30 selection:text-white overflow-hidden">

      {/* ?? Ambient page glows ?? */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-amber-500/[0.07] blur-[180px]" />
        <div className="absolute bottom-0 right-[-5%] w-[500px] h-[500px] rounded-full bg-[#E60026]/[0.06] blur-[160px]" />
      </div>

      {/* ?? Section heading ?? */}
      <div className="text-center mb-14 space-y-3">
        <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-amber-400 border border-amber-400/30 rounded-full px-4 py-1.5">
          Upcoming Event
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-cinzel leading-tight">
          Events & Cultural Fests
        </h1>
        <p className="text-sm text-slate-400 font-light max-w-md mx-auto">
          Curated experiences by Jadavpur University Music Club &amp; Dance Wing
        </p>
      </div>

      {/* ?? THE FLAGSHIP MILAAP CARD ?? */}
      <MilaapCard />
    </main>
  );
}

/* ??????????????????????????????????????????? */
/*  Self-contained Milaap flagship event card  */
/* ??????????????????????????????????????????? */
function MilaapCard() {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/*
       * Card container:
       * - deep gradient bg
       * - glowing amber border
       * - strong shadow + backdrop blur
       */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-400/20 backdrop-blur-md
                      bg-gradient-to-br from-[#1a1025] via-[#100a18] to-[#1a1025]
                      shadow-[0_0_60px_rgba(245,158,11,0.12),0_20px_60px_rgba(0,0,0,0.7)]
                      flex flex-col">

        {/* Subtle inner glow at the top of the card */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-amber-500/[0.07] to-transparent pointer-events-none" />

        {/* ?? TOP BADGES ROW ?? */}
        <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-0">
          {/* Left: JUMC + JUDW */}
          <div className="flex items-center gap-1.5">
            {/* JUMC badge */}
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md
                             bg-rose-950/60 text-red-300 border border-red-500/30">
              JUMC
            </span>
            {/* JUDW badge */}
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md
                             bg-amber-950/60 text-amber-300 border border-amber-500/30">
              JUDW
            </span>
          </div>

          {/* Right: OPEN */}
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider
                           px-3 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            OPEN
          </span>
        </div>

        {/* ?? CENTRE BLOCK ?? */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-7 pb-5">

          {/* Tiny label */}
          <p className="text-[9px] font-mono font-extrabold uppercase tracking-[0.3em] text-amber-400 mb-3">
            Flagship Cultural Fest
          </p>

          {/* Golden divider with glow dots */}
          <div className="flex items-center gap-2 w-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B] shrink-0" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B] shrink-0" />
          </div>

          {/* Main title ? milaap */}
          <h2 className="font-cinzel font-black leading-none tracking-tight select-none
                         bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600
                         bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(3rem, 18vw, 5rem)' }}>
            milaap
          </h2>

          {/* Edition */}
          <p className="font-cinzel font-semibold tracking-[0.35em] text-amber-400/80 text-xs mt-1 mb-4 uppercase">
            Edition&nbsp;I
          </p>

          {/* Organiser credit */}
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#E60026]" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">
              Organised by&nbsp;<span className="text-white">JUMC</span>&nbsp;&amp;&nbsp;<span className="text-amber-300">JUDW</span>
            </p>
            <span className="w-1 h-1 rounded-full bg-amber-400" />
          </div>
        </div>

        {/* ?? DIVIDER ?? */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ?? EVENT DETAILS ?? */}
        <div className="relative z-10 flex flex-col gap-3 px-6 py-5">

          {/* Date row */}
          <div className="flex items-center gap-3">
            <CalendarIcon />
            <span className="text-sm text-slate-200 font-light">Nov 28 ? 30, 2026</span>
          </div>

          {/* Location row */}
          <div className="flex items-center gap-3">
            <LocationIcon />
            <span className="text-sm text-slate-200 font-light">Jadavpur University Main Campus</span>
          </div>
        </div>

        {/* ?? DIVIDER ?? */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ?? TAGS + CTA ROW ?? */}
        <div className="relative z-10 flex items-center justify-between px-5 py-4">

          {/* Tags */}
          <div className="flex gap-1.5">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider
                             px-2.5 py-1 rounded-full bg-rose-950/60 text-red-300 border border-red-800/40">
              FLAGSHIP
            </span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider
                             px-2.5 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/40">
              JUMC ? JUDW
            </span>
          </div>

          {/* CTA */}
          <Link
            href="/milaap"
            className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors group"
          >
            <span>Explore Portal</span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 text-base leading-none">?</span>
          </Link>
        </div>

      </div>

      {/* Card caption */}
      <p className="mt-4 text-center text-[11px] text-slate-500 font-light">
        More events announced soon &mdash; stay tuned on our social channels.
      </p>
    </div>
  );
}

/* Inline SVG icons ? avoids extra react-icons dep */
function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
         className="shrink-0">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="#E60026" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
         className="shrink-0">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
