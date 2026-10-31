"use client";
import React from "react";
import { motion } from "framer-motion";

export function HeavenlyChakra({ className = "" }: { className?: string }) {
  // Precompute triangle vertices for the 12-pointed sacred star (4 equilateral triangles rotated at 0°, 30°, 60°, 90°)
  const R = 175;
  const triangles = [0, 30, 60, 90].map((rot) => {
    const pts = [0, 120, 240].map((deg) => {
      const rad = ((deg + rot - 90) * Math.PI) / 180;
      const x = 250 + R * Math.cos(rad);
      const y = 250 + R * Math.sin(rad);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    });
    return pts.join(" ");
  });

  // Precompute glowing intersection node dots at radii 80, 115, 145 across 12 rays
  const nodeDots: { cx: string; cy: string }[] = [];
  [80, 115, 145].forEach((r) => {
    for (let i = 0; i < 12; i++) {
      const rad = ((i * 30 - 90) * Math.PI) / 180;
      nodeDots.push({
        cx: (250 + r * Math.cos(rad)).toFixed(2),
        cy: (250 + r * Math.sin(rad)).toFixed(2),
      });
    }
  });

  return (
    <motion.div
      animate={{ scale: [1, 1.04, 1], opacity: [0.75, 0.98, 0.75] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className={`relative w-full h-full flex items-center justify-center transform-gpu will-change-transform ${className}`}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="w-full h-full transform-gpu will-change-transform flex items-center justify-center"
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full overflow-visible drop-shadow-[0_0_24px_rgba(245,158,11,0.5)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heavenlyGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.95" />
            </linearGradient>
            <radialGradient id="sunburstGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── LAYER 1: Outer Lotus Petal Ring (16 delicate pointed petals) ── */}
          <g id="lotus-petals">
            {Array.from({ length: 16 }).map((_, i) => (
              <path
                key={`petal-${i}`}
                d="M 250 15 C 235 90, 230 140, 250 175 C 270 140, 265 90, 250 15 Z"
                stroke="url(#heavenlyGold)"
                strokeWidth="1.1"
                strokeOpacity="0.65"
                fill="none"
                transform={`rotate(${i * 22.5} 250 250)`}
              />
            ))}
            {/* Outer boundary circle enclosing the lotus tips */}
            <circle
              cx="250"
              cy="250"
              r="236"
              stroke="#fbbf24"
              strokeWidth="0.8"
              strokeOpacity="0.45"
              strokeDasharray="4 6"
            />
          </g>

          {/* ── LAYER 2: Sacred Star Matrix (12-pointed geometric star) ── */}
          <g id="star-matrix">
            {triangles.map((pts, i) => (
              <polygon
                key={`tri-${i}`}
                points={pts}
                stroke="url(#heavenlyGold)"
                strokeWidth="1.3"
                strokeOpacity="0.75"
                fill="none"
              />
            ))}
            {/* Enclosing circles for the 12-point star */}
            <circle
              cx="250"
              cy="250"
              r={R}
              stroke="#fde047"
              strokeWidth="1"
              strokeOpacity="0.6"
              fill="none"
            />
            <circle
              cx="250"
              cy="250"
              r="145"
              stroke="#fbbf24"
              strokeWidth="0.8"
              strokeOpacity="0.6"
              fill="none"
            />
          </g>

          {/* ── LAYER 3: Inner Radiant Core (Concentric Ripples & Node Dots) ── */}
          <g id="radiant-core">
            {[45, 80, 115, 145].map((r, i) => (
              <circle
                key={`ring-${i}`}
                cx="250"
                cy="250"
                r={r}
                stroke="#f59e0b"
                strokeWidth="0.8"
                strokeDasharray="4 4"
                strokeOpacity="0.7"
                fill="none"
              />
            ))}

            {/* 12 Radiant Rays connecting core to star matrix */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={`ray-${i}`}
                x1="250"
                y1="45"
                x2="250"
                y2="175"
                stroke="url(#heavenlyGold)"
                strokeWidth="0.8"
                strokeOpacity="0.6"
                transform={`rotate(${i * 30} 250 250)`}
              />
            ))}

            {/* Glowing intersection node dots */}
            {nodeDots.map((dot, i) => (
              <circle
                key={`node-${i}`}
                cx={dot.cx}
                cy={dot.cy}
                r="2.2"
                fill="#fde047"
                opacity="0.95"
              />
            ))}
          </g>

          {/* ── LAYER 4: Center Sunburst & Luminous Golden Orb ── */}
          <g id="center-sunburst">
            {/* Ambient center radial glow */}
            <circle
              cx="250"
              cy="250"
              r="38"
              fill="url(#sunburstGlow)"
              opacity="0.85"
            />
            {/* Concentric hub rings */}
            <circle
              cx="250"
              cy="250"
              r="28"
              stroke="#f59e0b"
              strokeWidth="0.8"
              strokeDasharray="2 3"
              strokeOpacity="0.75"
            />
            <circle
              cx="250"
              cy="250"
              r="16"
              stroke="#fbbf24"
              strokeWidth="1.1"
              strokeOpacity="0.85"
            />
            {/* Dead-center luminous golden orb */}
            <circle
              cx="250"
              cy="250"
              r="9"
              fill="#fde047"
              filter="drop-shadow(0 0 12px #f59e0b)"
            />
            {/* White pinpoint core */}
            <circle cx="250" cy="250" r="3" fill="#ffffff" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

// Export as both HeavenlyChakra and CleanChakra for 100% compatibility
export const CleanChakra = HeavenlyChakra;
export default HeavenlyChakra;
