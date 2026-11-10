"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Phone,
  Building2,
  BookOpen,
  GraduationCap,
  Sparkles,
  Loader2,
  CheckCircle2,
  LogOut,
  AlertCircle,
  Users,
  Music,
  Footprints,
} from "lucide-react";
import MilaapBrand from "@/components/MilaapBrand";
import { MILAAP_COMPETITIONS } from "@/data/milaapCompetitions";

const YEARS = [
  "1st Year (UG)",
  "2nd Year (UG)",
  "3rd Year (UG)",
  "4th Year (UG)",
  "5th Year (UG)",
  "Postgraduate (PG)",
  "PhD / Research Scholar",
] as const;

interface SelectedEventMeta {
  teamName: string;
  role: string;
}

export default function MilaapRegisterPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<
    Record<string, SelectedEventMeta>
  >({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isRegistered = Boolean(
    session?.user?.isRegistered ?? session?.isRegistered
  );

  // Route guard + pre-fill Name & Email from Google OAuth session
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/milaap/sign-in");
      return;
    }

    if (status === "authenticated") {
      if (isRegistered) {
        router.replace("/milaap/dashboard");
        return;
      }

      if (session?.user?.email && !email) {
        setEmail(session.user.email);
      }
      if (session?.user?.name && !name) {
        setName(session.user.name);
      }
    }
  }, [status, isRegistered, session, router, email, name]);

  const toggleEvent = (slug: string, defaultFormat: string) => {
    setSelectedEvents((prev) => {
      const next = { ...prev };
      if (next[slug]) {
        delete next[slug];
      } else {
        next[slug] = {
          teamName: "",
          role: defaultFormat === "Solo" ? "Solo Performer" : "Participant",
        };
      }
      return next;
    });
    if (errors.events) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.events;
        return copy;
      });
    }
  };

  const updateEventMeta = (
    slug: string,
    field: keyof SelectedEventMeta,
    val: string
  ) => {
    setSelectedEvents((prev) => ({
      ...prev,
      [slug]: {
        ...(prev[slug] || { teamName: "", role: "Participant" }),
        [field]: val,
      },
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!phone.replace(/[\s-]/g, "").match(/^\+?[0-9]{10,14}$/)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!college.trim())
      newErrors.college = "University / College name is required.";
    if (!department.trim())
      newErrors.department = "Department / Stream is required.";
    if (!year) newErrors.year = "Please select your year of study.";
    if (Object.keys(selectedEvents).length === 0) {
      newErrors.events = "Select at least one Milaap competition.";
    }
    if (!agreeToTerms) {
      newErrors.agreeToTerms = "Please confirm student ID and festival rules.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setSubmitting(true);
    try {
      const eventsPayload = Object.entries(selectedEvents).map(
        ([eventSlug, meta]) => {
          const comp = MILAAP_COMPETITIONS.find((c) => c.id === eventSlug);
          return {
            eventSlug,
            eventName: comp?.title || eventSlug,
            category: comp ? `${comp.category} (${comp.format})` : "Event",
            teamName: meta.teamName.trim(),
            role: meta.role.trim() || "Participant",
          };
        }
      );

      const res = await fetch("/api/milaap/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          college: college.trim(),
          department: department.trim(),
          year,
          events: eventsPayload,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || "Could not complete registration.");
        setSubmitting(false);
        return;
      }

      // Refresh NextAuth session so isRegistered flips to true immediately
      await update();
      router.replace("/milaap/dashboard");
    } catch {
      setServerError("Network error while saving registration. Please retry.");
      setSubmitting(false);
    }
  };

  if (status === "loading" || status === "unauthenticated" || isRegistered) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-slate-100">
        <div className="rounded-3xl bg-white/[0.04] border border-amber-500/25 backdrop-blur-2xl p-8 flex flex-col items-center gap-4 text-center max-w-sm w-full">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-xs font-mono uppercase tracking-widest text-amber-200/80">
            {isRegistered
              ? "Already registered — opening dashboard..."
              : "Verifying Google session..."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center py-28 px-4 sm:px-6 overflow-hidden text-slate-100">
      {/* Ambient glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[780px] h-[780px] rounded-full bg-gradient-to-br from-amber-600/15 via-rose-950/20 to-blue-950/35 blur-[170px]" />
        <div className="absolute bottom-[5%] -right-[5%] w-[500px] h-[500px] rounded-full bg-[#E60026]/12 blur-[150px]" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Top Row: Back + Switch Account */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/milaap"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-widest text-slate-300 hover:text-amber-300 hover:border-amber-400/50 transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>
              Back to{" "}
              <span className="font-samarkan MilaapFont text-sm normal-case tracking-normal">
                milaap
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/milaap/sign-in" })}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/40 border border-white/10 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:text-amber-300 hover:border-amber-400/40 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch Google Account</span>
          </button>
        </div>

        {/* Registration Card */}
        <div className="rounded-3xl bg-white/[0.04] border border-amber-500/25 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600" />

          {/* Header */}
          <div className="relative px-6 sm:px-8 pt-8 pb-6 border-b border-white/[0.07] text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.06] to-transparent pointer-events-none" />
            <div className="relative z-10 flex justify-center mb-4">
              <MilaapBrand
                size="sm"
                showSubtitle={false}
                centered
                animate={false}
              />
            </div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.28em] text-amber-400 mb-1">
                <Sparkles className="w-3 h-3" />
                Step 2 of 2 • Participant Profile &amp; Events
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white font-cinzel leading-tight">
                Complete{" "}
                <span className="font-samarkan MilaapFont text-2xl sm:text-3xl text-amber-300 normal-case tracking-normal">
                  milaap
                </span>{" "}
                Registration
              </h1>
              <p className="mt-2 text-xs text-slate-300/75 font-light">
                Your Google account is linked. Fill in your college details and
                choose the competitions you want to enter.
              </p>
            </div>

            {/* Verified Google Identity Strip */}
            <div className="relative z-10 mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/50 border border-emerald-500/30">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "Google Profile"}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full border border-amber-400/50 object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300 text-xs font-bold">
                  {(session?.user?.name || "U").charAt(0)}
                </div>
              )}
              <div className="text-left">
                <p className="text-xs font-semibold text-white leading-none">
                  {session?.user?.name}
                </p>
                <p className="text-[11px] text-emerald-300/90 font-mono mt-0.5">
                  {session?.user?.email}
                </p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
            </div>
          </div>

          {/* Form Body */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="px-6 sm:px-8 py-8 space-y-6"
          >
            {serverError && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Grid of Identity & College Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name (Pre-filled) */}
              <Field
                label="Full Name"
                required
                error={errors.name}
                icon={<User className="w-4 h-4" />}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name)
                      setErrors((p) => ({ ...p, name: "" }));
                  }}
                  placeholder="Your full name"
                  className={inputCls(!!errors.name)}
                />
              </Field>

              {/* Email (Locked from Google) */}
              <Field
                label="Google Email (Locked)"
                required
                icon={<Mail className="w-4 h-4" />}
              >
                <input
                  type="email"
                  value={email}
                  readOnly
                  disabled
                  className={`${inputCls(false)} opacity-70 cursor-not-allowed`}
                />
              </Field>

              {/* Phone Number */}
              <Field
                label="Phone / WhatsApp Number"
                required
                error={errors.phone}
                icon={<Phone className="w-4 h-4" />}
              >
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone)
                      setErrors((p) => ({ ...p, phone: "" }));
                  }}
                  placeholder="+91 98300 00000"
                  className={inputCls(!!errors.phone)}
                />
              </Field>

              {/* Year */}
              <Field
                label="Year of Study"
                required
                error={errors.year}
                icon={<GraduationCap className="w-4 h-4" />}
              >
                <select
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    if (errors.year)
                      setErrors((p) => ({ ...p, year: "" }));
                  }}
                  className={selectCls(!!errors.year)}
                >
                  <option value="" disabled>
                    Select year...
                  </option>
                  {YEARS.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* University / College */}
            <div>
              <Field
                label="University / College"
                required
                error={errors.college}
                icon={<Building2 className="w-4 h-4" />}
              >
                <input
                  type="text"
                  value={college}
                  onChange={(e) => {
                    setCollege(e.target.value);
                    if (errors.college)
                      setErrors((p) => ({ ...p, college: "" }));
                  }}
                  placeholder="e.g. Jadavpur University"
                  className={inputCls(!!errors.college)}
                />
              </Field>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCollege("Jadavpur University");
                    if (errors.college)
                      setErrors((p) => ({ ...p, college: "" }));
                  }}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/25 text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer"
                >
                  + Jadavpur University
                </button>
              </div>
            </div>

            {/* Department */}
            <Field
              label="Department / Discipline"
              required
              error={errors.department}
              icon={<BookOpen className="w-4 h-4" />}
            >
              <input
                type="text"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  if (errors.department)
                    setErrors((p) => ({ ...p, department: "" }));
                }}
                placeholder="e.g. Computer Science & Engineering, Comparative Literature"
                className={inputCls(!!errors.department)}
              />
            </Field>

            {/* Competitions Multi-Select Checkboxes */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  Select Milaap Edition I Competitions
                  <span className="text-amber-400">*</span>
                </label>
                <span className="text-[11px] font-mono text-amber-300">
                  {Object.keys(selectedEvents).length} selected
                </span>
              </div>

              <div className="space-y-3">
                {MILAAP_COMPETITIONS.map((comp) => {
                  const isChecked = Boolean(selectedEvents[comp.id]);
                  const meta = selectedEvents[comp.id];

                  return (
                    <div
                      key={comp.id}
                      className={`rounded-2xl border transition-all duration-200 ${
                        isChecked
                          ? "bg-amber-500/[0.09] border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.12)]"
                          : "bg-black/30 border-white/10 hover:border-amber-500/30"
                      }`}
                    >
                      <label className="flex items-start gap-3.5 p-4 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleEvent(comp.id, comp.format)}
                          className="mt-1 w-4 h-4 accent-amber-400 shrink-0 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-sm font-bold text-white">
                              {comp.title}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-black/50 text-amber-300 border border-amber-400/25">
                                {comp.category === "Music" ? (
                                  <Music className="w-2.5 h-2.5" />
                                ) : (
                                  <Footprints className="w-2.5 h-2.5" />
                                )}
                                {comp.category}
                              </span>
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-yellow-200 border border-white/10">
                                {comp.format}
                              </span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-400 font-light mt-1">
                            {comp.date} • {comp.venue} • {comp.teamSize}
                          </p>
                        </div>
                      </label>

                      {/* Optional Team Name & Role inputs when selected */}
                      {isChecked && meta && (
                        <div className="px-4 pb-4 pt-2 border-t border-amber-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-amber-200/80 mb-1">
                              Team / Band / Crew Name (Optional)
                            </label>
                            <div className="relative">
                              <Users className="w-3.5 h-3.5 text-amber-400/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                              <input
                                type="text"
                                value={meta.teamName}
                                onChange={(e) =>
                                  updateEventMeta(
                                    comp.id,
                                    "teamName",
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  comp.format === "Solo"
                                    ? "Leave blank for Solo"
                                    : "e.g. Riffwalkers / Crew Name"
                                }
                                className="w-full pl-8 pr-3 py-2 rounded-xl text-xs text-white bg-black/50 border border-amber-500/25 focus:border-amber-400 outline-none placeholder:text-slate-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-amber-200/80 mb-1">
                              Role / Style / Instrument
                            </label>
                            <input
                              type="text"
                              value={meta.role}
                              onChange={(e) =>
                                updateEventMeta(comp.id, "role", e.target.value)
                              }
                              placeholder="e.g. Vocalist / Guitarist / Dancer"
                              className="w-full px-3 py-2 rounded-xl text-xs text-white bg-black/50 border border-amber-500/25 focus:border-amber-400 outline-none placeholder:text-slate-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {errors.events && (
                <p className="mt-2 text-[11px] text-rose-400">
                  {errors.events}
                </p>
              )}
            </div>

            {/* Terms Confirmation */}
            <div className="pt-1">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => {
                    setAgreeToTerms(e.target.checked);
                    if (errors.agreeToTerms) {
                      setErrors((p) => ({ ...p, agreeToTerms: "" }));
                    }
                  }}
                  className="mt-0.5 w-4 h-4 accent-amber-400 shrink-0 cursor-pointer"
                />
                <span className="text-xs text-slate-300/80 font-light leading-relaxed group-hover:text-white transition-colors">
                  I confirm I am a registered college/university student and
                  agree to abide by the official{" "}
                  <span className="text-amber-300 font-semibold">
                    Milaap Edition I
                  </span>{" "}
                  rulebooks and carry a valid Student ID on fest day.
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1.5 ml-7 text-[11px] text-rose-400">
                  {errors.agreeToTerms}
                </p>
              )}
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-sm tracking-wider uppercase transition-all duration-300 hover:brightness-110 hover:scale-[1.01] active:scale-95 shadow-[0_0_30px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Your Milaap Pass...</span>
                </>
              ) : (
                <>
                  <span>Complete Registration &amp; Open Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-slate-500",
    "bg-black/40 border backdrop-blur-sm outline-none transition-all duration-200",
    "focus:bg-black/60 focus:ring-2 focus:ring-amber-400/50",
    hasError
      ? "border-rose-500/60 focus:border-rose-400"
      : "border-white/10 focus:border-amber-400/70",
  ].join(" ");
}

function selectCls(hasError: boolean) {
  return [
    "w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white",
    "bg-neutral-900/90 border backdrop-blur-sm outline-none transition-all duration-200",
    "focus:bg-neutral-900 focus:ring-2 focus:ring-amber-400/50 cursor-pointer",
    hasError
      ? "border-rose-500/60 focus:border-rose-400"
      : "border-white/10 focus:border-amber-400/70",
  ].join(" ");
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
