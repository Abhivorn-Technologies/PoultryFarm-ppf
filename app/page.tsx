"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { QuickCategories } from "@/components/sections/QuickCategories";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PopularProducts } from "@/components/sections/PopularProducts";
import { AboutFarm } from "@/components/sections/AboutFarm";
import { FarmExperience } from "@/components/sections/FarmExperience";
import { PromotionalBanners } from "@/components/sections/PromotionalBanners";
import { ProductRange } from "@/components/sections/ProductRange";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reviews } from "@/components/sections/Reviews";
import { Gallery } from "@/components/sections/Gallery";
import { Newsletter } from "@/components/sections/Newsletter";

export default function Home() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");

  const handleSelectCategory = (catKey: string) => {
    setActiveCategoryFilter(catKey);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-darkGray selection:bg-brand-softGreen selection:text-brand-darkGreen">
      {/* 1. Navigation Header */}
      <Header />

      <main id="home" className="flex-grow">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Quick Categories Horizontal Rail */}
        <QuickCategories onSelectCategory={handleSelectCategory} />

        {/* 4. Trust Features Strip */}
        <TrustStrip />

        {/* 5. Popular Products Grid */}
        <PopularProducts
          activeTab={activeCategoryFilter}
          onTabChange={setActiveCategoryFilter}
        />

        {/* 6. About Us Marketplace */}
        <AboutFarm />

        {/* 7. 3D Product Interactive Visualizer */}
        <FarmExperience />

        {/* 8. Promotional Banners */}
        <PromotionalBanners onSelectCategory={handleSelectCategory} />

        {/* 9. Complete Product Range (12 Categories Grid) */}
        <ProductRange onSelectCategory={handleSelectCategory} />

        {/* 10. How It Works & Why Choose Us */}
        <HowItWorks />

        {/* 11. Customer Reviews */}
        <Reviews />

        {/* 12. Product Quality Gallery */}
        <Gallery />

        {/* 13. Newsletter & Veterinary Support CTA */}
        <Newsletter />
      </main>

      {/* 14. Dark Green Footer */}
      <Footer />
    </div>
  );
}
