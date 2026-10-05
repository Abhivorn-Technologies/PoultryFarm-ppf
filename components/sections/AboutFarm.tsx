"use client";

import React from "react";
import { CATEGORIES } from "@/data/categories";

export function AboutFarm() {
  return (
    <section className="py-16 bg-white border-t border-brand-softGreen/60" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Product Quality Composite */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-brand-cardCream">
              <img
                alt="Poultry products, live chicks and equipment showcase"
                className="w-full h-[400px] object-cover"
                src="/assets/products/equipment/feeder.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <div className="text-xs uppercase font-semibold text-brand-yellow">
                  Poultry Farm & Product Catalogue
                </div>
                <div className="text-base font-bold">Bio-Secure Quality Stock & Equipment</div>
              </div>
            </div>

            {/* Floating 100% Quality Badge */}
            <div className="absolute -bottom-6 -right-4 bg-white p-4 rounded-2xl shadow-elevated border border-brand-softGreen flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center text-2xl font-black">
                ✓
              </div>
              <div>
                <div className="text-base font-black text-brand-darkGreen">100%</div>
                <div className="text-xs font-semibold text-brand-darkGray">Verified Catalogue</div>
              </div>
            </div>
          </div>

          {/* Right: Text Content & Statistics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
              Product Catalogue
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-darkGray leading-tight">
              Comprehensive Poultry Catalogue & Farm Solutions
            </h2>
            <p className="text-sm sm:text-base text-brand-gray leading-relaxed">
              We provide complete poultry product solutions including day-old chicks, live heritage and commercial breeds, fertile hatching eggs, feeding equipment, incubators, feeds, and veterinary supplies nationwide with strict biosecurity standards.
            </p>

            {/* 4 Stats Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-brand-cream rounded-xl p-3 text-center border border-brand-softGreen/50">
                <div className="text-2xl font-black text-brand-darkGreen">✓</div>
                <div className="text-[11px] font-semibold text-brand-darkGray mt-0.5">
                  Official Products
                </div>
              </div>
              <div className="bg-brand-cream rounded-xl p-3 text-center border border-brand-softGreen/50">
                <div className="text-2xl font-black text-brand-darkGreen">{CATEGORIES.length}</div>
                <div className="text-[11px] font-semibold text-brand-darkGray mt-0.5">
                  Product Categories
                </div>
              </div>
              <div className="bg-brand-cream rounded-xl p-3 text-center border border-brand-softGreen/50">
                <div className="text-2xl font-black text-brand-darkGreen">100%</div>
                <div className="text-[11px] font-semibold text-brand-darkGray mt-0.5">
                  Bio-Secure Sourced
                </div>
              </div>
              <div className="bg-brand-cream rounded-xl p-3 text-center border border-brand-softGreen/50">
                <div className="text-2xl font-black text-brand-darkGreen">Direct</div>
                <div className="text-[11px] font-semibold text-brand-darkGray mt-0.5">
                  Nationwide Dispatch
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <a
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
                href="#popular-products"
              >
                Browse Catalog Products
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
