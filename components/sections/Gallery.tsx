"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Eye,
  Camera,
} from "lucide-react";

export interface GlimpseItem {
  _id?: string;
  id?: string;
  title: string;
  image: string;
  tag?: string;
  order?: number;
}

const FALLBACK_ITEMS: GlimpseItem[] = [
  {
    title: "Live Day-Old Chicks",
    image: "/assets/products/chicks/broiler-chicks.jpg",
    tag: "Active Stock",
  },
  {
    title: "Fertile Hatching Eggs",
    image: "/assets/products/eggs/hatching-eggs.jpg",
    tag: "Candled & Graded",
  },
  {
    title: "Modern Poultry Equipment",
    image: "/assets/products/equipment/feeder.jpg",
    tag: "High Durability",
  },
  {
    title: "Nutritious Feeds & Grains",
    image: "/assets/products/feeds/feed-bag.jpg",
    tag: "Formulated Feed",
  },
  {
    title: "Central Storage Warehouse",
    image: "/assets/about/warehouse.jpg",
    tag: "Storage & Logistics",
  },
];

export function Gallery() {
  const [items, setItems] = useState<GlimpseItem[]>(FALLBACK_ITEMS);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  // Fetch dynamic glimpses from database
  useEffect(() => {
    let isMounted = true;
    async function loadGlimpses() {
      try {
        const res = await fetch("/api/glimpses");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            if (isMounted) setItems(json.data);
          }
        }
      } catch (err) {
        console.warn("Could not load dynamic glimpses, using defaults:", err);
      }
    }
    loadGlimpses();
    return () => {
      isMounted = false;
    };
  }, []);

  // Keyboard navigation for Lightbox modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === "Escape") {
        setSelectedItemIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedItemIndex((prev) =>
          prev !== null ? (prev + 1) % items.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedItemIndex((prev) =>
          prev !== null ? (prev - 1 + items.length) % items.length : null
        );
      }
    },
    [selectedItemIndex, items.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const activeModalItem =
    selectedItemIndex !== null ? items[selectedItemIndex] : null;

  // Duplicate the array to ensure seamless infinite looping in marquee
  const loopedItems = [...items, ...items];

  return (
    <section className="py-14 bg-[#9DCD5A] border-t border-brand-darkGreen/15 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-white/80 backdrop-blur-xs px-3.5 py-1 rounded-full border border-brand-darkGreen/15 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-freshGreen" />
              Product Quality
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray mt-2">
              Glimpses of Our Product Range
            </h2>
            <p className="text-xs sm:text-sm text-brand-darkGray/80 mt-1 max-w-xl">
              Real farm snapshots of active batches, feeds, and equipment. Click any image to view in high-resolution full size.
            </p>
          </div>

          {/* Elegant header badge */}
          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-brand-darkGreen bg-white/80 backdrop-blur-xs px-4 py-2 rounded-full border border-brand-darkGreen/15 shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-brand-freshGreen" />
            <span>Farm Gallery • Click to Zoom</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CONTINUOUS AUTOMATIC MARQUEE SCROLLER                                     */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Subtle Fade Vignette on Left & Right Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#9DCD5A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#9DCD5A] to-transparent z-10 pointer-events-none" />

        <div
          className="animate-continuous-marquee flex gap-4 sm:gap-6 pl-4 hover:[animation-play-state:paused]"
          style={{
            animationDuration: `${Math.max(20, items.length * 6)}s`,
          }}
        >
          {loopedItems.map((item, idx) => {
            const originalIndex = idx % items.length;
            return (
              <div
                key={`${item.title}-${idx}`}
                onClick={() => setSelectedItemIndex(originalIndex)}
                className="w-68 sm:w-76 md:w-80 h-52 sm:h-60 rounded-3xl overflow-hidden relative group cursor-pointer shadow-md hover:shadow-2xl border-2 border-white/90 bg-brand-cardCream shrink-0 transition-all duration-300 hover:-translate-y-1.5"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Elegant bottom gradient & title overlay - smooth reveal on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 pointer-events-none">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-white text-sm sm:text-base font-bold truncate drop-shadow-md">
                        {item.title}
                      </h3>
                      <span className="text-white/80 text-[11px] font-medium flex items-center gap-1.5 mt-0.5">
                        <Eye className="w-3.5 h-3.5 text-brand-yellow" />
                        Click to view full size
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BIG LIGHTBOX MODAL PREVIEW                                                */}
      {/* ========================================================================= */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          {/* Backdrop Click to Close */}
          <div
            className="absolute inset-0"
            onClick={() => setSelectedItemIndex(null)}
          />

          {/* Lightbox Container */}
          <div className="relative max-w-4xl w-full bg-brand-darkGray text-white rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 z-10 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
            {/* Top Bar with Title & Close */}
            <div className="px-6 py-4 bg-black/40 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-freshGreen animate-pulse shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {activeModalItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-bold mr-2 hidden sm:inline">
                  {selectedItemIndex! + 1} of {items.length}
                </span>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setSelectedItemIndex(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Big Image Showcase */}
            <div className="relative flex-grow flex items-center justify-center p-4 sm:p-8 bg-black/60 min-h-[300px] max-h-[72vh] overflow-hidden">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="max-h-[66vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />

              {/* Prev Button */}
              <button
                type="button"
                suppressHydrationWarning
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItemIndex((prev) =>
                    prev !== null ? (prev - 1 + items.length) % items.length : null
                  );
                }}
                className="absolute left-4 p-3 rounded-full bg-black/70 hover:bg-brand-darkGreen text-white transition shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                suppressHydrationWarning
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItemIndex((prev) =>
                    prev !== null ? (prev + 1) % items.length : null
                  );
                }}
                className="absolute right-4 p-3 rounded-full bg-black/70 hover:bg-brand-darkGreen text-white transition shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Footer Info */}
            <div className="px-6 py-3 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
              <span>Use arrow keys (← →) or buttons to browse</span>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setSelectedItemIndex(null)}
                className="font-bold text-brand-yellow hover:underline cursor-pointer"
              >
                Close Preview (ESC)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
