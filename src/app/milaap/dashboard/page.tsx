"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowLeft,
  LogOut,
  Copy,
  Check,
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Edit3,
  X,
  Loader2,
  Music,
  Footprints,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Download,
  Maximize2,
} from "lucide-react";
import MilaapBrand from "@/components/MilaapBrand";
import MilaapAnnouncements from "@/components/MilaapAnnouncements";
import MyEventsSection from "@/components/MyEventsSection";
import MilaapMasterPassModal, {
  MilaapMasterPassCard,
} from "@/components/MilaapMasterPassModal";
import {
  downloadMasterPassPdf,
  getMilaapMandalaDataUrl,
  getMilaapPassBgDataUrl,
} from "@/lib/masterPassPdf";
import AdminPortalBarrier from "@/components/AdminPortalBarrier";
import TeamMembersFieldArray from "@/components/TeamMembersFieldArray";
import { MILAAP_COMPETITIONS } from "@/data/milaapCompetitions";
import { deriveDeterministicParticipantId } from "@/lib/participantId";
import type { MyEventItem } from "@/app/api/milaap/my-events/route";
import {
  createEmptyTeamMembers,
  isAlwaysGroupCompetition,
  sanitizeAndValidateTeamMembers,
  supportsGroupEntryOption,
  type TeamMemberInput,
} from "@/lib/teamValidation";

const YEARS = [
  "1st Year (UG)",
  "2nd Year (UG)",
  "3rd Year (UG)",
  "4th Year (UG)",
  "5th Year (UG)",
  "Postgraduate (PG)",
  "PhD / Research Scholar",
] as const;

export default function MilaapDashboardPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [copiedId, setCopiedId] = useState(false);

  // Modal states
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editEventsOpen, setEditEventsOpen] = useState(false);

  // Profile editor fields
  const [pName, setPName] = useState("");
  const [pPhone, setPPhone] = useState("");
  const [pCollege, setPCollege] = useState("");
  const [pYear, setPYear] = useState("");

  // Events editor map
  const [eventMap, setEventMap] = useState<
    Record<
      string,
      {
        teamName: string;
        role: string;
        teamMode: "Solo" | "Group";
        teamMembers: TeamMemberInput[];
      }
    >
  >({});

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [eventsRefreshKey, setEventsRefreshKey] = useState(0);
  const [masterPassOpen, setMasterPassOpen] = useState(false);
  const [liveEvents, setLiveEvents] = useState<MyEventItem[] | undefined>(
    undefined
  );
  const [directDownloading, setDirectDownloading] = useState(false);
  const [directDownloadFeedback, setDirectDownloadFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [passBgDataUrl, setPassBgDataUrl] = useState<string | undefined>(
    undefined
  );
  const [passMandalaDataUrl, setPassMandalaDataUrl] = useState<
    string | undefined
  >(undefined);
  const directTicketRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([getMilaapPassBgDataUrl(), getMilaapMandalaDataUrl()]).then(
      ([bg, mandala]) => {
        if (!active) return;
        if (bg) setPassBgDataUrl(bg);
        if (mandala) setPassMandalaDataUrl(mandala);
      }
    );
    return () => {
      active = false;
    };
  }, []);

  const participant = session?.participant ?? session?.user?.participant;
  const isRegistered = Boolean(
    session?.user?.isRegistered ?? session?.isRegistered
  );
  const isAdmin = (session?.role ?? session?.user?.role) === "admin";

  // Route protection (Strict Entry Separation)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/milaap/sign-in");
      return;
    }

    if (status === "authenticated" && !isAdmin && !isRegistered) {
      router.replace("/milaap/register");
    }
  }, [status, isAdmin, isRegistered, router]);

  const openProfileEditor = () => {
    if (!participant) return;
    setPName(participant.name || "");
    setPPhone(participant.phone || "");
    setPCollege(participant.college || "");
    setPYear(participant.year || "");
    setSaveError("");
    setEditProfileOpen(true);
  };

  const openEventsEditor = () => {
    if (!participant) return;
    const compMap = new Map(MILAAP_COMPETITIONS.map((c) => [c.id, c]));
    const map: Record<
      string,
      {
        teamName: string;
        role: string;
        teamMode: "Solo" | "Group";
        teamMembers: TeamMemberInput[];
      }
    > = {};
    for (const ev of participant.events || []) {
      const comp = compMap.get(ev.eventSlug);
      if (!comp) continue;
      const existingMembers = Array.isArray(ev.teamMembers)
        ? ev.teamMembers.map((m) => ({ name: m.name, phone: m.phone }))
        : [];
      const isGroupDefault = isAlwaysGroupCompetition(comp.format);
      const isGroupEntry =
        isGroupDefault ||
        (supportsGroupEntryOption(comp.format) && existingMembers.length > 0);
      map[ev.eventSlug] = {
        teamName: ev.teamName || "",
        role: ev.role || "Participant",
        teamMode: isGroupEntry ? "Group" : "Solo",
        teamMembers: isGroupEntry
          ? existingMembers.length >= 2
            ? existingMembers
            : createEmptyTeamMembers()
          : existingMembers,
      };
    }
    setEventMap(map);
    setSaveError("");
    setEditEventsOpen(true);
  };

  const effectiveParticipantId = participant
    ? participant.participantId ||
      deriveDeterministicParticipantId(participant.email)
    : "";

  const handleCopyId = async () => {
    if (!effectiveParticipantId) return;
    try {
      await navigator.clipboard.writeText(effectiveParticipantId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch {
      // Clipboard API fallback ignored
    }
  };

  const qrPayload = participant
    ? JSON.stringify({
        email: participant.email,
        participantId: effectiveParticipantId,
        app: "MILAAP_26",
      })
    : "";

  const handleDirectDownloadPDF = async () => {
    if (!participant || directDownloading) return;
    setDirectDownloading(true);
    setDirectDownloadFeedback(null);

    try {
      const [bg, mandala] = await Promise.all([
        passBgDataUrl
          ? Promise.resolve(passBgDataUrl)
          : getMilaapPassBgDataUrl(),
        passMandalaDataUrl
          ? Promise.resolve(passMandalaDataUrl)
          : getMilaapMandalaDataUrl(),
      ]);
      if (bg && !passBgDataUrl) setPassBgDataUrl(bg);
      if (mandala && !passMandalaDataUrl) setPassMandalaDataUrl(mandala);

      for (let frame = 0; frame < 6; frame += 1) {
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve())
        );
        if (directTicketRef.current) break;
      }

      if (!directTicketRef.current) {
        throw new Error("Pass container unavailable for PDF generation.");
      }

      await downloadMasterPassPdf(directTicketRef.current, participant.name);
      setDirectDownloadFeedback({
        type: "success",
        text: "Master Pass PDF downloaded!",
      });
    } catch (error) {
      console.error("[Direct MasterPass PDF download error]:", error);
      setDirectDownloadFeedback({
        type: "error",
        text: "Could not download PDF. Click Mini QR to retry.",
      });
    } finally {
      setDirectDownloading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!participant) return;
    setSaveError("");

    if (!pName.trim()) return setSaveError("Full name is required.");
    if (!pPhone.replace(/[\s-]/g, "").match(/^\+?[0-9]{10,14}$/)) {
      return setSaveError("Enter a valid 10-digit phone number.");
    }
    if (!pCollege.trim() || !pYear) {
      return setSaveError("College and year of study are required.");
    }

    setSaving(true);
    try {
      const res = await fetch("/api/milaap/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pName.trim(),
          phone: pPhone.trim(),
          college: pCollege.trim(),
          year: pYear,
          events: participant.events,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveError(data.error || "Failed to update profile.");
        setSaving(false);
        return;
      }
      await update();
      setSaving(false);
      setEditProfileOpen(false);
    } catch {
      setSaveError("Network error updating profile.");
      setSaving(false);
    }
  };

  const toggleEventChoice = (
    slug: string,
    format: "Solo" | "Solo/Duet" | "Group" | "Group/Solo"
  ) => {
    const isGroupDefault = isAlwaysGroupCompetition(format);
    setEventMap((prev) => {
      const next = { ...prev };
      if (next[slug]) {
        delete next[slug];
      } else {
        next[slug] = {
          teamName: "",
          role: format === "Solo" ? "Solo Performer" : "Participant",
          teamMode: isGroupDefault ? "Group" : "Solo",
          teamMembers: isGroupDefault ? createEmptyTeamMembers() : [],
        };
      }
      return next;
    });
  };

  const handleSaveEvents = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!participant) return;
    setSaveError("");

    const entries = Object.entries(eventMap);
    if (entries.length === 0) {
      return setSaveError("Please keep at least one registered event.");
    }

    for (const [slug, meta] of entries) {
      const comp = MILAAP_COMPETITIONS.find((c) => c.id === slug);
      if (!comp) continue;
      const requiresTeam =
        isAlwaysGroupCompetition(comp.format) ||
        (supportsGroupEntryOption(comp.format) && meta.teamMode === "Group");
      if (requiresTeam || meta.teamMembers.length > 0) {
        const check = sanitizeAndValidateTeamMembers(
          meta.teamMembers,
          requiresTeam,
          comp.title
        );
        if (!check.valid) {
          return setSaveError(
            check.error ||
              "At least 2 team members with Names and Phone Numbers are required."
          );
        }
      }
    }

    setSaving(true);
    try {
      const eventsPayload = entries.map(([eventSlug, meta]) => {
        const comp = MILAAP_COMPETITIONS.find((c) => c.id === eventSlug);
        return {
          eventSlug,
          eventName: comp?.title || eventSlug,
          category: comp ? `${comp.category} (${comp.format})` : "Event",
          teamName: meta.teamName.trim(),
          role: meta.role.trim() || "Participant",
          teamMode: meta.teamMode,
          teamMembers: meta.teamMembers.map((m) => ({
            name: m.name.trim(),
            phone: m.phone.trim(),
          })),
        };
      });

      const res = await fetch("/api/milaap/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: participant.name,
          phone: participant.phone,
          college: participant.college,
          year: participant.year,
          events: eventsPayload,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveError(data.error || "Failed to update events.");
        setSaving(false);
        return;
      }
      await update();
      setEventsRefreshKey((k) => k + 1);
      setSaving(false);
      setEditEventsOpen(false);
    } catch {
      setSaveError("Network error updating events.");
      setSaving(false);
    }
  };

  if (status === "authenticated" && isAdmin) {
    return <AdminPortalBarrier email={session?.user?.email} />;
  }

  if (
    status === "loading" ||
    status === "unauthenticated" ||
    !isRegistered ||
    !participant
  ) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-slate-100">
        <div className="rounded-3xl bg-white/[0.04] border border-amber-500/25 backdrop-blur-2xl p-8 flex flex-col items-center gap-4 text-center max-w-sm w-full">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-xs font-mono uppercase tracking-widest text-amber-200/80">
            Loading your Milaap Dashboard...
          </p>
        </div>
      </main>
    );
  }

  const verifiedSlugs = new Set(
    participant.events
      .filter((ev) => ev.status === "Verified")
      .map((ev) => ev.eventSlug)
  );

  return (
    <main className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 overflow-x-hidden text-slate-100">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full bg-gradient-to-br from-amber-600/15 via-rose-950/20 to-blue-950/35 blur-[170px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[520px] h-[520px] rounded-full bg-[#E60026]/10 blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/milaap"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-widest text-slate-300 hover:text-amber-300 hover:border-amber-400/50 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>
              Back to{" "}
              <span className="font-samarkan MilaapFont text-sm normal-case tracking-normal">
                milaap
              </span>{" "}
              Home
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/milaap#competitions"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/30 text-xs font-mono uppercase tracking-wider text-amber-300 hover:bg-amber-500/20 transition-all"
            >
              <span>Rulebooks</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/milaap" })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-mono font-bold uppercase tracking-wider text-rose-200 hover:bg-rose-500/20 hover:border-rose-400/60 transition-all cursor-pointer active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Welcome & Milaap Participant Pass Banner */}
        <section className="rounded-3xl bg-white/[0.04] border border-amber-500/25 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600" />
          <div className="p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Identity */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {participant.image ? (
                <img
                  src={participant.image}
                  alt={participant.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-2xl border-2 border-amber-400/60 object-cover shadow-[0_0_25px_rgba(245,158,11,0.25)] shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-700/20 border-2 border-amber-400/50 flex items-center justify-center text-amber-200 text-3xl font-cinzel font-bold shrink-0">
                  {participant.name.charAt(0)}
                </div>
              )}

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3 h-3" />
                  Official Milaap Delegate
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-cinzel tracking-tight">
                  {participant.name}
                </h1>
                <p className="text-xs sm:text-sm text-amber-200/75 font-light mt-1">
                  {participant.college} • {participant.year}
                </p>
              </div>
            </div>

            {/* Right Unique Participant ID Box with Mini QR & Direct PDF Pass Download */}
            <div className="rounded-2xl bg-[#190509]/85 border border-amber-400/40 p-4 sm:p-5 sm:min-w-[340px] shadow-[0_0_32px_rgba(245,158,11,0.2)] flex flex-col justify-between gap-3.5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-amber-300/85">
                  UNIQUE PARTICIPANT ID
                </span>
                <MilaapBrand
                  size="sm"
                  showSubtitle={false}
                  centered={false}
                  animate={false}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xl sm:text-2xl font-mono font-black tracking-wider text-amber-300">
                      {effectiveParticipantId || "MLP-2026"}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyId}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-200 text-[11px] font-mono transition-all cursor-pointer active:scale-95"
                      aria-label="Copy Participant ID"
                    >
                      {copiedId ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMasterPassOpen(true)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-200/80 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>Tap Mini QR to preview Official Pass</span>
                  </button>
                </div>

                {/* Compact Live Mini QR Code Preview (Click to open full modal) */}
                <button
                  type="button"
                  onClick={() => setMasterPassOpen(true)}
                  title="Click to preview full Master Pass"
                  aria-label="Open Official Master Pass Preview"
                  className="bg-[#fdf8f0] p-1.5 rounded-xl border-2 border-amber-400/75 shadow-[0_0_20px_rgba(245,158,11,0.28)] hover:scale-105 active:scale-95 transition-transform shrink-0 cursor-pointer"
                >
                  <QRCodeSVG
                    value={qrPayload}
                    size={64}
                    bgColor="#fdf8f0"
                    fgColor="#1a0b07"
                    level="M"
                  />
                </button>
              </div>

              <div className="pt-1 space-y-1.5">
                <button
                  type="button"
                  disabled={directDownloading}
                  onClick={handleDirectDownloadPDF}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:brightness-110 active:scale-[0.98] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer disabled:opacity-60"
                >
                  {directDownloading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                      <span>Generating PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 shrink-0" />
                      <span>Download Pass (PDF)</span>
                    </>
                  )}
                </button>

                {directDownloadFeedback && (
                  <p
                    className={`text-[10px] font-mono text-center ${
                      directDownloadFeedback.type === "success"
                        ? "text-emerald-300"
                        : "text-rose-300"
                    }`}
                  >
                    {directDownloadFeedback.text}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Live Organiser Announcements Feed */}
        <MilaapAnnouncements />

        {/* Split Content: Profile Card + Registered Events */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Participant Profile Card */}
          <section className="lg:col-span-4 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6 sm:p-7 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                <h2 className="text-base font-bold text-white font-cinzel">
                  Profile Details
                </h2>
              </div>
              <button
                type="button"
                onClick={openProfileEditor}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 hover:text-amber-200 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-400/25 hover:border-amber-400/50 transition-all cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <ProfileItem
                icon={<Mail className="w-4 h-4 text-amber-400" />}
                label="Google Email"
                value={participant.email}
              />
              <ProfileItem
                icon={<Phone className="w-4 h-4 text-amber-400" />}
                label="Phone Number"
                value={participant.phone || "Not set"}
              />
              <ProfileItem
                icon={<Building2 className="w-4 h-4 text-amber-400" />}
                label="University / College"
                value={participant.college || "Not set"}
              />
              <ProfileItem
                icon={<GraduationCap className="w-4 h-4 text-amber-400" />}
                label="Year of Study"
                value={participant.year || "Not set"}
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-500/[0.06] border border-amber-400/20 text-[11px] text-amber-100/80 leading-relaxed">
              Need help modifying a Verified entry or changing band members?
              Contact our event coordinators on the{" "}
              <Link href="/milaap" className="text-amber-300 underline">
                Milaap Home Page
              </Link>
              .
            </div>
          </section>

          {/* RIGHT: My Events Section (MongoDB Fetch + Loading + Empty + Cards) */}
          <MyEventsSection
            onOpenEditor={openEventsEditor}
            refreshKey={eventsRefreshKey}
            onEventsLoaded={setLiveEvents}
          />
        </div>
      </div>

      {/* ================================================================
          MODAL 1: EDIT PROFILE DETAILS
          ================================================================ */}
      <AnimatePresence>
        {editProfileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditProfileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl -z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="relative w-full max-w-lg bg-[#160407]/95 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600" />
              <div className="px-6 py-4 border-b border-amber-500/20 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-cinzel">
                  Edit Participant Profile
                </h3>
                <button
                  type="button"
                  onClick={() => setEditProfileOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
                {saveError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{saveError}</span>
                  </div>
                )}

                <ModalInput
                  label="Full Name"
                  value={pName}
                  onChange={setPName}
                />
                <ModalInput
                  label="Phone / WhatsApp Number"
                  value={pPhone}
                  onChange={setPPhone}
                />
                <ModalInput
                  label="University / College"
                  value={pCollege}
                  onChange={setPCollege}
                />
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Year of Study
                  </label>
                  <select
                    value={pYear}
                    onChange={(e) => setPYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-sm text-white focus:border-amber-400 outline-none"
                  >
                    {YEARS.map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditProfileOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================================
          MODAL 2: ADD / EDIT EVENT REGISTRATIONS
          ================================================================ */}
      <AnimatePresence>
        {editEventsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditEventsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl -z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="relative w-full max-w-2xl max-h-[88vh] bg-[#160407]/95 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 shrink-0" />
              <div className="px-6 py-4 border-b border-amber-500/20 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="text-lg font-bold text-white font-cinzel">
                    Manage Event Registrations
                  </h3>
                  <p className="text-xs text-amber-200/60">
                    Add new competitions or update your team/role details.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditEventsOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form
                onSubmit={handleSaveEvents}
                className="flex-1 overflow-y-auto p-6 space-y-4"
              >
                {saveError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{saveError}</span>
                  </div>
                )}

                <div className="space-y-3">
                  {MILAAP_COMPETITIONS.map((comp) => {
                    const checked = Boolean(eventMap[comp.id]);
                    const isVerified = verifiedSlugs.has(comp.id);
                    const meta = eventMap[comp.id];

                    return (
                      <div
                        key={comp.id}
                        className={`rounded-2xl border transition-all ${
                          checked
                            ? "bg-amber-500/[0.09] border-amber-400/60"
                            : "bg-black/35 border-white/10"
                        }`}
                      >
                        <label className="flex items-start gap-3 p-4 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              toggleEventChoice(comp.id, comp.format)
                            }
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
                                  {comp.format}
                                </span>
                                {isVerified && (
                                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
                                    Verified
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">
                              {comp.date} • {comp.venue}
                            </p>
                          </div>
                        </label>

                        {checked && meta && (
                          <div className="px-4 pb-4 pt-3 border-t border-amber-500/20 space-y-3">
                            {supportsGroupEntryOption(comp.format) && (
                              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-black/40 border border-white/10 px-3 py-2">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
                                  Entry Format
                                </span>
                                <div className="inline-flex items-center gap-1.5">
                                  {(["Solo", "Group"] as const).map((mode) => (
                                    <button
                                      key={mode}
                                      type="button"
                                      onClick={() =>
                                        setEventMap((prev) => ({
                                          ...prev,
                                          [comp.id]: {
                                            ...prev[comp.id],
                                            teamMode: mode,
                                            teamMembers:
                                              mode === "Group"
                                                ? prev[comp.id].teamMembers
                                                    .length >= 2
                                                  ? prev[comp.id].teamMembers
                                                  : createEmptyTeamMembers()
                                                : [],
                                          },
                                        }))
                                      }
                                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                        meta.teamMode === mode
                                          ? "bg-amber-500 text-black"
                                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                                      }`}
                                    >
                                      {mode === "Solo"
                                        ? "Solo (1v1)"
                                        : "Group / Crew (2+)"}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={meta.teamName}
                                onChange={(e) =>
                                  setEventMap((prev) => ({
                                    ...prev,
                                    [comp.id]: {
                                      ...prev[comp.id],
                                      teamName: e.target.value,
                                    },
                                  }))
                                }
                                placeholder="Team / Band / Crew Name (optional)"
                                className="w-full px-3 py-2 rounded-xl text-xs text-white bg-black/50 border border-amber-500/25 focus:border-amber-400 outline-none placeholder:text-slate-500"
                              />
                              <input
                                type="text"
                                value={meta.role}
                                onChange={(e) =>
                                  setEventMap((prev) => ({
                                    ...prev,
                                    [comp.id]: {
                                      ...prev[comp.id],
                                      role: e.target.value,
                                    },
                                  }))
                                }
                                placeholder="Role / Style / Instrument"
                                className="w-full px-3 py-2 rounded-xl text-xs text-white bg-black/50 border border-amber-500/25 focus:border-amber-400 outline-none placeholder:text-slate-500"
                              />
                            </div>

                            {(isAlwaysGroupCompetition(comp.format) ||
                              meta.teamMode === "Group") && (
                              <TeamMembersFieldArray
                                members={meta.teamMembers}
                                onChange={(members) =>
                                  setEventMap((prev) => ({
                                    ...prev,
                                    [comp.id]: {
                                      ...prev[comp.id],
                                      teamMembers: members,
                                    },
                                  }))
                                }
                                required
                                disabled={saving}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditEventsOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Save Registrations</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Offscreen Pass Card mounted temporarily for instant header PDF download */}
      {directDownloading && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            left: "-10000px",
            top: 0,
            pointerEvents: "none",
            zIndex: -1,
          }}
        >
          <MilaapMasterPassCard
            ref={directTicketRef}
            participant={{
              name: participant.name,
              email: participant.email,
              phone: participant.phone,
              college: participant.college,
              year: participant.year,
              participantId: effectiveParticipantId,
              events: participant.events || [],
            }}
            liveEvents={liveEvents}
            bgDataUrl={passBgDataUrl}
            mandalaDataUrl={passMandalaDataUrl}
            forPdf
          />
        </div>
      )}

      {/* Unified Milaap Master Pass PDF Modal */}
      <MilaapMasterPassModal
        open={masterPassOpen}
        participant={{
          name: participant.name,
          email: participant.email,
          phone: participant.phone,
          college: participant.college,
          year: participant.year,
          participantId: effectiveParticipantId,
          events: participant.events || [],
        }}
        liveEvents={liveEvents}
        onClose={() => setMasterPassOpen(false)}
      />
    </main>
  );
}

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-2xl bg-black/35 border border-white/[0.06]">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="text-xs sm:text-sm text-white font-light break-words mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );
}

function ModalInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-amber-400 outline-none"
      />
    </div>
  );
}
