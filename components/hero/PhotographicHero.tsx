"use client";

import React from "react";

export function PhotographicHero() {
  return (
    <section
      id="hero-section"
      className="relative w-full overflow-hidden select-none bg-[#0E3B27]"
    >
      {/* Semantic Accessible Heading for SEO & Screen Readers */}
      <h1 className="sr-only">
        PPF Group of Companies - Poultry Farms &amp; Hatcheries - Trusted Poultry Industry Since 2011
      </h1>

      {/* 100% Full-Width Edge-to-Edge Pure Banner Image - Completely Flat, No Curves, No Borders */}
      <div className="w-full block">
        <picture className="w-full block">
          <source
            srcSet="/assets/hero/ppf-hero-banner-hd.webp"
            type="image/webp"
          />
          <img
            src="/assets/hero/ppf-hero-banner-hd.png"
            alt="PPF Group of Companies - Poultry Farms &amp; Hatcheries"
            className="w-full h-auto object-cover block"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
    </section>
  );
}

export default PhotographicHero;
