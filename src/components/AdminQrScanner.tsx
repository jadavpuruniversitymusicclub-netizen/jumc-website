"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Html5Qrcode } from "html5-qrcode";
import {
  AlertTriangle,
  Building2,
  Camera,
  CheckCircle2,
  Drum,
  Footprints,
  GraduationCap,
  Guitar,
  Loader2,
  Mail,
  Mic2,
  Music,
  Phone,
  QrCode,
  ScanLine,
  Search,
  StopCircle,
  Users,
} from "lucide-react";
import {
  getParticipantByQR,
  markEventAttendance,
  type ScannedParticipantProfile,
  type ScannedRegistrationItem,
} from "@/app/admin/dashboard/actions";

interface AdminQrScannerProps {
  onRefreshStats: () => Promise<void> | void;
}

interface ScannedParticipantState {
  profile: ScannedParticipantProfile;
  registrations: ScannedRegistrationItem[];
}

function EventStageIcon({
  eventName,
  category,
}: {
  eventName: string;
  category: string;
}) {
  const lower = eventName.toLowerCase();
  if (lower.includes("vocal")) return <Mic2 className="w-4 h-4 text-amber-300" />;
  if (lower.includes("instrumental"))
    return <Guitar className="w-4 h-4 text-amber-300" />;
  if (lower.includes("band")) return <Drum className="w-4 h-4 text-amber-300" />;
  if (lower.includes("dance") || category.toLowerCase().includes("dance"))
    return <Footprints className="w-4 h-4 text-amber-300" />;
  if (category.toLowerCase().includes("group"))
    return <Users className="w-4 h-4 text-amber-300" />;
  return <Music className="w-4 h-4 text-amber-300" />;
}

function ActionButton({
  registration,
  busy,
  onMark,
}: {
  registration: ScannedRegistrationItem;
  busy: boolean;
  onMark: (id: string) => void;
}) {
  if (registration.attended) {
    return (
      <button
        type="button"
        disabled
        className="w-full px-4 py-2.5 rounded-xl bg-emerald-950/75 border border-emerald-500/45 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.18)]"
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          ✓ ATTENDED
          {registration.attendedAt ? ` • ${registration.attendedAt}` : ""}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => onMark(registration._id)}
      className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:brightness-110 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-[0.99] disabled:opacity-60"
    >
      {busy ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>MARKING ATTENDANCE...</span>
        </>
      ) : (
        <>
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>MARK ATTENDANCE — {registration.eventName}</span>
        </>
      )}
    </button>
  );
}

export default function AdminQrScanner({ onRefreshStats }: AdminQrScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);
  const [manualId, setManualId] = useState("");
  const [busyRegId, setBusyRegId] = useState<string | null>(null);
  const [scannedParticipant, setScannedParticipant] =
    useState<ScannedParticipantState | null>(null);
  const [flashMessage, setFlashMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showFlash = useCallback(
    (type: "success" | "error" | "info", text: string) => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      setFlashMessage({ type, text });
      flashTimerRef.current = setTimeout(() => setFlashMessage(null), 5000);
    },
    []
  );

  const playBeep = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.17);
      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 250);
    } catch {
      // Ignore Web Audio restriction when autoplay is blocked
    }
  }, []);

  const stopScanner = useCallback(async () => {
    const instance = html5QrCodeRef.current;
    if (instance) {
      try {
        if (instance.isScanning) {
          await instance.stop();
        }
      } catch {
        // Ignore camera stop race when stream is already closed
      }
      try {
        instance.clear();
      } catch {
        // Ignore clear errors on unmounted container
      }
      html5QrCodeRef.current = null;
    }
    setIsScanning(false);
  }, []);

  useEffect(() => {
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      const instance = html5QrCodeRef.current;
      if (instance && instance.isScanning) {
        instance.stop().catch(() => {});
      }
    };
  }, []);

  const lookupParticipant = useCallback(
    async (rawPayload: string) => {
      await stopScanner();
      setLookingUp(true);
      setFlashMessage(null);

      try {
        const res = await getParticipantByQR(rawPayload);
        if (!res.success || !res.profile) {
          showFlash(
            "error",
            res.error ||
              "Could not locate participant for this Master Pass or ID."
          );
          return;
        }

        setScannedParticipant({
          profile: res.profile,
          registrations: res.registrations || [],
        });
        showFlash(
          "info",
          `Master Pass Verified: ${res.profile.name} (${res.profile.participantId})`
        );
      } catch {
        showFlash("error", "Error looking up participant in MongoDB.");
      } finally {
        setLookingUp(false);
      }
    },
    [showFlash, stopScanner]
  );

  const processDecodedQR = useCallback(
    async (decodedText: string) => {
      playBeep();
      await lookupParticipant(decodedText);
    },
    [lookupParticipant, playBeep]
  );

  const startScanner = useCallback(async () => {
    setFlashMessage(null);
    setScannedParticipant(null);

    try {
      await stopScanner();
      const { Html5Qrcode: Html5QrcodeCtor } = await import("html5-qrcode");
      const qr = new Html5QrcodeCtor("reader");
      html5QrCodeRef.current = qr;

      await qr.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          void processDecodedQR(decodedText);
        },
        () => {
          // Per-frame scan misses are intentionally ignored
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error("[Camera start error]:", err);
      setIsScanning(false);
      showFlash(
        "error",
        "Unable to access camera. Allow camera permissions or use the Manual Participant ID lookup below."
      );
    }
  }, [processDecodedQR, showFlash, stopScanner]);

  const handleManualSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = manualId.trim();
    if (!trimmed) {
      showFlash(
        "error",
        "Enter a Participant ID (e.g. MIL-2026-7979 or 7979) to search."
      );
      return;
    }

    await lookupParticipant(trimmed);
  };

  const resetToScannerView = useCallback(async () => {
    await stopScanner();
    setScannedParticipant(null);
    setFlashMessage(null);
    setManualId("");
  }, [stopScanner]);

  const handleMarkAttendance = async (registrationId: string) => {
    if (!scannedParticipant) return;
    setBusyRegId(registrationId);

    try {
      const res = await markEventAttendance(registrationId);
      if (!res.success || !res.registration) {
        showFlash("error", res.error || "Failed to mark attendance.");
        if (res.registration) {
          setScannedParticipant((prev) =>
            prev
              ? {
                  ...prev,
                  registrations: prev.registrations.map((r) =>
                    r._id === registrationId ? res.registration! : r
                  ),
                }
              : prev
          );
        }
        return;
      }

      playBeep();
      const updatedReg = res.registration;
      setScannedParticipant((prev) =>
        prev
          ? {
              ...prev,
              registrations: prev.registrations.map((r) =>
                r._id === registrationId ? updatedReg : r
              ),
            }
          : prev
      );
      showFlash(
        "success",
        `Attendance marked for ${updatedReg.eventName} (${updatedReg.attendedAt})!`
      );
      await onRefreshStats();
    } catch {
      showFlash("error", "Network error marking attendance.");
    } finally {
      setBusyRegId(null);
    }
  };

  return (
    <motion.div
      key="scanner"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="max-w-xl w-full mx-auto my-auto p-4 sm:p-6"
    >
      <div className="rounded-3xl bg-gradient-to-b from-[#24100a]/95 to-[#140704]/98 border border-amber-500/30 p-5 sm:p-6 space-y-5 shadow-2xl">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 block">
              Registration Desk Gate
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white font-cinzel mt-0.5 flex items-center gap-2 uppercase tracking-wide">
              <QrCode className="w-5 h-5 text-amber-400" />
              <span>MASTER PASS SCANNER</span>
            </h2>
          </div>

          {!scannedParticipant && isScanning && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          )}
        </div>

        {/* Flash Message Overlay Banner */}
        <AnimatePresence>
          {flashMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`rounded-2xl border px-4 py-3 flex items-center gap-2.5 text-xs sm:text-sm font-medium shadow-xl backdrop-blur-xl ${
                flashMessage.type === "success"
                  ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-200"
                  : flashMessage.type === "error"
                  ? "bg-rose-950/90 border-rose-500/50 text-rose-200"
                  : "bg-amber-950/90 border-amber-500/50 text-amber-200"
              }`}
            >
              {flashMessage.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : flashMessage.type === "error" ? (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : (
                <ScanLine className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span>{flashMessage.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {!scannedParticipant ? (
          /* ================================================================
             CAMERA VIEWPORT + MANUAL PARTICIPANT ID LOOKUP
             ================================================================ */
          <div className="space-y-5">
            {/* Larger Mobile-Responsive Square Viewfinder */}
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square mx-auto rounded-2xl overflow-hidden bg-black/75 border border-amber-500/30 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.65)]">
              <div
                id="reader"
                className="w-full h-full [&_video]:w-full [&_video]:h-full [&_video]:object-cover"
              />

              {!isScanning && !lookingUp && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 pointer-events-none">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-400/35 flex items-center justify-center text-amber-300">
                    <Camera className="w-8 h-8" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xs leading-relaxed">
                    Tap <strong className="text-amber-300">START SCANNING</strong>{" "}
                    and hold a participant&apos;s Master Pass QR inside the
                    frame, or enter their ID below.
                  </p>
                </div>
              )}

              {lookingUp && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-10">
                  <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
                  <p className="text-xs font-mono uppercase tracking-wider text-amber-200">
                    Verifying Participant Record...
                  </p>
                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div>
              {isScanning ? (
                <button
                  type="button"
                  onClick={() => void stopScanner()}
                  className="w-full py-3.5 rounded-xl bg-rose-600/25 hover:bg-rose-600/35 border border-rose-500/50 text-rose-200 font-bold text-xs sm:text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <StopCircle className="w-4 h-4" />
                  <span>STOP CAMERA</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={lookingUp}
                  onClick={() => void startScanner()}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:brightness-110 text-black font-extrabold text-xs sm:text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] active:scale-[0.98] disabled:opacity-60"
                >
                  <Camera className="w-4 h-4" />
                  <span>START SCANNING</span>
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-amber-500/20" />
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-300/75">
                OR MANUAL PARTICIPANT ID
              </span>
              <div className="h-px flex-1 bg-amber-500/20" />
            </div>

            {/* Manual Participant ID Lookup Form */}
            <form onSubmit={handleManualSearch} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  disabled={lookingUp}
                  placeholder="Enter Participant ID (e.g. MIL-2026-7979)"
                  aria-label="Manual Participant ID lookup"
                  className="w-full sm:flex-1 bg-[#140705] border border-amber-500/30 focus:border-amber-400 text-amber-100 placeholder:text-amber-200/35 rounded-xl px-4 py-3 uppercase font-mono text-xs sm:text-sm outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={lookingUp || !manualId.trim()}
                  className="px-5 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 hover:text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 disabled:opacity-50"
                >
                  {lookingUp ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span>Search / Check-In</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400 text-center sm:text-left">
                Supports full IDs (e.g. <code className="text-amber-300">MLP-2026-7979</code>{" "}
                / <code className="text-amber-300">MIL-2026-7979</code>) or the 4-digit
                suffix (<code className="text-amber-300">7979</code>).
              </p>
            </form>
          </div>
        ) : (
          /* ================================================================
             SCANNED / SEARCHED PARTICIPANT DETAILS & ATTENDANCE PANEL
             ================================================================ */
          <div className="space-y-5">
            {/* Identity Header */}
            <div className="rounded-2xl bg-[#1a0b07]/95 border border-amber-500/35 p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  {scannedParticipant.profile.image ? (
                    <img
                      src={scannedParticipant.profile.image}
                      alt={scannedParticipant.profile.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-2xl border-2 border-amber-400/60 object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400/50 flex items-center justify-center text-amber-300 text-xl font-cinzel font-bold shrink-0">
                      {scannedParticipant.profile.name.charAt(0)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 mb-1">
                      {scannedParticipant.profile.participantId}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-cinzel truncate">
                      {scannedParticipant.profile.name}
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300">
                  {
                    scannedParticipant.registrations.filter((r) => r.attended)
                      .length
                  }{" "}
                  / {scannedParticipant.registrations.length} Attended
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-amber-500/15 text-xs text-slate-300">
                <p className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">
                    {scannedParticipant.profile.email}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono">
                    {scannedParticipant.profile.phone || "No phone"}
                  </span>
                </p>
                <p className="flex items-center gap-2 truncate">
                  <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">
                    {scannedParticipant.profile.college || "—"}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{scannedParticipant.profile.year || "—"}</span>
                </p>
              </div>
            </div>

            {/* Registered Event Action Buttons */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Registered Events &amp; Stage Check-In (
                {scannedParticipant.registrations.length})
              </h4>

              {scannedParticipant.registrations.length === 0 ? (
                <p className="text-xs text-slate-400 p-4 rounded-2xl bg-black/40 border border-white/10">
                  This participant has no active event entries.
                </p>
              ) : (
                <div className="space-y-3">
                  {scannedParticipant.registrations.map((reg) => (
                    <div
                      key={reg._id}
                      className={`rounded-2xl border p-4 space-y-3 transition-all ${
                        reg.attended
                          ? "bg-emerald-950/25 border-emerald-500/40"
                          : "bg-black/45 border-amber-500/25"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-400/30 shrink-0">
                            <EventStageIcon
                              eventName={reg.eventName}
                              category={reg.category}
                            />
                          </div>
                          <div className="min-w-0">
                            <h5 className="text-sm sm:text-base font-bold text-white font-serif leading-snug">
                              {reg.eventName}
                            </h5>
                            <p className="text-[11px] font-mono text-amber-200/80 mt-0.5">
                              {reg.category} • Role: {reg.role}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border shrink-0 ${
                            reg.status === "Verified"
                              ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/35"
                              : "bg-amber-500/15 text-amber-300 border-amber-400/35"
                          }`}
                        >
                          {reg.status}
                        </span>
                      </div>

                      {/* Team / Band Roster Details Box */}
                      {(reg.teamName || reg.teamMembers.length > 0) && (
                        <div className="rounded-xl bg-[#1a0b07]/90 border border-amber-500/20 p-3 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5" />
                              Team / Band Details
                            </span>
                            {reg.teamName && (
                              <span className="text-xs font-bold text-white">
                                {reg.teamName}
                              </span>
                            )}
                          </div>

                          {reg.teamMembers.length > 0 && (
                            <ul className="space-y-1 pt-1 border-t border-amber-500/15">
                              {reg.teamMembers.map((member, mIdx) => (
                                <li
                                  key={`${member.name}-${mIdx}`}
                                  className="flex items-center justify-between gap-2 text-xs text-slate-200"
                                >
                                  <span className="font-medium truncate">
                                    {mIdx + 1}. {member.name}
                                  </span>
                                  <span className="font-mono text-amber-300 shrink-0">
                                    {member.phone}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      <ActionButton
                        registration={reg}
                        busy={busyRegId === reg._id}
                        onMark={(id) => void handleMarkAttendance(id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reset Back to Scanner / Manual Lookup */}
            <div className="pt-2 border-t border-amber-500/15">
              <button
                type="button"
                onClick={() => void resetToScannerView()}
                className="w-full py-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-200 hover:text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
              >
                <span>← Back to Scanner / Search Next</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
