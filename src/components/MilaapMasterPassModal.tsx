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
  getMilaapMandalaDataUrl,
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
  mandalaDataUrl?: string;
  forPdf?: boolean;
}

/**
 * Milaap Edition I Official Participant Master Pass (`ticketRef`).
 * Preserves the original Milaap maroon tapestry & golden folk-musician mural
 * backdrop with top/bottom lotus floral borders, overlays ONE centered static
 * Mandala Lotus behind the middle content, and aligns all labels, event lineup
 * pills, and footer venue lines cleanly without wrapping cracks.
 */
export const MilaapMasterPassCard = forwardRef<
  HTMLDivElement,
  MilaapMasterPassCardProps
>(function MilaapMasterPassCard(
  { participant, liveEvents, bgDataUrl, mandalaDataUrl, forPdf = false },
  ref
) {
  const effectiveEvents = liveEvents ?? participant.events;
  const bgSrc = bgDataUrl || "/milaap-bg.jpeg";
  const mandalaSrc = mandalaDataUrl || "/mandala.svg";

  const qrPayload = JSON.stringify({
    email: participant.email,
    participantId: participant.participantId,
    app: "MILAAP_26",
  });

  return (
    <div
      ref={ref}
      className={`${
        forPdf ? "w-[520px]" : "w-full max-w-[520px]"
      } min-h-[840px] p-10 sm:p-11 rounded-none border-2 border-amber-500/85 bg-[#2b050a] relative overflow-hidden flex flex-col justify-between ${
        forPdf ? "" : "shadow-[0_0_45px_rgba(245,158,11,0.28)]"
      }`}
    >
      {/* Original Milaap Webpage Backdrop Artwork cropped cleanly to outer border */}
      <img
        src={bgSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
      />

      {/* Light Warm Maroon Readability Tint */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(43,5,10,0.42) 0%, rgba(28,4,8,0.48) 52%, rgba(20,3,6,0.58) 100%)",
        }}
      />

      {/* ONLY ONE Centered Static Mandala Lotus Snapshot behind middle pass content */}
      <img
        src={mandalaSrc}
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] object-contain pointer-events-none select-none opacity-25"
      />

      {/* Inner Golden Square Frame set at a clear 28px distance from the outer pass edge */}
      <div
        aria-hidden="true"
        className="absolute inset-7 border border-amber-400/50 rounded-none pointer-events-none z-10"
      />

      {/* 4 Gold Corner L-Brackets hugging the inner square corners */}
      <span
        aria-hidden="true"
        className="absolute top-7 left-7 w-6 h-6 border-t-2 border-l-2 border-amber-400 pointer-events-none z-20"
      />
      <span
        aria-hidden="true"
        className="absolute top-7 right-7 w-6 h-6 border-t-2 border-r-2 border-amber-400 pointer-events-none z-20"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-7 left-7 w-6 h-6 border-b-2 border-l-2 border-amber-400 pointer-events-none z-20"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-7 right-7 w-6 h-6 border-b-2 border-r-2 border-amber-400 pointer-events-none z-20"
      />

      {/* Inner Pass Content Container */}
      <div className="relative z-20 flex-1 flex flex-col justify-between py-1 px-1">
        {/* Top Regal Header */}
        <div className="text-center pt-2">
          <p
            className="text-base sm:text-xl tracking-[0.18em] sm:tracking-[0.22em] font-extrabold text-amber-200 whitespace-nowrap"
            style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.85)" }}
          >
            JUMC x JUDF Present
          </p>

          <h2 id="master-pass-title" className="flex flex-col items-center">
            <span
              className="h-14 sm:h-16 my-1.5 flex items-center justify-center font-samarkan MilaapFont lowercase text-5xl sm:text-6xl leading-none tracking-tight select-none"
              style={{
                fontFamily: "'Samarkan', sans-serif",
                color: "#FCD34D",
                textShadow: "0 3px 14px rgba(245, 158, 11, 0.55)",
                fontFeatureSettings: '"kern" 1',
              }}
            >
              milaap
            </span>
            <span className="text-xs sm:text-sm font-serif font-bold tracking-[0.25em] text-amber-200/95 whitespace-nowrap">
              — EDITION I —
            </span>
          </h2>

          <p className="text-xs sm:text-sm font-bold tracking-[0.22em] text-amber-400 mt-1 whitespace-nowrap">
            OFFICIAL PARTICIPANT MASTER PASS
          </p>
        </div>

        {/* Wide Participant Details Box (no blur so backdrop & lotus stay crisp) */}
        <div className="w-full p-5 sm:p-6 rounded-2xl bg-[#180704]/85 border border-amber-500/30 text-left space-y-4 my-4">
          {/* Row 1: Name & Milaap ID cleanly aligned on single lines */}
          <div className="grid grid-cols-[1.2fr_1fr] gap-4 items-start">
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold tracking-widest text-amber-400/90 uppercase mb-1 h-5 flex items-center leading-none">
                PARTICIPANT NAME
              </p>
              <p className="text-lg sm:text-xl font-bold text-white whitespace-nowrap truncate leading-snug">
                {participant.name}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold tracking-widest text-amber-400/90 uppercase mb-1 h-5 flex items-center gap-1.5 leading-none">
                <span
                  className="font-samarkan MilaapFont lowercase normal-case text-sm sm:text-base leading-none"
                  style={{
                    fontFamily: "'Samarkan', sans-serif",
                    color: "#FCD34D",
                  }}
                >
                  milaap
                </span>
                <span>ID</span>
              </p>
              <p className="text-lg sm:text-xl font-mono font-bold text-amber-400 whitespace-nowrap truncate leading-snug">
                {participant.participantId}
              </p>
            </div>
          </div>

          {/* Row 2: Phone Number & Registered Events */}
          <div className="grid grid-cols-[1.2fr_1fr] gap-4 items-start pt-3 border-t border-amber-500/20">
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold tracking-widest text-amber-400/90 uppercase mb-1 leading-none">
                PHONE NUMBER
              </p>
              <p className="text-sm sm:text-base font-medium font-mono text-stone-100 whitespace-nowrap truncate">
                {participant.phone || "Not set"}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold tracking-widest text-amber-400/90 uppercase mb-1 leading-none">
                REGISTERED EVENTS
              </p>
              <p className="text-sm sm:text-base font-bold text-emerald-400 whitespace-nowrap">
                {effectiveEvents.length}{" "}
                {effectiveEvents.length === 1 ? "Event" : "Events"}
              </p>
            </div>
          </div>

          {/* Row 3: Institution / Year */}
          <div className="pt-3 border-t border-amber-500/20 min-w-0">
            <p className="text-[11px] sm:text-xs font-bold tracking-widest text-amber-400/90 uppercase mb-1 leading-none">
              INSTITUTION / YEAR
            </p>
            <p className="text-sm sm:text-base font-medium text-stone-100 whitespace-nowrap truncate">
              {[participant.college, participant.year]
                .filter(Boolean)
                .join(" • ") || "Jadavpur University Delegate"}
            </p>
          </div>

          {/* Row 4: Intact Non-Cracking Event Lineup Pills */}
          {effectiveEvents.length > 0 && (
            <div className="pt-3 border-t border-amber-500/20 space-y-1.5">
              <p className="text-[11px] sm:text-xs font-bold tracking-widest text-amber-400/90 uppercase leading-none">
                EVENT LINEUP
              </p>
              <div className="flex flex-wrap gap-2.5 items-center pt-1">
                {effectiveEvents.map((ev) => (
                  <span
                    key={ev.eventSlug}
                    className="inline-flex items-center justify-center whitespace-nowrap h-auto min-h-[32px] px-3.5 py-1.5 rounded-lg bg-[#2a0f08] border border-amber-500/40 text-amber-100 text-xs sm:text-sm font-semibold leading-none shadow-sm"
                  >
                    {ev.eventName}
                    {ev.teamName ? ` [${ev.teamName}]` : ""}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Prominent Scannable QR Code (size=200) */}
        <div className="mx-auto w-fit p-3.5 bg-[#fdf8f0] rounded-2xl border-2 border-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.3)] my-1.5">
          <QRCodeSVG
            value={qrPayload}
            size={200}
            bgColor="#fdf8f0"
            fgColor="#1a0b07"
            level="H"
          />
        </div>

        {/* Centered Single-Line Venue Footer */}
        <div className="border-t border-amber-500/30 pt-3.5 mt-3 text-center space-y-1 pb-2">
          <p className="text-xs sm:text-sm font-medium text-stone-100 leading-relaxed">
            Present this single{" "}
            <span
              className="font-samarkan MilaapFont lowercase text-base px-0.5"
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
          <p className="flex items-center justify-center gap-2 whitespace-nowrap text-xs sm:text-sm font-semibold text-amber-400 mt-2">
            <Music className="w-4 h-4 text-amber-400 shrink-0" />
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="whitespace-nowrap">
              Jadavpur University, Kolkata
            </span>
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
  const pdfCaptureRef = useRef<HTMLDivElement | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [bgDataUrl, setBgDataUrl] = useState<string | undefined>(undefined);
  const [mandalaDataUrl, setMandalaDataUrl] = useState<string | undefined>(
    undefined
  );
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([getMilaapPassBgDataUrl(), getMilaapMandalaDataUrl()]).then(
      ([bg, mandala]) => {
        if (!active) return;
        if (bg) setBgDataUrl(bg);
        if (mandala) setMandalaDataUrl(mandala);
      }
    );
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
    if (isDownloading) return;

    setIsDownloading(true);
    setFeedback(null);
    try {
      const [bg, mandala] = await Promise.all([
        bgDataUrl ? Promise.resolve(bgDataUrl) : getMilaapPassBgDataUrl(),
        mandalaDataUrl
          ? Promise.resolve(mandalaDataUrl)
          : getMilaapMandalaDataUrl(),
      ]);
      if (bg && !bgDataUrl) setBgDataUrl(bg);
      if (mandala && !mandalaDataUrl) setMandalaDataUrl(mandala);

      for (let frame = 0; frame < 6; frame += 1) {
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve())
        );
        if (pdfCaptureRef.current) break;
      }

      const targetEl = pdfCaptureRef.current || ticketRef.current;
      if (!targetEl) {
        throw new Error("Pass element unavailable for PDF export.");
      }

      await downloadMasterPassPdf(targetEl, participant.name);
      setFeedback({
        type: "success",
        text: "Official Master Pass downloaded as full-page PDF!",
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
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Transparent click-outside backdrop (keeps webpage artwork visible) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => !isDownloading && onClose()}
        className="fixed inset-0 bg-transparent -z-10 transform-gpu"
      />

      {/* Fixed 520px Offscreen Capture Surface so every viewport exports full-bleed PDF */}
      {isDownloading && (
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
            ref={pdfCaptureRef}
            participant={participant}
            liveEvents={liveEvents}
            bgDataUrl={bgDataUrl}
            mandalaDataUrl={mandalaDataUrl}
            forPdf
          />
        </div>
      )}

      {/* Modal Inner Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 18 }}
        transition={{ type: "spring", stiffness: 290, damping: 26 }}
        style={{ willChange: "transform, opacity" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="master-pass-title"
        className="relative flex flex-col items-center gap-4 my-auto w-full max-w-[520px] transform-gpu"
      >
        <MilaapMasterPassCard
          ref={ticketRef}
          participant={participant}
          liveEvents={liveEvents}
          bgDataUrl={bgDataUrl}
          mandalaDataUrl={mandalaDataUrl}
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
        <div className="flex flex-wrap items-center justify-center gap-3 pb-2">
          <button
            type="button"
            disabled={isDownloading}
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-amber-400 to-amber-600 hover:brightness-110 text-black font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all text-xs sm:text-sm cursor-pointer disabled:opacity-60 active:scale-95"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating Full-Page PDF...</span>
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
