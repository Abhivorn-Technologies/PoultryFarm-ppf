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
      className="relative w-full overflow-hidden select-none flex flex-col"
    >
      {/* 1. Upper Photographic Hero Area with Edge-to-Edge Background Image */}
      <div
        className="relative w-full overflow-hidden flex flex-col items-center justify-center pt-2 sm:pt-3 pb-3 sm:pb-4 md:pb-5"
        style={{
          backgroundImage: "url('/assets/hero/main%20hero.png')",
          backgroundPosition: "center 30%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Full-Width Authentic Background Image Layer (Edge-to-edge, sharp & vibrant) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/hero/main%20hero.png"
            alt="PPF Group of Companies - Poultry Farms & Hatcheries"
            className="w-full h-full object-cover object-[center_30%] block"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Top-Right Circular Trusted Poultry Industry Badge (Since 2011) */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-6 md:top-5 md:right-8 lg:top-6 lg:right-10 xl:right-14 z-30 pointer-events-auto">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40">
            <TrustedBadge />
          </div>
        </div>

        {/* Center Brand Identity — Prominently Centered Official Logo, Subtitle & Benefits */}
        <div className="relative w-full max-w-5xl mx-auto px-4 text-center flex flex-col items-center justify-center z-20 pt-1">
          {/* Soft, Semi-Transparent Warm-White/Cream Mask with Feathered Edges for Logo Contrast */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -inset-x-10 sm:-inset-x-20 md:-inset-x-28 -inset-y-6 sm:-inset-y-10 -z-10 pointer-events-none rounded-[70px] md:rounded-[110px]"
            style={{
              background:
                "radial-gradient(ellipse 75% 65% at 50% 46%, rgba(255, 253, 246, 0.84) 0%, rgba(254, 250, 238, 0.62) 42%, rgba(252, 246, 228, 0.20) 70%, rgba(255, 255, 255, 0) 100%)",
              filter: "blur(22px)",
            }}
          />

          {/* Semantic SEO Heading */}
          <h1 className="sr-only">
            PPF Group of Companies - Poultry Farms &amp; Hatcheries - Trusted Poultry Industry Since 2011
          </h1>

          {/* Actual Official PPF Logo Prominently Centered (Do not move, resize or modify) */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-[380px] md:h-[380px] lg:w-[460px] lg:h-[460px] xl:w-[520px] xl:h-[520px] 2xl:w-[560px] 2xl:h-[560px] mx-auto flex items-center justify-center">
            <img
              src="/assets/logo/LOGO.png"
              alt="PPF - Poultry Farms & Hatcheries"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:scale-[1.01]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          {/* Central Text Group with Dedicated Soft Translucent Cream-White Mask */}
          <div className="relative -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5 px-4 py-1.5 sm:py-2 flex flex-col items-center justify-center z-10">
            {/* Subtle translucent cream-white gradient mask behind the text for contrast */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -inset-x-6 sm:-inset-x-12 -inset-y-2 sm:-inset-y-3 -z-10 pointer-events-none rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse 92% 80% at 50% 50%, rgba(255, 250, 235, 0.78) 0%, rgba(255, 250, 235, 0.55) 50%, rgba(255, 250, 235, 0.18) 78%, rgba(255, 250, 235, 0) 100%)",
                filter: "blur(12px)",
              }}
            />

            {/* 1. POULTRY FARMS & HATCHERIES with delicate wing divider lines */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-4 text-[#063D27]">
              <span className="h-[1.5px] w-6 sm:w-10 md:w-14 bg-gradient-to-r from-transparent to-[#063D27]" />
              <span
                className="font-bold sm:font-extrabold uppercase tracking-[0.22em] sm:tracking-[0.28em] text-xs sm:text-sm md:text-[15px] lg:text-base leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]"
                style={{
                  textShadow: "0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.6)",
                }}
              >
                POULTRY FARMS &amp; HATCHERIES
              </span>
              <span className="h-[1.5px] w-6 sm:w-10 md:w-14 bg-gradient-to-l from-transparent to-[#063D27]" />
            </div>

            {/* 2. Three Benefits in one clear horizontal row */}
            <div className="mt-2 sm:mt-2.5 max-w-3xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3.5 md:gap-5 text-[#063D27]">
              <div className="flex items-center gap-1.5 px-1 py-0.5">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#063D27] stroke-[2.4]" />
                <span
                  className="text-[10px] sm:text-[11px] md:text-xs lg:text-[12.5px] font-bold uppercase tracking-wider whitespace-nowrap drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]"
                  style={{
                    textShadow: "0 1px 1px rgba(255,255,255,0.8)",
                  }}
                >
                  Quality Products
                </span>
              </div>

              <div className="hidden sm:block w-px h-3.5 bg-[#063D27]/40" />

              <div className="flex items-center gap-1.5 px-1 py-0.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#063D27] stroke-[2.4]" />
                <span
                  className="text-[10px] sm:text-[11px] md:text-xs lg:text-[12.5px] font-bold uppercase tracking-wider whitespace-nowrap drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]"
                  style={{
                    textShadow: "0 1px 1px rgba(255,255,255,0.8)",
                  }}
                >
                  Trusted Supply
                </span>
              </div>

              <div className="hidden sm:block w-px h-3.5 bg-[#063D27]/40" />

              <div className="flex items-center gap-1.5 px-1 py-0.5">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#063D27] stroke-[2.4]" />
                <span
                  className="text-[10px] sm:text-[11px] md:text-xs lg:text-[12.5px] font-bold uppercase tracking-wider whitespace-nowrap drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]"
                  style={{
                    textShadow: "0 1px 1px rgba(255,255,255,0.8)",
                  }}
                >
                  Farmer Success
                </span>
              </div>
            </div>

            {/* 3. Complete Poultry Solutions as separate centered line directly below */}
            <div className="mt-1.5 sm:mt-2 flex items-center justify-center gap-1.5 text-[#063D27]">
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#063D27] stroke-[2.4]" />
              <span
                className="text-[10px] sm:text-[11px] md:text-xs lg:text-[12.5px] font-bold uppercase tracking-wider whitespace-nowrap drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]"
                style={{
                  textShadow: "0 1px 1px rgba(255,255,255,0.8)",
                }}
              >
                Complete Poultry Solutions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Thin Intentional Gold Divider Line Between Hero Background and Category Carousel */}
      <div className="relative w-full z-20 leading-none">
        <div className="w-full h-[2px] bg-gradient-to-r from-[#C99E32] via-[#FFF2B2] to-[#A8791B] shadow-[0_1px_3px_rgba(0,0,0,0.3)]" />
      </div>

      {/* 3. Dark-Green Category Carousel — Begins Directly Below the Hero Background's Bottom Edge */}
      <div className="relative w-full z-20 bg-gradient-to-b from-[#062F1B] via-[#052615] to-[#041E11] py-2 sm:py-2.5">
        <HeroCategoryCarousel onSelectCategory={onSelectCategory} />
      </div>
    </section>
  );
}

export default PhotographicHero;
