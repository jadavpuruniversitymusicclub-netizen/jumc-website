"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Users,
  Download,
  Share2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Phone,
  Mail,
  ShieldCheck,
  Eye,
  Award,
  Globe,
  Radio,
  FileText,
  X,
  Music,
  ChevronRight
} from 'lucide-react';
import MilaapBrand from '@/components/MilaapBrand';
import { formatMilaapText } from '@/components/MilaapText';
import MandalaBackground from '@/components/MandalaBackground';
import { BROCHURE_DATA, EVENTS_DATA } from '@/data/eventsData';

export default function MilaapDetailView() {
  const [activeBenefitTab, setActiveBenefitTab] = useState<'pr' | 'web' | 'venue'>('pr');
  const [selectedSlab, setSelectedSlab] = useState<string>('title');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySlabName, setInquirySlabName] = useState('Title Sponsor (₹1,20,000)');

  // Form states
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    eventCategory: 'Eastern Light Vocals & Classical',
  });
  const [regSubmitted, setRegSubmitted] = useState(false);

  const [inquiryForm, setInquiryForm] = useState({
    company: '',
    contactPerson: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSubmitted(true);
    setTimeout(() => {
      setRegSubmitted(false);
      setRegisterModalOpen(false);
    }, 2400);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryModalOpen(false);
    }, 2400);
  };

  const subEvents = EVENTS_DATA.filter((e) => e.slug !== 'milaap');

  return (
    <div className="relative overflow-hidden text-slate-100">
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-center">
        {/* Dynamic Royal Blue & Wine Background Gradients */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-rose-950/40 via-amber-900/20 to-blue-950/50 blur-[150px]" />
          <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-900/20 blur-[140px]" />
          <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#E60026]/15 blur-[150px]" />
        </div>

        {/* Central Rotating Sacred Geometry Mandala */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
          <MandalaBackground size={720} opacity={0.28} animated />
        </div>

        {/* Breadcrumb / Back Link */}
        <div className="relative z-10 mb-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-widest text-slate-300 hover:text-white hover:border-amber-400/50 transition-all"
          >
            &larr; Back to Events Directory
          </Link>
        </div>

        {/* Edition Pill */}
        <div className="relative z-10 inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-300 mb-8 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          INAUGURAL FLAGSHIP EDITION • 2026
        </div>

        {/* Exact Typography & Branding for "milaap" (Part 1) */}
        <div className="relative z-10 max-w-5xl mx-auto mb-10">
          <MilaapBrand size="hero" showSubtitle={true} centered={true} animate={true} />
        </div>

        {/* Tagline & Synopsis */}
        <p className="relative z-10 text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-10">
          The landmark cultural celebration uniting the <span className="text-white font-semibold">Jadavpur University Music Club</span> and{' '}
          <span className="text-amber-300 font-semibold">JU Dance Wing</span>. Three days of virtuosic music, electrifying dance battles, and timeless artistic legacy.
        </p>

        {/* Micro-Details Pill Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-medium text-slate-300 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>November 28 – 30, 2026</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
            <MapPin className="w-4 h-4 text-[#E60026]" />
            <span>Jadavpur University Main Campus, Kolkata</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
            <Users className="w-4 h-4 text-sky-400" />
            <span>160,000+ Digital Reach • 15K+ Footfall</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center">
          <button
            onClick={() => setRegisterModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#E60026] via-[#ff2a4b] to-amber-500 text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_0_25px_rgba(230,0,38,0.4)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setBrochureModalOpen(true)}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-black/40 border border-amber-400/40 hover:border-amber-400 text-amber-200 font-bold text-sm tracking-wider uppercase backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.15)]"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>View Brochure & Slabs</span>
          </button>
        </div>
      </section>

      {/* ----------------- PART 2: LEGACY & ABOUT GRID ----------------- */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-amber-400 block mb-2">
            FOUNDATIONAL HERITAGE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Our Legacy & Roots
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-3">
            Grounded in academic eminence, legendary musical pioneerism, and championship dance tradition.
          </p>
        </div>

        {/* 3 Glassmorphic Cards with Exact Brochure Text */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: About Jadavpur University */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:bg-white/[0.07] hover:border-amber-400/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-amber-500/15 border border-amber-500/30 text-amber-300">
                  ESTD. 1955 • NIRF #9
                </span>
                <Globe className="w-5 h-5 text-amber-400" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                About Jadavpur University
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {BROCHURE_DATA.aboutJu.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-amber-300/80">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Institute of Eminence</span>
            </div>
          </div>

          {/* Card 2: About JUMC */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:bg-white/[0.07] hover:border-[#E60026]/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E60026]/10 rounded-full blur-2xl group-hover:bg-[#E60026]/20 transition-colors pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-[#E60026]/20 border border-[#E60026]/40 text-[#ff758f]">
                  FOUNDED BY KABIR SUMAN
                </span>
                <Music className="w-5 h-5 text-[#E60026]" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                About JUMC
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {BROCHURE_DATA.aboutJumc.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-slate-300">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>IIT Spring Fest &amp; AIU Champions</span>
            </div>
          </div>

          {/* Card 3: About JUDF (JU Dance Wing) */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:bg-white/[0.07] hover:border-blue-400/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-blue-500/20 border border-blue-500/40 text-blue-300">
                  8+ YEARS • INDAK
                </span>
                <Radio className="w-5 h-5 text-blue-400" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                About JUDF (JU Dance Wing)
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {BROCHURE_DATA.aboutJudf.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-blue-300">
              <Award className="w-4 h-4 text-blue-400" />
              <span>1st in Eastern &amp; Western Dance</span>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- PART 3: SOCIAL MEDIA IMPACT & REACH BANNER ----------------- */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#E60026]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Highlight Headline */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.35em] text-amber-400 block mb-2">
              AUDIENCE ANALYTICS &amp; FOOTPRINT
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
              {BROCHURE_DATA.socialMediaImpact.headline}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Unmatched student engagement across Eastern India, creating organic virality and tangible brand affinity.
            </p>
          </div>

          {/* Stat Counters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* JUDW Reach Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h4 className="text-lg font-bold text-white">JUDW (JU Dance Wing)</h4>
                  <span className="text-xs text-amber-400 font-mono">Dance Collective Reach</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  120K+ Views
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-2xl sm:text-3xl font-black text-amber-300 block">
                    {BROCHURE_DATA.socialMediaImpact.judw.views}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Video Views
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-2xl sm:text-3xl font-black text-white block">
                    {BROCHURE_DATA.socialMediaImpact.judw.instagram}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Instagram
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-2xl sm:text-3xl font-black text-white block">
                    {BROCHURE_DATA.socialMediaImpact.judw.facebook}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Facebook
                  </span>
                </div>
              </div>
            </div>

            {/* JUMC Reach Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h4 className="text-lg font-bold text-white">JUMC (JU Music Club)</h4>
                  <span className="text-xs text-[#ff4d6d] font-mono">Music Syndicate Reach</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#E60026]/20 text-[#ff4d6d] border border-[#E60026]/40">
                  40K+ Views
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-2xl sm:text-3xl font-black text-[#ff758f] block">
                    {BROCHURE_DATA.socialMediaImpact.jumc.views}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Video Views
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-2xl sm:text-3xl font-black text-white block">
                    {BROCHURE_DATA.socialMediaImpact.jumc.instagram}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Instagram
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-2xl sm:text-3xl font-black text-white block">
                    {BROCHURE_DATA.socialMediaImpact.jumc.facebook}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Facebook
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Aggregate Badge */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>15,000+ Verified Campus Footfall over 3 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Over 65+ Premier Colleges and Universities Invited</span>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- PART 4: SPONSORSHIP SLABS & BENEFITS SECTION ----------------- */}
      <section id="sponsorship" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#E60026] block mb-2">
            CORPORATE PARTNERSHIP • <span className="font-samarkan MilaapFont text-sm text-amber-400 normal-case tracking-normal">milaap</span> &apos;26
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Sponsorship Slabs &amp; Deliverables
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-3">
            Choose an official partnership tier to project your brand directly to Eastern India&apos;s brightest youth demographic.
          </p>
        </div>

        {/* 4 Sponsorship Slab Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {BROCHURE_DATA.sponsorshipSlabs.map((slab) => {
            const isSelected = selectedSlab === slab.id;
            const isTitle = slab.id === 'title';

            return (
              <div
                key={slab.id}
                onClick={() => setSelectedSlab(slab.id)}
                className={`group relative p-6 rounded-3xl transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  isTitle
                    ? 'bg-gradient-to-b from-amber-500/10 via-white/[0.04] to-black/40 border-2 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
                    : isSelected
                    ? 'bg-white/[0.08] border-2 border-amber-400 shadow-xl'
                    : 'bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:bg-white/[0.07] hover:border-white/20'
                }`}
              >
                {/* Popular / Exclusive Banner */}
                {slab.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase shadow-md ${
                        isTitle
                          ? 'bg-amber-400 text-black font-extrabold'
                          : 'bg-black/60 text-amber-300 border border-amber-400/30'
                      }`}
                    >
                      {slab.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Slab Title & Price */}
                  <div className="pt-2 mb-4">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                      {slab.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-400 block mb-3">
                      {slab.tagline}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-amber-300">
                        {slab.amount}
                      </span>
                    </div>
                  </div>

                  {/* Perks Checklist */}
                  <ul className="space-y-2.5 pt-4 border-t border-white/10 mb-6">
                    {slab.perks.map((perk, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{formatMilaapText(perk, 'text-amber-300 font-semibold')}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inquiry Action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setInquirySlabName(`${slab.name} (${slab.amount})`);
                    setInquiryModalOpen(true);
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isTitle
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                      : 'bg-white/5 hover:bg-white/10 border border-white/15 text-white'
                  }`}
                >
                  Inquire for Slab
                </button>
              </div>
            );
          })}
        </div>

        {/* Benefits Breakdown Tabs (PR Benefits, Web Benefits, Venue Benefits) */}
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                COMPREHENSIVE RETURN ON INVESTMENT
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Deliverables &amp; Co-Branding Scope
              </h3>
            </div>

            {/* Interactive Tab Selectors */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-black/50 border border-white/10">
              <button
                onClick={() => setActiveBenefitTab('pr')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeBenefitTab === 'pr'
                    ? 'bg-[#E60026] text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                PR Benefits
              </button>

              <button
                onClick={() => setActiveBenefitTab('web')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeBenefitTab === 'web'
                    ? 'bg-[#E60026] text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Web Benefits
              </button>

              <button
                onClick={() => setActiveBenefitTab('venue')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeBenefitTab === 'venue'
                    ? 'bg-[#E60026] text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Venue Benefits
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                {activeBenefitTab === 'pr' && <Eye className="w-5 h-5 text-amber-400" />}
                {activeBenefitTab === 'web' && <Globe className="w-5 h-5 text-sky-400" />}
                {activeBenefitTab === 'venue' && <MapPin className="w-5 h-5 text-[#E60026]" />}
                {BROCHURE_DATA.benefitsBreakdown[activeBenefitTab].title}
              </h4>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                {activeBenefitTab === 'pr' &&
                  'Leverage high-frequency youth influencer networks, press announcements, and high-production aftermovies.'}
                {activeBenefitTab === 'web' &&
                  'Secure permanent high-authority backlinks, hyperlinked logo presence on jumc.in, and ongoing corporate alignment.'}
                {activeBenefitTab === 'venue' &&
                  'Engage 15,000+ on-campus attendees with premium concourse stalls, interactive workshops, and direct student surveys.'}
              </p>

              <div className="space-y-3">
                {BROCHURE_DATA.benefitsBreakdown[activeBenefitTab].highlights.map(
                  (item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-200">{formatMilaapText(item, 'text-amber-300 font-semibold')}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Visual Highlight Feature Box */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-black to-slate-950 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold block mb-2">
                  EXCLUSIVE PARTNER ADVANTAGE
                </span>
                <h5 className="text-lg font-bold text-white mb-3">
                  Direct Student Interaction &amp; Digital Permanence
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Unlike traditional collegiate events that fade after the weekend, <span className="font-samarkan MilaapFont text-amber-300 text-sm normal-case tracking-normal">milaap</span> integrates corporate sponsors into the official university digital archives, website ecosystem, and post-event highlight reels indefinitely.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setInquirySlabName('General Sponsorship Query');
                    setInquiryModalOpen(true);
                  }}
                  className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  Contact Sponsorship Team
                </button>
                <a
                  href="mailto:sponsorship@jumc.in?subject=Milaap%20Edition%20I%20Sponsorship%20Inquiry"
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold uppercase tracking-wider transition-colors text-center flex items-center justify-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>sponsorship@jumc.in</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SUB-EVENTS & COMPETITIONS GRID ----------------- */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-amber-400 block mb-1">
              FESTIVAL WINGS &amp; COMPETITIONS
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Featured Sub-Events
            </h2>
          </div>
          <Link
            href="/events"
            className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>View Full Directory</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subEvents.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="group p-6 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-white/5 border border-white/10 text-slate-300">
                    {event.category}
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    {event.club}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors mb-2">
                  {event.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {event.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span className="font-medium text-slate-400">{event.date}</span>
                <span className="font-bold text-white group-hover:text-amber-300 flex items-center gap-1">
                  View Rules <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ----------------- REGISTRATION MODAL ----------------- */}
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-up">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-black/70 backdrop-blur-2xl border border-white/20 shadow-2xl">
            <button
              onClick={() => setRegisterModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#E60026] block">
                PARTICIPANT REGISTRATION
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                <span className="font-samarkan MilaapFont text-3xl text-amber-400 normal-case tracking-normal">milaap</span> — EDITION I
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your details below to register for <span className="font-samarkan MilaapFont text-amber-300 normal-case tracking-normal">milaap</span> competitions and festival entry.
              </p>
            </div>

            {regSubmitted ? (
              <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white">Registration Received!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  We have dispatched confirmation details and guidelines to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 uppercase block mb-1">
                    Event Category
                  </label>
                  <select
                    value={regForm.eventCategory}
                    onChange={(e) => setRegForm({ ...regForm, eventCategory: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {subEvents.map((e) => (
                      <option key={e.slug} value={e.title} className="bg-slate-900 text-white">
                        {e.title}
                      </option>
                    ))}
                    <option value="All-Access Audience Pass" className="bg-slate-900 text-white">All-Access Audience Pass</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 uppercase block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Swarnava Ghosh"
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-300 uppercase block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 uppercase block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 uppercase block mb-1">
                    College / Institute
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jadavpur University, Main Campus"
                    value={regForm.college}
                    onChange={(e) => setRegForm({ ...regForm, college: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E60026] to-amber-500 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity mt-4 cursor-pointer"
                >
                  Confirm Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ----------------- SPONSORSHIP INQUIRY MODAL ----------------- */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-up">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-black/70 backdrop-blur-2xl border border-amber-400/30 shadow-2xl">
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-amber-400 block">
                CORPORATE SPONSORSHIP
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">{inquirySlabName}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Leave your business contact details to connect directly with the JUMC &amp; JUDW sponsorship committee.
              </p>
            </div>

            {inquirySubmitted ? (
              <div className="p-8 text-center bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white">Inquiry Forwarded!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Our corporate outreach lead will reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 uppercase block mb-1">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corporation"
                    value={inquiryForm.company}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 uppercase block mb-1">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amitava Sen"
                      value={inquiryForm.contactPerson}
                      onChange={(e) =>
                        setInquiryForm({ ...inquiryForm, contactPerson: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-300 uppercase block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98300 00000"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 uppercase block mb-1">
                    Business Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="partner@company.com"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 uppercase block mb-1">
                    Specific Requirements or Questions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your brand goals, stall requirements, or campaign objectives..."
                    value={inquiryForm.notes}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-400 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors mt-4 cursor-pointer"
                >
                  Send Sponsorship Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ----------------- INTERACTIVE BROCHURE VIEWER MODAL ----------------- */}
      {brochureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-up">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 rounded-3xl bg-black/75 backdrop-blur-2xl border border-amber-400/40 shadow-2xl">
            <button
              onClick={() => setBrochureModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Brochure Header */}
            <div className="text-center pb-8 border-b border-white/10 mb-8">
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-amber-400 block mb-2">
                OFFICIAL PARTNERSHIP DOSSIER
              </span>
              <MilaapBrand size="sm" showSubtitle={true} centered={true} />
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-4 leading-relaxed">
                Complete overview of sponsorship slabs, social media footprint, and event deliverables for <span className="font-samarkan MilaapFont text-amber-400 text-sm normal-case tracking-normal">milaap</span> &apos;26.
              </p>
            </div>

            {/* Quick Slabs Table */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                Sponsorship Slabs Overview
              </h4>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.08] text-amber-300 font-mono uppercase">
                    <tr>
                      <th className="p-3">Slab Tier</th>
                      <th className="p-3">Investment</th>
                      <th className="p-3">Availability</th>
                      <th className="p-3">Primary Key Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    <tr className="bg-amber-400/5">
                      <td className="p-3 font-bold text-white">Title Sponsor</td>
                      <td className="p-3 font-bold text-amber-300">₹1,20,000</td>
                      <td className="p-3 font-mono text-emerald-400">1 Slot Only</td>
                      <td className="p-3">Face of the Event, Main Stage Backdrop &amp; Prize Distribution</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Supporting Sponsor</td>
                      <td className="p-3 font-bold text-amber-300">₹70,000</td>
                      <td className="p-3 font-mono text-slate-300">Limited</td>
                      <td className="p-3">Strong Visibility, Stage Backdrop &amp; Aftermovie Feature</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Associate Sponsor</td>
                      <td className="p-3 font-bold text-amber-300">₹50,000</td>
                      <td className="p-3 font-mono text-slate-300">2 Slots</td>
                      <td className="p-3">Founding Partner Badge &amp; Shared Promotional Stall</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Sound Partner</td>
                      <td className="p-3 font-bold text-amber-300">₹20,000</td>
                      <td className="p-3 font-mono text-slate-300">Official Tech</td>
                      <td className="p-3">Audio Console Branding &amp; On-Stage Acoustic Mentions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Contact & Action */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-black border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-white">Need a customized partnership deck?</p>
                <p className="text-xs text-slate-400">
                  Write to <span className="text-amber-300">sponsorship@jumc.in</span> or call <span className="text-white">+91 98301 23456</span>
                </p>
              </div>

              <button
                onClick={() => {
                  setBrochureModalOpen(false);
                  setInquiryModalOpen(true);
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
              >
                Inquire Directly
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
