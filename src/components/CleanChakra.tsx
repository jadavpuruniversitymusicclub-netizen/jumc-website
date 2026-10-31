"use client";

import React from "react";
import { motion } from "framer-motion";

export function CleanChakra({ className = "" }: { className?: string }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.025, 1], opacity: [0.85, 1, 0.85] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className={`relative w-full h-full flex items-center justify-center transform-gpu will-change-transform ${className}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
        className="w-full h-full flex items-center justify-center transform-gpu will-change-transform"
      >
        <img
          src="/mandala.svg"
          alt="Milaap Royal Mandala"
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_0_35px_rgba(245,158,11,0.55)]"
        />
      </motion.div>
    </motion.div>
  );
}

export const RoyalMandala = CleanChakra;
export const HeavenlyChakra = CleanChakra;
export default CleanChakra;
