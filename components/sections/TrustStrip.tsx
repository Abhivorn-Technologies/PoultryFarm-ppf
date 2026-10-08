"use client";

import React from "react";

export function TrustStrip() {
  const features = [
    {
      icon: "🛡️",
      title: "100% Disease Free",
      description: "Lab tested and veterinarian certified",
      bg: "bg-brand-softGreen",
      color: "text-brand-darkGreen",
    },
    {
      icon: "⚡",
      title: "Direct Sourcing",
      description: "No intermediaries, best pricing",
      bg: "bg-brand-softYellow",
      color: "text-brand-darkGray",
    },
    {
      icon: "📦",
      title: "Safe Climate Packaging",
      description: "Ventilated crates for live chicks",
      bg: "bg-brand-softPink",
      color: "text-brand-darkGray",
    },
    {
      icon: "👩‍⚕️",
      title: "Free Vet Consultation",
      description: "Lifetime poultry rearing support",
      bg: "bg-brand-softGreen",
      color: "text-brand-darkGreen",
    },
  ];

  return (
    <section className="py-6 bg-[#9DCD5A] border-b border-brand-darkGreen/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3.5 bg-white p-4 rounded-xl border border-brand-softGreen/50 shadow-sm hover:shadow transition-shadow"
            >
              <div
                className={`w-11 h-11 rounded-lg ${f.bg} ${f.color} flex items-center justify-center font-bold text-xl flex-shrink-0`}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="text-xs font-bold text-brand-darkGray uppercase tracking-wide">
                  {f.title}
                </h3>
                <p className="text-[11px] text-brand-gray">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
