"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Sponsors() {
  // Create an array of 6 placeholders. We duplicate it below to make the marquee seamless.
  const placeholders = Array.from({ length: 6 });

  return (
    <section className="w-full pt-28 pb-20 bg-black/20 backdrop-blur-md border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white drop-shadow-sm">
          Sponsored <span className="text-[#E60026] italic font-serif">By</span>
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden pointer-events-none">
        <motion.div
          className="flex gap-4 pr-4 w-max touch-pan-y pointer-events-auto will-change-transform"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* We render the placeholders twice. -50% translation shifts exactly one set. */}
          {[...placeholders, ...placeholders].map((_, i) => (
            <div
              key={i}
              className="h-32 w-64 shrink-0 bg-white/[0.05] backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/15 hover:border-crimson/50 hover:bg-white/[0.09] transition-all duration-300 flex items-center justify-center cursor-pointer will-change-transform"
            >
              {/* Subtle placeholder text */}
              <span className="text-white/40 font-mono tracking-widest text-sm uppercase">Sponsor</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
