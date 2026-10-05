"use client";

import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

interface ProductRangeProps {
  onSelectCategory?: (key: string) => void;
}

export function ProductRange({ onSelectCategory }: ProductRangeProps) {
  return (
    <section className="py-16 bg-brand-cream border-t border-brand-softGreen/50" id="all-categories-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
            12 Specialized Sectors
          </span>
          <h2 className="text-3xl font-black text-brand-darkGray mt-2">Our Category Showcase</h2>
          <p className="text-sm text-brand-gray mt-1">
            Click any sector below to view its dedicated 2-column product catalogue, breed specifications, and direct enquiry options.
          </p>
        </div>

        {/* 12 Categories Grid Matching Spec */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              className="bg-white rounded-2xl p-4 border border-brand-softGreen/60 text-center hover:border-brand-darkGreen hover:shadow-card transition group flex flex-col justify-between"
              href={`/category/${cat.slug}`}
              onClick={() => onSelectCategory && onSelectCategory(cat.slug)}
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-brand-cardCream p-1 overflow-hidden border border-brand-softGreen/40">
                <img
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                  src={cat.image}
                />
              </div>
              <div className="mt-3">
                <div className="text-[10px] font-black uppercase text-brand-freshGreen">
                  Category {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="text-xs font-bold text-brand-darkGray group-hover:text-brand-darkGreen transition-colors line-clamp-2 mt-0.5">
                  {cat.name}
                </div>
                <div className="text-[10px] text-brand-gray mt-0.5">{cat.itemCount} Products</div>
              </div>
              <span className="text-brand-darkGreen text-xs mt-2 group-hover:translate-x-1 inline-block transition-transform font-bold">
                Explore Category →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
