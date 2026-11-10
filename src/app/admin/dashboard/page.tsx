"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Sliders,
  Globe,
  LogOut,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  Lock,
  Unlock,
  Megaphone,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Crown,
  Sparkles,
  ExternalLink,
  Menu,
  X,
  Trophy,
  AlertTriangle,
  Send,
  Eye,
  EyeOff,
} from "lucide-react";
import MilaapBrand from "@/components/MilaapBrand";
import { MILAAP_COMPETITIONS } from "@/data/milaapCompetitions";

type TabId = "overview" | "participants" | "controls" | "homepage";

interface AdminRegisteredEvent {
  eventSlug: string;
  eventName: string;
  category: string;
  teamName?: string;
  role?: string;
  status: "Pending" | "Verified";
}

interface AdminParticipant {
  _id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  college?: string;
  year?: string;
  participantId?: string;
  isRegistered: boolean;
  events: AdminRegisteredEvent[];
  createdAt: string;
}

interface AdminAnnouncement {
  _id: string;
  title: string;
  message: string;
  priority: "info" | "urgent" | "success";
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

interface AdminFestivalSetting {
  registrationsLocked: boolean;
  lockedEvents: string[];
  lockMessage: string;
  showAnnouncements: boolean;
  heroNotice: string;
  festDatesText: string;
}

const PAGE_SIZE = 8;

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Data state
  const [participants, setParticipants] = useState<AdminParticipant[]>([]);
  const [metrics, setMetrics] = useState({
    totalRegistrations: 0,
    pendingVerifications: 0,
    verifiedRegistrations: 0,
    totalEventEntries: 0,
  });
  const [announcements, setAnnouncements] = useState<AdminAnnouncement[]>([]);
  const [setting, setSetting] = useState<AdminFestivalSetting>({
    registrationsLocked: false,
    lockedEvents: [],
    lockMessage:
      "Registrations for Milaap Edition I are temporarily paused by the organising committee.",
    showAnnouncements: true,
    heroNotice: "",
    festDatesText: "Nov 28 – 30, 2026 • Jadavpur University",
  });

  const [loadingData, setLoadingData] = useState(true);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Participants table controls
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "verified"
  >("all");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminParticipant | null>(
    null
  );

  // Announcement composer
  const [annTitle, setAnnTitle] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [annPriority, setAnnPriority] = useState<
    "info" | "urgent" | "success"
  >("info");
  const [postingAnn, setPostingAnn] = useState(false);

  // Saving God Mode / Homepage settings
  const [savingSettings, setSavingSettings] = useState(false);

  const role = session?.role ?? session?.user?.role;
  const isAdmin = status === "authenticated" && role === "admin";
  const isDenied = status === "authenticated" && role !== "admin";

  const showToast = useCallback(
    (type: "success" | "error", text: string) => {
      setToast({ type, text });
      setTimeout(() => setToast(null), 3500);
    },
    []
  );

  // Protect route
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [status, router]);

  const fetchAllAdminData = useCallback(async () => {
    if (!isAdmin) return;
    setLoadingData(true);
    try {
      const [partRes, annRes, setRes] = await Promise.all([
        fetch("/api/admin/participants", { cache: "no-store" }),
        fetch("/api/admin/announcements", { cache: "no-store" }),
        fetch("/api/admin/settings", { cache: "no-store" }),
      ]);

      if (partRes.ok) {
        const partData = await partRes.json();
        setParticipants(
          Array.isArray(partData.participants) ? partData.participants : []
        );
        if (partData.metrics) setMetrics(partData.metrics);
      }

      if (annRes.ok) {
        const annData = await annRes.json();
        setAnnouncements(
          Array.isArray(annData.announcements) ? annData.announcements : []
        );
      }

      if (setRes.ok) {
        const setData = await setRes.json();
        if (setData.setting) {
          setSetting({
            registrationsLocked: Boolean(setData.setting.registrationsLocked),
            lockedEvents: Array.isArray(setData.setting.lockedEvents)
              ? setData.setting.lockedEvents
              : [],
            lockMessage: setData.setting.lockMessage || "",
            showAnnouncements: setData.setting.showAnnouncements !== false,
            heroNotice: setData.setting.heroNotice || "",
            festDatesText:
              setData.setting.festDatesText ||
              "Nov 28 – 30, 2026 • Jadavpur University",
          });
        }
      }
    } catch {
      showToast("error", "Failed to load admin data.");
    } finally {
      setLoadingData(false);
    }
  }, [isAdmin, showToast]);

  useEffect(() => {
    if (isAdmin) {
      fetchAllAdminData();
    }
  }, [isAdmin, fetchAllAdminData]);

  // Filtered participants
  const filteredParticipants = useMemo(() => {
    return participants.filter((p) => {
      const events = p.events || [];
      const hasPending = events.some((ev) => ev.status !== "Verified");

      if (statusFilter === "pending" && !hasPending) return false;
      if (statusFilter === "verified" && (hasPending || events.length === 0))
        return false;

      if (
        eventFilter !== "all" &&
        !events.some((ev) => ev.eventSlug === eventFilter)
      ) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = (p.name || "").toLowerCase().includes(q);
        const matchEmail = (p.email || "").toLowerCase().includes(q);
        const matchPhone = (p.phone || "").toLowerCase().includes(q);
        const matchCollege = (p.college || "").toLowerCase().includes(q);
        const matchPid = (p.participantId || "").toLowerCase().includes(q);
        const matchEv = events.some((ev) =>
          ev.eventName.toLowerCase().includes(q)
        );
        return (
          matchName ||
          matchEmail ||
          matchPhone ||
          matchCollege ||
          matchPid ||
          matchEv
        );
      }

      return true;
    });
  }, [participants, searchQuery, statusFilter, eventFilter]);

  // Reset pagination on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, eventFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredParticipants.length / PAGE_SIZE)
  );
  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Competition breakdown counts for Overview
  const competitionBreakdown = useMemo(() => {
    return MILAAP_COMPETITIONS.map((comp) => {
      let total = 0;
      let verified = 0;
      for (const p of participants) {
        const match = (p.events || []).find((ev) => ev.eventSlug === comp.id);
        if (match) {
          total += 1;
          if (match.status === "Verified") verified += 1;
        }
      }
      return {
        ...comp,
        total,
        verified,
        pending: total - verified,
      };
    });
  }, [participants]);

  // Recompute metrics cleanly from local participants array
  const recomputeMetrics = (list: AdminParticipant[]) => {
    let pending = 0;
    let verified = 0;
    let totalEntries = 0;
    for (const p of list) {
      const evs = p.events || [];
      totalEntries += evs.length;
      if (evs.some((ev) => ev.status !== "Verified")) {
        pending += 1;
      } else if (evs.length > 0) {
        verified += 1;
      }
    }
    setMetrics({
      totalRegistrations: list.length,
      pendingVerifications: pending,
      verifiedRegistrations: verified,
      totalEventEntries: totalEntries,
    });
  };

  // Verify / Unverify participant or specific event
  const handleVerify = async (
    participantMongoId: string,
    eventSlug: string,
    targetStatus: "Verified" | "Pending"
  ) => {
    setActionLoadingId(`${participantMongoId}-${eventSlug}`);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: participantMongoId,
          eventSlug,
          status: targetStatus,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.error || "Failed to update verification.");
        return;
      }
      const nextList = participants.map((p) =>
        p._id === participantMongoId ? data.participant : p
      );
      setParticipants(nextList);
      recomputeMetrics(nextList);
      showToast(
        "success",
        targetStatus === "Verified"
          ? "Registration verified successfully."
          : "Reverted status to Pending."
      );
    } catch {
      showToast("error", "Network error updating verification.");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete participant
  const handleDeleteParticipant = async (p: AdminParticipant) => {
    setActionLoadingId(p._id);
    try {
      const res = await fetch(
        `/api/admin/participants?id=${encodeURIComponent(p._id)}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const d = await res.json();
        showToast("error", d.error || "Failed to remove participant.");
        return;
      }
      const nextList = participants.filter((item) => item._id !== p._id);
      setParticipants(nextList);
      recomputeMetrics(nextList);
      setDeleteTarget(null);
      showToast("success", `Removed ${p.name} from Milaap registry.`);
    } catch {
      showToast("error", "Network error removing participant.");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      "Participant ID",
      "Name",
      "Email",
      "Phone",
      "College",
      "Year",
      "Events",
      "Verification Status",
    ];
    const rows = filteredParticipants.map((p) => {
      const evSummary = (p.events || [])
        .map(
          (e) =>
            `${e.eventName}${e.teamName ? ` [${e.teamName}]` : ""} (${e.status})`
        )
        .join(" | ");
      const overallStatus = (p.events || []).some(
        (e) => e.status !== "Verified"
      )
        ? "Pending"
        : "Verified";
      return [
        p.participantId || "",
        p.name || "",
        p.email || "",
        p.phone || "",
        p.college || "",
        p.year || "",
        evSummary,
        overallStatus,
      ]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",");
    });
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `milaap-participants-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Save settings ("God Mode" & Homepage Settings)
  const saveFestivalSettings = async (
    partial: Partial<AdminFestivalSetting>
  ) => {
    const nextSetting = { ...setting, ...partial };
    setSetting(nextSetting);
    setSavingSettings(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partial),
      });
      if (!res.ok) {
        showToast("error", "Failed to save festival controls.");
        return;
      }
      showToast("success", "Festival settings updated live!");
    } catch {
      showToast("error", "Network error saving settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  const toggleEventLock = (slug: string) => {
    const exists = setting.lockedEvents.includes(slug);
    const nextLocked = exists
      ? setting.lockedEvents.filter((s) => s !== slug)
      : [...setting.lockedEvents, slug];
    saveFestivalSettings({ lockedEvents: nextLocked });
  };

  // Post Announcement
  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) {
      showToast("error", "Title and message are required.");
      return;
    }
    setPostingAnn(true);
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: annTitle.trim(),
          message: annMessage.trim(),
          priority: annPriority,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.error || "Could not post announcement.");
        return;
      }
      setAnnouncements((prev) => [data.announcement, ...prev]);
      setAnnTitle("");
      setAnnMessage("");
      setAnnPriority("info");
      showToast(
        "success",
        "Announcement broadcasted to /milaap & Participant Dashboards!"
      );
    } catch {
      showToast("error", "Network error posting announcement.");
    } finally {
      setPostingAnn(false);
    }
  };

  const handleToggleAnnouncement = async (ann: AdminAnnouncement) => {
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: ann._id, isActive: !ann.isActive }),
      });
      if (res.ok) {
        setAnnouncements((prev) =>
          prev.map((a) =>
            a._id === ann._id ? { ...a, isActive: !ann.isActive } : a
          )
        );
      }
    } catch {
      showToast("error", "Could not toggle announcement visibility.");
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      const res = await fetch(
        `/api/admin/announcements?id=${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setAnnouncements((prev) => prev.filter((a) => a._id !== id));
        showToast("success", "Announcement deleted.");
      }
    } catch {
      showToast("error", "Failed to delete announcement.");
    }
  };

  // Loading / Guard States
  if (status === "loading" || status === "unauthenticated") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 text-slate-100">
        <div className="rounded-3xl bg-white/5 border border-amber-500/25 backdrop-blur-2xl p-8 flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-xs font-mono uppercase tracking-widest text-amber-200">
            Authenticating Admin Console...
          </p>
        </div>
      </main>
    );
  }

  if (isDenied) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 text-slate-100">
        <div className="rounded-3xl bg-white/5 border border-rose-500/35 backdrop-blur-2xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
              403 Forbidden
            </p>
            <h1 className="text-xl font-bold text-white font-cinzel mt-1">
              Administrator Access Required
            </h1>
            <p className="text-xs text-slate-300 font-light mt-2 leading-relaxed">
              Your account ({session?.user?.email}) does not have admin
              privileges for Milaap Command Center.
            </p>
          </div>
          <div className="space-y-2.5 pt-2">
            <Link
              href="/milaap/dashboard"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Go to Participant Dashboard</span>
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/15 text-slate-200 text-xs font-mono uppercase tracking-wider cursor-pointer"
            >
              Sign Out &amp; Switch Account
            </button>
          </div>
        </div>
      </main>
    );
  }

  const navItems: { id: TabId; label: string; icon: React.ReactNode }[] = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: "participants",
      label: "Participants",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "controls",
      label: "Event Controls",
      icon: <Sliders className="w-4 h-4" />,
    },
    {
      id: "homepage",
      label: "Homepage Settings",
      icon: <Globe className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#0a0408]/60 text-slate-100 relative overflow-x-hidden">
      {/* Ambient glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[25%] w-[700px] h-[500px] rounded-full bg-amber-500/[0.07] blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#E60026]/[0.06] blur-[180px]" />
      </div>

      {/* ================================================================
          LEFT SIDEBAR (Fixed on Desktop, Drawer on Mobile)
          ================================================================ */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-black/65 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Brand + Nav Links */}
        <div className="p-6 space-y-8 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/jumc-logo.jpeg"
                alt="JUMC Logo"
                className="w-10 h-10 rounded-xl border border-white/15 object-contain"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white tracking-wider text-sm">
                    JUMC ADMIN
                  </span>
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-amber-300/75">
                  Milaap • Edition I
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className="lg:hidden p-1.5 rounded-lg bg-white/5 text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold shadow-[0_0_25px_rgba(245,158,11,0.35)]"
                      : "text-slate-300 hover:text-amber-200 hover:bg-white/5 border border-transparent hover:border-white/10"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                  {item.id === "participants" &&
                    metrics.pendingVerifications > 0 && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-black/20 text-black font-extrabold"
                            : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                        }`}
                      >
                        {metrics.pendingVerifications}
                      </span>
                    )}
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-white/10">
            <Link
              href="/milaap"
              target="_blank"
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 hover:text-amber-300 transition-all"
            >
              <span>View Public /milaap</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Logged-in Admin Profile & Sign Out */}
        <div className="p-5 border-t border-white/10 bg-black/40 space-y-4">
          <div className="flex items-center gap-3">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "Admin"}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full border border-amber-400/50 object-cover shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold shrink-0">
                {(session?.user?.name || "A").charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">
                {session?.user?.name || "Milaap Admin"}
              </p>
              <p className="text-[11px] font-mono text-amber-300/80 truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Backdrop */}
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* ================================================================
          MAIN CONTENT AREA
          ================================================================ */}
      <div className="flex-1 lg:pl-72 min-w-0 flex flex-col">
        {/* Top Utility Header */}
        <header className="sticky top-0 z-20 px-4 sm:px-8 py-4 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white font-cinzel capitalize">
                {activeTab === "controls"
                  ? "Event Controls (God Mode)"
                  : activeTab === "homepage"
                  ? "Homepage Settings"
                  : activeTab}
              </h1>
              <p className="text-[11px] font-mono text-slate-400">
                Milaap Edition I • Live Database Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                setting.registrationsLocked
                  ? "bg-rose-500/15 text-rose-300 border-rose-500/40"
                  : "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
              }`}
            >
              {setting.registrationsLocked ? (
                <>
                  <Lock className="w-3 h-3" />
                  Registrations Locked
                </>
              ) : (
                <>
                  <Unlock className="w-3 h-3" />
                  Registrations Open
                </>
              )}
            </span>

            <button
              type="button"
              onClick={fetchAllAdminData}
              disabled={loadingData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 cursor-pointer transition-all"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-amber-400 ${
                  loadingData ? "animate-spin" : ""
                }`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </header>

        {/* Floating Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-center gap-2.5 text-xs font-semibold ${
                toast.type === "success"
                  ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-200"
                  : "bg-rose-950/90 border-rose-500/50 text-rose-200"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              )}
              <span>{toast.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Views */}
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <AnimatePresence mode="wait">
            {/* ============================================================
                TAB 1: OVERVIEW
                ============================================================ */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {/* Key Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                  <MetricCard
                    label="Total Registrations"
                    value={metrics.totalRegistrations}
                    subtext={`${metrics.verifiedRegistrations} fully verified`}
                    icon={<Users className="w-5 h-5 text-amber-400" />}
                    accent="amber"
                  />
                  <MetricCard
                    label="Pending Verifications"
                    value={metrics.pendingVerifications}
                    subtext="Require desk / admin approval"
                    icon={<Clock className="w-5 h-5 text-rose-400" />}
                    accent="rose"
                  />
                  <MetricCard
                    label="Total Events"
                    value={MILAAP_COMPETITIONS.length}
                    subtext={`${metrics.totalEventEntries} total stage entries`}
                    icon={<Trophy className="w-5 h-5 text-yellow-300" />}
                    accent="amber"
                  />
                  <MetricCard
                    label="Live Announcements"
                    value={announcements.filter((a) => a.isActive).length}
                    subtext={
                      setting.registrationsLocked
                        ? "Gate Status: LOCKED"
                        : "Gate Status: OPEN"
                    }
                    icon={<Megaphone className="w-5 h-5 text-emerald-400" />}
                    accent="emerald"
                  />
                </div>

                {/* Competition Breakdown + Recent Participants */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Event Breakdown */}
                  <div className="lg:col-span-7 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-bold text-white font-cinzel">
                          Registrations by Competition
                        </h2>
                        <p className="text-xs text-slate-400">
                          Distribution across all 6 Milaap stages
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab("participants")}
                        className="text-xs font-mono text-amber-300 hover:underline cursor-pointer"
                      >
                        View Table →
                      </button>
                    </div>

                    <div className="space-y-4">
                      {competitionBreakdown.map((c) => {
                        const pct =
                          metrics.totalRegistrations > 0
                            ? Math.round(
                                (c.total / metrics.totalRegistrations) * 100
                              )
                            : 0;
                        return (
                          <div key={c.id} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-white">
                                {c.title}
                              </span>
                              <span className="font-mono text-amber-300">
                                {c.total}{" "}
                                <span className="text-slate-400 text-[10px]">
                                  ({c.verified} verified)
                                </span>
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                                style={{ width: `${Math.max(pct, c.total > 0 ? 6 : 0)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Latest Signups */}
                  <div className="lg:col-span-5 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 space-y-4">
                    <h2 className="text-base font-bold text-white font-cinzel">
                      Recent Participants
                    </h2>

                    {participants.length === 0 ? (
                      <p className="text-xs text-slate-400 py-8 text-center">
                        No registered participants in MongoDB yet.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {participants.slice(0, 5).map((p) => {
                          const hasPending = (p.events || []).some(
                            (ev) => ev.status !== "Verified"
                          );
                          return (
                            <div
                              key={p._id}
                              className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-3"
                            >
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-white truncate">
                                  {p.name}
                                </p>
                                <p className="text-[11px] text-slate-400 truncate">
                                  {p.college} • {(p.events || []).length} events
                                </p>
                              </div>
                              <span
                                className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border shrink-0 ${
                                  hasPending
                                    ? "bg-amber-500/15 text-amber-300 border-amber-400/30"
                                    : "bg-emerald-500/15 text-emerald-300 border-emerald-400/30"
                                }`}
                              >
                                {hasPending ? "Pending" : "Verified"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================================
                TAB 2: PARTICIPANTS DATA TABLE
                ============================================================ */}
            {activeTab === "participants" && (
              <motion.div
                key="participants"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Search & Filters Toolbar */}
                <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, email, phone, college, ID..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 text-xs sm:text-sm text-white outline-none placeholder:text-slate-500"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {(["all", "pending", "verified"] as const).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setStatusFilter(f)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          statusFilter === f
                            ? "bg-amber-500 text-black font-bold"
                            : "bg-black/40 border border-white/10 text-slate-300 hover:border-amber-400/40"
                        }`}
                      >
                        {f}
                      </button>
                    ))}

                    <select
                      value={eventFilter}
                      onChange={(e) => setEventFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-slate-200 outline-none focus:border-amber-400"
                    >
                      <option value="all">All Competitions</option>
                      {MILAAP_COMPETITIONS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={handleExportCsv}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/35 text-emerald-200 text-xs font-mono uppercase tracking-wider cursor-pointer transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CSV</span>
                    </button>
                  </div>
                </div>

                {/* Data Table */}
                <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-black/40 text-[11px] font-mono uppercase tracking-wider text-amber-300/90">
                          <th className="py-4 px-5">Participant</th>
                          <th className="py-4 px-4">Contact</th>
                          <th className="py-4 px-4">College / Year</th>
                          <th className="py-4 px-4">Registered Events</th>
                          <th className="py-4 px-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.07] text-xs sm:text-sm">
                        {paginatedParticipants.length === 0 ? (
                          <tr>
                            <td
                              colSpan={5}
                              className="py-14 text-center text-slate-400 text-xs"
                            >
                              No participants match your current search or
                              filters.
                            </td>
                          </tr>
                        ) : (
                          paginatedParticipants.map((p) => {
                            const hasPending = (p.events || []).some(
                              (ev) => ev.status !== "Verified"
                            );
                            const isRowBusy =
                              actionLoadingId === `${p._id}-ALL` ||
                              actionLoadingId === p._id;

                            return (
                              <tr
                                key={p._id}
                                className="hover:bg-white/[0.03] transition-colors align-top"
                              >
                                {/* Name & ID */}
                                <td className="py-4 px-5">
                                  <div className="flex items-center gap-3">
                                    {p.image ? (
                                      <img
                                        src={p.image}
                                        alt={p.name}
                                        referrerPolicy="no-referrer"
                                        className="w-9 h-9 rounded-full border border-amber-400/40 object-cover shrink-0"
                                      />
                                    ) : (
                                      <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300 font-bold text-xs shrink-0">
                                        {p.name.charAt(0)}
                                      </div>
                                    )}
                                    <div>
                                      <p className="font-bold text-white leading-tight">
                                        {p.name}
                                      </p>
                                      <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-400/25">
                                        {p.participantId || "MIL-2026"}
                                      </span>
                                    </div>
                                  </div>
                                </td>

                                {/* Email & Phone */}
                                <td className="py-4 px-4 space-y-1">
                                  <p className="text-xs text-slate-200 break-all">
                                    {p.email}
                                  </p>
                                  <p className="text-[11px] font-mono text-amber-200/80">
                                    {p.phone || "No phone"}
                                  </p>
                                </td>

                                {/* College & Year */}
                                <td className="py-4 px-4 space-y-1">
                                  <p className="text-xs font-medium text-white">
                                    {p.college || "—"}
                                  </p>
                                  <p className="text-[11px] text-slate-400">
                                    {p.year || "—"}
                                  </p>
                                </td>

                                {/* Registered Events (click badge to toggle single event) */}
                                <td className="py-4 px-4">
                                  <div className="flex flex-col gap-1.5 max-w-xs">
                                    {(p.events || []).map((ev) => {
                                      const verified = ev.status === "Verified";
                                      return (
                                        <button
                                          key={ev.eventSlug}
                                          type="button"
                                          onClick={() =>
                                            handleVerify(
                                              p._id,
                                              ev.eventSlug,
                                              verified ? "Pending" : "Verified"
                                            )
                                          }
                                          title="Click to toggle event verification"
                                          className={`text-left px-2.5 py-1.5 rounded-xl border text-[11px] flex items-center justify-between gap-2 cursor-pointer transition-all ${
                                            verified
                                              ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-200"
                                              : "bg-amber-950/50 border-amber-500/35 text-amber-200 hover:border-amber-400"
                                          }`}
                                        >
                                          <span className="truncate">
                                            {ev.eventName}
                                            {ev.teamName
                                              ? ` • ${ev.teamName}`
                                              : ""}
                                          </span>
                                          <span className="font-mono text-[9px] uppercase font-bold shrink-0">
                                            {ev.status}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </td>

                                {/* Row Actions */}
                                <td className="py-4 px-5 text-right">
                                  <div className="inline-flex items-center gap-2 justify-end">
                                    <button
                                      type="button"
                                      disabled={isRowBusy}
                                      onClick={() =>
                                        handleVerify(
                                          p._id,
                                          "ALL",
                                          hasPending ? "Verified" : "Pending"
                                        )
                                      }
                                      className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider border flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50 ${
                                        hasPending
                                          ? "bg-emerald-500/20 hover:bg-emerald-500 hover:text-black border-emerald-400/40 text-emerald-200"
                                          : "bg-amber-500/15 hover:bg-amber-500/30 border-amber-400/30 text-amber-200"
                                      }`}
                                    >
                                      {isRowBusy ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                      ) : (
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                      )}
                                      <span>
                                        {hasPending
                                          ? "Verify Payment/Reg"
                                          : "Mark Pending"}
                                      </span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => setDeleteTarget(p)}
                                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 cursor-pointer transition-all"
                                      aria-label={`Delete ${p.name}`}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Footer */}
                  <div className="px-5 py-4 border-t border-white/10 bg-black/30 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                    <span>
                      Showing{" "}
                      <strong className="text-white">
                        {filteredParticipants.length === 0
                          ? 0
                          : (currentPage - 1) * PAGE_SIZE + 1}
                      </strong>
                      –
                      <strong className="text-white">
                        {Math.min(
                          currentPage * PAGE_SIZE,
                          filteredParticipants.length
                        )}
                      </strong>{" "}
                      of{" "}
                      <strong className="text-amber-300">
                        {filteredParticipants.length}
                      </strong>{" "}
                      participants
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 disabled:opacity-35 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="font-mono px-2">
                        Page {currentPage} / {totalPages}
                      </span>
                      <button
                        type="button"
                        disabled={currentPage >= totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 disabled:opacity-35 cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================================
                TAB 3: EVENT CONTROLS ("GOD MODE")
                ============================================================ */}
            {activeTab === "controls" && (
              <motion.div
                key="controls"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                {/* LEFT: Global Registration Lock & Per-Event Locks */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-amber-500/25 p-6 space-y-5 shadow-xl">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400">
                          God Mode Control
                        </span>
                        <h2 className="text-lg font-bold text-white font-cinzel mt-1">
                          Global Registration Gate
                        </h2>
                        <p className="text-xs text-slate-300/80 font-light mt-1">
                          Instantly lock or unlock new participant registrations
                          across Milaap Edition I.
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={savingSettings}
                        onClick={() =>
                          saveFestivalSettings({
                            registrationsLocked: !setting.registrationsLocked,
                          })
                        }
                        className={`relative w-16 h-8 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                          setting.registrationsLocked
                            ? "bg-rose-600"
                            : "bg-emerald-600"
                        }`}
                        aria-label="Toggle global registration lock"
                      >
                        <span
                          className={`block w-6 h-6 rounded-full bg-white shadow transition-transform ${
                            setting.registrationsLocked
                              ? "translate-x-8"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300">
                        Lock Screen Message
                      </label>
                      <textarea
                        rows={3}
                        value={setting.lockMessage}
                        onChange={(e) =>
                          setSetting((s) => ({
                            ...s,
                            lockMessage: e.target.value,
                          }))
                        }
                        className="w-full p-3 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 text-xs text-white outline-none"
                      />
                      <button
                        type="button"
                        disabled={savingSettings}
                        onClick={() =>
                          saveFestivalSettings({
                            lockMessage: setting.lockMessage,
                          })
                        }
                        className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-mono uppercase tracking-wider cursor-pointer"
                      >
                        Save Message
                      </button>
                    </div>
                  </div>

                  {/* Per-Event Registration Locks */}
                  <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 space-y-4">
                    <h3 className="text-base font-bold text-white font-cinzel">
                      Per-Event Registration Locks
                    </h3>
                    <div className="space-y-2.5">
                      {MILAAP_COMPETITIONS.map((comp) => {
                        const locked = setting.lockedEvents.includes(comp.id);
                        return (
                          <div
                            key={comp.id}
                            className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/10"
                          >
                            <div>
                              <p className="text-xs sm:text-sm font-semibold text-white">
                                {comp.title}
                              </p>
                              <p className="text-[11px] font-mono text-slate-400">
                                {comp.category} • {comp.format}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleEventLock(comp.id)}
                              className={`px-3 py-1.5 rounded-xl text-[11px] font-mono uppercase font-bold flex items-center gap-1.5 cursor-pointer border transition-all ${
                                locked
                                  ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                                  : "bg-emerald-500/15 text-emerald-300 border-emerald-500/35"
                              }`}
                            >
                              {locked ? (
                                <>
                                  <Lock className="w-3 h-3" />
                                  Locked
                                </>
                              ) : (
                                <>
                                  <Unlock className="w-3 h-3" />
                                  Open
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* RIGHT: Live Announcements Broadcaster */}
                <div className="lg:col-span-6 space-y-6">
                  <form
                    onSubmit={handlePostAnnouncement}
                    className="rounded-3xl bg-white/5 backdrop-blur-md border border-amber-500/25 p-6 space-y-4 shadow-xl"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400">
                        Instant Broadcast
                      </span>
                      <h2 className="text-lg font-bold text-white font-cinzel mt-1 flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-amber-400" />
                        Post Live Announcement
                      </h2>
                      <p className="text-xs text-slate-300/80 font-light mt-1">
                        Publishes immediately to both the public{" "}
                        <code className="text-amber-300">/milaap</code> page and
                        every{" "}
                        <code className="text-amber-300">
                          /milaap/dashboard
                        </code>
                        .
                      </p>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Announcement Title
                      </label>
                      <input
                        type="text"
                        value={annTitle}
                        onChange={(e) => setAnnTitle(e.target.value)}
                        placeholder="e.g. Battle of Bands Soundcheck Schedule Updated"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 text-sm text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Priority Level
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["info", "urgent", "success"] as const).map((pr) => (
                          <button
                            key={pr}
                            type="button"
                            onClick={() => setAnnPriority(pr)}
                            className={`py-2 rounded-xl text-xs font-mono uppercase tracking-wider border cursor-pointer transition-all ${
                              annPriority === pr
                                ? pr === "urgent"
                                  ? "bg-rose-500 text-white border-rose-400 font-bold"
                                  : pr === "success"
                                  ? "bg-emerald-500 text-black border-emerald-400 font-bold"
                                  : "bg-amber-500 text-black border-amber-400 font-bold"
                                : "bg-black/40 border-white/10 text-slate-300"
                            }`}
                          >
                            {pr}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        value={annMessage}
                        onChange={(e) => setAnnMessage(e.target.value)}
                        placeholder="All band leaders must report at OAT Backstage Desk by 1:15 PM..."
                        className="w-full p-3.5 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 text-sm text-white outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={postingAnn}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 disabled:opacity-60"
                    >
                      {postingAnn ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>Publish Live Announcement</span>
                    </button>
                  </form>

                  {/* Active & Past Announcements */}
                  <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 space-y-4">
                    <h3 className="text-base font-bold text-white font-cinzel">
                      Announcement Feed ({announcements.length})
                    </h3>
                    {announcements.length === 0 ? (
                      <p className="text-xs text-slate-400 py-6 text-center">
                        No announcements posted yet.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {announcements.map((a) => (
                          <div
                            key={a._id}
                            className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                              a.isActive
                                ? "bg-black/45 border-amber-500/30"
                                : "bg-black/25 border-white/5 opacity-55"
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${
                                    a.priority === "urgent"
                                      ? "bg-rose-500/20 text-rose-300"
                                      : a.priority === "success"
                                      ? "bg-emerald-500/20 text-emerald-300"
                                      : "bg-amber-500/20 text-amber-300"
                                  }`}
                                >
                                  {a.priority}
                                </span>
                                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                                  {a.title}
                                </h4>
                              </div>
                              <p className="text-xs text-slate-300 font-light mt-1">
                                {a.message}
                              </p>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleToggleAnnouncement(a)}
                                title={
                                  a.isActive
                                    ? "Hide from public"
                                    : "Show publicly"
                                }
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
                              >
                                {a.isActive ? (
                                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteAnnouncement(a._id)}
                                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-300 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================================
                TAB 4: HOMEPAGE SETTINGS
                ============================================================ */}
            {activeTab === "homepage" && (
              <motion.div
                key="homepage"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="max-w-3xl space-y-6"
              >
                <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-amber-500/25 p-6 sm:p-8 space-y-6 shadow-xl">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400">
                        Public Portal Configuration
                      </span>
                      <h2 className="text-xl font-bold text-white font-cinzel mt-1">
                        Milaap Homepage Settings
                      </h2>
                    </div>
                    <Link
                      href="/milaap"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs font-mono"
                    >
                      <span>Open /milaap</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Show Announcements Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/10">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Display Live Announcements on /milaap Homepage
                      </p>
                      <p className="text-xs text-slate-400 font-light mt-0.5">
                        When enabled, active broadcasts appear directly beneath
                        the Milaap Hero section.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        saveFestivalSettings({
                          showAnnouncements: !setting.showAnnouncements,
                        })
                      }
                      className={`relative w-14 h-7 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                        setting.showAnnouncements
                          ? "bg-emerald-600"
                          : "bg-slate-700"
                      }`}
                    >
                      <span
                        className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                          setting.showAnnouncements
                            ? "translate-x-7"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Hero Notice Banner Text */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                      Pinned Hero Notice Banner (Leave blank to hide)
                    </label>
                    <input
                      type="text"
                      value={setting.heroNotice}
                      onChange={(e) =>
                        setSetting((s) => ({
                          ...s,
                          heroNotice: e.target.value,
                        }))
                      }
                      placeholder="e.g. Early-bird band registration slots closing Nov 20!"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 text-sm text-white outline-none"
                    />
                  </div>

                  {/* Fest Dates & Venue Tag */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                      Festival Dates &amp; Venue Label
                    </label>
                    <input
                      type="text"
                      value={setting.festDatesText}
                      onChange={(e) =>
                        setSetting((s) => ({
                          ...s,
                          festDatesText: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 text-sm text-white outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={savingSettings}
                    onClick={() =>
                      saveFestivalSettings({
                        heroNotice: setting.heroNotice,
                        festDatesText: setting.festDatesText,
                        showAnnouncements: setting.showAnnouncements,
                      })
                    }
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer hover:brightness-110 disabled:opacity-60"
                  >
                    {savingSettings ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>Save Homepage Settings</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl -z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="w-full max-w-md rounded-3xl bg-[#160407]/95 border border-rose-500/40 p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-rose-300">
                <AlertTriangle className="w-6 h-6 shrink-0" />
                <h3 className="text-lg font-bold text-white font-cinzel">
                  Delete Participant?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Are you sure you want to delete{" "}
                <strong className="text-white">{deleteTarget.name}</strong> (
                {deleteTarget.email})? This removes their Participant ID and
                all event entries from MongoDB permanently.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={actionLoadingId === deleteTarget._id}
                  onClick={() => handleDeleteParticipant(deleteTarget)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  {actionLoadingId === deleteTarget._id && (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  )}
                  <span>Confirm Delete</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MetricCard({
  label,
  value,
  subtext,
  icon,
  accent,
}: {
  label: string;
  value: number;
  subtext: string;
  icon: React.ReactNode;
  accent: "amber" | "rose" | "emerald";
}) {
  const borderCls =
    accent === "rose"
      ? "hover:border-rose-400/50"
      : accent === "emerald"
      ? "hover:border-emerald-400/50"
      : "hover:border-amber-400/50";

  return (
    <div
      className={`rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 ${borderCls} p-6 space-y-3 transition-all shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
          {label}
        </span>
        <div className="w-9 h-9 rounded-xl bg-black/45 border border-white/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-extrabold text-white font-mono tabular-nums">
        {value}
      </p>
      <p className="text-[11px] text-slate-400 font-light">{subtext}</p>
    </div>
  );
}
