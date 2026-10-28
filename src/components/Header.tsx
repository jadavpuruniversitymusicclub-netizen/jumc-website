"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-10 font-sans">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <img 
            src="/jumc-logo.jpeg" 
            alt="JUMC Logo" 
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl object-contain shadow-sm border border-white/10 bg-black/20" 
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold tracking-wider text-white">JUMC</span>
            
            {/* Waveform */}
            <div className="flex gap-1 items-center h-5 ml-1">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: ["4px", "20px", "4px"] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                  className="w-1 bg-[#E60026] rounded-full"
                />
              ))}
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] text-white/60 tracking-[0.25em] uppercase font-semibold mt-[-2px] sm:mt-[-4px]">
            Jadavpur University
          </span>
        </div>
      </Link>

      {/* Right side: Nav links and Admin profile button grouped together */}
      <div className="flex items-center justify-end gap-6 md:gap-8">
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {['Home', 'Events', 'Memories', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} 
              className="hover:text-[#E60026] text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        <Link href="/admin">
          <button className="hidden md:flex items-center gap-3 text-white hover:text-[#E60026] transition-colors uppercase tracking-wider cursor-pointer">
            <span className="text-sm font-medium">Admin</span>
            <span className="text-white/40 text-sm">|</span>
            <User size={16} />
          </button>
        </Link>
        <button 
          className="md:hidden liquid-glass p-3 rounded-xl text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/40 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-5 shadow-2xl md:hidden origin-top animate-fade-up">
          {['Home', 'Events', 'Memories', 'Contact'].map((item) => (
            <Link 
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white hover:text-[#E60026] transition-colors"
            >
              {item}
            </Link>
          ))}
          <div className="w-full h-px bg-white/10 my-1"></div>
          <Link 
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-lg font-medium text-white hover:text-[#E60026] transition-colors group"
          >
            <span>Admin Portal</span>
            <span className="text-white/40">|</span>
            <User size={18} className="group-hover:text-[#E60026] transition-colors" />
          </Link>
        </div>
      )}
    </header>
  );
}
