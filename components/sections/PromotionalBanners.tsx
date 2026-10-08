"use client";

import React from "react";
import Link from "next/link";

export function PromotionalBanners({ onSelectCategory }: { onSelectCategory?: (cat: string) => void }) {
  return (
    <section className="py-12 bg-[#9DCD5A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: High-Performance Poultry Equipment */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#184E33] to-[#25734A] text-white p-8 flex flex-col justify-between min-h-[240px] shadow-lg">
            <div className="relative z-10 max-w-xs space-y-2">
              <span className="bg-brand-yellow text-brand-darkGray text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider inline-block">
                Farm Solutions
              </span>
              <h3 className="text-2xl font-black text-white leading-tight">
                High-Performance Poultry Equipment
              </h3>
              <p className="text-xs text-brand-softGreen leading-relaxed">
                Explore automatic drinkers, precision feeders, brooding heating lamps, and galvanized housing cages.
              </p>
            </div>
            <div className="relative z-10 pt-4">
              <Link
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-brand-softGreen text-brand-darkGreen font-bold text-xs uppercase tracking-wider transition shadow active:scale-95"
                href="/category/poultry-equipment"
              >
                <span>Explore Equipment</span>
                <span>→</span>
              </Link>
            </div>
            {/* Stylized Decorative Graphic Pattern */}
            <div className="absolute -right-6 -bottom-6 w-48 h-48 rounded-full bg-white/10 pointer-events-none"></div>
            <div className="absolute right-6 bottom-4 text-6xl opacity-40 select-none">⚙️</div>
          </div>

          {/* Banner 2: Premium Poultry Feeds */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2B4C3F] to-[#3B6654] text-white p-8 flex flex-col justify-between min-h-[240px] shadow-lg">
            <div className="relative z-10 max-w-xs space-y-2">
              <span className="bg-brand-yellow text-brand-darkGray text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider inline-block">
                Formulated Nutrition
              </span>
              <h3 className="text-2xl font-black text-white leading-tight">
                Feed & Nutrition Formulations
              </h3>
              <p className="text-xs text-brand-softGreen leading-relaxed">
                High nutrition mash, crumbles, and starter feeds with balanced crude protein for healthy flock development.
              </p>
            </div>
            <div className="relative z-10 pt-4">
              <Link
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow hover:bg-[#e6b738] text-brand-darkGray font-extrabold text-xs uppercase tracking-wider transition shadow active:scale-95"
                href="/category/poultry-feed-ingredients"
              >
                <span>Explore Feeds & Ingredients</span>
                <span>→</span>
              </Link>
            </div>
            <div className="absolute -right-6 -bottom-6 w-48 h-48 rounded-full bg-white/10 pointer-events-none"></div>
            <div className="absolute right-6 bottom-4 text-6xl opacity-40 select-none">🌾</div>
          </div>
        </div>
      </div>
    </section>
  );
}
