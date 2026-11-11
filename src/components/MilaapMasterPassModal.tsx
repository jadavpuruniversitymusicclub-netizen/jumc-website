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
  mandalaDataUrl?: string;
  forPdf?: boolean;
}

/**
 * Milaap Edition I Official Participant Master Pass card (`ticketRef`).
 * Features a full-bleed warm maroon canvas (`#2b0d07`), an unblurred static
 * snapshot of the website Mandala flower (`/mandala.svg`), Samarkan logo
 * typography, enlarged identity cards, edge-aligned double gold borders, and
 * a high-density scannable QR code.
 */
export const MilaapMasterPassCard = forwardRef<
  HTMLDivElement,
  MilaapMasterPassCardProps
>(function MilaapMasterPassCard(
  { participant, liveEvents, mandalaDataUrl, forPdf = false },
  ref
) {
  const effectiveEvents = liveEvents ?? participant.events;
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
      } min-h-[840px] p-5 sm:p-6 rounded-none bg-[#2b0d07] border-2 border-amber-500/80 relative overflow-hidden flex flex-col justify-between ${
        forPdf ? "" : "shadow-[0_0_45px_rgba(245,158,11,0.28)]"
      }`}
    >
      {/* Subtle Warm Gold & Terracotta Radiance (no blur, no heavy darkening) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(217, 119, 6, 0.16) 0%, rgba(124, 45, 18, 0.08) 55%, rgba(43, 13, 7, 0.22) 100%)",
        }}
      />

      {/* Decorative Top Mandala Floral Border */}
      <img
        src={mandalaSrc}
        alt=""
        aria-hidden="true"
        className="absolute -top-44 left-1/2 -translate-x-1/2 w-[360px] h-[360px] object-contain opacity-30 pointer-events-none select-none"
      />

      {/* Decorative Bottom Mandala Floral Border */}
      <img
        src={mandalaSrc}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-44 left-1/2 -translate-x-1/2 w-[360px] h-[360px] object-contain opacity-30 pointer-events-none select-none"
      />

      {/* Central Crisp Unblurred Static Mandala Flower Snapshot */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <img
          src={mandalaSrc}
          alt=""
          className="w-[480px] h-[480px] object-contain opacity-55"
        />
      </div>

      {/* Inner Hairline Golden Margin Frame */}
      <div
        aria-hidden="true"
        className="absolute inset-2.5 border border-amber-400/50 pointer-events-none z-10"
      />

      {/* 4 Enlarged Golden Corner Targeting Brackets */}
      <span
        aria-hidden="true"
        className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-amber-400 pointer-events-none z-20"
      />
      <span
        aria-hidden="true"
        className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-amber-400 pointer-events-none z-20"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-amber-400 pointer-events-none z-20"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-amber-400 pointer-events-none z-20"
      />

      {/* Inner Pass Content Container */}
      <div className="relative z-20 flex-1 flex flex-col justify-between px-2 py-2 sm:px-3 sm:py-3">
        {/* Top Regal Header */}
        <div className="text-center pt-1">
          <p className="text-xs sm:text-sm tracking-[0.28em] font-bold text-amber-300">
            JUMC x JUDF Present
          </p>

          <h2 id="master-pass-title" className="flex flex-col items-center">
            <span
              className="h-16 sm:h-20 my-2 flex items-center justify-center font-samarkan MilaapFont lowercase text-6xl sm:text-7xl leading-none tracking-tight select-none"
              style={{
                fontFamily: "'Samarkan', sans-serif",
                color: "#FCD34D",
                textShadow: "0 3px 16px rgba(245, 158, 11, 0.5)",
                fontFeatureSettings: '"kern" 1',
              }}
            >
              milaap
            </span>
            <span className="text-base sm:text-lg font-serif font-bold tracking-[0.25em] text-amber-200">
              — EDITION I —
            </span>
          </h2>

          <p className="text-xs sm:text-sm font-bold tracking-[0.22em] text-amber-400 mt-1">
            OFFICIAL PARTICIPANT MASTER PASS
          </p>
        </div>

        {/* Wider & Enlarged Participant Details Container (no blur) */}
        <div className="w-full mx-auto my-5 p-6 sm:p-7 rounded-2xl border-2 border-amber-500/40 bg-[#1e0905]/80 text-left space-y-5">
          <div className="grid grid-cols-2 gap-x-5 gap-y-5">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold tracking-widest text-amber-400/90 uppercase mb-1">
                PARTICIPANT NAME
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-white leading-tight break-words">
                {participant.name}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold tracking-widest text-amber-400/90 uppercase mb-1">
                <span
                  className="font-samarkan MilaapFont lowercase normal-case text-base sm:text-lg mr-1"
                  style={{
                    fontFamily: "'Samarkan', sans-serif",
                    color: "#FCD34D",
                  }}
                >
                  milaap
                </span>
                ID
              </p>
              <p className="text-xl sm:text-2xl font-mono font-extrabold text-amber-400 leading-tight break-all">
                {participant.participantId}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold tracking-widest text-amber-400/90 uppercase mb-1">
                PHONE NUMBER
              </p>
              <p className="text-lg sm:text-xl font-bold text-stone-100 font-mono leading-tight break-words">
                {participant.phone || "Not set"}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold tracking-widest text-amber-400/90 uppercase mb-1">
                REGISTERED EVENTS
              </p>
              <p className="text-lg sm:text-xl font-extrabold text-emerald-400 leading-tight">
                {effectiveEvents.length}{" "}
                {effectiveEvents.length === 1 ? "Event" : "Events"}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-amber-500/25">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-amber-400/90 uppercase mb-1">
              INSTITUTION / YEAR
            </p>
            <p className="text-base sm:text-lg font-semibold text-stone-100 leading-snug">
              {[participant.college, participant.year]
                .filter(Boolean)
                .join(" • ") || "Jadavpur University Delegate"}
            </p>
          </div>

          {effectiveEvents.length > 0 && (
            <div className="pt-4 border-t border-amber-500/25 space-y-2.5">
              <p className="text-xs sm:text-sm font-bold tracking-widest text-amber-400/90 uppercase mb-1">
                EVENT LINEUP
              </p>
              <div className="flex flex-wrap gap-2">
                {effectiveEvents.map((ev) => (
                  <span
                    key={ev.eventSlug}
                    className="inline-block px-4 py-2 text-sm sm:text-base font-bold text-amber-100 bg-[#3a160b] border border-amber-500/50 rounded-xl shadow-sm"
                  >
                    {ev.eventName}
                    {ev.teamName ? ` [${ev.teamName}]` : ""}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enlarged Centered QR Code (230px) Inside Crisp Cream/Gold Frame */}
        <div className="mx-auto w-fit p-4 rounded-2xl bg-[#fdf8f0] border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)] my-2">
          <QRCodeSVG
            value={qrPayload}
            size={230}
            bgColor="#fdf8f0"
            fgColor="#1a0b07"
            level="H"
          />
        </div>

        {/* Enlarged Regal Footer */}
        <div className="border-t border-amber-500/30 pt-4 mt-4 text-center space-y-1">
          <p className="text-sm sm:text-base font-medium text-stone-200 leading-relaxed">
            Present this single{" "}
            <span
              className="font-samarkan MilaapFont lowercase text-lg px-0.5"
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
          <p className="text-sm font-bold text-amber-400 mt-2 flex items-center justify-center gap-2">
            <Music className="w-4 h-4 text-amber-400 shrink-0" />
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
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
  const pdfCaptureRef = useRef<HTMLDivElement | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [mandalaDataUrl, setMandalaDataUrl] = useState<string | undefined>(
    undefined
  );
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    getMilaapMandalaDataUrl().then((url) => {
      if (active && url) setMandalaDataUrl(url);
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
    if (isDownloading) return;

    setIsDownloading(true);
    setFeedback(null);
    try {
      if (!mandalaDataUrl) {
        const url = await getMilaapMandalaDataUrl();
        if (url) setMandalaDataUrl(url);
      }

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
      {/* Crisp Non-Blurred Modal Dimmer (keeps ticket artwork vivid) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => !isDownloading && onClose()}
        className="fixed inset-0 bg-black/65 -z-10 transform-gpu"
      />

      {/* Fixed 520px Offscreen Capture Surface so mobile screens export full-page PDF */}
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
