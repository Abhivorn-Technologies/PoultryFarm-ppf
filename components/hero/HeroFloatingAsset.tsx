"use client";

import React from "react";
import Image from "next/image";
import { motion, MotionValue, useTransform, useReducedMotion } from "framer-motion";

interface HeroFloatingAssetProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  depthZ?: number;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
  parallaxFactor?: number;
  entryDelay?: number;
  entryFrom?: { x?: number; y?: number; scale?: number; rotate?: number };
  floatDuration?: number;
  floatY?: number[];
  floatX?: number[];
  floatRotate?: number[];
  floatScale?: number[];
  isDominant?: boolean;
  ariaHidden?: boolean;
  priority?: boolean;
  glowEffect?: string;
  shadowClass?: string;
  zIndex?: number;
}

export function HeroFloatingAsset({
  src,
  alt,
  width,
  height,
  className = "",
  depthZ = 0,
  mouseX,
  mouseY,
  parallaxFactor = 1,
  entryDelay = 0.2,
  entryFrom = { y: 30, scale: 0.94, rotate: 0 },
  floatDuration = 6,
  floatY = [0, -6, 0],
  floatX = [0, 0, 0],
  floatRotate = [0, 0, 0],
  floatScale = [1, 1, 1],
  isDominant = false,
  ariaHidden = false,
  priority = false,
  glowEffect,
  shadowClass,
  zIndex = 10,
}: HeroFloatingAssetProps) {
  const shouldReduceMotion = useReducedMotion();

  // Parallax shift based on layer depth
  const depthMultiplier = (depthZ + 50) / 60;
  const maxShift = 10 * parallaxFactor * depthMultiplier;

  const moveX = mouseX ? useTransform(mouseX, [-1, 1], [maxShift, -maxShift]) : 0;
  const moveY = mouseY ? useTransform(mouseY, [-1, 1], [maxShift * 0.65, -maxShift * 0.65]) : 0;
  const tiltRotate = mouseX ? useTransform(mouseX, [-1, 1], [-1.0 * parallaxFactor, 1.0 * parallaxFactor]) : 0;

  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      aria-hidden={ariaHidden}
      initial={{
        opacity: 0,
        y: entryFrom.y ?? 25,
        x: entryFrom.x ?? 0,
        scale: entryFrom.scale ?? 0.94,
        rotate: entryFrom.rotate ?? 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        duration: 1.0,
        delay: entryDelay,
        ease: customEase,
      }}
      style={{
        zIndex,
        transformStyle: "preserve-3d",
        transform: `translateZ(${depthZ}px)`,
      }}
      className={`absolute select-none pointer-events-none ${className}`}
    >
      {/* Parallax layer wrapper responding to mouse spring */}
      <motion.div
        style={
          shouldReduceMotion || !mouseX || !mouseY
            ? {}
            : {
                x: moveX,
                y: moveY,
                rotateZ: tiltRotate,
                transformStyle: "preserve-3d",
              }
        }
      >
        {/* Continuous organic subtle floating/breathing animation */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: floatY,
                  x: floatX,
                  rotate: floatRotate,
                  scale: floatScale,
                }
          }
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative group"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Optional soft ambient light glow behind the asset */}
          {glowEffect && (
            <div
              className={`absolute inset-0 rounded-full filter blur-xl opacity-60 pointer-events-none transform -translate-y-1 ${glowEffect}`}
            />
          )}

          {/* SVG Asset Image */}
          <div
            className={`relative transition-transform duration-300 ${shadowClass || (isDominant ? "filter drop-shadow-[0_20px_30px_rgba(31,107,69,0.2)]" : "filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.08)]")}`}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              className="w-full h-auto object-contain pointer-events-auto"
              draggable={false}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
