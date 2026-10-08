"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Leaf, Send, ShieldCheck, Award, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { FloatingFeathersAndLeaves } from "./FloatingFeathersAndLeaves";

export function PhotographicHero() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { openEnquiryModal } = useCart();

  // Subtle mouse parallax physics
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 90, mass: 0.8 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current || shouldReduceMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rawMouseX.set((x - 0.5) * 2);
    rawMouseY.set((y - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  // Subtle parallax transform offsets for background and content
  const bgScale = useTransform(mouseX, [-1, 1], [1.02, 1.02]);
  const bgTranslateX = useTransform(mouseX, [-1, 1], [8, -8]);
  const bgTranslateY = useTransform(mouseY, [-1, 1], [6, -6]);

  const contentTranslateX = useTransform(mouseX, [-1, 1], [-6, 6]);
  const contentTranslateY = useTransform(mouseY, [-1, 1], [-4, 4]);

  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={containerRef}
      id="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex items-center overflow-hidden select-none bg-[#f4f7f2]"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC FULLSCREEN HERO BACKGROUND PHOTOGRAPHY                       */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          ...(shouldReduceMotion
            ? {}
            : {
                x: bgTranslateX,
                y: bgTranslateY,
                scale: bgScale,
              }),
          backgroundImage: "url('/assets/hero/main hero.png')",
        }}
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat bg-center lg:bg-[center_right_15%] z-0"
      />

      {/* ========================================================================= */}
      {/* 2. SUBTLE GLOBAL DAYLIGHT & VIGNETTE OVERLAY                              */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none z-5 bg-gradient-to-r from-black/10 via-transparent to-black/5"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 3. CINEMATIC FLOATING FEATHERS + LEAVES WITH ORGANIC MOUSE REPULSION      */}
      {/* ========================================================================= */}
      <FloatingFeathersAndLeaves containerRef={containerRef} />

      {/* ========================================================================= */}
      {/* 4. ORGANIC FEATHERED TEXT MASK LAYER (NO RECTANGULAR BOX, INVISIBLE EDGES)*/}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(
              ellipse 65% 85% at 20% 50%,
              rgba(255, 255, 255, 0.88) 0%,
              rgba(255, 255, 255, 0.72) 28%,
              rgba(255, 255, 255, 0.38) 55%,
              rgba(255, 255, 255, 0.08) 75%,
              transparent 90%
            ),
            linear-gradient(
              to right,
              rgba(255, 255, 255, 0.75) 0%,
              rgba(255, 255, 255, 0.45) 30%,
              rgba(255, 255, 255, 0.1) 50%,
              transparent 70%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 4. MAIN HERO CONTENT CONTAINER (POSITIONED IN NATURAL NEGATIVE SPACE)     */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-24 pb-16 lg:pt-28 lg:pb-20 z-20 my-auto">
        <div className="max-w-2xl xl:max-w-3xl">
          <motion.div
            style={shouldReduceMotion ? {} : { x: contentTranslateX, y: contentTranslateY }}
            className="space-y-6 text-left"
          >
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-brand-darkGreen text-xs sm:text-sm font-black uppercase tracking-wider border border-brand-softGreen/80 shadow-2xs">
              <Leaf className="w-3.5 h-3.5 text-brand-freshGreen" />
              <span>POULTRY FARM ECOSYSTEM</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[66px] font-black tracking-tight leading-[1.03] text-[#111827]">
              HEALTHY BIRDS, <br />
              <span className="text-brand-darkGreen">BETTER</span>{" "}
              <span className="relative inline-block text-[#C96F28]">
                TOMORROW.
                {/* Thin golden brush underline */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-3.5 text-brand-yellow"
                  fill="none"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9.5C50 3.5 150 2 198 8"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg lg:text-xl text-[#374151] max-w-[540px] leading-relaxed font-medium">
              Premium poultry products, equipment and solutions for a healthier, more productive and sustainable poultry ecosystem.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Primary CTA: Explore Products */}
              <a
                href="/#products"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-brand-darkGreen/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Secondary CTA: Explore Categories */}
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 px-6 py-3.5 sm:py-4 rounded-full bg-white/95 hover:bg-white text-brand-darkGreen border border-brand-softGreen font-bold text-sm sm:text-base shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Explore Categories</span>
              </Link>

              {/* Third Action: Contact Us */}
              <button
                suppressHydrationWarning
                onClick={() => openEnquiryModal()}
                className="inline-flex items-center gap-2 px-5 py-3.5 sm:py-4 rounded-full bg-brand-softYellow/90 hover:bg-brand-softYellow text-brand-darkGray font-bold text-xs sm:text-sm border border-brand-yellow/60 shadow-2xs hover:shadow transition duration-200 active:scale-95"
              >
                <Send className="w-3.5 h-3.5 text-brand-darkGreen" />
                <span>Contact Us</span>
              </button>
            </div>

            {/* Quality Feature Badges */}
            <div className="pt-4 border-t border-brand-darkGreen/15 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-[#1F2937]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-freshGreen" />
                <span>100% Disease-Free Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-yellow" />
                <span>Direct Hatchery Sourcing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-freshGreen" />
                <span>Bio-Secure Transit</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
