"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function HeroBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Base Pastel Multi-Gradient Canvas (Warm Cream, Soft Pale Green, Subtle Pale Yellow, Peach/Pink Tint) */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 18% 28%, #F2F8ED 0%, transparent 60%),
                       radial-gradient(ellipse at 82% 38%, #FFF5DB 0%, transparent 65%),
                       radial-gradient(ellipse at 30% 88%, #FDEAE8 0%, transparent 50%),
                       radial-gradient(ellipse at 75% 85%, #E9F7EF 0%, transparent 55%),
                       linear-gradient(135deg, #F8FAF5 0%, #FFFDF5 45%, #FFF9EC 100%)`,
        }}
      />

      {/* 2. Soft Ambient Pale Green Glow on Left Area */}
      <motion.div
        className="absolute -top-24 -left-20 w-[560px] h-[560px] rounded-full bg-[#E2F6EB]/45 filter blur-3xl"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 18, 0],
                y: [0, -14, 0],
                scale: [1, 1.04, 1],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 3. Soft Warm Sunlight Glow behind Right 3D Poultry Scene */}
      <motion.div
        className="absolute top-1/4 right-[2%] w-[720px] h-[720px] rounded-full bg-gradient-to-bl from-[#FFF2C2]/55 via-[#FDE68A]/18 to-transparent filter blur-3xl"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -20, 0],
                y: [0, 16, 0],
                scale: [1, 1.03, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 4. Soft Peach/Pink Atmospheric Glow on Lower-Left Area */}
      <motion.div
        className="absolute -bottom-20 left-[10%] w-[500px] h-[500px] rounded-full bg-[#FCE9E8]/35 filter blur-3xl"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 14, 0],
                y: [0, -10, 0],
                scale: [1, 1.03, 1],
              }
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
