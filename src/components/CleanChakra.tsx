"use client";

import React from "react";
import { motion } from "framer-motion";

export function CleanChakra({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      style={{ contain: "layout style paint" }}
    >
      {/* Static ambient glow behind the rotating SVG so rotation never re-rasterizes drop-shadow */}
      <div
        className="absolute inset-8 rounded-full bg-amber-500/15 blur-3xl pointer-events-none transform-gpu"
        aria-hidden="true"
      />

      <motion.div
        animate={{ scale: [1, 1.025, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform, opacity" }}
        className="relative w-full h-full flex items-center justify-center transform-gpu"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
          className="w-full h-full flex items-center justify-center transform-gpu"
        >
          <img
            src="/mandala.svg"
            alt="Milaap Royal Mandala"
            decoding="async"
            className="w-full h-full object-contain pointer-events-none select-none"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export const RoyalMandala = CleanChakra;
export const HeavenlyChakra = CleanChakra;
export default CleanChakra;
