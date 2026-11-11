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
  RefreshCw,
  ScanLine,
  StopCircle,
  Upload,
  Users,
} from "lucide-react";
import EventAttendanceCounterBar from "@/components/EventAttendanceCounterBar";
import {
  getParticipantByQR,
  markEventAttendance,
  type EventAttendanceStat,
  type ScannedParticipantProfile,
  type ScannedRegistrationItem,
} from "@/app/admin/dashboard/actions";

interface AdminQrScannerProps {
  attendanceStats: EventAttendanceStat[];
  loadingStats?: boolean;
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

/**
 * Renders PDF page 1 onto an offscreen canvas using pdfjs-dist and converts it
 * to crisp PNG Files (full page + zoomed QR crop fallback) so Html5Qrcode can
 * reliably decode QR passes uploaded as PDFs.
 */
async function convertPdfFirstPageToPngFiles(
  pdfFile: File
): Promise<{ fullFile: File; qrCropFile: File | null }> {
  const buffer = await pdfFile.arrayBuffer();
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
  });
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 3 });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context unavailable for PDF rendering.");
  }
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);

  await page.render({
    canvas,
    canvasContext: ctx,
    viewport,
  }).promise;

  const fullBlob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png", 1)
  );
  if (!fullBlob) {
    throw new Error("Could not convert rendered PDF pass into image.");
  }
  const fullFile = new File([fullBlob], "milaap-pass-page1.png", {
    type: "image/png",
  });

  // Also extract zoomed bottom-half QR region as a fallback if full-page scan
  // has surrounding pass typography that confuses ZXing at low contrasts.
  let qrCropFile: File | null = null;
  const cropX = Math.floor(canvas.width * 0.12);
  const cropY = Math.floor(canvas.height * 0.45);
  const cropW = Math.floor(canvas.width * 0.76);
  const cropH = Math.floor(canvas.height * 0.48);

  if (cropW > 60 && cropH > 60) {
    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = cropW;
    cropCanvas.height = cropH;
    const cropCtx = cropCanvas.getContext("2d");
    if (cropCtx) {
      cropCtx.drawImage(
        canvas,
        cropX,
        cropY,
        cropW,
        cropH,
        0,
        0,
        cropW,
        cropH
      );
      const cropBlob = await new Promise<Blob | null>((resolve) =>
        cropCanvas.toBlob(resolve, "image/png", 1)
      );
      if (cropBlob) {
        qrCropFile = new File([cropBlob], "milaap-pass-qr-crop.png", {
          type: "image/png",
        });
      }
    }
  }

  return { fullFile, qrCropFile };
}

export default function AdminQrScanner({
  attendanceStats,
  loadingStats = false,
  onRefreshStats,
}: AdminQrScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);
  const [busyRegId, setBusyRegId] = useState<string | null>(null);
  const [scannedParticipant, setScannedParticipant] =
    useState<ScannedParticipantState | null>(null);
  const [flashMessage, setFlashMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
      // Audio playback skipped cleanly if blocked by browser autoplay policy
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
        // Ignore scanner stop race when camera stream already closed
      }
      try {
        instance.clear();
      } catch {
        // Ignore clear errors on detached DOM
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

  const processDecodedQR = useCallback(
    async (decodedText: string) => {
      playBeep();
      await stopScanner();
      setLookingUp(true);
      setFlashMessage(null);

      try {
        const res = await getParticipantByQR(decodedText);
        if (!res.success || !res.profile) {
          showFlash(
            "error",
            res.error || "Could not locate participant for this QR pass."
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
        showFlash("error", "Error looking up Master Pass in MongoDB.");
      } finally {
        setLookingUp(false);
      }
    },
    [playBeep, showFlash, stopScanner]
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
          // Per-frame non-match callbacks intentionally ignored
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error("[Camera start error]:", err);
      setIsScanning(false);
      showFlash(
        "error",
        "Unable to access camera. Check permissions or upload the participant's PDF pass directly."
      );
    }
  }, [processDecodedQR, showFlash, stopScanner]);

  const resetScanner = useCallback(async () => {
    setScannedParticipant(null);
    setFlashMessage(null);
    await startScanner();
  }, [startScanner]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setIsProcessingFile(true);
    setFlashMessage(null);

    try {
      await stopScanner();
      const isPdf =
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf");

      const { Html5Qrcode: Html5QrcodeCtor } = await import("html5-qrcode");
      const qr = new Html5QrcodeCtor("reader");
      html5QrCodeRef.current = qr;

      let decodedText = "";
      if (isPdf) {
        const { fullFile, qrCropFile } = await convertPdfFirstPageToPngFiles(
          file
        );
        try {
          decodedText = await qr.scanFile(fullFile, false);
        } catch (firstErr) {
          if (qrCropFile) {
            decodedText = await qr.scanFile(qrCropFile, false);
          } else {
            throw firstErr;
          }
        }
      } else {
        decodedText = await qr.scanFile(file, false);
      }

      try {
        qr.clear();
      } catch {
        // Ignore clear on file scan
      }
      html5QrCodeRef.current = null;

      await processDecodedQR(decodedText);
    } catch (err) {
      if (html5QrCodeRef.current) {
        try {
          html5QrCodeRef.current.clear();
        } catch {
          // Ignore clear errors
        }
        html5QrCodeRef.current = null;
      }
      console.error("[QR File scan error]:", err);
      showFlash(
        "error",
        "No valid Milaap Master Pass QR code found in the uploaded PDF/image."
      );
    } finally {
      setIsProcessingFile(false);
    }
  };

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
      className="space-y-8"
    >
      {/* Per-Event Registration vs Attendance Stats Bar */}
      <EventAttendanceCounterBar stats={attendanceStats} loading={loadingStats} />

      {/* Flash Message Overlay / Banner */}
      <AnimatePresence>
        {flashMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`rounded-2xl border px-5 py-3.5 flex items-center gap-3 text-xs sm:text-sm font-medium shadow-xl backdrop-blur-xl ${
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

      {/* Main Scanner & Verification Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Camera Feed & PDF Upload Control */}
        <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#24100a]/90 to-[#140704]/95 border border-amber-500/30 p-6 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 block">
                Registration Desk Gate
              </span>
              <h2 className="text-lg font-bold text-white font-cinzel mt-0.5 flex items-center gap-2">
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Master Pass Scanner</span>
              </h2>
            </div>

            {isScanning && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            )}
          </div>

          {/* Mounted Html5Qrcode Target Container */}
          <div className="relative rounded-2xl overflow-hidden bg-black/70 border border-amber-500/25 min-h-[260px] flex flex-col items-center justify-center">
            <div id="reader" className="w-full" />

            {!isScanning && !lookingUp && !isProcessingFile && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 pointer-events-none">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-400/35 flex items-center justify-center text-amber-300">
                  <Camera className="w-7 h-7" />
                </div>
                <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
                  Point the desk camera at a participant&apos;s{" "}
                  <strong className="text-amber-300">
                    Milaap Master Pass
                  </strong>{" "}
                  or upload their downloaded PDF pass below.
                </p>
              </div>
            )}

            {(lookingUp || isProcessingFile) && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-10">
                <Loader2 className="w-7 h-7 text-amber-400 animate-spin" />
                <p className="text-xs font-mono uppercase tracking-wider text-amber-200">
                  {isProcessingFile
                    ? "Decoding Uploaded PDF Pass..."
                    : "Fetching Participant Registrations..."}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {isScanning ? (
              <button
                type="button"
                onClick={() => void stopScanner()}
                className="w-full py-3 rounded-xl bg-rose-600/25 hover:bg-rose-600/35 border border-rose-500/50 text-rose-200 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <StopCircle className="w-4 h-4" />
                <span>STOP CAMERA</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={lookingUp || isProcessingFile}
                onClick={() => void startScanner()}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:brightness-110 text-black font-extrabold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] active:scale-[0.98] disabled:opacity-60"
              >
                <Camera className="w-4 h-4" />
                <span>START SCANNING</span>
              </button>
            )}

            <button
              type="button"
              disabled={lookingUp || isProcessingFile}
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/35 text-amber-200 hover:text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Pass (PDF / Image)</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Scanned Participant & Interactive Event Action Buttons */}
        <div className="lg:col-span-7 rounded-3xl bg-white/5 backdrop-blur-md border border-amber-500/25 p-6 sm:p-7 space-y-6 shadow-2xl">
          {!scannedParticipant ? (
            <div className="py-16 px-4 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <ScanLine className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 max-w-md">
                <h3 className="text-base sm:text-lg font-bold text-white font-cinzel">
                  Ready for Check-In
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  Scan a participant&apos;s Master Pass QR code or upload their
                  PDF pass to view all registered competitions, verify team
                  rosters, and mark stage attendance.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Scanned Participant Identity Header */}
              <div className="rounded-2xl bg-[#1a0b07]/95 border border-amber-500/35 p-5 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-amber-500/15 text-xs text-slate-300">
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

              {/* Dynamic Registered Event Cards + Interactive Attendance Action Buttons */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                  Registered Events &amp; Stage Check-In (
                  {scannedParticipant.registrations.length})
                </h4>

                {scannedParticipant.registrations.length === 0 ? (
                  <p className="text-xs text-slate-400 p-4 rounded-2xl bg-black/40 border border-white/10">
                    This participant has no active event entries.
                  </p>
                ) : (
                  <div className="space-y-3.5">
                    {scannedParticipant.registrations.map((reg) => (
                      <div
                        key={reg._id}
                        className={`rounded-2xl border p-4 sm:p-5 space-y-3.5 transition-all ${
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

                        {/* Team / Band Roster Verification Box */}
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

              {/* Scan Next Participant CTA */}
              <div className="pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => void resetScanner()}
                  className="w-full py-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-200 hover:text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>SCAN NEXT PARTICIPANT</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

