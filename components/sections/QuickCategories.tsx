"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function QuickCategories({
  onSelectCategory,
}: {
  onSelectCategory?: (key: string) => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceARef = useRef<HTMLDivElement>(null);
  const sequenceBRef = useRef<HTMLDivElement>(null);

  const currentXRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const touchStartXRef = useRef<number>(0);
  const touchLastXRef = useRef<number>(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const sequenceWidthRef = useRef<number>(0);

  const [, setRerenderState] = useState<number>(0);
  const [categoriesList, setCategoriesList] = useState<any[]>(CATEGORIES);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCategoriesList(data.data);
        }
      })
      .catch((err) => console.log("Using static categories fallback for QuickCategories:", err?.message || err));
  }, []);

  // Measure sequence width dynamically with ResizeObserver
  const updateSequenceWidth = useCallback(() => {
    if (sequenceARef.current && sequenceBRef.current) {
      const width =
        sequenceBRef.current.offsetLeft - sequenceARef.current.offsetLeft;
      if (width > 0) {
        sequenceWidthRef.current = width;
      }
    }
  }, []);

  const pauseAutoScroll = useCallback((durationMs?: number) => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    if (durationMs) {
      resumeTimeoutRef.current = setTimeout(() => {
        isPausedRef.current = false;
        lastTimeRef.current = null;
      }, durationMs);
    }
  }, []);

  const resumeAutoScroll = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
      lastTimeRef.current = null;
    }, 400);
  }, []);

  // Arrow button navigation
  const handleArrowNavigation = (direction: "left" | "right") => {
    pauseAutoScroll(2000);
    const cardStep = 240; // Step by approximately 1 card width + gap
    const shift = direction === "left" ? cardStep : -cardStep;

    const targetX = currentXRef.current + shift;
    const startX = currentXRef.current;
    const startTime = performance.now();
    const duration = 350; // Smooth 350ms transition

    const animateStep = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      let newX = startX + (targetX - startX) * ease;
      const seqWidth = sequenceWidthRef.current;

      if (seqWidth > 0) {
        if (newX <= -seqWidth) newX += seqWidth;
        if (newX > 0) newX -= seqWidth;
      }

      currentXRef.current = newX;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${newX}px, 0, 0)`;
      }

      if (progress < 1) {
        requestAnimationFrame(animateStep);
      } else {
        lastTimeRef.current = null;
      }
    };

    requestAnimationFrame(animateStep);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoScroll();
    isDraggingRef.current = true;
    touchStartXRef.current = e.touches[0].clientX;
    touchLastXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const currentTouchX = e.touches[0].clientX;
    const delta = currentTouchX - touchLastXRef.current;
    touchLastXRef.current = currentTouchX;

    let newX = currentXRef.current + delta;
    const seqWidth = sequenceWidthRef.current;

    if (seqWidth > 0) {
      if (newX <= -seqWidth) newX += seqWidth;
      if (newX > 0) newX -= seqWidth;
    }

    currentXRef.current = newX;

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${newX}px, 0, 0)`;
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    resumeAutoScroll();
  };

  useEffect(() => {
    updateSequenceWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateSequenceWidth();
    });

    if (sequenceARef.current) resizeObserver.observe(sequenceARef.current);
    if (sequenceBRef.current) resizeObserver.observe(sequenceBRef.current);
    if (viewportRef.current) resizeObserver.observe(viewportRef.current);

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return () => resizeObserver.disconnect();
    }

    // Speed: ~40px per second (0.040px per ms)
    const SPEED_PX_PER_MS = 0.04;

    const animate = (currentTime: number) => {
      if (lastTimeRef.current !== null && !isPausedRef.current && !isDraggingRef.current) {
        const deltaTime = Math.min(currentTime - lastTimeRef.current, 64);
        const deltaMove = deltaTime * SPEED_PX_PER_MS;

        let newX = currentXRef.current - deltaMove;
        const seqWidth = sequenceWidthRef.current;

        if (seqWidth > 0) {
          if (newX <= -seqWidth) {
            newX += seqWidth;
          } else if (newX > 0) {
            newX -= seqWidth;
          }
        }

        currentXRef.current = newX;

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${newX}px, 0, 0)`;
        }
      }

      lastTimeRef.current = currentTime;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [updateSequenceWidth]);

  const renderCategoryCard = (
    cat: any,
    idx: number,
    sequenceKey: string
  ) => {
    const categoryNumber = String(idx + 1).padStart(2, "0");

    return (
      <Link
        key={`${cat.id || cat._id || cat.slug}-${sequenceKey}-${idx}`}
        href={`/category/${cat.slug}`}
        onClick={() => onSelectCategory && onSelectCategory(cat.slug)}
        className="flex-shrink-0 w-48 sm:w-56 md:w-60 bg-white rounded-2xl overflow-hidden border border-brand-softGreen/60 text-left hover:border-brand-darkGreen hover:shadow-card transition-all duration-300 group flex flex-col justify-between select-none"
      >
        {/* Full Category Image Area */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-brand-cardCream">
          <img
            alt={cat.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            src={cat.image || "/assets/catgories/Chicks & Young Birds.png"}
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* Category Info Content */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between">
          <div>
            <div className="text-[10px] font-black uppercase text-brand-freshGreen tracking-wider">
              Category {categoryNumber}
            </div>
            <div className="text-xs sm:text-sm font-bold text-brand-darkGray group-hover:text-brand-darkGreen transition-colors line-clamp-1 mt-0.5">
              {cat.name}
            </div>
            <div className="text-[11px] text-brand-gray mt-0.5 font-medium">
              {cat.itemCount || 0} Products
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-brand-softGreen/40 flex items-center justify-between">
            <span className="text-brand-darkGreen text-[11px] sm:text-xs group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform font-bold">
              Explore Sector →
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section
      className="py-8 sm:py-10 bg-[#9DCD5A] border-y border-brand-darkGreen/15 overflow-hidden"
      id="categories"
    >
      {/* 1. Header Aligned with Global Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-darkGray">
              Explore by Category
            </h2>
            <p className="text-xs sm:text-sm text-brand-darkGray/80 mt-0.5 font-medium">
              All {categoriesList.length} specialized poultry sectors with dedicated catalogue listings
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/categories"
              className="text-xs sm:text-sm font-bold text-brand-darkGreen hover:underline hidden sm:inline-flex items-center gap-1 mr-2"
            >
              <span>View All {categoriesList.length} Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => handleArrowNavigation("left")}
              aria-label="Previous categories"
              className="w-9 h-9 rounded-full border border-brand-darkGreen/20 bg-white flex items-center justify-center text-brand-darkGreen hover:bg-brand-darkGreen hover:text-white transition active:scale-95 shadow-2xs cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => handleArrowNavigation("right")}
              aria-label="Next categories"
              className="w-9 h-9 rounded-full border border-brand-darkGreen/20 bg-white flex items-center justify-center text-brand-darkGreen hover:bg-brand-darkGreen hover:text-white transition active:scale-95 shadow-2xs cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Seamless Infinite Carousel Viewport */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle Edge Fade Masks for Smooth Conveyor Effect matching #9DCD5A */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-[#9DCD5A] via-[#9DCD5A]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-[#9DCD5A] via-[#9DCD5A]/80 to-transparent z-10" />

        <div
          ref={viewportRef}
          onMouseEnter={() => pauseAutoScroll()}
          onMouseLeave={resumeAutoScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full overflow-hidden py-2 select-none"
        >
          {/* Animated Track */}
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-5 w-max will-change-transform"
            style={{ transform: "translate3d(0px, 0, 0)" }}
          >
            {/* Sequence A */}
            <div
              ref={sequenceARef}
              className="flex gap-4 sm:gap-5 flex-shrink-0"
            >
              {categoriesList.map((cat, idx) =>
                renderCategoryCard(cat, idx, "seqA")
              )}
            </div>

            {/* Sequence B */}
            <div
              ref={sequenceBRef}
              className="flex gap-4 sm:gap-5 flex-shrink-0"
            >
              {categoriesList.map((cat, idx) =>
                renderCategoryCard(cat, idx, "seqB")
              )}
            </div>

            {/* Sequence C */}
            <div className="flex gap-4 sm:gap-5 flex-shrink-0">
              {categoriesList.map((cat, idx) =>
                renderCategoryCard(cat, idx, "seqC")
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
