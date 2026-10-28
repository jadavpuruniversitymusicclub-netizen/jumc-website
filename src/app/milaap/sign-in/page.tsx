"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  Mail,
  Phone,
  BookOpen,
  Mic2,
  Loader2
} from 'lucide-react';
import MilaapBrand from '@/components/MilaapBrand';
import MandalaBackground from '@/components/MandalaBackground';

const CATEGORIES = [
  'Eastern Vocals (Solo / Duet)',
  'Western Vocals & Acoustic Jam',
  'Instrumental (Strings / Percussion / Wind)',
  'Dance - JUDF (Western / Eastern / Folk)',
  'Audience Pass (Non-Competing)',
] as const;

type Category = (typeof CATEGORIES)[number];

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  deptYear: string;
  category: Category | '';
  agreeToTerms: boolean;
}

const initialForm: FormData = {
  name: '',
  email: '',
  whatsapp: '',
  deptYear: '',
  category: '',
  agreeToTerms: false,
};

export default function MilaapRegistrationPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [participantId, setParticipantId] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Enter a valid email address.';
    if (!form.whatsapp.match(/^\+?[0-9]{10,14}$/)) newErrors.whatsapp = 'Enter a valid 10-digit number.';
    if (!form.deptYear.trim()) newErrors.deptYear = 'Department & Year is required.';
    if (!form.category) newErrors.category = 'Please select a participation category.';
    if (!form.agreeToTerms) newErrors.agreeToTerms = 'You must agree to continue.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const id = `MIL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setParticipantId(id);
      setLoading(false);
      setSuccess(true);
    }, 1400);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center py-28 px-4 sm:px-6 overflow-hidden text-slate-100">

      {/* ?? Background ambient glows ?? */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full bg-gradient-to-br from-amber-600/15 via-rose-950/20 to-blue-950/35 blur-[170px]" />
        <div className="absolute bottom-[5%] -right-[5%] w-[480px] h-[480px] rounded-full bg-[#E60026]/12 blur-[150px]" />
        <div className="absolute bottom-[30%] -left-[8%] w-[400px] h-[400px] rounded-full bg-blue-900/18 blur-[140px]" />
      </div>

      {/* ?? Rotating Mandala ?? */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
        <MandalaBackground size={700} opacity={0.16} animated />
      </div>

      <div className="w-full max-w-lg relative z-10">

        {/* ?? Back Breadcrumb ?? */}
        <div className="mb-6">
          <Link
            href="/milaap"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-widest text-slate-300 hover:text-amber-300 hover:border-amber-400/50 transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to <span className="font-samarkan MilaapFont text-sm normal-case tracking-normal">milaap</span> Home</span>
          </Link>
        </div>

        {/* ?? Registration Card ?? */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden">

          {/* Card Header */}
          <div className="relative px-8 pt-8 pb-6 border-b border-white/[0.07] text-center overflow-hidden">
            {/* subtle gold aura behind brand */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.06] to-transparent pointer-events-none" />

            <div className="relative z-10 flex justify-center mb-5">
              <MilaapBrand size="sm" showSubtitle={false} centered animate={false} />
            </div>

            <div className="relative z-10">
              <span className="block text-[10px] font-mono font-bold uppercase tracking-[0.28em] text-amber-400 mb-1">
                Official Participant Portal
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white font-cinzel leading-tight">
                Register for <span className="font-samarkan MilaapFont text-2xl sm:text-3xl text-amber-300 normal-case tracking-normal">milaap</span> Edition I
              </h1>
              <p className="mt-2 text-xs text-slate-400 font-light">
                Fill in your details below. Entry is free for all verified college students.
              </p>
            </div>
          </div>

          {/* ?? SUCCESS STATE ?? */}
          {success ? (
            <div className="px-8 py-10 flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white font-cinzel mb-1">
                  Registration Confirmed!
                </h2>
                <p className="text-xs text-slate-400 font-light leading-relaxed max-w-xs mx-auto">
                  Welcome to <span className="text-amber-300 font-semibold"><span className="font-samarkan MilaapFont text-base normal-case tracking-normal">milaap</span> Edition I</span>. Your slot is recorded. Please carry a valid student ID on fest day.
                </p>
              </div>

              {/* Participant ID Badge */}
              <div className="w-full p-4 rounded-2xl bg-black/50 border border-amber-400/30 flex flex-col items-center gap-1 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-widest">
                  Your Participant ID
                </span>
                <span className="text-2xl font-mono font-black tracking-wider text-amber-300">
                  {participantId}
                </span>
                <span className="text-[10px] text-slate-500">Save this for fest-day entry & stage reporting.</span>
              </div>

              {/* Summary */}
              <div className="w-full text-left space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.07]">
                <SummaryRow label="Name" value={form.name} />
                <SummaryRow label="Email" value={form.email} />
                <SummaryRow label="Category" value={form.category} />
              </div>

              <Link
                href="/milaap"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold text-sm tracking-wider uppercase text-center transition-all hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              >
                Return to <span className="font-samarkan MilaapFont text-base normal-case tracking-normal">milaap</span> Home
              </Link>
            </div>

          ) : (

            /* ?? FORM ?? */
            <form onSubmit={handleSubmit} noValidate className="px-8 py-8 space-y-5">

              {/* Full Name */}
              <Field
                label="Full Name"
                required
                error={errors.name}
                icon={<User className="w-4 h-4" />}
              >
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Sayan Mukherjee"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={inputCls(!!errors.name)}
                />
              </Field>

              {/* Email */}
              <Field
                label="Email Address"
                required
                error={errors.email}
                icon={<Mail className="w-4 h-4" />}
              >
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="name@college.edu"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={inputCls(!!errors.email)}
                />
              </Field>

              {/* WhatsApp */}
              <Field
                label="WhatsApp Number"
                required
                error={errors.whatsapp}
                icon={<Phone className="w-4 h-4" />}
              >
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 98300 00000"
                  value={form.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  className={inputCls(!!errors.whatsapp)}
                />
              </Field>

              {/* Department & Year */}
              <Field
                label="Department & Year of Study"
                required
                error={errors.deptYear}
                icon={<BookOpen className="w-4 h-4" />}
              >
                <input
                  type="text"
                  placeholder="e.g. Computer Science, 3rd Year"
                  value={form.deptYear}
                  onChange={(e) => handleChange('deptYear', e.target.value)}
                  className={inputCls(!!errors.deptYear)}
                />
              </Field>

              {/* Category Dropdown */}
              <Field
                label="Participation Category"
                required
                error={errors.category}
                icon={<Mic2 className="w-4 h-4" />}
              >
                <select
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value as Category)}
                  className={selectCls(!!errors.category)}
                >
                  <option value="" disabled>Select your event category...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </Field>

              {/* Terms */}
              <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.agreeToTerms}
                    onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-amber-400 shrink-0 cursor-pointer"
                  />
                  <span className="text-xs text-slate-400 font-light leading-relaxed group-hover:text-slate-300 transition-colors">
                    I confirm I am a registered college/university student and agree to adhere to the{' '}
                    <span className="text-amber-400 font-semibold"><span className="font-samarkan MilaapFont text-base normal-case tracking-normal">milaap</span> Edition I</span> code of conduct and event rules.
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="mt-1.5 ml-7 text-[11px] text-rose-400">{errors.agreeToTerms}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-sm tracking-wider uppercase transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500 font-light pb-1">
                Free entry ? No payment required ? Valid student ID mandatory on fest day
              </p>
            </form>
          )}

          {/* Card Footer */}
          {!success && (
            <div className="px-8 pb-7 pt-2 border-t border-white/[0.06] text-center">
              <Link
                href="/milaap"
                className="text-xs text-slate-400 hover:text-amber-300 transition-colors font-light inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Back to <span className="font-samarkan MilaapFont text-sm normal-case tracking-normal">milaap</span> Home</span>
              </Link>
            </div>
          )}
        </div>

        {/* Outer note */}
        <p className="mt-5 text-center text-[11px] text-slate-500 font-light">
          Questions?{' '}
          <a href="mailto:help@jumc.in" className="text-amber-400 hover:underline">
            help@jumc.in
          </a>{' '}
          ? Organised by{' '}
          <span className="text-white font-semibold">JUMC</span> &amp;{' '}
          <span className="text-amber-300 font-semibold">JUDW</span>
        </p>
      </div>
    </main>
  );
}

/* ?? Helpers ?? */

function inputCls(hasError: boolean) {
  return [
    'w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-slate-500',
    'bg-white/[0.03] border backdrop-blur-sm outline-none transition-all duration-200',
    'focus:bg-white/[0.06] focus:ring-2 focus:ring-amber-400/60',
    hasError
      ? 'border-rose-500/60 focus:border-rose-400'
      : 'border-white/10 focus:border-amber-400/70',
  ].join(' ');
}

function selectCls(hasError: boolean) {
  return [
    'w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white',
    'bg-neutral-900/80 border backdrop-blur-sm outline-none transition-all duration-200',
    'focus:bg-neutral-900 focus:ring-2 focus:ring-amber-400/60 cursor-pointer',
    hasError
      ? 'border-rose-500/60 focus:border-rose-400'
      : 'border-white/10 focus:border-amber-400/70',
  ].join(' ');
}

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function Field({ label, required, error, icon, children }: FieldProps) {
  return (
    <div>
      <label className="flex items-center gap-1 text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
        {label}
        {required && <span className="text-amber-400">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          {icon}
        </span>
        {children}
      </div>
      {error && (
        <p className="mt-1.5 text-[11px] text-rose-400 font-light">{error}</p>
      )}
    </div>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 text-xs">
      <span className="text-slate-500 font-mono uppercase tracking-wider shrink-0">{label}</span>
      <span className="text-slate-200 text-right font-light">{value}</span>
    </div>
  );
}
