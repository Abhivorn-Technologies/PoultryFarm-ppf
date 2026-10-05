"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { ProductCard } from "@/components/products/ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";

interface PopularProductsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function PopularProducts({ activeTab: externalTab, onTabChange }: PopularProductsProps) {
  const [internalTab, setInternalTab] = useState("all");
  const activeCategory = externalTab || internalTab;

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  // Filter products based on category slug
  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === "all") return true;
    return p.categorySlug === activeCategory;
  });

  const displayProducts = filteredProducts.slice(0, 8);

  return (
    <section className="py-16 bg-brand-cream" id="popular-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-freshGreen mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Official Product Catalogue</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-darkGray tracking-tight">
                Explore Our Products
              </h2>
              <p className="text-sm text-brand-gray mt-1 max-w-2xl">
                Discover our range of quality poultry products and solutions.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-darkGreen hover:text-brand-freshGreen transition whitespace-nowrap self-start sm:self-auto group"
            >
              <span>Browse Complete Catalogue</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Category Filter Pills */}
          <div className="relative w-full min-w-0 pt-2">
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none no-scrollbar w-full min-w-0 scroll-smooth">
              <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-brand-softGreen shadow-xs shrink-0 whitespace-nowrap min-w-max">
                <button
                  key="all"
                  onClick={(e) => {
                    handleTabClick("all");
                    e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                  }}
                  className={`product-tab px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    activeCategory === "all"
                      ? "bg-brand-darkGreen text-white shadow-sm"
                      : "text-brand-darkGray hover:text-brand-darkGreen hover:bg-brand-softGreen/30"
                  }`}
                >
                  All Products
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={(e) => {
                      handleTabClick(cat.slug);
                      e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                    }}
                    className={`product-tab px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                      activeCategory === cat.slug
                        ? "bg-brand-darkGreen text-white shadow-sm"
                        : "text-brand-darkGray hover:text-brand-darkGreen hover:bg-brand-softGreen/30"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            {/* Subtle Right Fade Indicator */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-brand-cream to-transparent" />
          </div>
        </div>

        {/* Product Catalogue Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="products-grid">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-brand-darkGreen text-brand-darkGreen hover:text-white border-2 border-brand-darkGreen font-bold text-sm transition-all shadow-sm hover:shadow-md active:scale-95"
            href="/products"
          >
            <span>View All Products</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

