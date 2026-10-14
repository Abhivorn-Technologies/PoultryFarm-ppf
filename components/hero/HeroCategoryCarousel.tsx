"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface HeroCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export const HERO_12_CATEGORIES: HeroCategory[] = [
  {
    id: "cat-chicks-young-birds",
    name: "Chicks & Young Birds",
    slug: "chicks-young-birds",
    image: "/assets/catgories/Chicks%20%26%20Young%20Birds.png",
  },
  {
    id: "cat-live-birds",
    name: "Live Birds",
    slug: "live-birds",
    image: "/assets/catgories/Live%20Birds.png",
  },
  {
    id: "cat-ducks-waterfowl",
    name: "Ducks & Waterfowl",
    slug: "ducks-waterfowl",
    image: "/assets/catgories/Ducks%20%26%20Waterfowl.png",
  },
  {
    id: "cat-hatching-eggs",
    name: "Hatching Eggs",
    slug: "hatching-eggs",
    image: "/assets/catgories/Hatching%20Eggs.png",
  },
  {
    id: "cat-eating-eggs",
    name: "Eating Eggs",
    slug: "eating-eggs",
    image: "/assets/catgories/Eating%20Eggs.png",
  },
  {
    id: "cat-poultry-equipment",
    name: "Poultry Equipment",
    slug: "poultry-equipment",
    image: "/assets/catgories/Poultry%20Equipment.png",
  },
  {
    id: "cat-hatchery-incubation",
    name: "Hatchery & Incubation",
    slug: "hatchery-incubation",
    image: "/assets/catgories/Hatchery%20%26%20Incubation.png",
  },
  {
    id: "cat-medicines-vaccines",
    name: "Medicines & Vaccines",
    slug: "medicines-vaccines",
    image: "/assets/catgories/Medicines%20%26%20Vaccines.png",
  },
  {
    id: "cat-poultry-cages",
    name: "Poultry Cages",
    slug: "poultry-cages",
    image: "/assets/catgories/Poultry%20Cages.png",
  },
  {
    id: "cat-poultry-feed-ingredients",
    name: "Feed & Ingredients",
    slug: "poultry-feed-ingredients",
    image: "/assets/catgories/Feed%20%26%20Ingredients.png",
  },
  {
    id: "cat-poultry-meat",
    name: "Poultry Meat",
    slug: "poultry-meat",
    image: "/assets/catgories/Poultry%20Meat.png",
  },
  {
    id: "cat-brooding-systems",
    name: "Brooding Systems",
    slug: "brooding-systems",
    image: "/assets/catgories/Brooding%20Systems.png",
  },
];

interface HeroCategoryCarouselProps {
  onSelectCategory?: (slug: string) => void;
}

export function HeroCategoryCarousel({
  onSelectCategory,
}: HeroCategoryCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceARef = useRef<HTMLDivElement>(null);
  const sequenceBRef = useRef<HTMLDivElement>(null);
  const sequenceCRef = useRef<HTMLDivElement>(null);

  const [categoriesList] = useState<HeroCategory[]>(HERO_12_CATEGORIES);

  const currentXRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const hasDraggedRef = useRef<boolean>(false);
  const touchStartXRef = useRef<number>(0);
  const touchLastXRef = useRef<number>(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const sequenceWidthRef = useRef<number>(0);

  // Measure sequence width dynamically using offsetWidth of Sequence A
  const updateSequenceWidth = useCallback(() => {
    if (sequenceARef.current) {
      const width = sequenceARef.current.offsetWidth;
      if (width > 100) {
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
    }, 350);
  }, []);

  // Arrow button navigation
  const handleArrowNavigation = (direction: "left" | "right") => {
    pauseAutoScroll(2500);
    const cardStep = 175; // Step by approx 1 card width + gap
    const shift = direction === "left" ? cardStep : -cardStep;

    const targetX = currentXRef.current + shift;
    const startX = currentXRef.current;
    const startTime = performance.now();
    const duration = 300;

    const animateStep = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

  // Touch handlers for mobile/tablet swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoScroll();
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    touchStartXRef.current = e.touches[0].clientX;
    touchLastXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const currentTouchX = e.touches[0].clientX;
    const delta = currentTouchX - touchLastXRef.current;
    if (Math.abs(currentTouchX - touchStartXRef.current) > 6) {
      hasDraggedRef.current = true;
    }
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

  // Smooth continuous requestAnimationFrame loop (Safe from ResizeObserver loop errors)
  useEffect(() => {
    updateSequenceWidth();

    const handleResize = () => {
      requestAnimationFrame(() => {
        updateSequenceWidth();
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    const t1 = setTimeout(updateSequenceWidth, 50);
    const t2 = setTimeout(updateSequenceWidth, 250);
    const t3 = setTimeout(updateSequenceWidth, 800);

    // Pause when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPausedRef.current = true;
      } else {
        isPausedRef.current = false;
        lastTimeRef.current = null;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }

    // Smooth speed: ~38px per second
    const SPEED_PX_PER_MS = 0.038;

    const animate = (currentTime: number) => {
      if (
        lastTimeRef.current !== null &&
        !isPausedRef.current &&
        !isDraggingRef.current
      ) {
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
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [updateSequenceWidth]);

  // Click card handler: smoothly scroll to catalogue section
  const handleCardClick = (cat: HeroCategory) => {
    if (hasDraggedRef.current) return;
    if (onSelectCategory) {
      onSelectCategory(cat.slug);
    }

    const sectionId =
      cat.slug === "poultry-feed-ingredients" ? "feed-ingredients" : cat.slug;
    const targetElement =
      document.getElementById(sectionId) ||
      document.getElementById(cat.slug) ||
      document.getElementById("products") ||
      document.getElementById("categories");

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderCard = (cat: HeroCategory, idx: number, seqKey: string) => {
    return (
      <div
        key={`${cat.id}-${seqKey}-${idx}`}
        onClick={() => handleCardClick(cat)}
        className="group flex-shrink-0 flex flex-col rounded-xl sm:rounded-2xl overflow-hidden border border-[#D4AF37]/80 bg-gradient-to-b from-[#0B3D24] to-[#041E10] shadow-[0_6px_18px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] hover:border-[#FFE082] cursor-pointer select-none w-[128px] sm:w-[138px] md:w-[148px] lg:w-[158px]"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick(cat);
          }
        }}
        aria-label={`Explore ${cat.name}`}
      >
        {/* Category Image Area at Top */}
        <div className="relative w-full aspect-[4/3] bg-white/95 overflow-hidden flex items-center justify-center p-1 sm:p-1.5 border-b border-[#D4AF37]/35">
          <img
            src={cat.image}
            alt={cat.name}
            className="w-full h-full object-cover rounded-md sm:rounded-lg transition-transform duration-500 ease-out group-hover:scale-110"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>

        {/* Clear Uppercase White Text on Dark Forest-Green Card Background */}
        <div className="py-2 sm:py-2.5 px-1.5 sm:px-2 text-center flex items-center justify-center min-h-[40px] sm:min-h-[44px] bg-[#062413]">
          <span className="text-white font-extrabold uppercase text-[10px] sm:text-[11px] md:text-xs leading-snug tracking-wider drop-shadow-sm group-hover:text-[#FFE58F] transition-colors line-clamp-2 text-center">
            {cat.name}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative w-full z-20 group/carousel"
      onMouseEnter={() => pauseAutoScroll()}
      onMouseLeave={() => resumeAutoScroll()}
    >
      {/* Container Frame with Navigation Arrows Outside Viewport */}
      <div className="relative max-w-[1780px] mx-auto px-2 sm:px-4 md:px-8 flex items-center justify-between gap-2 sm:gap-3.5">
        {/* Left Arrow Button - Outside Viewport, Never Covering Cards */}
        <button
          onClick={() => handleArrowNavigation("left")}
          className="flex-shrink-0 z-30 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#072F1B] hover:bg-[#0B3D23] text-[#F4C542] shadow-[0_4px_14px_rgba(0,0,0,0.4)] flex items-center justify-center border border-[#D4AF37] transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 opacity-90 group-hover/carousel:opacity-100 cursor-pointer"
          aria-label="Previous Categories"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Continuous Infinite Scrolling Viewport */}
        <div
          ref={viewportRef}
          className="overflow-hidden flex-1 cursor-grab active:cursor-grabbing py-1"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Hardware-Accelerated Translating Track */}
          <div
            ref={trackRef}
            className="flex items-stretch will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            {/* Sequence A (All Categories) */}
            <div
              ref={sequenceARef}
              className="flex items-stretch gap-2.5 sm:gap-3.5 md:gap-4 pr-2.5 sm:pr-3.5 md:pr-4 flex-shrink-0"
            >
              {categoriesList.map((cat, idx) =>
                renderCard(cat, idx, "seqA")
              )}
            </div>

            {/* Sequence B (Identical Visual Loop for Seamless Auto-Scroll) */}
            <div
              ref={sequenceBRef}
              className="flex items-stretch gap-2.5 sm:gap-3.5 md:gap-4 pr-2.5 sm:pr-3.5 md:pr-4 flex-shrink-0"
            >
              {categoriesList.map((cat, idx) =>
                renderCard(cat, idx, "seqB")
              )}
            </div>

            {/* Sequence C (Third Visual Loop ensuring full coverage on ultra-wide screens) */}
            <div
              ref={sequenceCRef}
              className="flex items-stretch gap-2.5 sm:gap-3.5 md:gap-4 pr-2.5 sm:pr-3.5 md:pr-4 flex-shrink-0"
            >
              {categoriesList.map((cat, idx) =>
                renderCard(cat, idx, "seqC")
              )}
            </div>
          </div>
        </div>

        {/* Right Arrow Button - Outside Viewport, Never Covering Cards */}
        <button
          onClick={() => handleArrowNavigation("right")}
          className="flex-shrink-0 z-30 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#072F1B] hover:bg-[#0B3D23] text-[#F4C542] shadow-[0_4px_14px_rgba(0,0,0,0.4)] flex items-center justify-center border border-[#D4AF37] transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 opacity-90 group-hover/carousel:opacity-100 cursor-pointer"
          aria-label="Next Categories"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}

export default HeroCategoryCarousel;
