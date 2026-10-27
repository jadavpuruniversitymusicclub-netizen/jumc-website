"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Phone,
  GraduationCap,
  Music,
  ChevronLeft,
  KeyRound
} from 'lucide-react';
import MilaapBrand from '@/components/MilaapBrand';
import MandalaBackground from '@/components/MandalaBackground';

export default function SignInClient() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'signin' ? 'signin' : 'register';
  const [activeTab, setActiveTab] = useState<'register' | 'signin'>(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'signin') {
      setActiveTab('signin');
    }
  }, [searchParams]);

  // Registration Form State
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    category: 'Eastern Light Vocals & Classical (Solo)',
    participationType: 'solo',
    teamName: '',
    teamSize: '1'
  });
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [participantId, setParticipantId] = useState('');

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    identifier: '',
    passcode: '',
    remember: true
  });
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    setTimeout(() => {
      const generatedId = `MIL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setParticipantId(generatedId);
      setRegLoading(false);
      setRegSuccess(true);
    }, 1000);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInLoading(true);
    setTimeout(() => {
      setSignInLoading(false);
      setSignInSuccess(true);
    }, 1000);
  };

  return (
    <main className="relative min-h-screen text-slate-100 flex flex-col justify-center items-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-amber-600/15 via-rose-950/20 to-blue-950/40 blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#E60026]/15 blur-[140px]" />
      </div>

      {/* Rotating Sacred Mandala */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
        <MandalaBackground size={680} opacity={0.18} animated />
      </div>

      <div className="w-full max-w-xl relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/milaap"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:border-amber-400/50 transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
            <span>Back to Milaap</span>
          </Link>

          <span className="text-[11px] font-mono text-amber-400/90 tracking-widest uppercase">
            Official Portal
          </span>
        </div>

        {/* Glassmorphic Portal Card */}
        <div className="rounded-3xl bg-black/40 border border-white/15 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
          {/* Header Brand */}
          <div className="text-center mb-8">
            <MilaapBrand size="sm" showSubtitle={true} centered={true} animate={false} />
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-light">
              Participant Entry & Registration Portal
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 mb-8">
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setRegSuccess(false);
              }}
              className={`py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-gradient-to-r from-[#E60026] to-amber-500 text-white shadow-lg shadow-rose-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              New Registration
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('signin');
                setSignInSuccess(false);
              }}
              className={`py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Already Registered
            </button>
          </div>

          {/* TAB 1: REGISTRATION */}
          {activeTab === 'register' && (
            <div>
              {regSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-cinzel">
                    Registration Confirmed!
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Welcome to Milaap Edition I. Your slot has been recorded in the event system.
                  </p>
                  <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/40">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Assigned Participant ID
                    </span>
                    <span className="text-lg font-mono font-bold text-amber-300">
                      {participantId}
                    </span>
                  </div>
                  <div className="pt-2 flex flex-col gap-2">
                    <Link
                      href="/milaap"
                      className="w-full py-3 rounded-xl bg-white/[0.05] border border-white/10 hover:border-amber-400/50 text-xs font-bold uppercase tracking-wider text-white transition-all text-center"
                    >
                      Return to Milaap Fest Overview
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={regData.name}
                        onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                        placeholder="e.g. Sayan Mukherjee"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-400/80 focus:bg-white/[0.06] text-white text-sm outline-none transition-all placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={regData.email}
                          onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                          placeholder="name@college.edu"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-400/80 focus:bg-white/[0.06] text-white text-sm outline-none transition-all placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={regData.phone}
                          onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                          placeholder="+91 98300 00000"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-400/80 focus:bg-white/[0.06] text-white text-sm outline-none transition-all placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* College / Institution */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                      College / University Name *
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={regData.college}
                        onChange={(e) => setRegData({ ...regData, college: e.target.value })}
                        placeholder="e.g. Jadavpur University, Main Campus"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-400/80 focus:bg-white/[0.06] text-white text-sm outline-none transition-all placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Event Category */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                      Event Category *
                    </label>
                    <div className="relative">
                      <Music className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        value={regData.category}
                        onChange={(e) => setRegData({ ...regData, category: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-white/10 focus:border-amber-400/80 text-white text-sm outline-none transition-all cursor-pointer"
                      >
                        <option value="Eastern Light Vocals & Classical (Solo)">
                          Eastern Light Vocals & Classical (Solo)
                        </option>
                        <option value="Western Vocals & Acoustic Jam (Solo/Duet)">
                          Western Vocals & Acoustic Jam (Solo/Duet)
                        </option>
                        <option value="Instrumental Showdown (Strings, Percussion, Wind)">
                          Instrumental Showdown (Strings, Percussion, Wind)
                        </option>
                        <option value="Western & Street Dance Battle (Solo / Crew)">
                          Western & Street Dance Battle (Solo / Crew)
                        </option>
                        <option value="INDAK - Eastern & Folk Group Dance">
                          INDAK - Eastern & Folk Group Dance
                        </option>
                        <option value="K-Pop & Movement Workshop">
                          K-Pop & Movement Workshop
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Participation Type */}
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10 cursor-pointer hover:bg-white/[0.05]">
                      <input
                        type="radio"
                        name="partType"
                        value="solo"
                        checked={regData.participationType === 'solo'}
                        onChange={() => setRegData({ ...regData, participationType: 'solo' })}
                        className="accent-amber-400"
                      />
                      <span className="text-xs text-white font-medium">Solo Participant</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10 cursor-pointer hover:bg-white/[0.05]">
                      <input
                        type="radio"
                        name="partType"
                        value="team"
                        checked={regData.participationType === 'team'}
                        onChange={() => setRegData({ ...regData, participationType: 'team' })}
                        className="accent-amber-400"
                      />
                      <span className="text-xs text-white font-medium">Team / Band / Crew</span>
                    </label>
                  </div>

                  {/* Conditional Team Name */}
                  {regData.participationType === 'team' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono uppercase text-slate-300 mb-1 font-semibold">
                          Team / Band Name
                        </label>
                        <input
                          type="text"
                          value={regData.teamName}
                          onChange={(e) => setRegData({ ...regData, teamName: e.target.value })}
                          placeholder="e.g. Euphoria Ensemble"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-400/80 text-white text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-300 mb-1 font-semibold">
                          Members
                        </label>
                        <input
                          type="number"
                          min="2"
                          max="25"
                          value={regData.teamSize}
                          onChange={(e) => setRegData({ ...regData, teamSize: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-400/80 text-white text-sm outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={regLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E60026] via-[#ff2a4b] to-amber-500 text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_25px_rgba(230,0,38,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {regLoading ? (
                      <span>Processing Entry...</span>
                    ) : (
                      <>
                        <span>Complete Registration for Milaap</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400 font-light">
                    Free Entry ? Valid student identification required on fest day at entry gate.
                  </p>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: SIGN IN */}
          {activeTab === 'signin' && (
            <div>
              {signInSuccess ? (
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-cinzel">
                    Welcome Back, Participant!
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Your participant credentials have been verified. Slot schedule and stage reporting instructions will be broadcasted to your contact details.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <Link
                      href="/milaap"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs uppercase tracking-wider transition-all text-center"
                    >
                      Return to Milaap Home
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSignIn} className="space-y-4">
                  {/* Participant Email or ID */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                      Registered Email or Participant ID *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={signInData.identifier}
                        onChange={(e) => setSignInData({ ...signInData, identifier: e.target.value })}
                        placeholder="e.g. name@college.edu or #MIL-2026-XXXX"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-400/80 focus:bg-white/[0.06] text-white text-sm outline-none transition-all placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Passcode or Mobile OTP PIN */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                      Passcode / Registered Phone *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        required
                        value={signInData.passcode}
                        onChange={(e) => setSignInData({ ...signInData, passcode: e.target.value })}
                        placeholder="????????????"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-400/80 focus:bg-white/[0.06] text-white text-sm outline-none transition-all placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Remember Checkbox */}
                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={signInData.remember}
                        onChange={(e) => setSignInData({ ...signInData, remember: e.target.checked })}
                        className="accent-amber-400"
                      />
                      <span>Keep me signed in</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => alert('Please contact JUMC Coordinators at +91 98301 23456 or help@jumc.in for credential retrieval.')}
                      className="text-amber-400 hover:underline"
                    >
                      Forgot ID / PIN?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={signInLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:brightness-110 active:scale-95 shadow-[0_0_25px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {signInLoading ? (
                      <span>Verifying Credentials...</span>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4" />
                        <span>Sign In to Participant Dashboard</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400 font-light">
                    Need help? Email{' '}
                    <a href="mailto:help@jumc.in" className="text-amber-400 hover:underline">
                      help@jumc.in
                    </a>
                  </p>
                </form>
              )}
            </div>
          )}

          {/* Sponsoring / Inquiries Link */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400 font-light">
              Looking to sponsor or set up an official stall?{' '}
              <a
                href="mailto:sponsorship@jumc.in"
                className="text-amber-400 font-semibold hover:underline"
              >
                Reach Corporate Relations &rarr;
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
