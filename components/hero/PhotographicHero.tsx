"use client";

import React from "react";
import { Award, ShieldCheck, TrendingUp, Settings } from "lucide-react";
import { TrustedBadge } from "./TrustedBadge";
import { HeroCategoryCarousel } from "./HeroCategoryCarousel";

interface PhotographicHeroProps {
  onSelectCategory?: (slug: string) => void;
}

export function PhotographicHero({ onSelectCategory }: PhotographicHeroProps) {
  return (
    <section
      id="hero-section"
      style={{
        backgroundImage: "url('/assets/hero/main%20hero.png')",
        backgroundPosition: "center 28%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative isolate w-full min-h-[620px] lg:min-h-[680px] xl:h-[calc(100vh-68px)] xl:max-h-[840px] overflow-hidden select-none flex flex-col justify-between"
    >
      {/* 1. Full-Width Authentic Background Image Layer (Guaranteed above parent, zero white mask, sharp & vibrant) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <picture className="w-full h-full block">
          <source srcSet="/assets/hero/main-hero.webp" type="image/webp" />
          <img
            src="/assets/hero/main%20hero.png"
            alt="PPF Group of Companies - Poultry Farms & Hatcheries"
            className="w-full h-full object-cover object-[center_28%] block"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      {/* 2. Top-Right Circular Trusted Poultry Industry Badge & Top-Left Framing Accent */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-6 md:top-5 md:right-8 lg:top-6 lg:right-12 xl:right-16 z-30 pointer-events-auto">
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 xl:w-56 xl:h-56">
          <TrustedBadge />
        </div>
      </div>

      {/* Top Left Delicate Gold Wave Framing */}
      <div className="absolute left-0 top-0 pointer-events-none hidden lg:block opacity-80 z-10">
        <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
          <path
            d="M -10,10 C 60,10 120,40 180,25 C 205,18 215,8 220,0"
            stroke="url(#topGoldRibbonAccent)"
            strokeWidth="3.5"
          />
          <path
            d="M -10,18 C 60,18 115,48 175,32 C 198,25 210,15 215,8"
            stroke="#0B3C23"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="topGoldRibbonAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#FFF2B2" />
              <stop offset="100%" stopColor="#B38728" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 3. Center Brand Identity — Massive PPF Heading, Plaque, Subtitle & 4 Highlights */}
      <div className="relative w-full max-w-5xl mx-auto px-4 text-center flex flex-col items-center justify-center my-auto z-20 pt-2 sm:pt-4">
        {/* Soft, Semi-Transparent Warm-White/Cream Mask with Feathered Edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -inset-x-6 sm:-inset-x-12 md:-inset-x-16 -inset-y-4 sm:-inset-y-6 md:-inset-y-8 -z-10 pointer-events-none rounded-[50px] md:rounded-[90px]"
          style={{
            background:
              "radial-gradient(ellipse 80% 68% at 50% 48%, rgba(255, 253, 247, 0.78) 0%, rgba(254, 250, 240, 0.58) 42%, rgba(252, 246, 230, 0.26) 70%, rgba(255, 255, 255, 0) 100%)",
            filter: "blur(18px)",
          }}
        />

        {/* Semantic SEO Heading */}
        <h1 className="sr-only">
          PPF Group of Companies - Poultry Farms &amp; Hatcheries - Trusted Poultry Industry Since 2011
        </h1>

        {/* Large PPF Text — Dominant Visual Brand Anchor */}
        <div className="relative inline-block leading-none tracking-tight">
          <span
            className="font-black select-text block uppercase drop-shadow-[0_8px_18px_rgba(0,0,0,0.4)]"
            style={{
              fontSize: "clamp(5rem, 12.5vw, 12.5rem)",
              lineHeight: 0.84,
              letterSpacing: "-0.035em",
              color: "#07331C",
              WebkitTextStroke: "2.5px #E2B94A",
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.35)) drop-shadow(0 1px 2px #FDE68A)",
              textShadow: "0 4px 14px rgba(4, 28, 15, 0.55), 0 1px 0 #FFF6D1",
            }}
          >
            PPF
          </span>

          {/* 3D Metallic Gold & Green Wave Ribbon Underneath PPF */}
          <div className="w-full -mt-2 sm:-mt-3 md:-mt-5 lg:-mt-7 flex justify-center pointer-events-none">
            <svg
              viewBox="0 0 600 70"
              className="w-[100%] max-w-[620px] h-auto drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="ppfRibbonGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C99E32" />
                  <stop offset="25%" stopColor="#FFF2B2" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="75%" stopColor="#FCF6BA" />
                  <stop offset="100%" stopColor="#A8791B" />
                </linearGradient>
                <linearGradient id="ppfRibbonGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0B4024" />
                  <stop offset="40%" stopColor="#0E5430" />
                  <stop offset="70%" stopColor="#072F1B" />
                  <stop offset="100%" stopColor="#041B0F" />
                </linearGradient>
              </defs>
              <path
                d="M 20,40 C 90,62 170,18 270,30 C 370,42 460,15 580,24 C 540,38 430,62 310,48 C 210,36 120,68 20,40 Z"
                fill="url(#ppfRibbonGreenGrad)"
              />
              <path
                d="M 18,39 C 90,61 170,17 270,29 C 370,41 460,14 582,23"
                fill="none"
                stroke="url(#ppfRibbonGoldGrad)"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <path
                d="M 22,41 C 120,69 210,37 310,49 C 430,63 540,39 580,25"
                fill="none"
                stroke="url(#ppfRibbonGoldGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Subtitle Plaque: GROUP OF COMPANIES */}
        <div className="mt-1 sm:mt-1.5 relative z-10">
          <div className="inline-block rounded-full bg-gradient-to-r from-[#C69A2E] via-[#FFF1AB] to-[#B88A22] p-[1.5px] shadow-[0_6px_18px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-[1.02]">
            <div className="rounded-full bg-gradient-to-r from-[#DFB344] via-[#FFF6C7] to-[#D4A533] px-6 sm:px-10 md:px-14 py-1 sm:py-1.5 md:py-2 flex items-center justify-center">
              <span className="text-[#072917] font-black uppercase tracking-wider sm:tracking-widest text-xs sm:text-base md:text-xl lg:text-2xl drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                GROUP OF COMPANIES
              </span>
            </div>
          </div>
        </div>

        {/* POULTRY FARMS & HATCHERIES with decorative wing lines */}
        <div className="mt-1.5 sm:mt-2.5 flex items-center justify-center gap-2 sm:gap-3 text-[#09371F]">
          <span className="h-[2px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-[#09371F]" />
          <span className="font-black uppercase tracking-[0.2em] sm:tracking-[0.28em] text-[11px] sm:text-xs md:text-sm lg:text-base drop-shadow-sm">
            POULTRY FARMS &amp; HATCHERIES
          </span>
          <span className="h-[2px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-[#09371F]" />
        </div>

        {/* 4 Trust & Service Highlights */}
        <div className="mt-2.5 sm:mt-3 md:mt-3.5 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 md:gap-5 text-[#0A3D22]">
          <div className="flex items-center gap-1.5 px-2 py-0.5">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0A3D22] stroke-[2.4]" />
            <span className="text-[9.5px] sm:text-[10.5px] md:text-xs font-black uppercase tracking-wider">
              QUALITY PRODUCTS
            </span>
          </div>

          <div className="hidden sm:block w-px h-3.5 bg-[#0A3D22]/30" />

          <div className="flex items-center gap-1.5 px-2 py-0.5">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0A3D22] stroke-[2.4]" />
            <span className="text-[9.5px] sm:text-[10.5px] md:text-xs font-black uppercase tracking-wider">
              TRUSTED SUPPLY
            </span>
          </div>

          <div className="hidden sm:block w-px h-3.5 bg-[#0A3D22]/30" />

          <div className="flex items-center gap-1.5 px-2 py-0.5">
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0A3D22] stroke-[2.4]" />
            <span className="text-[9.5px] sm:text-[10.5px] md:text-xs font-black uppercase tracking-wider">
              FARMER SUCCESS
            </span>
          </div>

          <div className="hidden sm:block w-px h-3.5 bg-[#0A3D22]/30" />

          <div className="flex items-center gap-1.5 px-2 py-0.5">
            <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0A3D22] stroke-[2.4]" />
            <span className="text-[9.5px] sm:text-[10.5px] md:text-xs font-black uppercase tracking-wider">
              COMPLETE POULTRY SOLUTIONS
            </span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section — Arched Wave with 12-Category Carousel Visible Immediately on Initial Load */}
      <div className="relative w-full z-20 pb-1.5 sm:pb-2.5">
        {/* Arched Wave with Gold Metallic Border */}
        <div className="relative w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 32"
            preserveAspectRatio="none"
            className="w-full h-5 sm:h-6 md:h-8 block"
          >
            <defs>
              <linearGradient id="waveGoldBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C99E32" />
                <stop offset="30%" stopColor="#FFF2B2" />
                <stop offset="50%" stopColor="#E2BD4E" />
                <stop offset="70%" stopColor="#FFF2B2" />
                <stop offset="100%" stopColor="#A8791B" />
              </linearGradient>
            </defs>
            <path
              d="M 0,16 Q 720,0 1440,16 L 1440,32 L 0,32 Z"
              fill="#062F1B"
            />
            <path
              d="M 0,16 Q 720,0 1440,16"
              fill="none"
              stroke="url(#waveGoldBorderGrad)"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Carousel Body */}
        <div className="w-full bg-gradient-to-b from-[#062F1B] via-[#052615] to-[#041E11] pb-1.5 sm:pb-2 pt-0">
          <HeroCategoryCarousel onSelectCategory={onSelectCategory} />
        </div>
      </div>
    </section>
  );
}

export default PhotographicHero;
