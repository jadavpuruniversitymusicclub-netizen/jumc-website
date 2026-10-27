"use client";

import React from 'react';

interface MilaapBrandProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  centered?: boolean;
  className?: string;
  animate?: boolean;
}

export default function MilaapBrand({
  size = 'md',
  showSubtitle = true,
  centered = true,
  className = '',
  animate = true,
}: MilaapBrandProps) {
  // Dimension configurations for different placements
  const sizeStyles = {
    sm: {
      text: 'text-3xl md:text-4xl',
      barHeight: 'h-[2.5px]',
      barOffset: '-top-[2px]',
      editionText: 'text-[9px] tracking-[0.3em]',
      orgText: 'text-[7.5px] tracking-[0.2em]',
      gap: 'mt-1.5',
      ornament: 'h-1.5 w-1.5',
    },
    md: {
      text: 'text-5xl md:text-6xl',
      barHeight: 'h-[3.5px] md:h-[4px]',
      barOffset: '-top-[3px]',
      editionText: 'text-xs md:text-sm tracking-[0.35em]',
      orgText: 'text-[9px] md:text-[10px] tracking-[0.25em]',
      gap: 'mt-2.5',
      ornament: 'h-2 w-2',
    },
    lg: {
      text: 'text-6xl md:text-8xl',
      barHeight: 'h-[4.5px] md:h-[5.5px]',
      barOffset: '-top-[4px]',
      editionText: 'text-sm md:text-base tracking-[0.4em]',
      orgText: 'text-xs md:text-sm tracking-[0.3em]',
      gap: 'mt-3.5',
      ornament: 'h-2.5 w-2.5',
    },
    hero: {
      text: 'text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem]',
      barHeight: 'h-[5px] sm:h-[6px] md:h-[7px]',
      barOffset: '-top-[3px] md:-top-[5px]',
      editionText: 'text-base sm:text-xl md:text-2xl tracking-[0.45em]',
      orgText: 'text-xs sm:text-sm md:text-base tracking-[0.35em]',
      gap: 'mt-4 md:mt-6',
      ornament: 'h-3 w-3 md:h-3.5 md:w-3.5',
    },
  }[size];

  return (
    <div
      className={`inline-flex flex-col ${
        centered ? 'items-center text-center' : 'items-start text-left'
      } ${className}`}
    >
      {/* Milaap Display Title with Devanagari Continuous Shirorekha Top-Bar */}
      <div className="relative inline-block select-none group">
        {/* Continuous Horizontal Shirorekha Gold Top-Bar */}
        <div
          className={`absolute left-[-4%] right-[-4%] ${sizeStyles.barOffset} ${sizeStyles.barHeight} gold-bar-gradient rounded-full shadow-[0_0_14px_rgba(245,158,11,0.6)] z-20 pointer-events-none transition-all duration-500`}
        >
          {/* Subtle flared serif end-caps */}
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-300 shadow-[0_0_8px_#fde68a]" />
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-300 shadow-[0_0_8px_#fde68a]" />
        </div>

        {/* Ambient golden aura behind the word */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-400/20 to-amber-600/10 blur-xl opacity-60 pointer-events-none" />

        {/* The Calligraphic Word: "milaap" */}
        <h1
          className={`relative z-10 font-rozha lowercase leading-[0.9] pt-1.5 pb-1 gold-text-gradient ${sizeStyles.text} ${
            animate ? 'gold-glow' : ''
          }`}
          style={{
            fontFeatureSettings: '"kern" 1',
            textRendering: 'optimizeLegibility',
          }}
        >
          milaap
        </h1>
      </div>

      {/* Subtitles: "EDITION I" & "ORGANISED BY JUMC & JUDW" */}
      {showSubtitle && (
        <div className={`flex flex-col items-center ${sizeStyles.gap}`}>
          {/* EDITION I in uppercase golden serif typography */}
          <div className="flex items-center gap-3">
            <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
            <span
              className={`font-cinzel font-bold uppercase text-amber-200/95 drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)] ${sizeStyles.editionText}`}
            >
              EDITION I
            </span>
            <span className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent via-amber-400/70 to-transparent" />
          </div>

          {/* ORGANISED BY JUMC & JUDW in crisp sans-serif uppercase */}
          <div className="mt-1.5 flex items-center gap-2">
            <span className="inline-block h-1 w-1 rounded-full bg-[#E60026] animate-pulse" />
            <p
              className={`font-sans font-semibold uppercase text-slate-300 tracking-[0.25em] drop-shadow-sm ${sizeStyles.orgText}`}
            >
              ORGANISED BY{' '}
              <span className="text-white font-bold">JUMC</span> &{' '}
              <span className="text-[#FFB800] font-bold">JUDW</span>
            </p>
            <span className="inline-block h-1 w-1 rounded-full bg-amber-400 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}
