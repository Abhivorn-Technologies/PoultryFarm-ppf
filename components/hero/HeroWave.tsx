"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function HeroWave() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none select-none z-10"
      aria-hidden="true"
    >
      {/* Animated Water-like Fluid Wave Layer */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [-18, 18, -18],
                scaleY: [1, 1.05, 1],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-[108%] -ml-[4%]"
      >
        <svg
          className="block w-full h-14 sm:h-18 lg:h-24 text-[#FFF8EA]"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,45 C280,105 460,15 720,55 C980,95 1180,20 1440,60 L1440,120 L0,120 Z"
            fill="currentColor"
            opacity="0.98"
          />
        </svg>
      </motion.div>
    </div>
  );
}
