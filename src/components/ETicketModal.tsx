"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { Download, Loader2, MapPin, Music, X } from "lucide-react";
import type { MyEventItem } from "@/app/api/milaap/my-events/route";

interface ETicketModalProps {
  ticket: MyEventItem | null;
  onClose: () => void;
  onNotify: (type: "success" | "error", message: string) => void;
}

export default function ETicketModal({
  ticket,
  onClose,
  onNotify,
}: ETicketModalProps) {
  return (
    <AnimatePresence>
      {ticket && (
        <ETicketDialog
          key={`${ticket.registrationId}-${ticket.eventSlug}`}
          ticket={ticket}
          onClose={onClose}
          onNotify={onNotify}
        />
      )}
    </AnimatePresence>
  );
}

function ETicketDialog({
  ticket,
  onClose,
  onNotify,
}: {
  ticket: MyEventItem;
  onClose: () => void;
  onNotify: (type: "success" | "error", message: string) => void;
}) {
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isDownloading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDownloading, onClose]);

  const handleDownloadTicket = async () => {
    if (!ticketRef.current || isDownloading) return;

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(ticketRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#05080a",
      });

      const safeEvent = ticket.eventName.trim().replace(/\s+/g, "_");
      const safeName = (ticket.name || "Participant").trim().replace(/\s+/g, "_");
      const link = document.createElement("a");
      link.download = `Milaap26_Pass_${safeEvent}_${safeName}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      onNotify("success", "E-Ticket downloaded successfully!");
    } catch (error) {
      console.error("[E-Ticket download error]:", error);
      onNotify(
        "error",
        "Could not generate PNG on this browser. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const tokenId = `#MLP-${ticket.registrationId.slice(-6).toUpperCase()}`;
  const isGroupEntry =
    Boolean(ticket.teamName) ||
    (Array.isArray(ticket.teamMembers) && ticket.teamMembers.length > 0);
  const teamLabel = isGroupEntry
    ? ticket.teamName
      ? ticket.teamMembers.length > 0
        ? `${ticket.teamName} (${ticket.teamMembers.length} Members)`
        : ticket.teamName
      : `Team (${ticket.teamMembers.length} Members)`
    : "Solo Participant";

  const qrPayload = JSON.stringify({
    id: ticket.registrationId,
    token: tokenId,
    event: ticket.eventName,
    slug: ticket.eventSlug,
    email: ticket.email,
  });

  return (
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        {/* Dark blurred backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => !isDownloading && onClose()}
          className="fixed inset-0 bg-black/80 backdrop-blur-md -z-10 transform-gpu"
        />

        {/* Modal Content Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          style={{ willChange: "transform, opacity" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="eticket-modal-title"
          className="relative flex flex-col items-center gap-5 my-auto transform-gpu"
        >
          {/* ==============================================================
              DOWNLOADABLE E-TICKET CARD (captured cleanly via ticketRef)
              ============================================================== */}
          <div
            ref={ticketRef}
            className="w-[360px] sm:w-[400px] bg-[#05080a] p-6 sm:p-8 relative overflow-hidden rounded-2xl border border-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.18)]"
          >
            {/* Subtle neon-cyan radial ambience inside ticket */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-44 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 h-36 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            {/* 4 Corner Targeting Brackets */}
            <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
            <span className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
            <span className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
            <span className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

            {/* Glowing Header Section */}
            <div className="relative z-10 text-center pt-1">
              <h2
                id="eticket-modal-title"
                className="text-2xl sm:text-3xl font-black tracking-[0.2em] uppercase text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.75)]"
              >
                MILAAP &apos;26
              </h2>
              <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-cyan-300/90 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] mt-1">
                OFFICIAL EVENT TOKEN
              </p>
            </div>

            {/* Participant & Event Info 2x2 Grid Box */}
            <div className="relative z-10 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 my-6 grid grid-cols-2 gap-y-4 gap-x-4 text-left">
              {/* Slot 1: NAME */}
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                  NAME
                </p>
                <p className="text-sm sm:text-base font-bold text-stone-100 truncate mt-0.5">
                  {ticket.name || "Milaap Delegate"}
                </p>
              </div>

              {/* Slot 2: TOKEN ID */}
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                  TOKEN ID
                </p>
                <p className="text-sm sm:text-base font-mono font-bold text-cyan-400 truncate mt-0.5">
                  {tokenId}
                </p>
              </div>

              {/* Slot 3: EVENT */}
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                  EVENT
                </p>
                <p className="text-sm font-bold text-stone-100 leading-snug mt-0.5">
                  {ticket.eventName}
                </p>
              </div>

              {/* Slot 4: CATEGORY / TEAM */}
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                  CATEGORY / TEAM
                </p>
                <p className="text-sm font-bold text-stone-100 leading-snug mt-0.5 break-words">
                  {teamLabel}
                </p>
              </div>
            </div>

            {/* Glowing Centered QR Code */}
            <div className="relative z-10 bg-[#e2ece9] p-4 rounded-2xl shadow-[0_0_35px_rgba(34,211,238,0.35)] mx-auto my-2 w-fit">
              <QRCodeSVG
                value={qrPayload}
                size={180}
                bgColor="#e2ece9"
                fgColor="#05080a"
                level="H"
              />
            </div>

            {/* Footer & Venue Metadata */}
            <div className="relative z-10 border-t border-cyan-500/20 my-5 pt-4 text-center">
              <p className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-cyan-400">
                OFFICIAL PASS | JADAVPUR UNIVERSITY MUSIC CLUB
              </p>

              <p className="text-xs text-zinc-300 flex items-center justify-center gap-2 mt-2">
                <Music className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Jadavpur University, Kolkata</span>
              </p>

              <p className="text-[11px] italic text-zinc-500 text-center mt-3">
                Please present this QR code at the registration desk.
              </p>
            </div>
          </div>

          {/* Modal Control Bar (Excluded from PNG capture) */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              disabled={isDownloading}
              onClick={handleDownloadTicket}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all text-xs sm:text-sm cursor-pointer disabled:opacity-60 active:scale-95"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Pass...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download E-Ticket</span>
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
