"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const upcomingEvents = [
  {
    id: 1,
    month: 'Oct',
    day: '12',
    isLive: true,
    title: 'Eastern Solo Auditions',
    details: 'OAT • 10:00 AM'
  },
  {
    id: 2,
    month: 'Oct',
    day: '20',
    isLive: false,
    title: 'Band Showcase',
    details: 'Subarna Jayanti Bhavan • 5:00 PM'
  },
  {
    id: 3,
    month: 'Nov',
    day: '05',
    isLive: false,
    title: 'Acoustic Evening',
    details: 'Green Zone • 4:30 PM'
  }
];

export default function JUMCHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen lg:h-screen w-full flex-shrink-0 overflow-hidden text-white font-sans">

      <div className="relative z-20 flex min-h-full items-center px-6 md:px-12 xl:px-20 max-w-[100rem] mx-auto pt-32 pb-16 lg:pt-10 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 w-full">
          {/* Left Column (Hero Text) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-bold tracking-tighter mb-6 animate-fade-up delay-1 text-white">
              Jadavpur University <br />
              <span className="font-light italic opacity-90">Music Club.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-serif italic font-medium leading-relaxed tracking-wide mb-10 animate-fade-up delay-2">
              The beating heart of our campus legacy. From Eastern classical solo acts to electrifying Western band showcases and underground beatbox cyphers. We are a collective of creators, performers, and pure music enthusiasts shaping the sound of Jadavpur.
            </p>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 animate-fade-up delay-3">
              <Link href="/explore" className="w-full sm:w-auto">
                <button className="bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-bold uppercase text-sm tracking-wider hover:scale-105 transition-transform w-full">
                  Explore JUMC
                </button>
              </Link>
              <Link href="/join" className="w-full sm:w-auto">
                <button className="liquid-glass px-8 py-4 rounded-full font-bold uppercase text-sm tracking-wider hover:scale-105 transition-transform w-full">
                  Join the Club
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column (Upcoming Events Widget) */}
          <div className="lg:col-span-5 flex flex-col justify-center animate-fade-up delay-2 mt-4 lg:mt-0">
            <div className="w-full max-w-xl mx-auto lg:ml-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white tracking-tight">Upcoming <span className="text-[#E60026]">Events</span></h3>
                <Link href="#events" className="text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors">
                  View All
                </Link>
              </div>

              <div className="h-64 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
                <div className="flex flex-col gap-4 animate-marquee-vertical hover:[animation-play-state:paused]">
                  {[...upcomingEvents, ...upcomingEvents].map((evt, idx) => (
                    <div key={`${evt.id}-${idx}`} className="group flex items-start gap-5 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5 shrink-0">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center min-w-[72px]">
                        <span className={`text-xs ${evt.isLive ? 'text-[#E60026]' : 'text-white/60'} font-bold uppercase tracking-widest`}>{evt.month}</span>
                        <span className="text-2xl font-black text-white leading-none mt-1">{evt.day}</span>
                      </div>
                      <div className="flex-1 pt-1">
                        {evt.isLive ? (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E60026] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E60026]"></span>
                            </span>
                            <span className="text-xs uppercase tracking-wider font-bold text-white/70">Live Now</span>
                          </div>
                        ) : (
                          <div className="h-6"></div> /* Spacer for alignment if needed, or just let it adjust */
                        )}
                        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#E60026] transition-colors leading-tight mb-1">{evt.title}</h4>
                        <p className="text-sm text-white/50 font-medium">{evt.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
