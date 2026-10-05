"use client";

import React from "react";

export function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Browse Catalogue",
      desc: "Explore our verified catalogue of day-old chicks, breeds, hatching eggs, equipment, and feeds.",
    },
    {
      num: "2",
      title: "Review Specifications",
      desc: "Inspect breed characteristics, hatchability ratings, equipment capacities, and feed formulations.",
    },
    {
      num: "3",
      title: "Send Enquiry",
      desc: "Submit your requirement details or connect directly with our farm advisory team for allocation.",
    },
    {
      num: "4",
      title: "Direct Farm Supply",
      desc: "Receive bio-secure climate-regulated transit dispatch with dedicated ongoing veterinary support.",
    },
  ];

  const whyUs = [
    {
      icon: "🛡️",
      title: "Healthy & Quality Birds",
      desc: "Breeder flocks screened regularly for disease-free health under veterinary supervision.",
      bg: "bg-brand-softGreen text-brand-darkGreen",
    },
    {
      icon: "🧬",
      title: "Verified Breeds & Lineage",
      desc: "Pure heritage and commercial genetics certified for optimal vigor and production.",
      bg: "bg-brand-softYellow text-brand-darkGray",
    },
    {
      icon: "🌾",
      title: "Quality Poultry Feeds",
      desc: "Scientifically balanced crude protein, vitamins, and minerals for every growth stage.",
      bg: "bg-brand-softPink text-brand-darkGray",
    },
    {
      icon: "⚙️",
      title: "Reliable Equipment & Incubators",
      desc: "Durable virgin-polymer feeders, automated drinkers, and PID temperature incubators.",
      bg: "bg-brand-softGreen text-brand-darkGreen",
    },
    {
      icon: "🚚",
      title: "Bio-Secure Transit Practices",
      desc: "Specialized temperature-regulated transport ensures safe nationwide arrival.",
      bg: "bg-brand-softYellow text-brand-darkGray",
    },
    {
      icon: "🩺",
      title: "Professional Support & Advisory",
      desc: "Guidance from our resident veterinarians for brooding schedules and vaccination.",
      bg: "bg-brand-softGreen text-brand-darkGreen",
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-brand-softGreen/50" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: How Catalogue Discovery Works (7 Cols) */}
          <div className="lg:col-span-7" id="how-it-works">
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full mb-3">
              Simple 4-Step Process
            </div>
            <h2 className="text-3xl font-black text-brand-darkGray mb-2">How It Works</h2>
            <p className="text-sm text-brand-gray mb-8">
              From catalogue discovery to nationwide farm delivery with dedicated rearing support.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="bg-brand-cardCream p-4 sm:p-5 rounded-2xl border border-brand-softGreen/60 flex gap-3.5 shadow-xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-yellow text-brand-darkGray flex items-center justify-center font-black text-sm flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-darkGray">{step.title}</h3>
                    <p className="text-xs text-brand-gray mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Why Choose Us (5 Cols) */}
          <div
            className="lg:col-span-5 bg-brand-cream rounded-3xl p-6 sm:p-8 border border-brand-softGreen"
          >
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-brand-freshGreen mb-1">
              Farm Excellence
            </div>
            <h2 className="text-2xl font-black text-brand-darkGray mb-4">Why Choose Us?</h2>
            <div className="space-y-4">
              {whyUs.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-brand-darkGray">{item.title}</h3>
                    <p className="text-[11px] text-brand-gray leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

