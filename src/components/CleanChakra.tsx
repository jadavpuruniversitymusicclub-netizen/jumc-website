"use client";

import React from 'react';

interface CleanChakraProps {
  className?: string;
  sizeClassName?: string;
  opacity?: string;
}

export default function CleanChakra({
  className = '',
  sizeClassName = 'w-[75vw] max-w-[540px] md:w-[500px] aspect-square',
  opacity = 'opacity-30',
}: CleanChakraProps) {
  return (
    <div
      className={`pointer-events-none select-none flex items-center justify-center text-amber-400 ${sizeClassName} ${opacity} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-[spin_40s_linear_infinite] drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]"
      >
        <defs>
          <linearGradient id="cleanChakraGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* 1. Outer Thin Concentric Circle */}
        <circle
          cx="200"
          cy="200"
          r="188"
          stroke="url(#cleanChakraGold)"
          strokeWidth="0.8"
        />

        {/* 2. Inner Thin Concentric Circle */}
        <circle
          cx="200"
          cy="200"
          r="132"
          stroke="url(#cleanChakraGold)"
          strokeWidth="0.8"
        />

        {/* 3. Inscribed Clean 12-Point Star Geometry */}
        <polygon
          points="200.00,12.00 234.16,72.50 294.00,37.19 293.34,106.66 362.81,106.00 327.50,165.84 388.00,200.00 327.50,234.16 362.81,294.00 293.34,293.34 294.00,362.81 234.16,327.50 200.00,388.00 165.84,327.50 106.00,362.81 106.66,293.34 37.19,294.00 72.50,234.16 12.00,200.00 72.50,165.84 37.19,106.00 106.66,106.66 106.00,37.19 165.84,72.50"
          stroke="url(#cleanChakraGold)"
          strokeWidth="0.8"
          fill="none"
        />

        {/* 4. Delicate 12 Radial Rays linking the Concentric Rings */}
        {[...Array(12)].map((_, i) => (
          <line
            key={`ray-${i}`}
            x1="200"
            y1="68"
            x2="200"
            y2="132"
            stroke="url(#cleanChakraGold)"
            strokeWidth="0.8"
            transform={`rotate(${i * 30} 200 200)`}
          />
        ))}

        {/* 5. Delicate Center Hub Concentric Rings */}
        <circle
          cx="200"
          cy="200"
          r="28"
          stroke="url(#cleanChakraGold)"
          strokeWidth="0.8"
        />
        <circle
          cx="200"
          cy="200"
          r="8"
          stroke="url(#cleanChakraGold)"
          strokeWidth="0.8"
        />
        <circle
          cx="200"
          cy="200"
          r="2"
          fill="#FEF08A"
        />
      </svg>
    </div>
  );
}
