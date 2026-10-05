"use client";

import React from "react";
import { ShieldCheck, Truck, PhoneCall, Headphones, CheckCircle2 } from "lucide-react";

export function Reviews() {
  const serviceAssurances = [
    {
      icon: Truck,
      title: "Climate-Controlled Transit",
      desc: "Live birds, day-old chicks, and hatching eggs are dispatched via temperature-regulated transit vehicles to ensure optimal health upon arrival.",
      badge: "Logistics Assurance",
    },
    {
      icon: ShieldCheck,
      title: "Bio-Secure Health Protocols",
      desc: "All poultry stock undergoes strict veterinary inspection, maternal antibody monitoring, and state-certified vaccination schedules.",
      badge: "Quality Standard",
    },
    {
      icon: Headphones,
      title: "Dedicated Rearing Guidance",
      desc: "Our veterinary and feed formulation specialists are available to answer queries regarding brooding, vaccination, and feed management.",
      badge: "Client Support",
    },
  ];

  return (
    <section className="py-16 bg-brand-cream border-t border-brand-softGreen/50" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-freshGreen">
              Service Assurances & Standards
            </span>
            <h2 className="text-3xl font-black text-brand-darkGray">Direct Supply Reliability</h2>
            <p className="text-sm text-brand-gray mt-1">
              Committed to providing healthy poultry stock, precision equipment, and dependable delivery nationwide.
            </p>
          </div>
          <div className="flex items-center gap-2 text-brand-darkGreen font-bold text-xs bg-white px-4 py-2.5 rounded-full border border-brand-softGreen shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-brand-freshGreen" />
            <span>Official Client Catalog Sourced</span>
          </div>
        </div>

        {/* Assurance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceAssurances.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-brand-softGreen/70 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-brand-darkGreen bg-brand-lightGreen px-2.5 py-1 rounded-full border border-brand-softGreen">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-brand-darkGray mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
