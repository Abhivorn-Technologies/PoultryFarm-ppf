"use client";

import React from "react";

export function Gallery() {
  const items = [
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
  ];

  return (
    <section className="py-14 bg-[#9DCD5A] border-t border-brand-darkGreen/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-white/70 backdrop-blur-xs px-3.5 py-1 rounded-full border border-brand-darkGreen/15">
            Product Quality
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray mt-2">
            Glimpses of Our Product Range
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden aspect-video md:aspect-square group relative border border-brand-softGreen/40 shadow-xs"
            >
              <img
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                src={item.image}
              />
              <div className="absolute inset-0 bg-brand-darkGreen/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-center p-2">
                <span className="text-[10px] text-brand-yellow font-bold uppercase tracking-wider">{item.tag}</span>
                <span className="text-xs font-bold mt-0.5">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
