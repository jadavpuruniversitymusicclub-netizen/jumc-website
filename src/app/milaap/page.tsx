import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import {
  Calendar,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  Music,
  CheckCircle2,
  ChevronRight,
  Mail,
  Flame,
  Star,
  HeartHandshake
} from 'lucide-react';
import MandalaBackground from '@/components/MandalaBackground';
import { BROCHURE_DATA } from '@/data/eventsData';

export async function generateMetadata(): Promise<Metadata> {
  const title = "Milaap Edition I - Flagship Cultural Fest by JUMC & JUDW";
  const description =
    "Milaap (Edition I) - The flagship music and dance festival organized by Jadavpur University Music Club (JUMC) and JU Dance Wing (JUDF).";

  return {
    title,
    description,
    keywords: [
      'Milaap',
      'Milaap Edition I',
      'Milaap 2026',
      'JUMC',
      'JUDW',
      'JUDF',
      'Jadavpur University',
      'Jadavpur University Music Club',
      'JU Dance Wing',
      'cultural fest Kolkata',
      'college fest Kolkata',
      'inter college cultural festival',
      'INDAK',
      'Eastern Light Vocals',
      'Western Vocals',
      'Dance Battles Kolkata'
    ],
    openGraph: {
      title,
      description,
      url: 'https://jumc.vercel.app/milaap',
      siteName: 'JUMC - Jadavpur University Music Club',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://jumc.vercel.app/jumc-logo.jpeg',
          width: 1200,
          height: 630,
          alt: 'Milaap Edition I - Flagship Cultural Fest by JUMC & JUDW'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://jumc.vercel.app/jumc-logo.jpeg']
    },
    alternates: {
      canonical: 'https://jumc.vercel.app/milaap'
    }
  };
}

export default function MilaapPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://jumc.vercel.app/#website',
        url: 'https://jumc.vercel.app/',
        name: 'Jadavpur University Music Club',
        description:
          'Official portal of Jadavpur University Music Club (JUMC) and JU Dance Wing (JUDF).',
        inLanguage: 'en-IN'
      },
      {
        '@type': 'Event',
        '@id': 'https://jumc.vercel.app/milaap#event',
        name: 'Milaap Edition I - Flagship Cultural Fest by JUMC & JUDW',
        description:
          'Milaap (Edition I) - The flagship music and dance festival organized by Jadavpur University Music Club (JUMC) and JU Dance Wing (JUDF).',
        startDate: '2026-11-28T09:00:00+05:30',
        endDate: '2026-11-30T22:00:00+05:30',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: 'Jadavpur University Main Campus',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '188, Raja S.C. Mallick Road',
            addressLocality: 'Kolkata',
            postalCode: '700032',
            addressRegion: 'West Bengal',
            addressCountry: 'IN'
          }
        },
        image: ['https://jumc.vercel.app/jumc-logo.jpeg'],
        organizer: [
          {
            '@type': 'Organization',
            name: 'Jadavpur University Music Club (JUMC)',
            url: 'https://jumc.vercel.app/'
          },
          {
            '@type': 'Organization',
            name: 'JU Dance Wing (JUDF)',
            url: 'https://jumc.vercel.app/'
          }
        ],
        offers: {
          '@type': 'Offer',
          url: 'https://jumc.vercel.app/milaap/sign-in',
          price: '0',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-10-01T00:00:00+05:30'
        }
      }
    ]
  };

  const { aboutJumc, aboutJudf, socialMediaImpact, sponsorshipSlabs } = BROCHURE_DATA;

  return (
    <>
      <Script
        id="milaap-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="relative min-h-screen text-slate-100 overflow-hidden MilaapFont">

        {/* ----------------- HERO SECTION ----------------- */}
        <section className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 text-center py-20 gap-6 sm:gap-8">
          {/* Central Rotating Sacred Geometry Mandala — centered perfectly behind hero content */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
            <MandalaBackground size={720} opacity={0.24} animated />
          </div>

          {/* Breadcrumb / Directory Link */}
          <div className="relative z-10 mx-auto">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white hover:border-amber-400/50 hover:bg-white/[0.08] transition-all"
            >
              &larr; Back to Events Directory
            </Link>
          </div>

          {/* Edition Pill Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md text-xs font-bold uppercase tracking-[0.25em] text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            INAUGURAL FLAGSHIP EDITION • 2026
          </div>

          {/* Custom "milaap" Title using Samarkan font with metallic gold gradient & "EDITION I" */}
          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
            <div className="relative inline-flex flex-col items-center text-center">
              {/* Ambient golden aura behind the word */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-400/20 to-amber-600/10 blur-2xl opacity-60 pointer-events-none" />

              {/* Main Title: "milaap" using Samarkan font for connected shirorekha */}
              <h1 className="relative z-10 leading-none tracking-tight bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent text-[20vw] md:text-[14vw] drop-shadow-lg select-none">
                milaap
              </h1>

              {/* Subtitle: "EDITION I" */}
              <div className="relative z-10 flex items-center justify-center gap-3 mt-3 sm:mt-4">
                <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
                <span className="font-bold text-yellow-400 tracking-[0.3em] text-sm sm:text-base md:text-xl uppercase drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]">
                  EDITION I
                </span>
                <span className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent via-amber-400/70 to-transparent" />
              </div>

              {/* Organisers Header */}
              <div className="relative z-10 mt-3 flex items-center justify-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-[#E60026] animate-pulse" />
                <p className="font-semibold uppercase text-slate-300 tracking-[0.2em] text-xs sm:text-sm drop-shadow-sm">
                  ORGANISED BY <span className="text-white font-bold">JUMC</span> & <span className="text-amber-400 font-bold">JUDW</span>
                </p>
                <span className="inline-block h-1 w-1 rounded-full bg-amber-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Action Buttons — placed directly below ORGANISED BY line */}
          <div className="relative z-10 my-6 py-2 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center">
            <Link
              href="/milaap/sign-in"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#E60026] via-[#ff2a4b] to-amber-500 text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_0_30px_rgba(230,0,38,0.45)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Register for Milaap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/milaap/sign-in?tab=signin"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.04] border border-white/20 hover:border-amber-400/70 hover:bg-white/[0.08] text-slate-200 font-bold text-sm tracking-wider uppercase backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Already registered?</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>

          {/* Tagline & Synopsis */}
          <p className="relative z-10 text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            The landmark cultural celebration uniting the{' '}
            <span className="text-white font-semibold">Jadavpur University Music Club (JUMC)</span> and{' '}
            <span className="text-amber-300 font-semibold">JU Dance Wing (JUDF)</span>. Three days of virtuosic music, electrifying dance battles, and timeless artistic legacy.
          </p>

          {/* Micro-Details Pill Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>November 28 – 30, 2026</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
              <MapPin className="w-4 h-4 text-[#E60026]" />
              <span>Jadavpur University Main Campus, Kolkata</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
              <Users className="w-4 h-4 text-sky-400" />
              <span>160,000+ Digital Reach • 15K+ Footfall</span>
            </div>
          </div>
        </section>

        {/* ----------------- BELOW-THE-FOLD SECTIONS ----------------- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 space-y-24">

          {/* 1. ABOUT JUMC & ABOUT JUDF */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* About JUMC */}
            <div className="relative rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-amber-500/40 transition-all duration-500 flex flex-col justify-between group overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />
              
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <Music className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold">
                      Legacy & Musical Heritage
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-cinzel">
                      {aboutJumc.title}
                    </h2>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  {aboutJumc.description}
                </p>

                {/* Founder Highlight */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-6">
                  <span className="text-xs font-mono uppercase text-amber-400 tracking-wider font-semibold block mb-1">
                    Roots & Foundation
                  </span>
                  <p className="text-sm text-slate-200 font-medium">
                    {aboutJumc.founder}
                  </p>
                </div>

                {/* Notable Alumni Badges */}
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold block mb-3">
                    Notable Alumni & Icons
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {aboutJumc.notableAlumni.map((alumnus) => (
                      <span
                        key={alumnus}
                        className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-slate-200 font-medium"
                      >
                        {alumnus}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>IIT Spring Fest 2024 Winners (Band Iqraar)</span>
                <span className="text-amber-400 font-semibold">AIU Youth Awardees</span>
              </div>
            </div>

            {/* About JUDF */}
            <div className="relative rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-[#E60026]/40 transition-all duration-500 flex flex-col justify-between group overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#E60026]/10 blur-3xl pointer-events-none group-hover:bg-[#E60026]/20 transition-all" />
              
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E60026]/10 border border-[#E60026]/30 flex items-center justify-center text-[#ff3355] shadow-[0_0_15px_rgba(230,0,38,0.2)]">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff4d6a] font-bold">
                      Movement & Mastery
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-cinzel">
                      {aboutJudf.title}
                    </h2>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  {aboutJudf.description}
                </p>

                {/* Dance Forms Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <span className="text-xs font-mono uppercase text-sky-400 tracking-wider font-semibold block mb-2">
                      Western Styles
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1 font-light">
                      {aboutJudf.westernForms.map((wf) => (
                        <li key={wf}>? {wf}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <span className="text-xs font-mono uppercase text-amber-400 tracking-wider font-semibold block mb-2">
                      Eastern & Classical
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1 font-light">
                      {aboutJudf.easternForms.map((ef) => (
                        <li key={ef}>? {ef}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Signature Fest INDAK */}
                <div className="p-4 rounded-xl bg-[#E60026]/5 border border-[#E60026]/20 mb-6">
                  <span className="text-xs font-mono uppercase text-[#ff4d6a] tracking-wider font-semibold block mb-1">
                    Signature Annual Fest
                  </span>
                  <p className="text-sm text-slate-200 font-medium">
                    {aboutJudf.signatureFest}: {aboutJudf.achievements}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>8+ Years of High-Energy Circuit Domination</span>
                <span className="text-[#ff4d6a] font-semibold">National 1st Positions</span>
              </div>
            </div>
          </section>

          {/* 2. SOCIAL MEDIA IMPACT SECTION */}
          <section className="relative rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block mb-2">
                Audience Engagement & Influence
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-cinzel mb-4">
                Social Media Impact
              </h2>
              <p className="text-slate-300 text-base sm:text-lg font-light">
                {socialMediaImpact.headline}
              </p>
            </div>

            {/* Stat Counters Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center hover:border-amber-400/40 transition-all">
                <div className="text-3xl sm:text-4xl font-black text-amber-300 font-cinzel mb-1">
                  160K+
                </div>
                <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Total Digital Views
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center hover:border-amber-400/40 transition-all">
                <div className="text-3xl sm:text-4xl font-black text-rose-400 font-cinzel mb-1">
                  15,000+
                </div>
                <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Campus Footfall
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center hover:border-amber-400/40 transition-all">
                <div className="text-3xl sm:text-4xl font-black text-sky-400 font-cinzel mb-1">
                  {socialMediaImpact.judw.views}
                </div>
                <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  JUDW Video Reach
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center hover:border-amber-400/40 transition-all">
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-cinzel mb-1">
                  {socialMediaImpact.jumc.views}
                </div>
                <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  JUMC Video Reach
                </div>
              </div>
            </div>

            {/* Detailed Club Platform Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* JUDW Breakdown */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <span className="font-bold text-white text-lg">JU Dance Wing (JUDF)</span>
                  <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                    120K+ Views
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-white">{socialMediaImpact.judw.subscribers}</div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono">YouTube Subs</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{socialMediaImpact.judw.facebook}</div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono">Facebook</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{socialMediaImpact.judw.instagram}</div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono">Instagram</div>
                  </div>
                </div>
              </div>

              {/* JUMC Breakdown */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <span className="font-bold text-white text-lg">Jadavpur University Music Club (JUMC)</span>
                  <span className="text-xs font-mono text-[#ff4d6a] bg-[#E60026]/10 px-2.5 py-1 rounded-full">
                    40K+ Views
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-white">{socialMediaImpact.jumc.subscribers}</div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono">YouTube Subs</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{socialMediaImpact.jumc.facebook}</div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono">Facebook</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{socialMediaImpact.jumc.instagram}</div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono">Instagram</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. SPONSORSHIP SLABS SECTION */}
          <section className="relative">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block mb-2">
                Partnership & Brand Presence
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-cinzel mb-4">
                Sponsorship Slabs
              </h2>
              <p className="text-slate-300 text-base sm:text-lg font-light">
                Elevate your brand before 15,000+ collegiate leaders and 160,000+ digital viewers at Eastern India's most prestigious cultural powerhouse.
              </p>
            </div>

            {/* Slabs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {sponsorshipSlabs.map((slab) => {
                const isTitle = slab.id === 'title';
                return (
                  <div
                    key={slab.id}
                    className={`relative rounded-3xl p-8 flex flex-col justify-between backdrop-blur-2xl transition-all duration-500 ${
                      isTitle
                        ? 'bg-gradient-to-b from-amber-500/15 via-white/[0.04] to-black/60 border-2 border-amber-400/60 shadow-[0_0_40px_rgba(245,158,11,0.25)] md:-translate-y-2'
                        : 'bg-white/[0.03] border border-white/10 hover:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                    }`}
                  >
                    {isTitle && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold text-[10px] uppercase tracking-widest shadow-md flex items-center gap-1.5">
                        <Star className="w-3 h-3 fill-black" />
                        FLAGSHIP PARTNER
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-xs font-mono uppercase text-amber-300 font-bold tracking-wider">
                          {slab.badge}
                        </span>
                        {isTitle && (
                          <span className="text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">
                            Exclusive
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-white font-cinzel mb-1">
                        {slab.name}
                      </h3>
                      <p className="text-xs text-slate-400 mb-6 font-light">
                        {slab.tagline}
                      </p>

                      <div className="text-3xl sm:text-4xl font-extrabold text-white font-cinzel mb-6 pb-6 border-b border-white/10">
                        {slab.amount}
                      </div>

                      {/* Perks */}
                      <ul className="space-y-3 mb-8">
                        {slab.perks.map((perk, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light leading-relaxed">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isTitle ? 'text-amber-400' : 'text-emerald-400'}`} />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="mailto:sponsorship@jumc.in?subject=Sponsorship%20Inquiry%20-%20Milaap%20Edition%20I"
                      className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                        isTitle
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:brightness-110 shadow-lg'
                          : 'bg-white/[0.05] border border-white/15 hover:bg-white/[0.1] text-white'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Inquire for {slab.name}</span>
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Corporate Brochure & Custom Partnership Bar */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-cinzel">
                    Custom Sponsorship & Stalls
                  </h4>
                  <p className="text-xs text-slate-400 font-light">
                    Need customized branding, sound equipment partnership, or food stall spaces? Reach out directly.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <a
                  href="mailto:sponsorship@jumc.in"
                  className="px-6 py-3 rounded-xl bg-white/[0.05] border border-white/15 hover:border-amber-400/50 hover:bg-white/[0.08] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>sponsorship@jumc.in</span>
                </a>
                <Link
                  href="/milaap/sign-in"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E60026] to-amber-500 text-white text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 shadow-md"
                >
                  <span>Participant Entry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
