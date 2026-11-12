"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-black/40 backdrop-blur-md text-[#F7EBD0] border-t border-white/10 overflow-hidden">


      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center group w-max">
              <img src="/jumc-logo.jpeg" alt="JUMC Logo" className="h-24 w-auto rounded-xl object-contain shadow-lg group-hover:scale-105 transition-transform" />
            </Link>
            <p className="text-lg font-medium text-[#F7EBD0]/80 italic">
              Where acoustic elegance meets pure sound.
            </p>
            <p className="text-sm text-[#F7EBD0]/60 leading-relaxed mt-4">
              Carrying forward the rich cultural legacy of Jadavpur University. A collective for creators, performers, and ardent music enthusiasts.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div className="flex flex-col space-y-6 lg:pl-12">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-crimson">Explore</h4>
            <nav className="flex flex-col space-y-3">
              {['Home', 'Events', 'Artists', 'About', 'Portal'].map((item) => (
                <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="group flex items-center w-max">
                  <span className="text-[#F7EBD0]/70 group-hover:text-crimson font-medium tracking-wide transition-colors">
                    {item}
                  </span>
                  <motion.span 
                    className="ml-2 text-crimson opacity-0 group-hover:opacity-100"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    →
                  </motion.span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-crimson">Contact</h4>
            <div className="flex flex-col space-y-4 text-[#F7EBD0]/70 text-sm">
              <a href="mailto:contact@jumc.in" className="flex items-center gap-3 hover:text-[#F7EBD0] transition-colors group">
                <Mail size={18} className="group-hover:text-crimson transition-colors" />
                <span>contact@jumc.in</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-[#F7EBD0]/50" />
                <span className="leading-relaxed">
                  Jadavpur University Campus,<br />
                  188, Raja S.C. Mallick Rd,<br />
                  Kolkata, West Bengal 700032
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Connect */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-crimson">Connect</h4>
            <div className="flex items-center gap-4">
              <motion.a 
                href="https://www.instagram.com/ju_music_club/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="JUMC Instagram (@ju_music_club)"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{ willChange: "transform" }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-crimson hover:shadow-[0_0_15px_rgba(230,0,38,0.3)] hover:text-crimson transition-all transform-gpu"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/ju_music_club/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JUMC Audio & Performances"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{ willChange: "transform" }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-crimson hover:shadow-[0_0_15px_rgba(230,0,38,0.3)] hover:text-crimson transition-all transform-gpu"
              >
                <Headphones size={20} />
              </motion.a>
            </div>
            <a
              href="https://www.instagram.com/ju_music_club/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#F7EBD0]/75 hover:text-crimson transition-colors w-max tracking-wide"
            >
              Instagram: @ju_music_club ↗
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium tracking-wider text-[#F7EBD0]/40 uppercase">
          <p>© 2026 Jadavpur University Music Club</p>
          <p className="flex items-center gap-2">
            Made with love <span className="text-crimson">♥</span> by jumc tech team
          </p>
        </div>
      </div>
    </footer>
  );
}
