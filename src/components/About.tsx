"use client";
import React from 'react';
import { motion } from 'framer-motion';

const StatCounter = ({ number, label, delay }: { number: string, label: string, delay: number }) => (
  <motion.div 
    className="p-6 border-l-2 border-crimson/20 pl-6 flex flex-col justify-center bg-gradient-to-r from-black/40 to-transparent rounded-r-2xl"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
  >
    <div className="text-4xl lg:text-5xl font-black text-white mb-2">{number}</div>
    <div className="text-sm uppercase tracking-widest text-white/70 font-bold">{label}</div>
  </motion.div>
);

export default function About() {
  return (
    <section id="about" className="w-full bg-black/20 backdrop-blur-md border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Typography */}
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-crimson mb-4">Our Legacy</h2>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">
              A symphony of <br />
              <span className="italic font-light text-white/70">tradition</span> & <span className="text-crimson">talent</span>.
            </h3>
            
            <div className="space-y-6 text-xl text-white/80 font-serif italic font-medium leading-relaxed tracking-wide">
              <p>
                Since its inception, Jadavpur University Music Club (JUMC) has embraced artistic expression and encouraged all kinds of musical talent. Be it stellar musicians or energetic vocalists, the club has provided a supportive and collaborative space for the exploration of music.
              </p>
              <p>
                Both within and outside of the walls of our club, we foster an environment that celebrates independent as well as collective efforts— as a result of which our members can develop their craft, while simultaneously growing as people.
              </p>
            </div>
            
            <motion.button 
              className="mt-10 px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read Our Story
            </motion.button>
          </motion.div>

          {/* Right Side: Stats Grid */}
          <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatCounter number="1955" label="Established" delay={0.1} />
            <StatCounter number="50+" label="Active Members" delay={0.2} />
            <StatCounter number="20+" label="Yearly Events" delay={0.3} />
            <StatCounter number="4" label="Major Genres" delay={0.4} />
          </div>

        </div>
      </div>
    </section>
  );
}
