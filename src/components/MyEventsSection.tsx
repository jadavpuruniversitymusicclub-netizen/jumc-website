"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Loader2,
  Lock,
  MapPin,
  Pencil,
  PlusCircle,
  RefreshCw,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { MILAAP_COMPETITIONS } from "@/data/milaapCompetitions";
import TeamMembersFieldArray from "@/components/TeamMembersFieldArray";
import {
  createEmptyTeamMembers,
  isAlwaysGroupCompetition,
  sanitizeAndValidateTeamMembers,
  supportsGroupEntryOption,
  type TeamMemberInput,
} from "@/lib/teamValidation";
import type { MyEventItem } from "@/app/api/milaap/my-events/route";
import {
  cancelEventRegistration,
  updateEventRegistration,
} from "@/app/milaap/dashboard/actions";

const STUDY_YEARS = [
  "1st Year (UG)",
  "2nd Year (UG)",
  "3rd Year (UG)",
  "4th Year (UG)",
  "5th Year (UG)",
  "Postgraduate (PG)",
  "PhD / Research Scholar",
] as const;

interface MyEventsSectionProps {
  onOpenEditor: () => void;
  refreshKey?: number;
  onEventsLoaded?: (events: MyEventItem[]) => void;
}

function formatRegistrationDate(isoDate?: string): string {
  if (!isoDate) return "Registered";
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return "Registered";
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

async function requestMyEvents(): Promise<{
  events: MyEventItem[];
  isEventEditingOpen: boolean;
  error: string;
}> {
  const res = await fetch("/api/milaap/my-events", { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) {
    return {
      events: [],
      isEventEditingOpen: true,
      error: data.error || "Unable to load your registered events.",
    };
  }
  return {
    events: Array.isArray(data.events) ? data.events : [],
    isEventEditingOpen: data.isEventEditingOpen !== false,
    error: "",
  };
}

export default function MyEventsSection({
  onOpenEditor,
  refreshKey = 0,
  onEventsLoaded,
}: MyEventsSectionProps) {
  const { data: session, status, update } = useSession();
  const [events, setEvents] = useState<MyEventItem[]>([]);
  const [isEventEditingOpen, setIsEventEditingOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit modal state
  const [editTarget, setEditTarget] = useState<MyEventItem | null>(null);
  const [editTeamName, setEditTeamName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editTeamMode, setEditTeamMode] = useState<"Solo" | "Group">("Solo");
  const [editTeamMembers, setEditTeamMembers] = useState<TeamMemberInput[]>([]);
  const [editPhone, setEditPhone] = useState("");
  const [editCollege, setEditCollege] = useState("");
  const [editYear, setEditYear] = useState("");
  const [submittingEdit, setSubmittingEdit] = useState(false);
  const [modalError, setModalError] = useState("");

  // Cancel confirmation modal state
  const [cancelTarget, setCancelTarget] = useState<MyEventItem | null>(null);
  const [submittingCancel, setSubmittingCancel] = useState(false);
  const [cancelError, setCancelError] = useState("");

  // Toast alert state
  const [toast, setToast] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ type, text });
    toastTimerRef.current = setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const userEmail = session?.user?.email;
  const isLoading =
    status === "loading" || (status === "authenticated" && loading);

  useEffect(() => {
    if (status !== "authenticated" || !userEmail) return;
    let cancelled = false;

    requestMyEvents()
      .then((result) => {
        if (cancelled) return;
        setEvents(result.events);
        setIsEventEditingOpen(result.isEventEditingOpen);
        setError(result.error);
        setLoading(false);
        onEventsLoaded?.(result.events);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Network error while loading your registered events.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [status, userEmail, refreshKey, onEventsLoaded]);

  // Close active modal on Escape when not submitting
  useEffect(() => {
    if (!editTarget && !cancelTarget) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (editTarget && !submittingEdit) setEditTarget(null);
      if (cancelTarget && !submittingCancel) setCancelTarget(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [editTarget, cancelTarget, submittingEdit, submittingCancel]);

  const reloadEvents = async () => {
    if (!userEmail) return;
    setError("");
    try {
      const result = await requestMyEvents();
      setEvents(result.events);
      setIsEventEditingOpen(result.isEventEditingOpen);
      setError(result.error);
      onEventsLoaded?.(result.events);
    } catch {
      setError("Network error while loading your registered events.");
    }
  };

  const handleRefresh = async () => {
    if (!userEmail) return;
    setLoading(true);
    await reloadEvents();
    setLoading(false);
  };

  const openEditModal = (ev: MyEventItem) => {
    const comp = MILAAP_COMPETITIONS.find((c) => c.id === ev.eventSlug);
    const existingMembers = Array.isArray(ev.teamMembers)
      ? ev.teamMembers.map((m) => ({ name: m.name, phone: m.phone }))
      : [];
    const isGroupDefault = comp ? isAlwaysGroupCompetition(comp.format) : false;
    const isGroupEntry =
      isGroupDefault ||
      (comp ? supportsGroupEntryOption(comp.format) && existingMembers.length > 0 : false);

    setEditTarget(ev);
    setEditTeamName(ev.teamName || "");
    setEditRole(ev.role || "");
    setEditTeamMode(isGroupEntry ? "Group" : "Solo");
    setEditTeamMembers(
      isGroupEntry
        ? existingMembers.length >= 2
          ? existingMembers
          : createEmptyTeamMembers()
        : existingMembers
    );
    setEditPhone(ev.phone || "");
    setEditCollege(ev.college || "");
    setEditYear(ev.year || STUDY_YEARS[0]);
    setModalError("");
  };

  const openCancelModal = (ev: MyEventItem) => {
    setCancelTarget(ev);
    setCancelError("");
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    setModalError("");

    const comp = MILAAP_COMPETITIONS.find((c) => c.id === editTarget.eventSlug);
    const requiresTeam = Boolean(
      comp &&
        (isAlwaysGroupCompetition(comp.format) ||
          (supportsGroupEntryOption(comp.format) && editTeamMode === "Group"))
    );

    if (requiresTeam || editTeamMembers.length > 0) {
      const check = sanitizeAndValidateTeamMembers(
        editTeamMembers,
        requiresTeam,
        editTarget.eventName
      );
      if (!check.valid) {
        setModalError(
          check.error ||
            "At least 2 team members with Names and Phone Numbers are required."
        );
        return;
      }
    }

    setSubmittingEdit(true);

    try {
      const res = await updateEventRegistration(editTarget.registrationId, {
        eventSlug: editTarget.eventSlug,
        teamName: editTeamName,
        role: editRole,
        teamMode: editTeamMode,
        teamMembers: editTeamMembers.map((m) => ({
          name: m.name.trim(),
          phone: m.phone.trim(),
        })),
        phone: editPhone,
        college: editCollege,
        year: editYear,
      });

      if (!res.success) {
        const msg = res.error || "Failed to update registration details.";
        setModalError(msg);
        showToast("error", msg);
        if (msg.toLowerCase().includes("locked")) {
          setIsEventEditingOpen(false);
        }
        return;
      }

      await Promise.all([reloadEvents(), update()]);
      setEditTarget(null);
      showToast("success", res.message || "Registration updated successfully!");
    } catch {
      const msg = "Network error while saving changes.";
      setModalError(msg);
      showToast("error", msg);
    } finally {
      setSubmittingEdit(false);
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    setCancelError("");
    setSubmittingCancel(true);

    const withdrawnSlug = cancelTarget.eventSlug;
    try {
      const res = await cancelEventRegistration(
        cancelTarget.registrationId,
        withdrawnSlug
      );

      if (!res.success) {
        const msg = res.error || "Failed to cancel registration.";
        setCancelError(msg);
        showToast("error", msg);
        if (msg.toLowerCase().includes("locked")) {
          setIsEventEditingOpen(false);
        }
        return;
      }

      setEvents((prev) => {
        const next = prev.filter((item) => item.eventSlug !== withdrawnSlug);
        onEventsLoaded?.(next);
        return next;
      });
      setCancelTarget(null);
      showToast("success", res.message || "Registration cancelled successfully.");
      await update();
    } catch {
      const msg = "Network error while cancelling registration.";
      setCancelError(msg);
      showToast("error", msg);
    } finally {
      setSubmittingCancel(false);
    }
  };

  return (
    <section
      aria-labelledby="my-events-heading"
      className="lg:col-span-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6"
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 block mb-1">
            Your Stage Lineup
          </span>
          <h2
            id="my-events-heading"
            className="text-xl sm:text-2xl font-bold text-white font-cinzel flex items-center gap-2.5"
          >
            <span>My Events</span>
            {!isLoading && (
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                {events.length}
              </span>
            )}
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            title="Refresh registered events"
            aria-label="Refresh registered events"
            className="inline-flex items-center justify-center p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-amber-300 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin text-amber-400" : ""}`}
            />
          </button>

          {!isLoading && !isEventEditingOpen ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/15 border border-rose-500/35 text-rose-200 text-xs font-mono font-semibold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-rose-300" />
              <span>Registration Locked</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={onOpenEditor}
              disabled={!isEventEditingOpen}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add / Edit Events</span>
            </button>
          )}
        </div>
      </div>

      {/* Loading State: Spinner + Skeleton Loader Cards */}
      {isLoading ? (
        <div className="space-y-5">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-amber-300/80">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            <span>Loading your registered events...</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1].map((idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-black/40 border border-white/10 p-5 space-y-4 animate-pulse"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="h-5 w-24 rounded-full bg-white/10" />
                  <div className="h-5 w-20 rounded-full bg-white/10" />
                </div>
                <div className="space-y-2">
                  <div className="h-5 w-3/4 rounded-lg bg-white/10" />
                  <div className="h-3.5 w-1/2 rounded-lg bg-white/5" />
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="h-3 w-28 rounded bg-white/5" />
                  <div className="h-3 w-24 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        /* Error State */
        <div className="py-10 px-4 text-center space-y-4 rounded-2xl bg-rose-500/10 border border-rose-500/30">
          <p className="text-xs sm:text-sm text-rose-200">{error}</p>
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-xs font-mono uppercase tracking-wider text-rose-100 cursor-pointer transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      ) : events.length === 0 ? (
        /* Empty State */
        <div className="py-14 px-6 text-center flex flex-col items-center justify-center space-y-5 rounded-2xl bg-black/30 border border-white/[0.07]">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 max-w-md">
            <p className="text-sm sm:text-base font-medium text-slate-200">
              You haven&apos;t registered for any events yet.
            </p>
            <p className="text-xs text-slate-400 font-light">
              Explore all festival competitions and book your stage slot for
              Milaap Edition I.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          >
            <span>Browse Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Responsive Event Cards Grid with Animated Removal */
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {events.map((ev, idx) => {
              const catalogComp = MILAAP_COMPETITIONS.find(
                (c) => c.id === ev.eventSlug
              );
              const isVerified = ev.status === "Verified";

              return (
                <motion.article
                  key={ev.eventSlug}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -8 }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 20,
                    delay: idx * 0.04,
                  }}
                  style={{ willChange: "transform, opacity" }}
                  className="rounded-2xl bg-black/45 border border-amber-500/20 hover:border-amber-400/50 p-5 flex flex-col justify-between gap-4 transition-colors transform-gpu"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 border border-amber-400/25">
                        {ev.category}
                      </span>

                      <div className="flex flex-wrap items-center gap-1.5 justify-end">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            isVerified
                              ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/40"
                              : "bg-amber-950/70 text-amber-300 border-amber-500/40"
                          }`}
                        >
                          {isVerified ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Clock className="w-3 h-3 text-amber-400" />
                          )}
                          {ev.status}
                        </span>
                      </div>
                    </div>

                    {ev.attended && (
                      <div className="mb-2.5 inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-amber-400/55 shadow-[0_0_18px_rgba(16,185,129,0.28)]">
                        <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                        <span>
                          ✓ ATTENDED
                          {ev.attendedAt ? ` (${ev.attendedAt})` : ""}
                        </span>
                      </div>
                    )}

                    <h3 className="text-base sm:text-lg font-bold text-white font-serif leading-snug">
                      {ev.eventName}
                    </h3>

                    {/* Registration Date */}
                    <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-200/80">
                      <CalendarCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>
                        Registered:{" "}
                        <strong className="text-white font-medium">
                          {formatRegistrationDate(ev.registeredAt)}
                        </strong>
                      </span>
                    </p>

                    {(ev.teamName || ev.role) && (
                      <div className="mt-2.5 space-y-1 text-xs text-slate-300/90">
                        {ev.teamName && (
                          <p className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>
                              Team:{" "}
                              <strong className="text-amber-200 font-medium">
                                {ev.teamName}
                              </strong>
                            </span>
                          </p>
                        )}
                        {ev.role && (
                          <p className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>Role: {ev.role}</span>
                          </p>
                        )}
                      </div>
                    )}

                    {ev.teamMembers && ev.teamMembers.length > 0 && (
                      <div className="mt-3 rounded-xl bg-white/[0.03] border border-white/10 p-3 space-y-1.5">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-amber-300/90 flex items-center justify-between">
                          <span>Team Roster</span>
                          <span>{ev.teamMembers.length} Members</span>
                        </p>
                        <ul className="space-y-1">
                          {ev.teamMembers.map((member, mIdx) => (
                            <li
                              key={`${member.name}-${mIdx}`}
                              className="flex items-center justify-between gap-2 text-[11px] text-slate-300"
                            >
                              <span className="truncate font-medium text-white">
                                {mIdx + 1}. {member.name}
                              </span>
                              <span className="font-mono text-amber-200/80 shrink-0">
                                {member.phone}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {catalogComp && (
                      <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-400" />
                          {catalogComp.date}
                        </span>
                        <span className="flex items-center gap-1 truncate max-w-[180px]">
                          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{catalogComp.venue}</span>
                        </span>
                      </div>
                    )}

                    {/* Conditional Action Bar governed by Admin isEventEditingOpen */}
                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                      {isEventEditingOpen ? (
                        <>
                          <button
                            type="button"
                            onClick={() => openEditModal(ev)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/35 text-amber-200 hover:text-white text-[11px] font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                          >
                            <Pencil className="w-3 h-3" />
                            <span>Edit Details</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => openCancelModal(ev)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 border border-white/15 hover:border-rose-400/50 text-slate-300 hover:text-rose-200 text-[11px] font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Cancel Registration</span>
                          </button>
                        </>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[10px] font-mono uppercase tracking-wider">
                          <Lock className="w-3 h-3" />
                          <span>Registration Locked</span>
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Floating Glassmorphic Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-center gap-2.5 text-xs font-semibold ${
              toast.type === "success"
                ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-200"
                : "bg-rose-950/90 border-rose-500/50 text-rose-200"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================================================
          MODAL A: INTERACTIVE EDIT REGISTRATION DETAILS
          ================================================================ */}
      <AnimatePresence>
        {editTarget && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => !submittingEdit && setEditTarget(null)}
              className="fixed inset-0 bg-transparent -z-10 transform-gpu"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              style={{ willChange: "transform, opacity" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-registration-title"
              className="relative w-full max-w-xl max-h-[90vh] bg-[#160407]/95 border-2 border-amber-400/60 rounded-3xl shadow-[0_0_65px_rgba(245,158,11,0.35)] overflow-hidden flex flex-col my-auto transform-gpu"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 shrink-0" />

              <div className="px-6 py-5 border-b border-amber-500/20 flex items-start justify-between gap-4 shrink-0">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/35">
                      {editTarget.category}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/15">
                      {editTarget.status}
                    </span>
                  </div>
                  <h3
                    id="edit-registration-title"
                    className="text-lg sm:text-xl font-bold text-white font-cinzel"
                  >
                    {editTarget.eventName}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-light">
                    Edit your registration details below. Core event identity
                    and verification status cannot be altered.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={submittingEdit}
                  onClick={() => setEditTarget(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 cursor-pointer disabled:opacity-40"
                  aria-label="Close edit modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form
                onSubmit={handleSaveEdit}
                className="flex-1 overflow-y-auto p-6 space-y-4"
              >
                {modalError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{modalError}</span>
                  </div>
                )}

                {(() => {
                  const catalogComp = MILAAP_COMPETITIONS.find(
                    (c) => c.id === editTarget.eventSlug
                  );
                  if (!catalogComp) return null;
                  const showTeamFields =
                    isAlwaysGroupCompetition(catalogComp.format) ||
                    (supportsGroupEntryOption(catalogComp.format) &&
                      editTeamMode === "Group");

                  return (
                    <>
                      {supportsGroupEntryOption(catalogComp.format) && (
                        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-black/40 border border-white/10 px-3.5 py-2.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
                            Entry Format
                          </span>
                          <div className="inline-flex items-center gap-1.5">
                            {(["Solo", "Group"] as const).map((mode) => (
                              <button
                                key={mode}
                                type="button"
                                disabled={submittingEdit}
                                onClick={() => {
                                  setEditTeamMode(mode);
                                  if (
                                    mode === "Group" &&
                                    editTeamMembers.length < 2
                                  ) {
                                    setEditTeamMembers(createEmptyTeamMembers());
                                  } else if (mode === "Solo") {
                                    setEditTeamMembers([]);
                                  }
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 ${
                                  editTeamMode === mode
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

                      {showTeamFields && (
                        <TeamMembersFieldArray
                          members={editTeamMembers}
                          onChange={setEditTeamMembers}
                          required
                          disabled={submittingEdit}
                        />
                      )}
                    </>
                  );
                })()}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Team / Band / Crew Name
                    </label>
                    <input
                      type="text"
                      value={editTeamName}
                      disabled={submittingEdit}
                      onChange={(e) => setEditTeamName(e.target.value)}
                      placeholder="Leave blank if Solo"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-amber-400 outline-none disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Role / Instrument / Style
                    </label>
                    <input
                      type="text"
                      value={editRole}
                      disabled={submittingEdit}
                      onChange={(e) => setEditRole(e.target.value)}
                      placeholder="e.g. Vocalist / Guitarist"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-amber-400 outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editPhone}
                    disabled={submittingEdit}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-amber-400 outline-none disabled:opacity-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      University / College
                    </label>
                    <input
                      type="text"
                      value={editCollege}
                      disabled={submittingEdit}
                      onChange={(e) => setEditCollege(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-amber-400 outline-none disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Year of Study
                    </label>
                    <select
                      value={editYear}
                      disabled={submittingEdit}
                      onChange={(e) => setEditYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-sm text-white focus:border-amber-400 outline-none disabled:opacity-50"
                    >
                      {STUDY_YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    disabled={submittingEdit}
                    onClick={() => setEditTarget(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingEdit}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {submittingEdit && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    )}
                    <span>{submittingEdit ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================================
          MODAL B: CANCEL / WITHDRAW CONFIRMATION MODAL
          ================================================================ */}
      <AnimatePresence>
        {cancelTarget && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => !submittingCancel && setCancelTarget(null)}
              className="fixed inset-0 bg-transparent -z-10 transform-gpu"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 18 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              style={{ willChange: "transform, opacity" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cancel-registration-title"
              className="relative w-full max-w-md bg-[#180509]/95 border-2 border-rose-500/60 rounded-3xl p-6 sm:p-7 shadow-[0_0_60px_rgba(244,63,94,0.35)] space-y-5 my-auto transform-gpu"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-400 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3
                    id="cancel-registration-title"
                    className="text-lg font-bold text-white font-cinzel"
                  >
                    Cancel Registration
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    Are you sure you want to withdraw from{" "}
                    <strong className="text-white font-semibold">
                      {cancelTarget.eventName}
                    </strong>
                    ? This action cannot be undone.
                  </p>
                </div>
              </div>

              {cancelError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{cancelError}</span>
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={submittingCancel}
                  onClick={() => setCancelTarget(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 cursor-pointer transition-colors disabled:opacity-50"
                >
                  Keep Registration
                </button>
                <button
                  type="button"
                  disabled={submittingCancel}
                  onClick={handleConfirmCancel}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(225,29,72,0.35)] disabled:opacity-60"
                >
                  {submittingCancel ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {submittingCancel ? "Withdrawing..." : "Yes, Withdraw"}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
