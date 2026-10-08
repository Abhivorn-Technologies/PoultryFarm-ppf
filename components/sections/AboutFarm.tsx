"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Building2, MapPin, Layers } from "lucide-react";

export function AboutFarm() {
  const stats = [
    {
      value: "2008",
      label: "Established",
      icon: Calendar,
    },
    {
      value: "Manufacturer / Distributor",
      label: "Business",
      icon: Building2,
    },
    {
      value: "Hyderabad",
      label: "Location",
      icon: MapPin,
    },
    {
      value: "Poultry Solutions",
      label: "Products & Services",
      icon: Layers,
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#9DCD5A] border-t border-brand-darkGreen/15" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-darkGreen/15 shadow-card relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-softGreen/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-darkGreen bg-brand-softGreen px-3.5 py-1.5 rounded-full border border-brand-freshGreen/30 mb-4">
              ABOUT PPF GROUP OF COMPANIES
            </div>

            {/* Main Content Paragraph */}
            <p className="text-base sm:text-xl lg:text-2xl font-bold text-brand-darkGray leading-relaxed mb-8 sm:mb-10">
              Established in 2008 at Hyderabad, Telangana, PPF Group of Companies is a manufacturer and trader of poultry farm chicks, hatching eggs, poultry ducks, egg incubators and other poultry products.
            </p>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 sm:mb-10">
              {stats.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-brand-cardCream rounded-2xl p-4 sm:p-5 border border-brand-softGreen/80 hover:border-brand-freshGreen/60 hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-brand-gray uppercase tracking-wider">
                        {item.label}
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-black text-brand-darkGray leading-snug">
                      {item.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-black text-xs sm:text-sm uppercase tracking-wider transition shadow-md shadow-brand-darkGreen/20 hover:shadow-lg active:scale-95 group"
              >
                <span>MORE ABOUT US</span>
                <ArrowRight className="w-4 h-4 text-brand-yellow group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
