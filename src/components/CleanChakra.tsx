"use client";
import React from "react";
import { motion } from "framer-motion";

// Helper function to convert polar coordinates to cartesian coordinates
function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const rad = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

// Generates the authentic 10-point stepped star crest contour as seen in the reference image
function generateSteppedStar(
  cx: number,
  cy: number,
  rPeak: number,
  rShoulder: number,
  rBase: number,
  rValley: number
) {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const a0 = i * 36;
    const pPeak = polarToCartesian(cx, cy, rPeak, a0);
    const pStep1 = polarToCartesian(cx, cy, rShoulder * 0.96, a0 + 5.5);
    const pStep2 = polarToCartesian(cx, cy, rShoulder * 1.04, a0 + 8.5);
    const pStep3 = polarToCartesian(cx, cy, rBase, a0 + 13.5);
    const pValley = polarToCartesian(cx, cy, rValley, a0 + 18);
    const pStep4 = polarToCartesian(cx, cy, rBase, a0 + 22.5);
    const pStep5 = polarToCartesian(cx, cy, rShoulder * 1.04, a0 + 27.5);
    const pStep6 = polarToCartesian(cx, cy, rShoulder * 0.96, a0 + 30.5);

    if (i === 0) {
      d += `M ${pPeak.x.toFixed(2)} ${pPeak.y.toFixed(2)} `;
    } else {
      d += `L ${pPeak.x.toFixed(2)} ${pPeak.y.toFixed(2)} `;
    }
    d += `L ${pStep1.x.toFixed(2)} ${pStep1.y.toFixed(2)} `;
    d += `L ${pStep2.x.toFixed(2)} ${pStep2.y.toFixed(2)} `;
    d += `L ${pStep3.x.toFixed(2)} ${pStep3.y.toFixed(2)} `;
    d += `L ${pValley.x.toFixed(2)} ${pValley.y.toFixed(2)} `;
    d += `L ${pStep4.x.toFixed(2)} ${pStep4.y.toFixed(2)} `;
    d += `L ${pStep5.x.toFixed(2)} ${pStep5.y.toFixed(2)} `;
    d += `L ${pStep6.x.toFixed(2)} ${pStep6.y.toFixed(2)} `;
  }
  d += "Z";
  return d;
}

export function RoyalMandala({ className = "" }: { className?: string }) {
  const cx = 400;
  const cy = 400;

  // 1. Double Stepped Star Outer Frames
  const outerStarPath = generateSteppedStar(cx, cy, 376, 318, 258, 238);
  const innerStarPath = generateSteppedStar(cx, cy, 360, 305, 248, 228);

  // 2. 20-Point Inner Star with 3D Chiseled Metallic Bevels
  const star20Facets: { pts: string; fill: string; opacity: number }[] = [];
  for (let i = 0; i < 20; i++) {
    const aPeak = i * 18;
    const aValleyPrev = aPeak - 9;
    const aValleyNext = aPeak + 9;
    const pPeak = polarToCartesian(cx, cy, 138, aPeak);
    const pValleyPrev = polarToCartesian(cx, cy, 88, aValleyPrev);
    const pValleyNext = polarToCartesian(cx, cy, 88, aValleyNext);

    // Left light champagne facet
    star20Facets.push({
      pts: `${cx},${cy} ${pValleyPrev.x.toFixed(1)},${pValleyPrev.y.toFixed(1)} ${pPeak.x.toFixed(1)},${pPeak.y.toFixed(1)}`,
      fill: "url(#royalGoldLight)",
      opacity: 0.95,
    });
    // Right deep antique amber facet
    star20Facets.push({
      pts: `${cx},${cy} ${pPeak.x.toFixed(1)},${pPeak.y.toFixed(1)} ${pValleyNext.x.toFixed(1)},${pValleyNext.y.toFixed(1)}`,
      fill: "url(#royalGoldDark)",
      opacity: 0.85,
    });
  }

  // 3. 20-Fold Scalloped Lace Arc
  let laceD = "";
  for (let i = 0; i < 20; i++) {
    const aStart = i * 18;
    const aMid = aStart + 9;
    const aEnd = aStart + 18;
    const pStart = polarToCartesian(cx, cy, 168, aStart);
    const pPeak = polarToCartesian(cx, cy, 184, aMid);
    const pEnd = polarToCartesian(cx, cy, 168, aEnd);
    if (i === 0) laceD += `M ${pStart.x.toFixed(1)} ${pStart.y.toFixed(1)} `;
    laceD += `Q ${pPeak.x.toFixed(1)} ${pPeak.y.toFixed(1)} ${pEnd.x.toFixed(1)} ${pEnd.y.toFixed(1)} `;
  }

  // 4. Concentric Pearl Dots
  const pearlDots40: { cx: number; cy: number }[] = [];
  for (let i = 0; i < 40; i++) {
    pearlDots40.push(polarToCartesian(cx, cy, 162, i * 9));
  }

  const pearlDots20: { cx: number; cy: number }[] = [];
  for (let i = 0; i < 20; i++) {
    pearlDots20.push(polarToCartesian(cx, cy, 42, i * 18));
  }

  return (
    <motion.div
      animate={{ scale: [1, 1.03, 1], opacity: [0.82, 1, 0.82] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className={`relative w-full h-full flex items-center justify-center transform-gpu will-change-transform ${className}`}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="w-full h-full transform-gpu will-change-transform flex items-center justify-center"
      >
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full overflow-visible drop-shadow-[0_0_28px_rgba(245,158,11,0.55)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Shimmering Champagne Gold Gradient */}
            <linearGradient id="royalGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#FDE047" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.9" />
            </linearGradient>

            {/* Rich Antique Bronze Gold Gradient for 3D Chiseled Depth */}
            <linearGradient id="royalGoldDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#D97706" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#92400E" stopOpacity="0.95" />
            </linearGradient>

            {/* Core Sunburst Radial Gradient */}
            <radialGradient id="royalSunburst" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.6" />
              <stop offset="75%" stopColor="#B45309" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ══════════════════════════════════════════════════════════════════
              LAYER 1: OUTER STEPPED 10-POINT STAR CREST (DOUBLE OUTLINE)
              ══════════════════════════════════════════════════════════════════ */}
          <g id="outer-stepped-star">
            {/* Outer main stepped contour */}
            <path
              d={outerStarPath}
              stroke="url(#royalGoldLight)"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
            {/* Inner parallel stepped contour */}
            <path
              d={innerStarPath}
              stroke="url(#royalGoldDark)"
              strokeWidth="1.2"
              strokeOpacity="0.85"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* ══════════════════════════════════════════════════════════════════
              LAYER 2: 10 ORNATE HEART-SCROLL & FLEUR-DE-LIS FLOURISHES
              ══════════════════════════════════════════════════════════════════ */}
          <g id="heart-fleur-flourishes">
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={`heart-crest-${i}`} transform={`rotate(${i * 36} ${cx} ${cy})`}>
                {/* Fleur-de-lis Top Finial pointing toward peak */}
                {/* Center spear */}
                <path
                  d="M 400 48 L 400 95"
                  stroke="url(#royalGoldLight)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="400" cy="46" r="2.8" fill="#FFFBEB" />
                {/* Curved side wings of the fleur-de-lis */}
                <path
                  d="M 400 70 C 385 68, 380 84, 388 92 C 394 88, 398 84, 400 84 C 402 84, 406 88, 412 92 C 420 84, 415 68, 400 70 Z"
                  stroke="url(#royalGoldLight)"
                  strokeWidth="1.1"
                  fill="none"
                />

                {/* Heart-Shaped Lyre Scroll Motif */}
                {/* Outer heart loop */}
                <path
                  d="M 400 148 C 362 120, 360 88, 386 96 C 395 102, 396 112, 400 116 C 404 112, 405 102, 414 96 C 440 88, 438 120, 400 148 Z"
                  stroke="url(#royalGoldLight)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {/* Inner delicate echo heart */}
                <path
                  d="M 400 140 C 374 118, 372 98, 388 103 C 394 107, 396 114, 400 118 C 404 114, 406 107, 412 103 C 428 98, 426 118, 400 140 Z"
                  stroke="url(#royalGoldDark)"
                  strokeWidth="0.9"
                  strokeOpacity="0.75"
                  fill="none"
                />

                {/* Hanging droplet pearls at the bottom of the heart */}
                <circle cx="400" cy="154" r="2.5" fill="#FDE047" />
                <circle cx="400" cy="162" r="1.8" fill="#FFFBEB" />

                {/* Symmetrical scroll tendrils sprouting from heart sides */}
                <path
                  d="M 372 110 C 352 115, 344 135, 355 145"
                  stroke="url(#royalGoldDark)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="355" cy="145" r="2" fill="#FDE047" />

                <path
                  d="M 428 110 C 448 115, 456 135, 445 145"
                  stroke="url(#royalGoldDark)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="445" cy="145" r="2" fill="#FDE047" />
              </g>
            ))}
          </g>

          {/* ══════════════════════════════════════════════════════════════════
              LAYER 3: 10 BAROQUE OGEE ARCHES & CANDELABRA VINES
              ══════════════════════════════════════════════════════════════════ */}
          <g id="middle-baroque-arches">
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={`arch-${i}`} transform={`rotate(${i * 36} ${cx} ${cy})`}>
                {/* Pointed Ogee Arch Petal Frame */}
                <path
                  d="M 345 224 C 362 212, 380 188, 400 168 C 420 188, 438 212, 455 224"
                  stroke="url(#royalGoldLight)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Inner parallel arch */}
                <path
                  d="M 352 225 C 366 215, 382 195, 400 176 C 418 195, 434 215, 448 225"
                  stroke="url(#royalGoldDark)"
                  strokeWidth="0.9"
                  strokeOpacity="0.75"
                  fill="none"
                />

                {/* Arch Apex Diamond Finial */}
                <polygon
                  points="400,162 403,166 400,170 397,166"
                  fill="#FFFBEB"
                  stroke="#F59E0B"
                  strokeWidth="0.6"
                />

                {/* Inside Candelabra / Tree-of-Life Vine */}
                {/* Vertical spine */}
                <line
                  x1="400"
                  y1="172"
                  x2="400"
                  y2="224"
                  stroke="url(#royalGoldLight)"
                  strokeWidth="1.2"
                />

                {/* Upper scroll tendrils */}
                <path
                  d="M 400 185 C 390 182, 382 184, 386 192 C 390 196, 395 192, 400 192 C 405 192, 410 196, 414 192 C 418 184, 410 182, 400 185"
                  stroke="url(#royalGoldDark)"
                  strokeWidth="0.9"
                  fill="none"
                />
                <circle cx="386" cy="192" r="1.6" fill="#FDE047" />
                <circle cx="414" cy="192" r="1.6" fill="#FDE047" />

                {/* Lower sweeping vine tendrils with pearl tips */}
                <path
                  d="M 400 204 C 380 198, 372 206, 378 214"
                  stroke="url(#royalGoldLight)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="378" cy="214" r="2.2" fill="#FDE047" />

                <path
                  d="M 400 204 C 420 198, 428 206, 422 214"
                  stroke="url(#royalGoldLight)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="422" cy="214" r="2.2" fill="#FDE047" />
              </g>
            ))}
          </g>

          {/* ══════════════════════════════════════════════════════════════════
              LAYER 4: SCALLOPED LACE BANDS, CHEVRON & PEARL RINGS
              ══════════════════════════════════════════════════════════════════ */}
          <g id="concentric-lace-bands">
            {/* Outer boundary circles of the lace band */}
            <circle cx={cx} cy={cy} r="226" stroke="url(#royalGoldDark)" strokeWidth="1" strokeOpacity="0.8" />
            <circle cx={cx} cy={cy} r="186" stroke="url(#royalGoldLight)" strokeWidth="1.2" />

            {/* 20-fold scalloped lace border */}
            <path d={laceD} stroke="url(#royalGoldLight)" strokeWidth="1.4" fill="none" />

            {/* Middle decorative concentric ring */}
            <circle cx={cx} cy={cy} r="172" stroke="url(#royalGoldDark)" strokeWidth="0.8" strokeDasharray="3 4" strokeOpacity="0.8" />

            {/* 40-bead pearl ring */}
            {pearlDots40.map((pt, idx) => (
              <circle key={`pearl-40-${idx}`} cx={pt.x.toFixed(1)} cy={pt.y.toFixed(1)} r="2.2" fill="#FDE047" opacity="0.9" />
            ))}

            <circle cx={cx} cy={cy} r="156" stroke="url(#royalGoldLight)" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="142" stroke="url(#royalGoldDark)" strokeWidth="1.2" />

            {/* 20-fold diamond chevron zigzag ring */}
            {Array.from({ length: 20 }).map((_, i) => (
              <g key={`chevron-${i}`} transform={`rotate(${i * 18} ${cx} ${cy})`}>
                <path
                  d="M 393 143 L 400 155 L 407 143"
                  stroke="url(#royalGoldLight)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            ))}
          </g>

          {/* ══════════════════════════════════════════════════════════════════
              LAYER 5: 20-POINT CHISELED 3D METALLIC STAR ROSETTE
              ══════════════════════════════════════════════════════════════════ */}
          <g id="chiseled-star-rosette">
            {/* 40 alternating bevel facets for authentic embossed relief */}
            {star20Facets.map((facet, idx) => (
              <polygon
                key={`star-facet-${idx}`}
                points={facet.pts}
                fill={facet.fill}
                opacity={facet.opacity}
              />
            ))}

            {/* Star outer apex boundary polygon */}
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={`star-edge-${i}`}
                x1={polarToCartesian(cx, cy, 138, i * 18).x.toFixed(1)}
                y1={polarToCartesian(cx, cy, 138, i * 18).y.toFixed(1)}
                x2={polarToCartesian(cx, cy, 88, i * 18 + 9).x.toFixed(1)}
                y2={polarToCartesian(cx, cy, 88, i * 18 + 9).y.toFixed(1)}
                stroke="#FFFBEB"
                strokeWidth="1"
                strokeOpacity="0.8"
              />
            ))}

            {/* Internal star delineation circle */}
            <circle cx={cx} cy={cy} r="115" stroke="url(#royalGoldLight)" strokeWidth="0.8" strokeDasharray="2 3" strokeOpacity="0.85" />
          </g>

          {/* ══════════════════════════════════════════════════════════════════
              LAYER 6: INNER CORE ROSETTE & SUNBURST JEWEL
              ══════════════════════════════════════════════════════════════════ */}
          <g id="core-rosette-jewel">
            {/* Ambient radial sunburst glow */}
            <circle cx={cx} cy={cy} r="88" fill="url(#royalSunburst)" opacity="0.9" />

            {/* 10 teardrop flower petals */}
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={`core-petal-${i}`} transform={`rotate(${i * 36} ${cx} ${cy})`}>
                <path
                  d="M 400 322 C 392 342, 388 358, 400 376 C 412 358, 408 342, 400 322 Z"
                  stroke="url(#royalGoldLight)"
                  strokeWidth="1.2"
                  fill="url(#royalGoldDark)"
                  fillOpacity="0.4"
                />
                <circle cx="400" cy="320" r="2.4" fill="#FFFBEB" />
              </g>
            ))}

            {/* Concentric gold rings */}
            <circle cx={cx} cy={cy} r="72" stroke="url(#royalGoldLight)" strokeWidth="1.2" />
            <circle cx={cx} cy={cy} r="58" stroke="url(#royalGoldDark)" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="48" stroke="url(#royalGoldLight)" strokeWidth="0.8" strokeDasharray="3 3" />

            {/* 20 inner seed pearls */}
            {pearlDots20.map((pt, idx) => (
              <circle key={`pearl-20-${idx}`} cx={pt.x.toFixed(1)} cy={pt.y.toFixed(1)} r="1.8" fill="#FFFBEB" />
            ))}

            {/* Inner micro sunburst rays */}
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={`micro-ray-${i}`}
                x1={polarToCartesian(cx, cy, 26, i * 18).x.toFixed(1)}
                y1={polarToCartesian(cx, cy, 26, i * 18).y.toFixed(1)}
                x2={polarToCartesian(cx, cy, 38, i * 18).x.toFixed(1)}
                y2={polarToCartesian(cx, cy, 38, i * 18).y.toFixed(1)}
                stroke="url(#royalGoldLight)"
                strokeWidth="1.1"
                strokeOpacity="0.9"
              />
            ))}

            {/* Center golden hub disc */}
            <circle cx={cx} cy={cy} r="24" stroke="url(#royalGoldLight)" strokeWidth="1.4" fill="#1f0307" />
            <circle cx={cx} cy={cy} r="18" stroke="url(#royalGoldDark)" strokeWidth="0.8" strokeDasharray="2 2" />

            {/* Center luminous golden gem */}
            <circle cx={cx} cy={cy} r="10" fill="#FDE047" filter="drop-shadow(0 0 10px #F59E0B)" />
            <circle cx={cx} cy={cy} r="4" fill="#FFFFFF" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

// Backward-compatible exports so all imports across the codebase work seamlessly
export const CleanChakra = RoyalMandala;
export const HeavenlyChakra = RoyalMandala;
export default RoyalMandala;
