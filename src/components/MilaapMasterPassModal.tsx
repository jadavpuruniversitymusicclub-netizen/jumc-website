"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
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
import {
  downloadMasterPassPdf,
  getMilaapPassBgDataUrl,
} from "@/lib/masterPassPdf";

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

interface MilaapMasterPassCardProps {
  participant: MasterPassParticipant;
  liveEvents?: MyEventItem[];
  bgDataUrl?: string;
}

/**
 * Reusable Milaap Official Master Pass card used both inside the full preview
 * modal and offscreen during direct PDF downloads from the dashboard header.
 */
export const MilaapMasterPassCard = forwardRef<
  HTMLDivElement,
  MilaapMasterPassCardProps
>(function MilaapMasterPassCard({ participant, liveEvents, bgDataUrl }, ref) {
  const effectiveEvents = liveEvents ?? participant.events;

  const qrPayload = JSON.stringify({
    email: participant.email,
    participantId: participant.participantId,
    app: "MILAAP_26",
  });

  return (
    <div
      ref={ref}
      className="w-[360px] sm:w-[400px] bg-[#2b050a] p-5 sm:p-6 relative overflow-hidden rounded-2xl border-2 border-amber-500/60 shadow-[0_0_55px_rgba(245,158,11,0.28)]"
    >
      {/* Actual Milaap Webpage Tapestry Background Artwork */}
      <img
        src={bgDataUrl || "/milaap-bg.jpeg"}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none opacity-80"
      />

      {/* Warm Dark-Maroon Gradient Contrast Overlay matching /milaap/dashboard */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(43,5,10,0.72) 0%, rgba(28,4,8,0.68) 46%, rgba(16,3,6,0.88) 100%)",
        }}
      />

      {/* Ambient Golden Top & Bottom Radial Accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.18), transparent 52%), radial-gradient(circle at 50% 100%, rgba(217,119,6,0.14), transparent 48%)",
        }}
      />

      {/* Subtle Centered Samarkan Watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-samarkan MilaapFont lowercase text-[7.5rem] leading-none tracking-tight opacity-[0.06] -rotate-12"
          style={{
            fontFamily: "'Samarkan', sans-serif",
            color: "#FCD34D",
          }}
        >
          milaap
        </span>
      </div>

      {/* 4 Decorative Gold Corner Accents */}
      <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-400 pointer-events-none z-10" />
      <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-400 pointer-events-none z-10" />
      <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-400 pointer-events-none z-10" />
      <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-400 pointer-events-none z-10" />

      {/* Ornate Inner Double Border Container */}
      <div className="relative z-10 border border-amber-400/35 rounded-xl p-4 sm:p-5 space-y-4">
        {/* Regal Header with Samarkan Calligraphy */}
        <div className="text-center space-y-1">
          <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.26em] text-amber-300/90">
            JADAVPUR UNIVERSITY MUSIC CLUB
          </p>

          <h2
            id="master-pass-title"
            className="flex flex-col items-center justify-center pt-0.5"
          >
            <span
              className="font-samarkan MilaapFont lowercase text-4xl sm:text-[2.75rem] leading-none tracking-tight"
              style={{
                fontFamily: "'Samarkan', sans-serif",
                color: "#FCD34D",
                textShadow: "0 2px 14px rgba(245,158,11,0.5)",
                fontFeatureSettings: '"kern" 1',
              }}
            >
              milaap
            </span>
            <span className="mt-1 inline-flex items-center gap-2">
              <span className="h-px w-5 bg-amber-400/60" />
              <span className="font-serif text-[11px] font-bold uppercase tracking-[0.34em] text-amber-200">
                EDITION I
              </span>
              <span className="h-px w-5 bg-amber-400/60" />
            </span>
          </h2>

          <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-amber-200/85 pt-0.5">
            OFFICIAL PARTICIPANT MASTER PASS
          </p>
        </div>

        {/* High-Contrast Translucent Maroon Participant Identity Card */}
        <div className="bg-[#1b0509]/88 border border-amber-500/25 rounded-xl p-4 space-y-3 text-left shadow-inner">
          <div className="grid grid-cols-2 gap-x-3 gap-y-3">
            <div className="min-w-0">
              <p className="text-[9px] font-mono uppercase tracking-wider text-amber-300/75">
                PARTICIPANT NAME
              </p>
              <p className="text-xs sm:text-sm font-bold text-stone-100 truncate mt-0.5">
                {participant.name}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-mono uppercase tracking-wider text-amber-300/75">
                <span
                  className="font-samarkan MilaapFont lowercase text-xs mr-1"
                  style={{
                    fontFamily: "'Samarkan', sans-serif",
                    color: "#FCD34D",
                  }}
                >
                  milaap
                </span>
                ID
              </p>
              <p className="text-xs sm:text-sm font-mono font-bold text-amber-300 truncate mt-0.5">
                {participant.participantId}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-mono uppercase tracking-wider text-amber-300/75">
                PHONE NUMBER
              </p>
              <p className="text-xs font-mono text-stone-200 truncate mt-0.5">
                {participant.phone || "Not set"}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-mono uppercase tracking-wider text-amber-300/75">
                REGISTERED EVENTS
              </p>
              <p className="text-xs font-mono font-bold text-emerald-300 mt-0.5">
                {effectiveEvents.length}{" "}
                {effectiveEvents.length === 1 ? "Event" : "Events"}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-500/15">
            <p className="text-[9px] font-mono uppercase tracking-wider text-amber-300/75">
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
              <p className="text-[9px] font-mono uppercase tracking-wider text-amber-300/75">
                EVENT LINEUP
              </p>
              <div className="flex flex-wrap gap-1.5">
                {effectiveEvents.map((ev) => (
                  <span
                    key={ev.eventSlug}
                    className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-400/35 text-amber-100"
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
        <div className="bg-[#fdf8f0] p-4 rounded-xl border-2 border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.3)] mx-auto w-fit">
          <QRCodeSVG
            value={qrPayload}
            size={168}
            bgColor="#fdf8f0"
            fgColor="#1a0b07"
            level="H"
          />
        </div>

        {/* Regal Footer */}
        <div className="border-t border-amber-500/25 pt-3.5 text-center space-y-1.5">
          <p className="text-[11px] font-medium text-amber-100/90 leading-relaxed">
            Present this single{" "}
            <span
              className="font-samarkan MilaapFont lowercase text-sm px-0.5"
              style={{
                fontFamily: "'Samarkan', sans-serif",
                color: "#FCD34D",
              }}
            >
              milaap
            </span>{" "}
            Master Pass at the Registration &amp; Stage Desks for all your
            events.
          </p>
          <p className="text-[10px] font-mono text-amber-300/80 flex items-center justify-center gap-2 pt-0.5">
            <Music className="w-3 h-3 text-amber-400 shrink-0" />
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Jadavpur University, Kolkata</span>
          </p>
        </div>
      </div>
    </div>
  );
});

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
  const [bgDataUrl, setBgDataUrl] = useState<string | undefined>(undefined);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    getMilaapPassBgDataUrl().then((url) => {
      if (active && url) setBgDataUrl(url);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isDownloading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDownloading, onClose]);

  const handleDownloadPDF = async () => {
    if (!ticketRef.current || isDownloading) return;

    setIsDownloading(true);
    setFeedback(null);
    try {
      await downloadMasterPassPdf(ticketRef.current, participant.name);
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
        <MilaapMasterPassCard
          ref={ticketRef}
          participant={participant}
          liveEvents={liveEvents}
          bgDataUrl={bgDataUrl}
        />

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

        {/* Control Actions (Excluded from PDF Capture) */}
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
