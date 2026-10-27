"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  CheckCircle2,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  X,
  Share2
} from 'lucide-react';
import { EventItem } from '@/data/eventsData';
import MilaapBrand from '@/components/MilaapBrand';

interface SubEventDetailViewProps {
  event: EventItem;
}

export default function SubEventDetailView({ event }: SubEventDetailViewProps) {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    teamSize: 'Solo (1)',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRegisterModalOpen(false);
    }, 2400);
  };

  return (
    <div className="relative overflow-hidden text-slate-100 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className={`absolute top-[10%] left-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-br ${event.bannerGradient} blur-[160px] opacity-35`}
        />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-slate-900/60 blur-[150px]" />
      </div>

      {/* Top Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/events"
            className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
          >
            &larr; All Events
          </Link>
          <span className="text-white/20">•</span>
          <Link
            href="/events/milaap"
            className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            <span>milaap Edition I Flagship</span>
            <Sparkles className="w-3 h-3" />
          </Link>
        </div>

        {/* Club Badge */}
        <div className="flex items-center gap-2">
          {event.club.includes('JUMC') && (
            <span className="px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider uppercase bg-[#E60026]/20 border border-[#E60026]/40 text-[#ff758f]">
              JUMC
            </span>
          )}
          {event.club.includes('JUDW') && (
            <span className="px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider uppercase bg-amber-500/20 border border-amber-500/40 text-amber-300">
              JUDW
            </span>
          )}
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/40 border border-white/10 text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {event.status}
          </span>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="p-8 md:p-12 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-2xl mb-10 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E60026] via-amber-400 to-transparent opacity-80" />

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white/5 border border-white/10 text-slate-300">
            {event.category}
          </span>
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-500/10 border border-amber-500/30 text-amber-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
          {event.title}
        </h1>

        {event.subtitle && (
          <p className="text-lg md:text-xl text-amber-300/90 font-medium mb-6">
            {event.subtitle}
          </p>
        )}

        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl font-light mb-8">
          {event.fullDescription}
        </p>

        {/* Date, Time & Location Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 mb-8">
          <div className="flex items-center gap-3 text-slate-300">
            <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Event Date
              </span>
              <span className="text-sm font-semibold text-white">{event.date}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <Clock className="w-5 h-5 text-sky-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Stage Time
              </span>
              <span className="text-sm font-semibold text-white">{event.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <MapPin className="w-5 h-5 text-[#E60026] flex-shrink-0" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Venue
              </span>
              <span className="text-sm font-semibold text-white">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Register Action CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => setRegisterModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#E60026] to-amber-500 text-white font-bold text-sm tracking-wider uppercase hover:opacity-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Register for This Event</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Rules, Prizes & Timeline 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column: Rules & Prizes (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Cash Prizes & Awards Card */}
          {event.prizes && (
            <div className="p-8 rounded-3xl bg-slate-950/70 border border-amber-400/30 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Prize Pool &amp; Recognitions</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.prizes.first && (
                  <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block mb-1">
                      1st Prize (Winner)
                    </span>
                    <p className="text-base font-bold text-white">{event.prizes.first}</p>
                  </div>
                )}
                {event.prizes.second && (
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                      2nd Prize (Runner Up)
                    </span>
                    <p className="text-base font-bold text-white">{event.prizes.second}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Rules and Guidelines */}
          {event.rules && (
            <div className="p-8 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-5 h-5 text-[#E60026]" />
                <h3 className="text-xl font-bold text-white">Rules &amp; Guidelines</h3>
              </div>

              <ul className="space-y-3">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Schedule & Coordinators */}
        <div className="space-y-8">
          {/* Schedule Timeline */}
          {event.schedule && (
            <div className="p-6 md:p-8 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Event Schedule
              </h3>

              <div className="space-y-4">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="relative pl-6 pb-4 border-l border-white/15 last:pb-0 last:border-0">
                    <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="text-xs font-mono text-amber-300 font-bold block mb-1">
                      {item.time}
                    </span>
                    <span className="text-xs text-slate-300 font-medium">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinators Contact Card */}
          {event.coordinators && (
            <div className="p-6 md:p-8 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                Event POC / Leads
              </h3>

              <div className="space-y-3">
                {event.coordinators.map((poc, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-sm font-bold text-white">{poc.name}</p>
                    <span className="text-xs text-slate-400 font-mono block mb-1.5">{poc.role}</span>
                    {poc.contact && (
                      <span className="text-xs font-mono text-amber-300">{poc.contact}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Flagship Milaap Edition I Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-950/30 via-slate-950 to-rose-950/30 border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold block mb-1">
            FLAGSHIP FESTIVAL SYNERGY
          </span>
          <h4 className="text-xl font-bold text-white">
            This competition is an official wing of milaap — EDITION I
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Explore the complete festival brochure, sponsorship opportunities, and social media reach statistics.
          </p>
        </div>

        <Link
          href="/events/milaap"
          className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 flex-shrink-0"
        >
          <span>Explore Milaap Edition I</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Registration Modal */}
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-up">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-950 border border-white/20 shadow-2xl">
            <button
              onClick={() => setRegisterModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#E60026] block">
                EVENT REGISTRATION
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">{event.title}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill in your details below to lock your slot for this competition.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white">Registration Confirmed!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Our event coordinator will verify your registration and send slot timings.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 uppercase block mb-1">
                    Participant / Lead Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Swarnava Ghosh"
                    value={regForm.name}
                    onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-300 uppercase block mb-1">
                      Team Format
                    </label>
                    <select
                      value={regForm.teamSize}
                      onChange={(e) => setRegForm({ ...regForm, teamSize: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Solo (1)">Solo</option>
                      <option value="Duet (2)">Duet</option>
                      <option value="Ensemble / Band (3-8)">Ensemble / Band (3-8)</option>
                      <option value="Dance Crew (6-16)">Dance Crew (6-16)</option>
                    </select>
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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 uppercase block mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jadavpur University"
                    value={regForm.college}
                    onChange={(e) => setRegForm({ ...regForm, college: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
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
    </div>
  );
}
