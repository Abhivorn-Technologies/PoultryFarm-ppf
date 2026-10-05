"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { HeroFloatingAsset } from "./HeroFloatingAsset";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates normalized from -1 to 1
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Smooth spring physics for 60fps parallax without sudden jerks
  const springConfig = { damping: 24, stiffness: 90, mass: 0.8 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);

  // 3D Scene subtle tilt angles (degrees)
  const sceneRotateX = useTransform(mouseY, [-1, 1], [2.5, -2.5]);
  const sceneRotateY = useTransform(mouseX, [-1, 1], [-3.5, 3.5]);

  // Handle mouse move across the hero container
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
      if (!containerRef.current || shouldReduceMotion) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 to 1
      const y = (e.clientY - rect.top) / rect.height; // 0 to 1
      const normalizedX = (x - 0.5) * 2; // -1 to 1
      const normalizedY = (y - 0.5) * 2; // -1 to 1

      // Clamp between -1 and 1
      rawMouseX.set(Math.max(-1, Math.min(1, normalizedX)));
      rawMouseY.set(Math.max(-1, Math.min(1, normalizedY)));
    },
    [rawMouseX, rawMouseY, shouldReduceMotion]
  );

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  // Gyroscope / device orientation support for mobile subtle tilt
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (shouldReduceMotion || !e.gamma || !e.beta) return;
      const normX = Math.max(-1, Math.min(1, e.gamma / 35));
      const normY = Math.max(-1, Math.min(1, (e.beta - 45) / 35));
      rawMouseX.set(normX * 0.35);
      rawMouseY.set(normY * 0.35);
    };

    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }
    return () => {
      if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [rawMouseX, rawMouseY, shouldReduceMotion]);

  // Parallax transform offsets for rooster shadow
  const roosterShadowX = useTransform(mouseX, [-1, 1], [10, -10]);
  const roosterShadowY = useTransform(mouseY, [-1, 1], [6, -6]);

  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3.2] sm:aspect-[4/3.0] lg:aspect-[1/0.82] max-w-[680px] sm:max-w-[760px] lg:max-w-[840px] xl:max-w-[880px] mx-auto flex items-center justify-center select-none"
      style={{
        perspective: "1200px",
      }}
    >
      {/* 3D Visual Stage Container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1.1,
          ease: customEase,
        }}
        style={
          shouldReduceMotion
            ? { transformStyle: "preserve-3d" }
            : {
                rotateX: sceneRotateX,
                rotateY: sceneRotateY,
                transformStyle: "preserve-3d",
              }
        }
      >
        {/* ========================================================================= */}
        {/* LAYER 0: DISTANT BACKGROUND BIRDS (hero-bird.svg - In Sky / Atmospheric)  */}
        {/* ========================================================================= */}
        <HeroFloatingAsset
          src="/assets/hero/hero-bird.svg"
          alt="Distant Poultry Bird"
          width={65}
          height={65}
          depthZ={-15}
          zIndex={5}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.18}
          entryDelay={0.2}
          entryFrom={{ y: -15, x: 20, scale: 0.85 }}
          floatDuration={12}
          floatY={[0, -10, 0]}
          floatX={[0, -15, 0]}
          shadowClass=""
          className="top-[6%] right-[16%] sm:right-[20%] w-[46px] sm:w-[56px] opacity-40 filter blur-[2px]"
        />

        <HeroFloatingAsset
          src="/assets/hero/hero-bird.svg"
          alt="Distant Poultry Bird 2"
          width={45}
          height={45}
          depthZ={-25}
          zIndex={4}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.12}
          entryDelay={0.3}
          entryFrom={{ y: -10, x: -15, scale: 0.8 }}
          floatDuration={14}
          floatY={[0, 8, 0]}
          floatX={[0, 12, 0]}
          shadowClass=""
          className="top-[16%] right-[34%] sm:right-[38%] w-[32px] sm:w-[40px] opacity-30 filter blur-[3.5px]"
        />

        {/* ========================================================================= */}
        {/* LAYER 1: SOFT AMBIENT SUNLIT PASTURE GLOW AURA (Behind composition)       */}
        {/* ========================================================================= */}
        <div
          className="absolute top-[6%] left-[6%] w-[88%] h-[84%] rounded-full pointer-events-none"
          style={{ transform: "translateZ(-30px)" }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E2F6EB]/50 via-[#FFF4D8]/45 to-[#FCE9E8]/30 filter blur-3xl transform scale-110" />
          <div className="absolute top-1/4 left-1/4 w-56 h-56 rounded-full bg-brand-softYellow/30 filter blur-2xl" />
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: GRASS FARM PLATFORM (herograss.webp - Solid Foundation)          */}
        {/* ========================================================================= */}
        <HeroFloatingAsset
          src="/assets/hero/herograss.webp"
          alt="Natural Organic Grass Farm Platform"
          width={840}
          height={300}
          depthZ={10}
          zIndex={10}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.35}
          entryDelay={0.15}
          entryFrom={{ y: 30, scale: 0.94 }}
          floatDuration={7}
          floatY={[0, -2, 0]}
          shadowClass="filter drop-shadow-[0_28px_40px_rgba(31,107,69,0.22)] drop-shadow-[0_12px_20px_rgba(0,0,0,0.06)]"
          className="bottom-[6%] sm:bottom-[8%] left-[1%] sm:left-[2%] w-[98%] sm:w-[96%] max-w-[840px]"
        />

        {/* ========================================================================= */}
        {/* LAYER 3: INCUBATOR (hero-incubator.svg - Grounded on Left of Grass)       */}
        {/* ========================================================================= */}
        <HeroFloatingAsset
          src="/assets/hero/hero-incubator.svg"
          alt="Smart Egg Incubator"
          width={280}
          height={200}
          depthZ={22}
          zIndex={16}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.45}
          entryDelay={0.35}
          entryFrom={{ y: 25, x: -30, scale: 0.92 }}
          floatDuration={8}
          floatY={[0, -3, 0]}
          glowEffect="bg-brand-softGreen/30"
          shadowClass="filter drop-shadow-[0_14px_22px_rgba(31,107,69,0.18)]"
          className="bottom-[21%] sm:bottom-[23%] left-[4%] sm:left-[6%] w-[190px] sm:w-[240px] lg:w-[270px]"
        />

        {/* ========================================================================= */}
        {/* LAYER 3: POULTRY FEED BAG (hero-poultry-feed-bag.svg - Behind Rooster)    */}
        {/* ========================================================================= */}
        <HeroFloatingAsset
          src="/assets/hero/hero-poultry-feed-bag.svg"
          alt="Poultry Feed Bag"
          width={180}
          height={240}
          depthZ={25}
          zIndex={18}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.5}
          entryDelay={0.4}
          entryFrom={{ y: 25, x: 30, scale: 0.92 }}
          floatDuration={8.5}
          floatY={[0, -3, 0]}
          glowEffect="bg-brand-softYellow/30"
          shadowClass="filter drop-shadow-[0_16px_24px_rgba(31,107,69,0.18)]"
          className="bottom-[23%] sm:bottom-[25%] right-[11%] sm:right-[13%] w-[120px] sm:w-[150px] lg:w-[170px]"
        />

        {/* ========================================================================= */}
        {/* LAYER 3: FEEDER (hero-feeder.svg - Toward Far-Right Side of Grass)        */}
        {/* ========================================================================= */}
        <HeroFloatingAsset
          src="/assets/hero/hero-feeder.svg"
          alt="Poultry Feeder"
          width={110}
          height={110}
          depthZ={24}
          zIndex={17}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.45}
          entryDelay={0.42}
          entryFrom={{ y: 20, x: 20, scale: 0.92 }}
          floatDuration={8.0}
          floatY={[0, -3, 0]}
          shadowClass="filter drop-shadow-[0_12px_18px_rgba(31,107,69,0.15)]"
          className="bottom-[31%] sm:bottom-[33%] right-[4%] sm:right-[5%] w-[75px] sm:w-[95px] lg:w-[105px]"
        />

        {/* ========================================================================= */}
        {/* LAYER 3: LARGE WATERER (hero-waterer-large.svg - Far-Right / Foreground)  */}
        {/* ========================================================================= */}
        <HeroFloatingAsset
          src="/assets/hero/hero-waterer-large.svg"
          alt="Large Poultry Waterer Equipment"
          width={125}
          height={125}
          depthZ={26}
          zIndex={19}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.48}
          entryDelay={0.45}
          entryFrom={{ y: 20, x: 20, scale: 0.92 }}
          floatDuration={8.5}
          floatY={[0, -3, 0]}
          shadowClass="filter drop-shadow-[0_14px_20px_rgba(31,107,69,0.18)]"
          className="bottom-[16%] sm:bottom-[18%] right-[2%] sm:right-[3%] w-[85px] sm:w-[105px] lg:w-[118px]"
        />

        {/* ========================================================================= */}
        {/* LAYER 3: MAIN ROOSTER & GROUND CONTACT SHADOW (Center-Right Primary Star) */}
        {/* ========================================================================= */}

        {/* Contact Elliptical Ground Shadow under Rooster feet on the Grass */}
        <motion.div
          style={
            shouldReduceMotion
              ? {}
              : {
                  x: roosterShadowX,
                  y: roosterShadowY,
                  transformStyle: "preserve-3d",
                }
          }
          className="absolute bottom-[18%] sm:bottom-[20%] left-[54%] sm:left-[56%] -translate-x-1/2 w-[210px] sm:w-[260px] lg:w-[290px] h-[32px] sm:h-[38px] pointer-events-none z-20"
        >
          <div className="w-full h-full rounded-[100%] bg-brand-darkGreen/30 filter blur-md transform scale-y-75" />
          <div className="absolute inset-x-6 inset-y-1 rounded-[100%] bg-black/15 filter blur-sm transform scale-y-75" />
        </motion.div>

        {/* Dominant Main Rooster standing ON the Grass */}
        <HeroFloatingAsset
          src="/assets/hero/hero-rooster.svg"
          alt="Champion Breed Rooster"
          isDominant={true}
          priority={true}
          width={390}
          height={420}
          depthZ={55}
          zIndex={26}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.8}
          entryDelay={0.25}
          entryFrom={{ y: 40, scale: 0.94 }}
          floatDuration={5.0}
          floatY={[0, -5, 0]}
          floatRotate={[-0.5, 0.5, -0.5]}
          glowEffect="bg-gradient-to-tr from-brand-freshGreen/25 via-brand-yellow/20 to-brand-pink/15"
          shadowClass="filter drop-shadow-[0_22px_32px_rgba(31,107,69,0.22)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
          className="bottom-[19%] sm:bottom-[21%] left-[34%] sm:left-[36%] lg:left-[38%] w-[270px] sm:w-[330px] lg:w-[370px]"
        />

        {/* ========================================================================= */}
        {/* LAYER 4: THREE CHICKS (hero-chick.svg - Visibly standing ON the Grass)    */}
        {/* ========================================================================= */}

        {/* Chick 1: Front-Left of Rooster (Depth: Foreground, Scale: larger) */}
        <HeroFloatingAsset
          src="/assets/hero/hero-chick.svg"
          alt="Active Day-Old Chick 1"
          width={140}
          height={140}
          depthZ={60}
          zIndex={30}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.85}
          entryDelay={0.45}
          entryFrom={{ y: 25, scale: 0.92 }}
          floatDuration={3.8}
          floatY={[0, -4, 0]}
          floatX={[0, 1.5, 0]}
          floatScale={[0.95, 0.965, 0.95]}
          glowEffect="bg-brand-softYellow/35"
          shadowClass="filter drop-shadow-[0_12px_18px_rgba(244,197,66,0.3)] drop-shadow-[0_6px_12px_rgba(0,0,0,0.08)]"
          className="bottom-[13%] sm:bottom-[15%] left-[26%] sm:left-[28%] w-[90px] sm:w-[115px] lg:w-[130px]"
        />

        {/* Chick 2: Front-Center / Near Rooster Feet */}
        <HeroFloatingAsset
          src="/assets/hero/hero-chick.svg"
          alt="Active Day-Old Chick 2"
          width={125}
          height={125}
          depthZ={65}
          zIndex={32}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.9}
          entryDelay={0.5}
          entryFrom={{ y: 25, scale: 0.9 }}
          floatDuration={4.4}
          floatY={[0, -3, 0]}
          floatX={[-2, 2, -2]}
          floatScale={[0.82, 0.835, 0.82]}
          glowEffect="bg-brand-softYellow/30"
          shadowClass="filter drop-shadow-[0_10px_16px_rgba(244,197,66,0.28)]"
          className="bottom-[8%] sm:bottom-[10%] left-[45%] sm:left-[47%] w-[78px] sm:w-[98px] lg:w-[112px]"
        />

        {/* Chick 3: Slightly Behind / Right of Rooster */}
        <HeroFloatingAsset
          src="/assets/hero/hero-chick.svg"
          alt="Active Day-Old Chick 3"
          width={110}
          height={110}
          depthZ={45}
          zIndex={24}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.7}
          entryDelay={0.52}
          entryFrom={{ y: 20, scale: 0.88 }}
          floatDuration={4.8}
          floatY={[0, -3, 0]}
          floatRotate={[-1, 1, -1]}
          floatScale={[0.72, 0.735, 0.72]}
          shadowClass="filter drop-shadow-[0_10px_15px_rgba(244,197,66,0.25)]"
          className="bottom-[17%] sm:bottom-[19%] right-[25%] sm:right-[27%] w-[68px] sm:w-[86px] lg:w-[98px]"
        />

        {/* ========================================================================= */}
        {/* LAYER 4: FEED BOWL (hero-feed-bowl.svg - Foreground/Right on the Grass)   */}
        {/* ========================================================================= */}
        <HeroFloatingAsset
          src="/assets/hero/hero-feed-bowl.svg"
          alt="Poultry Feed Bowl with Golden Grain"
          width={165}
          height={110}
          depthZ={55}
          zIndex={32}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.85}
          entryDelay={0.48}
          entryFrom={{ y: 20, scale: 0.92 }}
          floatDuration={7.5}
          floatY={[0, -2.5, 0]}
          shadowClass="filter drop-shadow-[0_14px_20px_rgba(31,107,69,0.18)]"
          className="bottom-[10%] sm:bottom-[12%] right-[16%] sm:right-[18%] w-[115px] sm:w-[145px] lg:w-[165px]"
        />

        {/* ========================================================================= */}
        {/* LAYER 4: SMALL WATERER (hero-waterer-small.svg - Right / Front)           */}
        {/* ========================================================================= */}
        <HeroFloatingAsset
          src="/assets/hero/hero-waterer-small.svg"
          alt="Small Poultry Drinker"
          width={85}
          height={85}
          depthZ={52}
          zIndex={31}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.85}
          entryDelay={0.56}
          entryFrom={{ y: 20, x: 20, scale: 0.92 }}
          floatDuration={7.8}
          floatY={[0, -2.5, 0]}
          shadowClass="filter drop-shadow-[0_10px_15px_rgba(31,107,69,0.14)]"
          className="bottom-[7%] sm:bottom-[9%] right-[9%] sm:right-[11%] w-[58px] sm:w-[72px] lg:w-[82px]"
        />

        {/* ========================================================================= */}
        {/* LAYER 4: HATCHING EGGS (hero-egg.svg - Grounded instances on the Grass)   */}
        {/* ========================================================================= */}

        {/* Egg 1: Front-Left near Incubator */}
        <HeroFloatingAsset
          src="/assets/hero/hero-egg.svg"
          alt="Fertile Hatching Egg"
          width={80}
          height={80}
          depthZ={48}
          zIndex={34}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.8}
          entryDelay={0.55}
          entryFrom={{ y: 20, scale: 0.92 }}
          floatDuration={7.0}
          floatY={[0, -2, 0]}
          shadowClass="filter drop-shadow-[0_8px_14px_rgba(232,137,165,0.22)]"
          className="bottom-[11%] sm:bottom-[13%] left-[17%] sm:left-[19%] w-[52px] sm:w-[66px] lg:w-[76px]"
        />

        {/* Egg 2: Front-Right in front of Rooster */}
        <HeroFloatingAsset
          src="/assets/hero/hero-egg.svg"
          alt="Graded Hatching Eggs"
          width={95}
          height={95}
          depthZ={62}
          zIndex={34}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.9}
          entryDelay={0.58}
          entryFrom={{ y: 20, scale: 0.92 }}
          floatDuration={6.8}
          floatY={[0, -2, 0]}
          shadowClass="filter drop-shadow-[0_10px_16px_rgba(232,137,165,0.25)]"
          className="bottom-[8%] sm:bottom-[10%] left-[57%] sm:left-[59%] w-[62px] sm:w-[80px] lg:w-[92px]"
        />

        {/* Egg 3: Base of Incubator */}
        <HeroFloatingAsset
          src="/assets/hero/hero-egg.svg"
          alt="Hatching Egg"
          width={65}
          height={65}
          depthZ={40}
          zIndex={20}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={0.7}
          entryDelay={0.6}
          entryFrom={{ y: 15, scale: 0.92 }}
          floatDuration={7.2}
          floatY={[0, -2, 0]}
          shadowClass="filter drop-shadow-[0_6px_10px_rgba(232,137,165,0.2)]"
          className="bottom-[14%] sm:bottom-[16%] left-[22%] sm:left-[24%] w-[48px] sm:w-[58px]"
        />

        {/* ========================================================================= */}
        {/* LAYER 5: INFORMATIONAL FLOATING CATALOGUE CARDS (Non-ecommerce labels)    */}
        {/* ========================================================================= */}

        {/* CARD 1: Chicks & Birds • Multiple Breeds (Top-Left) */}
        <motion.div
          style={
            shouldReduceMotion
              ? { transform: "translateZ(70px)" }
              : {
                  x: useTransform(mouseX, [-1, 1], [-8, 8]),
                  y: useTransform(mouseY, [-1, 1], [-6, 6]),
                  transformStyle: "preserve-3d",
                  transform: "translateZ(70px)",
                }
          }
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -5, 0],
                }
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[6%] sm:top-[8%] left-[-2%] sm:left-[0%] z-40"
        >
          <Link
            href="/category/chicks-young-birds"
            className="flex items-center gap-2.5 sm:gap-3 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-brand-softGreen shadow-elevated hover:border-brand-freshGreen hover:shadow-lg transition-all group block"
          >
            <div className="w-8 h-8 rounded-xl bg-brand-softYellow/90 text-brand-darkGreen flex items-center justify-center text-base shrink-0 shadow-inner group-hover:scale-110 transition-transform">
              🐥
            </div>
            <div className="text-left pr-1">
              <div className="text-xs font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors leading-tight">
                Chicks & Birds
              </div>
              <div className="text-[10px] text-brand-gray font-semibold">
                Multiple Breeds
              </div>
            </div>
          </Link>
        </motion.div>

        {/* CARD 2: Hatching Eggs • Wide Variety (Bottom-Left) */}
        <motion.div
          style={
            shouldReduceMotion
              ? { transform: "translateZ(65px)" }
              : {
                  x: useTransform(mouseX, [-1, 1], [-6, 6]),
                  y: useTransform(mouseY, [-1, 1], [-5, 5]),
                  transformStyle: "preserve-3d",
                  transform: "translateZ(65px)",
                }
          }
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, 5, 0],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[0%] sm:bottom-[2%] left-[0%] sm:left-[2%] z-40"
        >
          <Link
            href="/category/hatching-eggs"
            className="flex items-center gap-2.5 sm:gap-3 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-brand-softGreen shadow-elevated hover:border-brand-freshGreen hover:shadow-lg transition-all group block"
          >
            <div className="w-8 h-8 rounded-xl bg-brand-cream text-brand-darkGray flex items-center justify-center text-base shrink-0 shadow-inner group-hover:scale-110 transition-transform">
              🥚
            </div>
            <div className="text-left pr-1">
              <div className="text-xs font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors leading-tight">
                Hatching Eggs
              </div>
              <div className="text-[10px] text-brand-gray font-semibold">
                Wide Variety
              </div>
            </div>
          </Link>
        </motion.div>

        {/* CARD 3: Poultry Equipment • Drinkers, Feeders & More (Top-Right) */}
        <motion.div
          style={
            shouldReduceMotion
              ? { transform: "translateZ(75px)" }
              : {
                  x: useTransform(mouseX, [-1, 1], [8, -8]),
                  y: useTransform(mouseY, [-1, 1], [-7, 7]),
                  transformStyle: "preserve-3d",
                  transform: "translateZ(75px)",
                }
          }
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -5, 0],
                }
          }
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[4%] sm:top-[6%] right-[-2%] sm:right-[2%] z-40"
        >
          <Link
            href="/category/poultry-equipment"
            className="flex items-center gap-2.5 sm:gap-3 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-brand-softGreen shadow-elevated hover:border-brand-freshGreen hover:shadow-lg transition-all group block"
          >
            <div className="w-8 h-8 rounded-xl bg-brand-softPink/80 text-brand-darkGray flex items-center justify-center text-base shrink-0 shadow-inner group-hover:scale-110 transition-transform">
              ⚙️
            </div>
            <div className="text-left pr-1">
              <div className="text-xs font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors leading-tight">
                Poultry Equipment
              </div>
              <div className="text-[10px] text-brand-gray font-semibold">
                Drinkers, Feeders & More
              </div>
            </div>
          </Link>
        </motion.div>

        {/* CARD 4: Poultry Feeds • Quality Nutrition (Bottom-Right) */}
        <motion.div
          style={
            shouldReduceMotion
              ? { transform: "translateZ(68px)" }
              : {
                  x: useTransform(mouseX, [-1, 1], [7, -7]),
                  y: useTransform(mouseY, [-1, 1], [6, -6]),
                  transformStyle: "preserve-3d",
                  transform: "translateZ(68px)",
                }
          }
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, 5, 0],
                }
          }
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-[0%] sm:bottom-[2%] right-[-2%] sm:right-[0%] z-40"
        >
          <Link
            href="/category/poultry-feed-ingredients"
            className="flex items-center gap-2.5 sm:gap-3 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-brand-softGreen shadow-elevated hover:border-brand-freshGreen hover:shadow-lg transition-all group block"
          >
            <div className="w-8 h-8 rounded-xl bg-brand-softGreen/80 text-brand-darkGreen flex items-center justify-center text-base shrink-0 shadow-inner group-hover:scale-110 transition-transform">
              🌾
            </div>
            <div className="text-left pr-1">
              <div className="text-xs font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors leading-tight">
                Poultry Feeds
              </div>
              <div className="text-[10px] text-brand-gray font-semibold">
                Quality Nutrition
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
