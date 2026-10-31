"use client";

import React from 'react';
import CleanChakra from '@/components/CleanChakra';

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

      {/* 55 randomly scattered stars with organic positions, sizes, animations, and luminous glows */}
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

// 55 organically and randomly distributed star positions (50-60 count range)
const STARS = [
  { top: '3.4%',  left: '8.2%',  size: '2px',   dur: '2.6s', delay: '0.2s', color: 'white' },
  { top: '5.1%',  left: '46.7%', size: '3px',   dur: '3.4s', delay: '1.1s', color: 'gold'  },
  { top: '6.8%',  left: '79.3%', size: '1.5px', dur: '2.2s', delay: '0.5s', color: 'white' },
  { top: '8.5%',  left: '23.1%', size: '2.5px', dur: '4.1s', delay: '1.8s', color: 'gold'  },
  { top: '9.2%',  left: '92.4%', size: '3.5px', dur: '3.8s', delay: '0.4s', color: 'gold'  },
  { top: '11.6%', left: '61.5%', size: '2px',   dur: '2.9s', delay: '1.3s', color: 'white' },
  { top: '13.3%', left: '3.7%',  size: '1.5px', dur: '2.5s', delay: '0.7s', color: 'white' },
  { top: '15.0%', left: '35.8%', size: '3px',   dur: '3.7s', delay: '2.1s', color: 'gold'  },
  { top: '16.7%', left: '71.2%', size: '2.5px', dur: '3.1s', delay: '0.3s', color: 'gold'  },
  { top: '18.4%', left: '16.9%', size: '2px',   dur: '2.8s', delay: '1.5s', color: 'white' },
  { top: '20.5%', left: '85.4%', size: '1.5px', dur: '2.3s', delay: '0.9s', color: 'white' },
  { top: '22.1%', left: '52.6%', size: '3.5px', dur: '4.4s', delay: '1.7s', color: 'gold'  },
  { top: '24.8%', left: '29.3%', size: '2px',   dur: '3.0s', delay: '0.1s', color: 'white' },
  { top: '26.2%', left: '96.1%', size: '2.5px', dur: '3.5s', delay: '1.4s', color: 'gold'  },
  { top: '27.9%', left: '11.4%', size: '3px',   dur: '3.9s', delay: '0.6s', color: 'gold'  },
  { top: '29.3%', left: '66.8%', size: '1.5px', dur: '2.4s', delay: '2.0s', color: 'white' },
  { top: '31.7%', left: '42.5%', size: '2.5px', dur: '3.3s', delay: '0.8s', color: 'gold'  },
  { top: '33.4%', left: '88.7%', size: '2px',   dur: '2.7s', delay: '1.2s', color: 'white' },
  { top: '35.2%', left: '5.8%',  size: '3.5px', dur: '4.2s', delay: '0.5s', color: 'gold'  },
  { top: '37.6%', left: '76.4%', size: '2px',   dur: '3.2s', delay: '1.9s', color: 'white' },
  { top: '39.1%', left: '21.3%', size: '1.5px', dur: '2.6s', delay: '0.4s', color: 'white' },
  { top: '41.5%', left: '58.9%', size: '3px',   dur: '3.6s', delay: '1.6s', color: 'gold'  },
  { top: '43.2%', left: '94.2%', size: '2px',   dur: '2.9s', delay: '0.2s', color: 'white' },
  { top: '45.8%', left: '37.1%', size: '2.5px', dur: '3.8s', delay: '1.0s', color: 'gold'  },
  { top: '47.3%', left: '14.6%', size: '3.5px', dur: '4.5s', delay: '2.2s', color: 'gold'  },
  { top: '49.0%', left: '81.5%', size: '1.5px', dur: '2.1s', delay: '0.7s', color: 'white' },
  { top: '51.4%', left: '48.3%', size: '2px',   dur: '3.0s', delay: '1.5s', color: 'white' },
  { top: '53.1%', left: '2.9%',  size: '3px',   dur: '3.4s', delay: '0.3s', color: 'gold'  },
  { top: '55.7%', left: '68.4%', size: '2.5px', dur: '3.7s', delay: '1.8s', color: 'gold'  },
  { top: '57.2%', left: '27.8%', size: '1.5px', dur: '2.5s', delay: '0.9s', color: 'white' },
  { top: '59.6%', left: '91.1%', size: '3px',   dur: '4.0s', delay: '1.3s', color: 'gold'  },
  { top: '61.3%', left: '18.7%', size: '2px',   dur: '2.8s', delay: '0.1s', color: 'white' },
  { top: '63.5%', left: '54.2%', size: '3.5px', dur: '4.3s', delay: '1.7s', color: 'gold'  },
  { top: '65.0%', left: '84.6%', size: '1.5px', dur: '2.3s', delay: '0.6s', color: 'white' },
  { top: '67.4%', left: '39.8%', size: '2.5px', dur: '3.5s', delay: '2.0s', color: 'gold'  },
  { top: '69.1%', left: '7.3%',  size: '2px',   dur: '3.1s', delay: '0.8s', color: 'white' },
  { top: '71.5%', left: '73.9%', size: '3px',   dur: '3.8s', delay: '1.4s', color: 'gold'  },
  { top: '73.2%', left: '31.5%', size: '1.5px', dur: '2.4s', delay: '0.2s', color: 'white' },
  { top: '75.6%', left: '62.7%', size: '2px',   dur: '2.9s', delay: '1.1s', color: 'white' },
  { top: '77.0%', left: '95.4%', size: '3.5px', dur: '4.1s', delay: '0.5s', color: 'gold'  },
  { top: '78.8%', left: '22.6%', size: '2.5px', dur: '3.3s', delay: '1.6s', color: 'gold'  },
  { top: '80.4%', left: '49.1%', size: '1.5px', dur: '2.2s', delay: '0.7s', color: 'white' },
  { top: '82.7%', left: '87.3%', size: '3px',   dur: '3.9s', delay: '2.3s', color: 'gold'  },
  { top: '84.1%', left: '12.8%', size: '2px',   dur: '2.7s', delay: '0.4s', color: 'white' },
  { top: '86.5%', left: '44.2%', size: '3.5px', dur: '4.4s', delay: '1.2s', color: 'gold'  },
  { top: '88.0%', left: '77.5%', size: '1.5px', dur: '2.5s', delay: '0.8s', color: 'white' },
  { top: '89.6%', left: '33.9%', size: '2.5px', dur: '3.6s', delay: '1.9s', color: 'gold'  },
  { top: '91.3%', left: '67.1%', size: '2px',   dur: '2.8s', delay: '0.3s', color: 'white' },
  { top: '92.9%', left: '4.5%',  size: '3px',   dur: '3.7s', delay: '1.5s', color: 'gold'  },
  { top: '94.4%', left: '56.8%', size: '1.5px', dur: '2.4s', delay: '0.6s', color: 'white' },
  { top: '95.8%', left: '89.2%', size: '2.5px', dur: '3.4s', delay: '2.1s', color: 'gold'  },
  { top: '97.2%', left: '26.4%', size: '2px',   dur: '3.0s', delay: '0.9s', color: 'white' },
  { top: '12.1%', left: '49.8%', size: '2px',   dur: '2.7s', delay: '1.0s', color: 'white' },
  { top: '58.4%', left: '7.6%',  size: '2.5px', dur: '3.6s', delay: '0.5s', color: 'gold'  },
  { top: '83.3%', left: '69.5%', size: '3px',   dur: '4.0s', delay: '1.7s', color: 'gold'  },
];

export default function MilaapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#2b050a]">
      {/* ── Fixed Background Image Layer (z-0) with Direct Image Style & GPU Acceleration ── */}
      <div
        className="fixed inset-0 bg-[#2b050a] bg-cover md:bg-[length:100vw_100vh] bg-no-repeat bg-center z-0 pointer-events-none transform-gpu will-change-transform backface-hidden"
        style={{ backgroundImage: "url('/milaap-bg.jpeg')" }}
      />

      {/* Dark overlay to ensure crisp contrast over the background image (z-[1]) */}
      <div className="fixed inset-0 bg-black/45 z-[1] pointer-events-none" />

      {/* ── Fixed Starfield & Ambient Glows (z-[2]) ── */}
      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
        {/* Animated star particles */}
        <StarfieldOverlay />

        {/* Ambient golden glow top-centre */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-amber-500/[0.08] blur-[120px]" />

        {/* Ambient crimson glow bottom-right */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#E60026]/[0.08] blur-[160px]" />
      </div>

      {/* ── Fixed Heavenly Sacred-Geometry Chakra (z-[3]) ── */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] pointer-events-none w-[80vw] h-[80vw] max-w-[360px] max-h-[360px] md:w-[500px] md:h-[500px] md:max-w-[500px] md:max-h-[500px] flex items-center justify-center transform-gpu will-change-transform backface-hidden">
        <CleanChakra />
      </div>

      {/* ── Content: Glides Over the Fixed Background & Chakra (relative z-10) ── */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
