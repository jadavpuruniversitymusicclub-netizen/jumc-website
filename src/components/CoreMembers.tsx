"use client";
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, MotionValue, useAnimationFrame } from 'framer-motion';

const members = [
  { name: "Rupam Banerjee", role: "President", image: "/core-members/Rupam-Banerjee.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Souvik Barua", role: "General Secretary", image: "/core-members/Souvik-Barua.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Antara Banerjee", role: "Vice President", image: "/core-members/Antara-Banerjee.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Danish Mollah", role: "Vice President", image: "/core-members/Danish-Mollah.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Saptarshi Dhal", role: "Vice President", image: "/core-members/Saptarshi-Dhal.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Sumedha Kar", role: "Treasurer", image: "/core-members/Sumedha-Kar.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Aditya Bhattacharya", role: "Event Head", image: "/core-members/Aditya-Bhattacharya.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Debdeep Das", role: "Event Head", image: "/core-members/Debdeep-Das.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Sanjukta Shaw", role: "Club Maintenance Head", image: "/core-members/Sanjukta-Shaw.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Nikhil Kedia", role: "PR Head", image: "/core-members/Nikhil-Kedia.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Sanmitra Paul", role: "PR Head", image: "/core-members/Sanmitra-Paul.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Suhana Chakraborty", role: "Assistant Event Head", image: "/core-members/Suhana-Chakraborty.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Ayush Gour", role: "Assistant Maintenance Head", image: "/core-members/Ayush-Gour.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Indrayudh Ghosh", role: "Assistant Maintenance Head", image: "/core-members/Indrayudh-Ghosh.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Jashan Ahmed", role: "Assistant PR Head", image: "/core-members/Jashan-Ahmed.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Abhinanda Bhattacharyya", role: "Core Member", image: "/core-members/Abhinanda-Bhattacharyya.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Aishi Saha", role: "Core Member", image: "/core-members/Aishi-Saha.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Krit Mukherjee", role: "Core Member", image: "/core-members/Krit-Mukherjee.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Mohana Dey", role: "Core Member", image: "/core-members/Mohana-Dey.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Parineeta Pramanick", role: "Core Member", image: "/core-members/Parineeta-Pramanick.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Ruturaj Mukherjee", role: "Core Member", image: "/core-members/Ruturaj-Mukherjee.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Rwitabrata Dasgupta", role: "Core Member", image: "/core-members/Rwitabrata-Dasgupta.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Sparsha Sengupta", role: "Core Member", image: "/core-members/Sparsha-Sengupta.jpg", insta: "https://instagram.com/ju_music_club" },
  { name: "Sreepriya Roy Chowdhury", role: "Core Member", image: "/core-members/Sreepriya-Roy-Chowdhury.jpg", insta: "https://instagram.com/ju_music_club" },
];

function CarouselCard({ 
  member, 
  index, 
  total, 
  dragX, 
  radius, 
  itemWidth, 
  itemHeight 
}: { 
  member: any;
  index: number;
  total: number;
  dragX: MotionValue<number>;
  radius: number;
  itemWidth: number;
  itemHeight: number;
}) {
  const baseAngle = (index / total) * Math.PI * 2;
  
  const x = useTransform(() => {
    const rot = dragX.get() / radius;
    return radius * Math.sin(rot + baseAngle) - dragX.get();
  });
  
  const z = useTransform(() => {
    const rot = dragX.get() / radius;
    return Math.cos(rot + baseAngle);
  });
  
  const scale = useTransform(z, [-1, 1], [0.55, 1.05]);
  const opacity = useTransform(z, [-1, -0.2, 1], [0, 0.3, 1]);
  const zIndex = useTransform(z, zVal => Math.round((zVal + 1) * 100));
  const pointerEvents = useTransform(z, zVal => (zVal > 0.5 ? "auto" : "none") as any);
  
  return (
    <motion.div
      className="absolute flex flex-col items-center bg-white p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100"
      style={{
        width: itemWidth,
        height: itemHeight,
        x,
        scale,
        opacity,
        zIndex,
        pointerEvents, 
      }}
    >
      <img 
        src={member.image} 
        alt={member.name} 
        draggable="false"
        className="w-full aspect-square object-cover rounded-xl pointer-events-none shadow-sm" 
      />
      
      <h3 className="text-2xl font-black text-center bg-gradient-to-r from-[#E60026] to-[#ff4d6d] bg-clip-text text-transparent mt-4 pointer-events-none drop-shadow-sm">
        {member.name}
      </h3>
      <p className="text-base font-bold italic text-center text-[#1A1A1A]/80 mt-1 pointer-events-none">
        ({member.role})
      </p>
    </motion.div>
  );
}

const BackgroundAnimations = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Ambient Motion Gradient Orbs */}
      <motion.div
        animate={{ 
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.8, 1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-[#E60026]/10 rounded-full blur-[120px]"
      />
      
      <motion.div
        animate={{ 
          x: [0, -80, 40, 0],
          y: [0, 80, -40, 0],
          scale: [1, 1.1, 0.9, 1] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-20 -right-20 w-[500px] h-[500px] bg-gray-200/50 rounded-full blur-[100px]"
      />

      <motion.div
        animate={{ 
          x: [0, 50, -80, 0],
          y: [0, 60, -60, 0],
          scale: [1, 1.3, 0.9, 1] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-40 left-1/3 w-[800px] h-[800px] bg-[#E60026]/5 rounded-full blur-[150px]"
      />
    </div>
  );
};

export default function CoreMembers() {
  const [isClient, setIsClient] = useState(false);
  const dragX = useMotionValue(0);
  const filmStripX = useTransform(dragX, x => (x % 32) - 32);
  
  useAnimationFrame((t, delta) => {
    // Rotate by approx 72px per second (0.12 px per ms * delta ~ 16.6)
    dragX.set(dragX.get() - (0.12 * delta));
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ITEM_WIDTH = 320; 
  const ITEM_HEIGHT = 440;
  const radius = 1400; 

  if (!isClient) return null; 

  return (
    <section id="members" className="w-full relative overflow-hidden py-12 bg-[#FDF4E3]">
      <BackgroundAnimations />
      <div className="absolute top-0 left-0 w-full h-10 bg-black flex items-center border-b-4 border-[#E60026] z-40 overflow-hidden shadow-md">
        <motion.div 
           className="h-4 pointer-events-none"
           style={{
             x: filmStripX,
             backgroundImage: "repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 14px, transparent 14px, transparent 32px)",
             width: "200vw",
             marginLeft: "-50vw"
           }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 mb-8 text-center mt-4 pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tight mb-4">
          Core <span className="text-[#E60026]">Members</span>
        </h2>
        <p className="text-xl md:text-2xl font-serif italic font-medium text-[#1A1A1A]/80 max-w-2xl mx-auto tracking-wide">
          Hearts and Minds Behind Jadavpur University Music Club
        </p>
      </div>
      
      <div className="relative w-full h-[520px] flex justify-center items-center overflow-hidden">
        <motion.div
          style={{ x: dragX }}
          className="absolute inset-0 flex justify-center items-center z-20"
        >
          {members.map((member, i) => (
            <CarouselCard
              key={i}
              member={member}
              index={i}
              total={members.length}
              dragX={dragX}
              radius={radius}
              itemWidth={ITEM_WIDTH}
              itemHeight={ITEM_HEIGHT}
            />
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-10 bg-black flex items-center border-t-4 border-[#E60026] z-40 overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <motion.div 
           className="h-4 pointer-events-none"
           style={{
             x: filmStripX,
             backgroundImage: "repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 14px, transparent 14px, transparent 32px)",
             width: "200vw",
             marginLeft: "-50vw"
           }}
        />
      </div>
    </section>
  );
}
