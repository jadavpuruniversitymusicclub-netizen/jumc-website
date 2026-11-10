"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export function ColourWipe({
  children,
  color = "bg-[#1A1A1A]",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <div className="relative overflow-hidden w-full">
      {/* Wipe Overlay */}
      <motion.div
        className={`absolute inset-y-0 z-50 transform-gpu ${color}`}
        style={{ willChange: "transform, opacity" }}
        initial={{ left: 0, right: "100%" }}
        whileInView={{
          left: ["0%", "0%", "100%"],
          right: ["100%", "0%", "0%"],
        }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.9, times: [0, 0.5, 1], ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        className="transform-gpu"
        style={{ willChange: "transform, opacity" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function FlowStack({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <motion.div
      className={className}
      style={{ willChange: "transform, opacity" }}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20%" }}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={item}
          style={{ willChange: "transform, opacity" }}
          className="w-full h-full transform-gpu"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
