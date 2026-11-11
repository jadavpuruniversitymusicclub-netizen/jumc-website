"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  AlertTriangle,
  CheckCircle2,
  FileDown,
  Loader2,
  MapPin,
  Music,
  X,
} from "lucide-react";
import type { MyEventItem } from "@/app/api/milaap/my-events/route";

export interface MasterPassParticipant {
  name: string;
  email: string;
  phone?: string;
  college?: string;
  year?: string;
  participantId: string;
  events: Array<{
    eventSlug: string;
    eventName: string;
    teamName?: string;
  }>;
}

interface MilaapMasterPassModalProps {
  open: boolean;
  participant: MasterPassParticipant | null;
  liveEvents?: MyEventItem[];
  onClose: () => void;
}

export default function MilaapMasterPassModal({
  open,
  participant,
  liveEvents,
  onClose,
}: MilaapMasterPassModalProps) {
  return (
    <AnimatePresence>
      {open && participant && (
        <MasterPassDialog
          participant={participant}
          liveEvents={liveEvents}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}

function MasterPassDialog({
  participant,
  liveEvents,
  onClose,
}: {
  participant: MasterPassParticipant;
  liveEvents?: MyEventItem[];
  onClose: () => void;
}) {
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isDownloading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDownloading, onClose]);

  const effectiveEvents =
    liveEvents && liveEvents.length > 0
      ? liveEvents
      : liveEvents && liveEvents.length === 0
      ? []
      : participant.events;

  const qrPayload = JSON.stringify({
    email: participant.email,
    participantId: participant.participantId,
    app: "MILAAP_26",
  });

  const handleDownloadPDF = async () => {
    if (!ticketRef.current || isDownloading) return;

    setIsDownloading(true);
    setFeedback(null);
    try {
      const [{ toPng }, { jsPDF }] = await Promise.all([
        import("html-to-image"),
        import("jspdf"),
      ]);

      const el = ticketRef.current;
      const dataUrl = await toPng(el, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#120604",
        skipFonts: true,
        skipAutoScale: true,
      });

      const pageW = 420;
      const pageH = 680;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [pageW, pageH],
      });

      // Fill dark maroon/espresso base background seamlessly
      pdf.setFillColor(18, 6, 4);
      pdf.rect(0, 0, pageW, pageH, "F");

      const rectWidth = el.offsetWidth || 400;
      const rectHeight = el.offsetHeight || 620;
      const padding = 10;
      const availW = pageW - padding * 2;
      const availH = pageH - padding * 2;
      const scale = Math.min(availW / rectWidth, availH / rectHeight);
      const drawW = rectWidth * scale;
      const drawH = rectHeight * scale;
      const offsetX = (pageW - drawW) / 2;
      const offsetY = (pageH - drawH) / 2;

      pdf.addImage(dataUrl, "PNG", offsetX, offsetY, drawW, drawH);

      const safeName = (participant.name || "Participant")
        .trim()
        .replace(/\s+/g, "_");
      pdf.save(`Milaap26_MasterPass_${safeName}.pdf`);

      setFeedback({
        type: "success",
        text: "Official Master Pass downloaded as PDF!",
      });
    } catch (error) {
      console.error("[MasterPass PDF download error]:", error);
      setFeedback({
        type: "error",
        text: "Failed to generate PDF pass. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => !isDownloading && onClose()}
        className="fixed inset-0 bg-black/85 backdrop-blur-md -z-10 transform-gpu"
      />

      {/* Modal Inner Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 290, damping: 26 }}
        style={{ willChange: "transform, opacity" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="master-pass-title"
        className="relative flex flex-col items-center gap-4 my-auto transform-gpu"
      >
        {/* ================================================================
            DOWNLOADABLE MILAAP MAROON & GOLD MASTER PASS (captured via ref)
            ================================================================ */}
        <div
          ref={ticketRef}
          className="w-[360px] sm:w-[400px] bg-gradient-to-b from-[#2a120a] via-[#1a0b07] to-[#120604] p-5 sm:p-6 relative overflow-hidden rounded-2xl border-2 border-amber-500/50 shadow-[0_0_55px_rgba(245,158,11,0.25)]"
        >
          {/* Warm Ambient Gold Radial Glows (SVG foreignObject safe) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.16), transparent 52%), radial-gradient(circle at 50% 100%, rgba(217,119,6,0.12), transparent 48%)",
            }}
          />

          {/* 4 Decorative Gold Corner Accents */}
          <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
          <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
          <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
          <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

          {/* Ornate Inner Double Border Container */}
          <div className="relative z-10 border border-amber-400/25 rounded-xl p-4 sm:p-5 space-y-4">
            {/* Regal Header */}
            <div className="text-center space-y-1">
              <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.26em] text-amber-300/85">
                JADAVPUR UNIVERSITY MUSIC CLUB
              </p>
              <h2
                id="master-pass-title"
                className="font-serif text-2xl sm:text-3xl font-bold text-amber-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)] tracking-wide"
              >
                MILAAP — EDITION I
              </h2>
              <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-amber-200/80">
                OFFICIAL PARTICIPANT MASTER PASS
              </p>
            </div>

            {/* Warm Translucent Participant Identity Card */}
            <div className="bg-[#24110b]/90 border border-amber-500/20 rounded-xl p-4 space-y-3 text-left">
              <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                <div className="min-w-0">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-amber-300/70">
                    PARTICIPANT NAME
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-stone-100 truncate mt-0.5">
                    {participant.name}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-amber-300/70">
                    PARTICIPANT ID
                  </p>
                  <p className="text-xs sm:text-sm font-mono font-bold text-amber-400 truncate mt-0.5">
                    {participant.participantId}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-amber-300/70">
                    PHONE NUMBER
                  </p>
                  <p className="text-xs font-mono text-stone-200 truncate mt-0.5">
                    {participant.phone || "Not set"}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-amber-300/70">
                    REGISTERED EVENTS
                  </p>
                  <p className="text-xs font-mono font-bold text-emerald-300 mt-0.5">
                    {effectiveEvents.length}{" "}
                    {effectiveEvents.length === 1 ? "Event" : "Events"}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-500/15">
                <p className="text-[9px] font-mono uppercase tracking-wider text-amber-300/70">
                  INSTITUTION / YEAR
                </p>
                <p className="text-[11px] sm:text-xs text-stone-200 font-medium mt-0.5 leading-snug">
                  {[participant.college, participant.year]
                    .filter(Boolean)
                    .join(" • ") || "Jadavpur University Delegate"}
                </p>
              </div>

              {effectiveEvents.length > 0 && (
                <div className="pt-2 border-t border-amber-500/15 space-y-1.5">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-amber-300/70">
                    EVENT LINEUP
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {effectiveEvents.map((ev) => (
                      <span
                        key={ev.eventSlug}
                        className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-400/30 text-amber-200"
                      >
                        {ev.eventName}
                        {ev.teamName ? ` [${ev.teamName}]` : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Unified Centered QR Code inside Cream/Ivory Frame */}
            <div className="bg-[#fdf8f0] p-4 rounded-xl border-2 border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.25)] mx-auto w-fit">
              <QRCodeSVG
                value={qrPayload}
                size={168}
                bgColor="#fdf8f0"
                fgColor="#1a0b07"
                level="H"
              />
            </div>

            {/* Regal Footer */}
            <div className="border-t border-amber-500/20 pt-3.5 text-center space-y-1.5">
              <p className="text-[11px] font-medium text-amber-100/85 leading-relaxed">
                Present this single Master Pass at the Registration &amp; Stage
                Desks for all your events.
              </p>
              <p className="text-[10px] font-mono text-amber-300/75 flex items-center justify-center gap-2 pt-0.5">
                <Music className="w-3 h-3 text-amber-400 shrink-0" />
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Jadavpur University, Kolkata</span>
              </p>
            </div>
          </div>
        </div>

        {/* Inline Download Feedback Banner (excluded from PDF) */}
        {feedback && (
          <div
            className={`px-4 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 ${
              feedback.type === "success"
                ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-200"
                : "bg-rose-950/90 border-rose-500/50 text-rose-200"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Control Actions (Excluded from PNG/PDF Capture) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            disabled={isDownloading}
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-amber-400 to-amber-600 hover:brightness-110 text-black font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all text-xs sm:text-sm cursor-pointer disabled:opacity-60 active:scale-95"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                <span>Download Master Pass (PDF)</span>
              </>
            )}
          </button>

          <button
            type="button"
            disabled={isDownloading}
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

