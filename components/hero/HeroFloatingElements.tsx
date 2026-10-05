"use client";

import React from "react";
import Image from "next/image";
import { motion, MotionValue, useTransform, useReducedMotion } from "framer-motion";

interface FloatingElementsProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function HeroFloatingElements({ mouseX, mouseY }: FloatingElementsProps) {
  const shouldReduceMotion = useReducedMotion();

  // Parallax transform offsets based on layer depth
  const bgX = useTransform(mouseX, [-1, 1], [6, -6]);
  const bgY = useTransform(mouseY, [-1, 1], [4, -4]);

  const midX = useTransform(mouseX, [-1, 1], [12, -12]);
  const midY = useTransform(mouseY, [-1, 1], [8, -8]);

  const fgX = useTransform(mouseX, [-1, 1], [18, -18]);
  const fgY = useTransform(mouseY, [-1, 1], [12, -12]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-15"
      aria-hidden="true"
    >
      {/* ========================================================================= */}
      {/* LAYER 1: BACKGROUND LEAVES & FEATHERS (Blur 4-8px, Opacity 0.25-0.45)     */}
      {/* ========================================================================= */}
      <motion.div
        style={shouldReduceMotion ? {} : { x: bgX, y: bgY }}
        className="absolute inset-0"
      >
        {/* Leaf - Upper-Left Corner */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 14, 0],
                  y: [-10, 8, -10],
                  rotate: [-16, 12, -16],
                }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[6%] left-[3%] w-12 sm:w-16 opacity-35 filter blur-[4px]"
        >
          <Image
            src="/assets/hero/hero-leaf.svg"
            alt="Leaf Accent"
            width={64}
            height={64}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Leaf - Upper-Center Canopy */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -16, 0],
                  y: [10, -10, 10],
                  rotate: [14, -14, 14],
                }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[4%] left-[44%] w-10 sm:w-14 opacity-40 filter blur-[5px]"
        >
          <Image
            src="/assets/hero/hero-leaf.svg"
            alt="Leaf Accent"
            width={56}
            height={56}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Leaf - Upper-Right Area */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 15, 0],
                  y: [-12, 12, -12],
                  rotate: [-20, 16, -20],
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[8%] right-[6%] w-14 sm:w-18 opacity-35 filter blur-[5px]"
        >
          <Image
            src="/assets/hero/hero-leaf.svg"
            alt="Leaf Accent"
            width={68}
            height={68}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Feather - Upper-Right */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -14, 0],
                  y: [12, -10, 12],
                  rotate: [25, -20, 25],
                }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[14%] right-[22%] w-10 sm:w-12 opacity-30 filter blur-[3.5px]"
        >
          <Image
            src="/assets/hero/hero-feather.svg"
            alt="Feather Accent"
            width={48}
            height={48}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Feather - Middle-Left */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 12, 0],
                  y: [-8, 10, -8],
                  rotate: [-30, 25, -30],
                }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute top-[48%] left-[1%] w-9 sm:w-12 opacity-30 filter blur-[4px]"
        >
          <Image
            src="/assets/hero/hero-feather.svg"
            alt="Feather Accent"
            width={46}
            height={46}
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 2: MIDGROUND FLOATING ACCENTS (Crisp with soft shadow)               */}
      {/* ========================================================================= */}
      <motion.div
        style={shouldReduceMotion ? {} : { x: midX, y: midY }}
        className="absolute inset-0"
      >
        {/* Leaf - Middle-Left near headline */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -10, 0],
                  y: [8, -10, 8],
                  rotate: [18, -15, 18],
                }
          }
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="absolute top-[28%] left-[2%] w-8 sm:w-11 opacity-55 filter drop-shadow-[0_4px_8px_rgba(31,107,69,0.12)]"
        >
          <Image
            src="/assets/hero/hero-leaf.svg"
            alt="Leaf Accent"
            width={44}
            height={44}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Leaf - Middle-Right above Poultry Scene */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 12, 0],
                  y: [-10, 10, -10],
                  rotate: [-14, 18, -14],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="absolute top-[20%] right-[3%] w-9 sm:w-12 opacity-60 filter drop-shadow-[0_4px_8px_rgba(31,107,69,0.14)]"
        >
          <Image
            src="/assets/hero/hero-leaf.svg"
            alt="Leaf Accent"
            width={48}
            height={48}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Feather - Top Center subtle drift */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 10, 0],
                  y: [-12, 8, -12],
                  rotate: [-22, 28, -22],
                }
          }
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          className="absolute top-[12%] left-[36%] w-8 sm:w-11 opacity-45 filter blur-[1px] drop-shadow-[0_4px_6px_rgba(0,0,0,0.06)]"
        >
          <Image
            src="/assets/hero/hero-feather.svg"
            alt="Feather Accent"
            width={44}
            height={44}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Feather - Middle-Right near scene */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -12, 0],
                  y: [10, -12, 10],
                  rotate: [30, -25, 30],
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
          className="absolute top-[42%] right-[1%] w-9 sm:w-12 opacity-40 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)]"
        >
          <Image
            src="/assets/hero/hero-feather.svg"
            alt="Feather Accent"
            width={48}
            height={48}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Leaf - Lower-Left Area */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 8, 0],
                  y: [-8, 8, -8],
                  rotate: [-12, 16, -12],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          className="absolute bottom-[16%] left-[4%] w-8 sm:w-10 opacity-50 filter drop-shadow-[0_4px_8px_rgba(31,107,69,0.1)]"
        >
          <Image
            src="/assets/hero/hero-leaf.svg"
            alt="Leaf Accent"
            width={40}
            height={40}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Leaf - Lower-Right Area */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -10, 0],
                  y: [8, -8, 8],
                  rotate: [15, -12, 15],
                }
          }
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          className="absolute bottom-[12%] right-[5%] w-8 sm:w-11 opacity-55 filter drop-shadow-[0_4px_8px_rgba(31,107,69,0.12)]"
        >
          <Image
            src="/assets/hero/hero-leaf.svg"
            alt="Leaf Accent"
            width={44}
            height={44}
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 3: FOREGROUND ACCENTS (Closest Depth, High Parallax)                 */}
      {/* ========================================================================= */}
      <motion.div
        style={shouldReduceMotion ? {} : { x: fgX, y: fgY }}
        className="absolute inset-0"
      >
        {/* Foreground Leaf - Bottom-Left subtle blur */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 14, 0],
                  y: [-12, 10, -12],
                  rotate: [-25, 20, -25],
                }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute bottom-[8%] left-[18%] w-9 sm:w-12 opacity-65 filter drop-shadow-[0_6px_12px_rgba(31,107,69,0.16)]"
        >
          <Image
            src="/assets/hero/hero-leaf.svg"
            alt="Leaf Accent"
            width={48}
            height={48}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Foreground Feather - Bottom-Center drifting */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -14, 0],
                  y: [12, -10, 12],
                  rotate: [35, -30, 35],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          className="absolute bottom-[6%] left-[48%] w-10 sm:w-13 opacity-55 filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.08)]"
        >
          <Image
            src="/assets/hero/hero-feather.svg"
            alt="Feather Accent"
            width={52}
            height={52}
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
