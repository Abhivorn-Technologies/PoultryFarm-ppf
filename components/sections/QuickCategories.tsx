"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function QuickCategories({ onSelectCategory }: { onSelectCategory?: (key: string) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 bg-white border-y border-brand-softGreen/50" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-brand-darkGray">Explore by Category</h2>
            <p className="text-xs text-brand-gray">
              All 12 specialized sectors with dedicated 2-column catalogue listings
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/categories"
              className="text-xs font-bold text-brand-darkGreen hover:underline hidden sm:inline-block mr-2"
            >
              View All 12 Categories →
            </Link>
            <button
              onClick={() => handleScroll("left")}
              aria-label="Previous categories"
              className="w-8 h-8 rounded-full border border-brand-softGreen flex items-center justify-center text-brand-darkGreen hover:bg-brand-softGreen transition active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Next categories"
              className="w-8 h-8 rounded-full border border-brand-softGreen flex items-center justify-center text-brand-darkGreen hover:bg-brand-softGreen transition active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Category Rail */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2"
          id="category-rail"
        >
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="flex-shrink-0 flex flex-col items-center p-3 rounded-2xl bg-brand-cardCream hover:bg-brand-softGreen/40 border border-brand-softGreen/60 w-32 text-center transition group shadow-xs hover:shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden border border-brand-softGreen/40">
                <img
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-xl"
                  src={cat.image}
                />
              </div>
              <span className="text-[10px] font-black uppercase text-brand-freshGreen mt-2 tracking-wider">
                Cat {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-xs font-bold text-brand-darkGray mt-0.5 group-hover:text-brand-darkGreen leading-tight line-clamp-2">
                {cat.name}
              </span>
              <span className="text-[10px] font-semibold text-brand-gray mt-1">
                {cat.itemCount} Items
              </span>
            </Link>
          ))}

          {/* All Categories Link Pill */}
          <Link
            className="flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-2xl bg-brand-softGreen hover:bg-brand-green/20 border border-brand-freshGreen/40 w-32 text-center transition group"
            href="/categories"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-darkGreen text-white shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center font-bold text-xl">
              <ArrowRight className="w-5 h-5" />
            </div>
            <span className="text-xs font-black text-brand-darkGreen mt-2 leading-tight">
              All 12 Sectors
            </span>
            <span className="text-[10px] font-bold text-brand-gray mt-0.5">
              Browse Hub
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
