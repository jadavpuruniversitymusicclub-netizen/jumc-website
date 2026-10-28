"use client";

import React, { useEffect, useRef } from 'react';
import MandalaBackground from '@/components/MandalaBackground';

// Animated starfield particle overlay ? pure CSS, zero dependencies
function StarfieldOverlay() {
  return (
    <>
      {/* Layer of tiny randomised stars via CSS animation */}
      <style>{`
        @keyframes twinkle {
          0%,100% { opacity: 0.15; transform: scale(1); }
          50%      { opacity: 0.9;  transform: scale(1.4); }
        }
        @keyframes drift {
          0%   { transform: translateY(0px) translateX(0px); }
          50%  { transform: translateY(-6px) translateX(3px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation: twinkle var(--dur, 3s) ease-in-out var(--delay, 0s) infinite,
                     drift      calc(var(--dur, 3s) * 2.5) ease-in-out var(--delay, 0s) infinite;
        }
      `}</style>

      {/* 60 stars: hard-coded but varied via inline CSS vars */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            ['--dur' as string]: s.dur,
            ['--delay' as string]: s.delay,
            opacity: 0.4,
          }}
        />
      ))}
    </>
  );
}

// Pre-computed star positions so the layout is deterministic (SSR safe)
const STARS = [
  { top:'2%',   left:'5%',   size:'1.5px', dur:'2.4s', delay:'0s'    },
  { top:'5%',   left:'15%',  size:'1px',   dur:'3.1s', delay:'0.3s'  },
  { top:'3%',   left:'27%',  size:'2px',   dur:'2.8s', delay:'0.6s'  },
  { top:'8%',   left:'42%',  size:'1.5px', dur:'3.5s', delay:'0.1s'  },
  { top:'4%',   left:'55%',  size:'1px',   dur:'2.2s', delay:'0.8s'  },
  { top:'6%',   left:'68%',  size:'2px',   dur:'3.8s', delay:'0.4s'  },
  { top:'2%',   left:'80%',  size:'1.5px', dur:'2.6s', delay:'1.1s'  },
  { top:'9%',   left:'91%',  size:'1px',   dur:'3.3s', delay:'0.2s'  },
  { top:'14%',  left:'3%',   size:'2px',   dur:'2.9s', delay:'0.7s'  },
  { top:'12%',  left:'18%',  size:'1px',   dur:'3.6s', delay:'0.5s'  },
  { top:'16%',  left:'35%',  size:'1.5px', dur:'2.5s', delay:'0.9s'  },
  { top:'11%',  left:'50%',  size:'2px',   dur:'3.2s', delay:'0.3s'  },
  { top:'18%',  left:'63%',  size:'1px',   dur:'2.7s', delay:'1.2s'  },
  { top:'13%',  left:'77%',  size:'1.5px', dur:'3.9s', delay:'0.6s'  },
  { top:'15%',  left:'88%',  size:'1px',   dur:'2.3s', delay:'0.1s'  },
  { top:'22%',  left:'8%',   size:'1.5px', dur:'3.4s', delay:'0.8s'  },
  { top:'25%',  left:'22%',  size:'2px',   dur:'2.8s', delay:'0.4s'  },
  { top:'20%',  left:'40%',  size:'1px',   dur:'3.7s', delay:'1.0s'  },
  { top:'28%',  left:'58%',  size:'1.5px', dur:'2.4s', delay:'0.2s'  },
  { top:'23%',  left:'72%',  size:'1px',   dur:'3.1s', delay:'0.7s'  },
  { top:'26%',  left:'85%',  size:'2px',   dur:'2.6s', delay:'0.5s'  },
  { top:'32%',  left:'4%',   size:'1px',   dur:'3.3s', delay:'1.1s'  },
  { top:'35%',  left:'16%',  size:'1.5px', dur:'2.9s', delay:'0.3s'  },
  { top:'30%',  left:'32%',  size:'2px',   dur:'3.5s', delay:'0.9s'  },
  { top:'38%',  left:'48%',  size:'1px',   dur:'2.5s', delay:'0.6s'  },
  { top:'33%',  left:'64%',  size:'1.5px', dur:'3.8s', delay:'0.1s'  },
  { top:'36%',  left:'79%',  size:'1px',   dur:'2.2s', delay:'1.3s'  },
  { top:'40%',  left:'93%',  size:'2px',   dur:'3.4s', delay:'0.4s'  },
  { top:'45%',  left:'1%',   size:'1.5px', dur:'2.7s', delay:'0.8s'  },
  { top:'42%',  left:'14%',  size:'1px',   dur:'3.6s', delay:'0.2s'  },
  { top:'48%',  left:'28%',  size:'2px',   dur:'2.4s', delay:'0.6s'  },
  { top:'44%',  left:'44%',  size:'1px',   dur:'3.2s', delay:'1.0s'  },
  { top:'50%',  left:'60%',  size:'1.5px', dur:'2.9s', delay:'0.3s'  },
  { top:'46%',  left:'74%',  size:'1px',   dur:'3.7s', delay:'0.7s'  },
  { top:'52%',  left:'87%',  size:'2px',   dur:'2.5s', delay:'0.5s'  },
  { top:'57%',  left:'6%',   size:'1px',   dur:'3.3s', delay:'1.2s'  },
  { top:'54%',  left:'20%',  size:'1.5px', dur:'2.8s', delay:'0.1s'  },
  { top:'60%',  left:'36%',  size:'1px',   dur:'3.1s', delay:'0.9s'  },
  { top:'56%',  left:'52%',  size:'2px',   dur:'2.6s', delay:'0.4s'  },
  { top:'62%',  left:'68%',  size:'1.5px', dur:'3.9s', delay:'0.8s'  },
  { top:'58%',  left:'82%',  size:'1px',   dur:'2.3s', delay:'0.2s'  },
  { top:'65%',  left:'2%',   size:'2px',   dur:'3.5s', delay:'0.6s'  },
  { top:'68%',  left:'17%',  size:'1px',   dur:'2.7s', delay:'1.0s'  },
  { top:'63%',  left:'33%',  size:'1.5px', dur:'3.4s', delay:'0.3s'  },
  { top:'70%',  left:'49%',  size:'1px',   dur:'2.4s', delay:'0.7s'  },
  { top:'66%',  left:'65%',  size:'2px',   dur:'3.6s', delay:'0.5s'  },
  { top:'72%',  left:'78%',  size:'1.5px', dur:'2.8s', delay:'1.1s'  },
  { top:'75%',  left:'91%',  size:'1px',   dur:'3.2s', delay:'0.2s'  },
  { top:'78%',  left:'8%',   size:'1.5px', dur:'2.5s', delay:'0.8s'  },
  { top:'80%',  left:'24%',  size:'1px',   dur:'3.8s', delay:'0.4s'  },
  { top:'76%',  left:'40%',  size:'2px',   dur:'2.9s', delay:'1.2s'  },
  { top:'83%',  left:'57%',  size:'1px',   dur:'3.3s', delay:'0.6s'  },
  { top:'85%',  left:'71%',  size:'1.5px', dur:'2.6s', delay:'0.1s'  },
  { top:'82%',  left:'85%',  size:'1px',   dur:'3.7s', delay:'0.9s'  },
  { top:'88%',  left:'3%',   size:'2px',   dur:'2.4s', delay:'0.5s'  },
  { top:'90%',  left:'19%',  size:'1px',   dur:'3.5s', delay:'1.0s'  },
  { top:'87%',  left:'35%',  size:'1.5px', dur:'2.7s', delay:'0.3s'  },
  { top:'93%',  left:'53%',  size:'1px',   dur:'3.1s', delay:'0.7s'  },
  { top:'95%',  left:'67%',  size:'2px',   dur:'2.8s', delay:'0.2s'  },
  { top:'91%',  left:'81%',  size:'1.5px', dur:'3.4s', delay:'1.3s'  },
  { top:'97%',  left:'95%',  size:'1px',   dur:'2.3s', delay:'0.6s'  },
];

export default function MilaapLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
     * Stacking context for the 3-layer background:
     *   Layer 1 (z-0) ? static bg image via inline CSS (milaap-bg.jpeg)
     *   Layer 2 (z-1) ? animated starfield + rotating mandala overlay
     *   Layer 3 (z-10) ? page content (children)
     */
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundImage: "url('/milaap-bg.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay to ensure readability over the image */}
      <div className="absolute inset-0 z-0 bg-black/60 pointer-events-none" />

      {/* ?? Layer 2: Starfield + Mandala ?? */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Animated star particles */}
        <StarfieldOverlay />

        {/* Ambient golden glow top-centre */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-amber-500/[0.06] blur-[120px]" />

        {/* Ambient crimson glow bottom-right */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#E60026]/[0.05] blur-[160px]" />

        {/* Full-screen slowly rotating mandala */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
          <MandalaBackground size={900} opacity={1} animated />
        </div>
      </div>

      {/* ?? Layer 3: Content ?? */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
