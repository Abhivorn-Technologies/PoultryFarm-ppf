"use client";

import React, { useState } from "react";
import { Sparkles, RotateCw, ZoomIn, Info } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Product3DItem {
  id: string;
  name: string;
  category: string;
  image: string;
  rotationSpeed: string;
  hotspots: {
    number: number;
    title: string;
    detail: string;
    top: string;
    left: string;
    color: string;
  }[];
}

const PRODUCTS_3D: Product3DItem[] = [
  {
    id: "3d-feeder",
    name: "Automatic Chick Feeder (3kg)",
    category: "Poultry Equipment",
    image: "/assets/products/equipment/feeder.jpg",
    rotationSpeed: "4s",
    hotspots: [
      {
        number: 1,
        title: "Anti-Spill Grid",
        detail: "Prevents grain scattering and waste",
        top: "28%",
        left: "30%",
        color: "bg-brand-yellow",
      },
      {
        number: 2,
        title: "Virgin UV Polymer",
        detail: "Non-toxic, high durability plastic",
        top: "55%",
        left: "65%",
        color: "bg-brand-freshGreen",
      },
      {
        number: 3,
        title: "Hanging Suspension Ring",
        detail: "Adjustable height for growing chicks",
        top: "15%",
        left: "50%",
        color: "bg-brand-pink",
      },
    ],
  },
  {
    id: "3d-egg",
    name: "Grade-A Hatching Egg",
    category: "Hatching Eggs",
    image: "/assets/products/eggs/hatching-eggs.jpg",
    rotationSpeed: "6s",
    hotspots: [
      {
        number: 1,
        title: "Air Cell Inspection",
        detail: "Candled for embryo viability",
        top: "20%",
        left: "45%",
        color: "bg-brand-yellow",
      },
      {
        number: 2,
        title: "Cuticle Integrity",
        detail: "Sanitized with natural bio-shield",
        top: "50%",
        left: "30%",
        color: "bg-brand-freshGreen",
      },
      {
        number: 3,
        title: "94.8% Hatchability",
        detail: "Parent stock fertility verified",
        top: "65%",
        left: "60%",
        color: "bg-brand-pink",
      },
    ],
  },
  {
    id: "3d-drinker",
    name: "Ballast Bell Drinker",
    category: "Poultry Equipment",
    image: "/assets/products/equipment/drinker.jpg",
    rotationSpeed: "5s",
    hotspots: [
      {
        number: 1,
        title: "Precision Valve",
        detail: "Continuous level regulation",
        top: "25%",
        left: "50%",
        color: "bg-brand-yellow",
      },
      {
        number: 2,
        title: "Smooth Clean Channel",
        detail: "Easy swab sanitization channel",
        top: "65%",
        left: "40%",
        color: "bg-brand-freshGreen",
      },
    ],
  },
  {
    id: "3d-incubator",
    name: "Digital Egg Incubator",
    category: "Incubators & Hatchery",
    image: "/assets/products/incubators/incubator.jpg",
    rotationSpeed: "5s",
    hotspots: [
      {
        number: 1,
        title: "Digital Thermostat",
        detail: "0.1°C micro-PID stability",
        top: "30%",
        left: "35%",
        color: "bg-brand-yellow",
      },
      {
        number: 2,
        title: "Auto-Turning Rollers",
        detail: "Rotates eggs every 90 minutes",
        top: "58%",
        left: "55%",
        color: "bg-brand-freshGreen",
      },
    ],
  },
];

export function FarmExperience() {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const { showToast } = useCart();

  const product = PRODUCTS_3D[selectedProductIndex];

  return (
    <section
      className="py-16 bg-gradient-to-b from-brand-cardCream to-brand-cream border-t border-brand-softGreen/40"
      id="3d-showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-freshGreen">
            Interactive 3D Product Visualizer
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-darkGray mt-1">
            Experience Our Product Engineering
          </h2>
          <p className="text-sm text-brand-gray mt-2">
            Explore 3D details and feature hotspots across our high-performance poultry equipment, hatching eggs, and incubation supplies.
          </p>

          {/* Product Switcher Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
            {PRODUCTS_3D.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedProductIndex(idx);
                  setActiveHotspot(null);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedProductIndex === idx
                    ? "bg-brand-darkGreen text-white shadow-sm"
                    : "bg-white text-brand-darkGray hover:bg-brand-softGreen/40 border border-brand-softGreen/60"
                }`}
              >
                {p.name.split("(")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Interactive Mock Canvas */}
        <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-brand-softGreen/80 overflow-hidden">
          <div className="relative w-full h-[380px] sm:h-[460px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-brand-darkGray to-slate-950 flex items-center justify-center">
            {/* Background 3D grid and radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(94,159,98,0.18),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            {/* Central 3D Product Visual with Perspective and Subtle Floating Animation */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center animate-float">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black/40 backdrop-blur-sm group">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter drop-shadow-2xl"
                  src={product.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Interactive Hotspots */}
            {product.hotspots.map((spot) => (
              <div
                key={spot.number}
                style={{ top: spot.top, left: spot.left }}
                onClick={() => setActiveHotspot(activeHotspot === spot.number ? null : spot.number)}
                className="absolute group cursor-pointer z-20"
                data-purpose="3d-hotspot"
              >
                <span className="relative flex h-7 w-7">
                  <span
                    className={`animate-ping-slow absolute inline-flex h-full w-full rounded-full ${spot.color} opacity-75`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-7 w-7 ${spot.color} text-brand-darkGray font-bold text-xs items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}
                  >
                    {spot.number}
                  </span>
                </span>

                {/* Hotspot Card Tooltip */}
                <div
                  className={`absolute bottom-9 left-1/2 -translate-x-1/2 w-48 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-brand-softGreen text-left pointer-events-auto transition-all ${
                    activeHotspot === spot.number
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100"
                  }`}
                >
                  <div className="text-[10px] font-extrabold uppercase text-brand-darkGreen">
                    Feature {spot.number}
                  </div>
                  <div className="text-xs font-bold text-brand-darkGray">{spot.title}</div>
                  <div className="text-[10px] text-brand-gray mt-0.5">{spot.detail}</div>
                </div>
              </div>
            ))}

            {/* Floating Overlay Control Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 bg-brand-darkGray/90 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 text-white z-30">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-brand-freshGreen animate-pulse"></span>
                <span className="text-xs font-bold">{product.name}</span>
                <span className="text-xs text-brand-softGreen hidden md:inline">
                  • Click on numbered hotspots to inspect technical specs
                </span>
              </div>
              <button
                className="bg-brand-yellow hover:bg-[#e6b738] text-brand-darkGray font-bold text-xs px-4 py-1.5 rounded-full transition shadow-sm active:scale-95 flex items-center gap-1.5"
                onClick={() => showToast(`Selected 3D view for "${product.name}"`)}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>360° Inspect</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
