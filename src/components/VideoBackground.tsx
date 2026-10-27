"use client";

import React, { useEffect, useRef } from 'react';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Unconditionally pause the video everywhere across the site
    video.pause();

    const renderStaticFrame = () => {
      video.pause();
      if (video.currentTime < 0.1) {
        // Set to 0.5s to ensure a rich, visible video frame is painted
        video.currentTime = 0.5;
      }
    };

    if (video.readyState >= 1) {
      renderStaticFrame();
    } else {
      video.addEventListener('loadeddata', renderStaticFrame, { once: true });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] scale-[1.04] origin-center overflow-hidden bg-[#030712] pointer-events-none">
      <video
        ref={videoRef}
        src="/videos/bg-loop.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover block opacity-80"
      />
      {/* Ambient dark gradient overlay to ensure high contrast for typography while keeping video frame crisp */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 pointer-events-none" />
      {/* Subtle deep radial glow to enrich glassmorphic lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(230,0,38,0.08),rgba(0,0,0,0))] pointer-events-none" />
    </div>
  );
}


