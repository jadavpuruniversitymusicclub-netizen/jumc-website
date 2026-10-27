"use client";

import React from 'react';

interface MandalaBackgroundProps {
  className?: string;
  size?: number;
  opacity?: number;
  animated?: boolean;
}

export default function MandalaBackground({
  className = '',
  size = 500,
  opacity = 0.25,
  animated = true,
}: MandalaBackgroundProps) {
  return (
    <div
      className={`pointer-events-none select-none flex items-center justify-center ${className}`}
      style={{ opacity }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animated ? 'animate-[spin_120s_linear_infinite]' : ''}
      >
        <defs>
          <linearGradient id="mandalaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="mandalaCrimson" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E60026" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#881337" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="mandalaBlue" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Outer Ring */}
        <circle cx="200" cy="200" r="190" stroke="url(#mandalaGold)" strokeWidth="1.2" strokeDasharray="4 4" />
        <circle cx="200" cy="200" r="178" stroke="url(#mandalaCrimson)" strokeWidth="1" />
        <circle cx="200" cy="200" r="162" stroke="url(#mandalaBlue)" strokeWidth="1.5" strokeDasharray="8 6" />

        {/* 16 Radial Petals Outer */}
        {[...Array(16)].map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <g key={`petal-outer-${i}`} transform={`rotate(${angle} 200 200)`}>
              <path
                d="M 200 38 C 214 75 228 115 200 155 C 172 115 186 75 200 38 Z"
                stroke="url(#mandalaGold)"
                strokeWidth="1"
                fill="rgba(245, 158, 11, 0.04)"
              />
              <circle cx="200" cy="38" r="2.5" fill="#FCD34D" />
            </g>
          );
        })}

        {/* Middle Ring with Diamond Accents */}
        <circle cx="200" cy="200" r="120" stroke="url(#mandalaGold)" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="95" stroke="url(#mandalaCrimson)" strokeWidth="1" strokeDasharray="3 3" />

        {/* 12 Inner Petals */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <g key={`petal-inner-${i}`} transform={`rotate(${angle} 200 200)`}>
              <path
                d="M 200 80 C 210 110 220 135 200 160 C 180 135 190 110 200 80 Z"
                stroke="url(#mandalaGold)"
                strokeWidth="1.2"
                fill="rgba(230, 0, 38, 0.05)"
              />
              <line x1="200" y1="95" x2="200" y2="155" stroke="url(#mandalaBlue)" strokeWidth="0.8" />
            </g>
          );
        })}

        {/* Inner Sacred Star Geometry */}
        <polygon
          points="200,135 219,173 262,173 227,198 241,238 200,212 159,238 173,198 138,173 181,173"
          stroke="url(#mandalaGold)"
          strokeWidth="1.2"
          fill="rgba(245, 158, 11, 0.08)"
        />

        {/* Core Center Lotus */}
        <circle cx="200" cy="200" r="42" stroke="url(#mandalaCrimson)" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="28" stroke="url(#mandalaGold)" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="200" cy="200" r="12" fill="url(#mandalaGold)" />
        <circle cx="200" cy="200" r="4" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
