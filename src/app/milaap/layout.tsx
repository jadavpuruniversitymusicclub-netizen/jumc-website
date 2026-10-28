"use client";

import React from 'react';

// Animated starfield particle overlay — pure CSS, zero dependencies
function StarfieldOverlay() {
  return (
    <>
      {/* Layer of randomised twinkling stars via CSS animation */}
      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.4);
          }
        }
        @keyframes drift {
          0%   { transform: translateY(0px) translateX(0px); }
          50%  { transform: translateY(-5px) translateX(3px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        .star {
          position: absolute;
          border-radius: 50%;
          animation: twinkle var(--dur, 3s) ease-in-out var(--delay, 0s) infinite,
                     drift calc(var(--dur, 3s) * 2.8) ease-in-out var(--delay, 0s) infinite;
          will-change: transform, opacity;
        }
        .star-gold {
          background: #FFFBEB;
          box-shadow: 0 0 3px #FFFFFF, 0 0 8px rgba(251, 191, 36, 0.9), 0 0 14px rgba(245, 158, 11, 0.5);
        }
        .star-white {
          background: #FFFFFF;
          box-shadow: 0 0 3px #FFFFFF, 0 0 8px rgba(255, 255, 255, 0.95), 0 0 14px rgba(191, 219, 254, 0.6);
        }
      `}</style>

      {/* 110 stars with distinct positions, sizes, animations, and luminous glows */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className={`star ${s.color === 'gold' ? 'star-gold' : 'star-white'}`}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            ['--dur' as string]: s.dur,
            ['--delay' as string]: s.delay,
          }}
        />
      ))}
    </>
  );
}

// Pre-computed star positions covering the entire viewport evenly (SSR safe)
const STARS = [
  // Top sector (0% - 20%)
  { top: '2%',  left: '4%',  size: '2px',   dur: '2.4s', delay: '0s',    color: 'white' },
  { top: '4%',  left: '12%', size: '3px',   dur: '3.1s', delay: '0.4s',  color: 'gold'  },
  { top: '2%',  left: '21%', size: '1.5px', dur: '2.8s', delay: '0.9s',  color: 'white' },
  { top: '6%',  left: '29%', size: '2.5px', dur: '3.6s', delay: '0.2s',  color: 'gold'  },
  { top: '3%',  left: '38%', size: '2px',   dur: '2.2s', delay: '1.1s',  color: 'white' },
  { top: '7%',  left: '47%', size: '3.5px', dur: '4.0s', delay: '0.5s',  color: 'gold'  },
  { top: '2%',  left: '56%', size: '1.5px', dur: '2.7s', delay: '0.8s',  color: 'white' },
  { top: '5%',  left: '64%', size: '3px',   dur: '3.4s', delay: '0.1s',  color: 'gold'  },
  { top: '3%',  left: '73%', size: '2px',   dur: '2.9s', delay: '1.3s',  color: 'white' },
  { top: '7%',  left: '82%', size: '2.5px', dur: '3.8s', delay: '0.6s',  color: 'gold'  },
  { top: '2%',  left: '91%', size: '1.5px', dur: '2.5s', delay: '0.3s',  color: 'white' },
  { top: '5%',  left: '97%', size: '3px',   dur: '3.2s', delay: '1.0s',  color: 'gold'  },
  { top: '10%', left: '2%',  size: '2.5px', dur: '3.5s', delay: '0.7s',  color: 'gold'  },
  { top: '12%', left: '9%',  size: '1.5px', dur: '2.3s', delay: '0.2s',  color: 'white' },
  { top: '14%', left: '17%', size: '3px',   dur: '3.9s', delay: '0.8s',  color: 'gold'  },
  { top: '11%', left: '26%', size: '2px',   dur: '2.6s', delay: '0.4s',  color: 'white' },
  { top: '15%', left: '34%', size: '2.5px', dur: '3.3s', delay: '1.2s',  color: 'gold'  },
  { top: '12%', left: '43%', size: '1.5px', dur: '2.8s', delay: '0.5s',  color: 'white' },
  { top: '16%', left: '52%', size: '3.5px', dur: '4.2s', delay: '0.3s',  color: 'gold'  },
  { top: '10%', left: '60%', size: '2px',   dur: '2.4s', delay: '0.9s',  color: 'white' },
  { top: '14%', left: '69%', size: '2.5px', dur: '3.7s', delay: '0.1s',  color: 'gold'  },
  { top: '11%', left: '78%', size: '1.5px', dur: '3.0s', delay: '0.7s',  color: 'white' },
  { top: '15%', left: '86%', size: '3px',   dur: '3.4s', delay: '1.4s',  color: 'gold'  },
  { top: '12%', left: '94%', size: '2px',   dur: '2.7s', delay: '0.6s',  color: 'white' },

  // Upper-Mid sector (20% - 40%)
  { top: '21%', left: '5%',  size: '2px',   dur: '3.1s', delay: '0.5s',  color: 'white' },
  { top: '24%', left: '14%', size: '3.5px', dur: '3.8s', delay: '1.0s',  color: 'gold'  },
  { top: '22%', left: '23%', size: '1.5px', dur: '2.5s', delay: '0.1s',  color: 'white' },
  { top: '26%', left: '31%', size: '2.5px', dur: '3.3s', delay: '0.7s',  color: 'gold'  },
  { top: '23%', left: '39%', size: '2px',   dur: '2.9s', delay: '0.3s',  color: 'white' },
  { top: '27%', left: '48%', size: '3px',   dur: '4.1s', delay: '1.2s',  color: 'gold'  },
  { top: '21%', left: '57%', size: '1.5px', dur: '2.6s', delay: '0.8s',  color: 'white' },
  { top: '25%', left: '66%', size: '3px',   dur: '3.5s', delay: '0.4s',  color: 'gold'  },
  { top: '22%', left: '74%', size: '2px',   dur: '2.8s', delay: '1.1s',  color: 'white' },
  { top: '27%', left: '83%', size: '2.5px', dur: '3.7s', delay: '0.2s',  color: 'gold'  },
  { top: '23%', left: '92%', size: '1.5px', dur: '2.4s', delay: '0.9s',  color: 'white' },
  { top: '29%', left: '2%',  size: '3px',   dur: '3.6s', delay: '0.6s',  color: 'gold'  },
  { top: '32%', left: '10%', size: '2px',   dur: '2.7s', delay: '0.3s',  color: 'white' },
  { top: '35%', left: '19%', size: '2.5px', dur: '3.4s', delay: '1.3s',  color: 'gold'  },
  { top: '31%', left: '27%', size: '1.5px', dur: '2.3s', delay: '0.8s',  color: 'white' },
  { top: '36%', left: '36%', size: '3.5px', dur: '4.3s', delay: '0.2s',  color: 'gold'  },
  { top: '33%', left: '44%', size: '2px',   dur: '2.9s', delay: '1.0s',  color: 'white' },
  { top: '37%', left: '53%', size: '2.5px', dur: '3.2s', delay: '0.5s',  color: 'gold'  },
  { top: '31%', left: '62%', size: '1.5px', dur: '2.5s', delay: '0.9s',  color: 'white' },
  { top: '35%', left: '71%', size: '3px',   dur: '3.8s', delay: '0.1s',  color: 'gold'  },
  { top: '32%', left: '80%', size: '2px',   dur: '2.8s', delay: '0.7s',  color: 'white' },
  { top: '37%', left: '88%', size: '2.5px', dur: '3.5s', delay: '1.1s',  color: 'gold'  },
  { top: '34%', left: '96%', size: '1.5px', dur: '2.6s', delay: '0.4s',  color: 'white' },

  // Center sector (40% - 60%)
  { top: '41%', left: '6%',  size: '3px',   dur: '3.7s', delay: '0.4s',  color: 'gold'  },
  { top: '44%', left: '15%', size: '2px',   dur: '2.6s', delay: '0.9s',  color: 'white' },
  { top: '42%', left: '24%', size: '2.5px', dur: '3.4s', delay: '0.1s',  color: 'gold'  },
  { top: '46%', left: '33%', size: '1.5px', dur: '2.3s', delay: '0.8s',  color: 'white' },
  { top: '43%', left: '41%', size: '3.5px', dur: '4.0s', delay: '1.4s',  color: 'gold'  },
  { top: '47%', left: '50%', size: '2px',   dur: '2.8s', delay: '0.3s',  color: 'white' },
  { top: '42%', left: '59%', size: '2.5px', dur: '3.5s', delay: '0.7s',  color: 'gold'  },
  { top: '46%', left: '67%', size: '1.5px', dur: '2.4s', delay: '1.2s',  color: 'white' },
  { top: '43%', left: '76%', size: '3px',   dur: '3.9s', delay: '0.5s',  color: 'gold'  },
  { top: '47%', left: '84%', size: '2px',   dur: '2.7s', delay: '0.2s',  color: 'white' },
  { top: '44%', left: '93%', size: '3px',   dur: '3.3s', delay: '1.0s',  color: 'gold'  },
  { top: '51%', left: '3%',  size: '2px',   dur: '2.9s', delay: '0.6s',  color: 'white' },
  { top: '54%', left: '11%', size: '3px',   dur: '3.6s', delay: '0.2s',  color: 'gold'  },
  { top: '52%', left: '20%', size: '1.5px', dur: '2.5s', delay: '1.1s',  color: 'white' },
  { top: '56%', left: '29%', size: '2.5px', dur: '3.8s', delay: '0.7s',  color: 'gold'  },
  { top: '53%', left: '38%', size: '2px',   dur: '2.7s', delay: '0.4s',  color: 'white' },
  { top: '57%', left: '47%', size: '3.5px', dur: '4.4s', delay: '1.3s',  color: 'gold'  },
  { top: '51%', left: '55%', size: '1.5px', dur: '2.4s', delay: '0.8s',  color: 'white' },
  { top: '55%', left: '64%', size: '3px',   dur: '3.5s', delay: '0.1s',  color: 'gold'  },
  { top: '52%', left: '73%', size: '2px',   dur: '2.8s', delay: '0.9s',  color: 'white' },
  { top: '57%', left: '81%', size: '2.5px', dur: '3.7s', delay: '0.5s',  color: 'gold'  },
  { top: '53%', left: '90%', size: '1.5px', dur: '2.6s', delay: '1.2s',  color: 'white' },
  { top: '58%', left: '98%', size: '3px',   dur: '3.2s', delay: '0.3s',  color: 'gold'  },

  // Lower-Mid sector (60% - 80%)
  { top: '62%', left: '7%',  size: '2.5px', dur: '3.3s', delay: '0.7s',  color: 'gold'  },
  { top: '65%', left: '16%', size: '1.5px', dur: '2.5s', delay: '0.2s',  color: 'white' },
  { top: '63%', left: '25%', size: '3px',   dur: '4.0s', delay: '1.1s',  color: 'gold'  },
  { top: '67%', left: '33%', size: '2px',   dur: '2.8s', delay: '0.5s',  color: 'white' },
  { top: '64%', left: '42%', size: '2.5px', dur: '3.4s', delay: '0.9s',  color: 'gold'  },
  { top: '68%', left: '51%', size: '1.5px', dur: '2.3s', delay: '0.3s',  color: 'white' },
  { top: '62%', left: '60%', size: '3.5px', dur: '4.2s', delay: '1.4s',  color: 'gold'  },
  { top: '66%', left: '68%', size: '2px',   dur: '2.7s', delay: '0.6s',  color: 'white' },
  { top: '63%', left: '77%', size: '3px',   dur: '3.6s', delay: '0.1s',  color: 'gold'  },
  { top: '67%', left: '86%', size: '1.5px', dur: '2.4s', delay: '0.8s',  color: 'white' },
  { top: '64%', left: '94%', size: '2.5px', dur: '3.5s', delay: '1.0s',  color: 'gold'  },
  { top: '71%', left: '2%',  size: '3px',   dur: '3.8s', delay: '0.4s',  color: 'gold'  },
  { top: '74%', left: '12%', size: '2px',   dur: '2.6s', delay: '0.9s',  color: 'white' },
  { top: '72%', left: '21%', size: '2.5px', dur: '3.5s', delay: '0.2s',  color: 'gold'  },
  { top: '76%', left: '30%', size: '1.5px', dur: '2.2s', delay: '0.7s',  color: 'white' },
  { top: '73%', left: '39%', size: '3.5px', dur: '4.1s', delay: '1.2s',  color: 'gold'  },
  { top: '77%', left: '48%', size: '2px',   dur: '2.9s', delay: '0.5s',  color: 'white' },
  { top: '72%', left: '57%', size: '2.5px', dur: '3.3s', delay: '0.8s',  color: 'gold'  },
  { top: '76%', left: '65%', size: '1.5px', dur: '2.5s', delay: '0.1s',  color: 'white' },
  { top: '73%', left: '74%', size: '3px',   dur: '3.9s', delay: '1.3s',  color: 'gold'  },
  { top: '78%', left: '83%', size: '2px',   dur: '2.7s', delay: '0.6s',  color: 'white' },
  { top: '74%', left: '91%', size: '3px',   dur: '3.4s', delay: '0.3s',  color: 'gold'  },

  // Bottom sector (80% - 100%)
  { top: '82%', left: '5%',  size: '2px',   dur: '2.8s', delay: '0.8s',  color: 'white' },
  { top: '85%', left: '14%', size: '3px',   dur: '3.6s', delay: '0.3s',  color: 'gold'  },
  { top: '83%', left: '23%', size: '1.5px', dur: '2.4s', delay: '1.1s',  color: 'white' },
  { top: '87%', left: '32%', size: '2.5px', dur: '3.8s', delay: '0.6s',  color: 'gold'  },
  { top: '84%', left: '41%', size: '2px',   dur: '2.9s', delay: '0.1s',  color: 'white' },
  { top: '88%', left: '50%', size: '3.5px', dur: '4.3s', delay: '1.0s',  color: 'gold'  },
  { top: '82%', left: '59%', size: '1.5px', dur: '2.5s', delay: '0.5s',  color: 'white' },
  { top: '86%', left: '68%', size: '3px',   dur: '3.5s', delay: '1.4s',  color: 'gold'  },
  { top: '83%', left: '76%', size: '2px',   dur: '2.7s', delay: '0.2s',  color: 'white' },
  { top: '87%', left: '85%', size: '2.5px', dur: '3.7s', delay: '0.9s',  color: 'gold'  },
  { top: '84%', left: '95%', size: '1.5px', dur: '2.3s', delay: '0.4s',  color: 'white' },
  { top: '91%', left: '8%',  size: '2.5px', dur: '3.4s', delay: '0.7s',  color: 'gold'  },
  { top: '94%', left: '17%', size: '1.5px', dur: '2.6s', delay: '0.2s',  color: 'white' },
  { top: '92%', left: '26%', size: '3px',   dur: '3.9s', delay: '1.1s',  color: 'gold'  },
  { top: '96%', left: '35%', size: '2px',   dur: '2.7s', delay: '0.5s',  color: 'white' },
  { top: '93%', left: '44%', size: '3.5px', dur: '4.2s', delay: '0.8s',  color: 'gold'  },
  { top: '97%', left: '54%', size: '1.5px', dur: '2.4s', delay: '0.3s',  color: 'white' },
  { top: '92%', left: '63%', size: '2.5px', dur: '3.6s', delay: '1.3s',  color: 'gold'  },
  { top: '95%', left: '72%', size: '2px',   dur: '2.8s', delay: '0.6s',  color: 'white' },
  { top: '93%', left: '81%', size: '3px',   dur: '3.7s', delay: '0.1s',  color: 'gold'  },
  { top: '97%', left: '90%', size: '1.5px', dur: '2.5s', delay: '0.9s',  color: 'white' },
  { top: '95%', left: '97%', size: '2.5px', dur: '3.3s', delay: '0.4s',  color: 'gold'  },
];

export default function MilaapLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
     * Stacking context for the layered background:
     *   Layer 1 (z-0) — static background image fitted to viewport
     *   Layer 2 (z-1) — animated starfield overlay & ambient glows (fixed across viewport)
     *   Layer 3 (z-10) — page content (children)
     */
    <div className="relative min-h-screen overflow-x-hidden bg-[url('/milaap-bg.jpeg')] bg-[length:100vw_100vh] bg-no-repeat bg-center bg-fixed bg-[#2b050a]">
      {/* Dark overlay to ensure readability over the image */}
      <div className="fixed inset-0 z-0 bg-black/60 pointer-events-none" />

      {/* ── Layer 2: Starfield & Ambient Glows ── */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Animated star particles */}
        <StarfieldOverlay />

        {/* Ambient golden glow top-centre */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-amber-500/[0.07] blur-[120px]" />

        {/* Ambient crimson glow bottom-right */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#E60026]/[0.06] blur-[160px]" />
      </div>

      {/* ── Layer 3: Content ── */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
