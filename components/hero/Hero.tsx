"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { HeroBackground } from "./HeroBackground";
import { HeroFloatingElements } from "./HeroFloatingElements";
import { HeroScene } from "./HeroScene";
import { HeroWave } from "./HeroWave";
import { ArrowRight, Leaf, Send } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { openEnquiryModal } = useCart();

  // Mouse coordinate values for hero-wide floating elements parallax
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 100, mass: 0.8 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current || shouldReduceMotion) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rawMouseX.set((x - 0.5) * 2);
    rawMouseY.set((y - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  // Scroll parallax effects for subtle depth as user scrolls
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.55]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -12]);

  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[70vh] lg:min-h-[75vh] flex items-center pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-10 lg:pb-16 overflow-hidden select-none"
    >
      {/* 1. Atmospheric Ambient Multi-Gradient Background */}
      <HeroBackground />

      {/* 2. Hero-Wide Depth-Layered Floating Feathers & Leaves */}
      <HeroFloatingElements mouseX={mouseX} mouseY={mouseY} />

      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-20 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
          {/* ========================================================================= */}
          {/* LEFT: HERO TYPOGRAPHY & CTAS (~42% width on desktop, vertically centered) */}
          {/* ========================================================================= */}
          <motion.div
            className="lg:col-span-5 xl:col-span-5 space-y-5 sm:space-y-6 text-left pl-0 lg:pl-2"
            style={
              shouldReduceMotion
                ? {}
                : {
                    y: textY,
                    opacity: textOpacity,
                  }
            }
          >
            {/* Top Quality Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: customEase }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-softGreen/90 backdrop-blur-md text-brand-darkGreen text-xs sm:text-sm font-black uppercase tracking-wider border border-brand-freshGreen/40 shadow-xs"
            >
              <Leaf className="w-3.5 h-3.5 text-brand-freshGreen" />
              <span>FRESH • HEALTHY • QUALITY</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
              className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-black tracking-tight text-[#1F2937] leading-[1.04]"
            >
              Healthy Birds <br />
              <span className="text-brand-darkGreen">Better</span>{" "}
              <span className="relative inline-block text-[#E37A9A]">
                Tomorrow
                {/* Thin yellow decorative brush underline */}
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
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              className="text-sm sm:text-base lg:text-lg text-brand-gray max-w-[540px] leading-relaxed font-normal"
            >
              Explore poultry chicks, breeds, hatching eggs, equipment, feeds and more — all in one convenient catalogue.
            </motion.p>

            {/* CTA Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
              className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-1"
            >
              {/* Primary CTA: Explore Products */}
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-sm sm:text-base tracking-wide shadow-md shadow-brand-darkGreen/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary CTA: View Categories */}
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white hover:bg-brand-cardCream text-brand-darkGreen border border-brand-softGreen font-bold text-sm sm:text-base shadow-xs hover:shadow hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>View Categories</span>
              </Link>

              {/* Third CTA: Contact Us */}
              <button
                onClick={() => openEnquiryModal()}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-brand-softYellow/80 hover:bg-brand-softYellow text-brand-darkGray font-bold text-xs sm:text-sm border border-brand-yellow/60 shadow-xs hover:shadow transition duration-200 active:scale-95"
              >
                <Send className="w-3.5 h-3.5 text-brand-darkGreen" />
                <span>Contact Us</span>
              </button>
            </motion.div>

            {/* Four Compact Informational Category Callout Cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: customEase }}
              className="pt-4 border-t border-brand-softGreen/60 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3"
            >
              <Link
                href="/category/chicks-young-birds"
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 border border-brand-softGreen/80 flex items-center gap-2 sm:gap-2.5 shadow-xs hover:border-brand-freshGreen hover:shadow-sm transition group"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-softYellow/90 text-brand-darkGreen flex items-center justify-center text-sm sm:text-base flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  🐥
                </div>
                <div>
                  <div className="font-extrabold text-xs text-brand-darkGray leading-tight group-hover:text-brand-darkGreen transition-colors">
                    Chicks & Birds
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-brand-gray font-medium">
                    Multiple Breeds
                  </div>
                </div>
              </Link>

              <Link
                href="/category/hatching-eggs"
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 border border-brand-softGreen/80 flex items-center gap-2 sm:gap-2.5 shadow-xs hover:border-brand-freshGreen hover:shadow-sm transition group"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-cream text-brand-darkGray flex items-center justify-center text-sm sm:text-base flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  🥚
                </div>
                <div>
                  <div className="font-extrabold text-xs text-brand-darkGray leading-tight group-hover:text-brand-darkGreen transition-colors">
                    Hatching Eggs
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-brand-gray font-medium">
                    Wide Variety
                  </div>
                </div>
              </Link>

              <Link
                href="/category/poultry-equipment"
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 border border-brand-softGreen/80 flex items-center gap-2 sm:gap-2.5 shadow-xs hover:border-brand-freshGreen hover:shadow-sm transition group"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-softPink/80 text-brand-darkGray flex items-center justify-center text-sm sm:text-base flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  ⚙️
                </div>
                <div>
                  <div className="font-extrabold text-xs text-brand-darkGray leading-tight group-hover:text-brand-darkGreen transition-colors">
                    Poultry Equipment
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-brand-gray font-medium">
                    Drinkers, Feeders & More
                  </div>
                </div>
              </Link>

              <Link
                href="/category/poultry-feed-ingredients"
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 border border-brand-softGreen/80 flex items-center gap-2 sm:gap-2.5 shadow-xs hover:border-brand-freshGreen hover:shadow-sm transition group"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-softGreen/80 text-brand-darkGreen flex items-center justify-center text-sm sm:text-base flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  🌾
                </div>
                <div>
                  <div className="font-extrabold text-xs text-brand-darkGray leading-tight group-hover:text-brand-darkGreen transition-colors">
                    Poultry Feeds
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-brand-gray font-medium">
                    Quality Nutrition
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT: INTEGRATED 3D POULTRY FARM SCENE (~58% width on desktop)           */}
          {/* ========================================================================= */}
          <motion.div
            className="lg:col-span-7 xl:col-span-7 relative flex justify-center lg:justify-end items-center"
            style={shouldReduceMotion ? {} : { y: sceneY }}
          >
            <HeroScene />
          </motion.div>
        </div>
      </div>

      {/* 3. Fluid Animated Organic Bottom Wave */}
      <HeroWave />
    </section>
  );
}

export { Hero as HeroSection };
