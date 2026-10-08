"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { CatalogueProductCard } from "@/components/products/CatalogueProductCard";
import { Sparkles, Search, RotateCcw } from "lucide-react";
import { Product } from "@/types/product";

// Helper to normalize category section IDs to client requirements
export const getCategorySectionId = (slug: string): string => {
  if (slug === "poultry-feed-ingredients") return "feed-ingredients";
  return slug;
};

interface CategoryGroupSectionProps {
  category: (typeof CATEGORIES)[0];
  categoryIndex: number;
  products: Product[];
}

function CategoryGroupSection({
  category,
  categoryIndex,
  products,
}: CategoryGroupSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Default to true for the first category so it is IMMEDIATELY visible without waiting for scroll events
  const [isHeaderVisible, setIsHeaderVisible] = useState(categoryIndex === 0);
  const targetSectionId = getCategorySectionId(category.slug);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsHeaderVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="mb-14 sm:mb-20 lg:mb-28 last:mb-0 scroll-mt-36 sm:scroll-mt-44"
      id={targetSectionId}
      data-category-slug={category.slug}
    >
      {/* Category Heading with Smooth Reveal Animation */}
      <div
        style={{
          transition: "opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          opacity: isHeaderVisible ? 1 : 0,
          transform: isHeaderVisible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)",
          willChange: "transform, opacity",
        }}
        className="mb-6 sm:mb-8 select-none"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-brand-darkGreen bg-white/70 backdrop-blur-xs px-3.5 py-1 rounded-full border border-brand-darkGreen/15">
            Category {String(categoryIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-xs font-bold text-brand-darkGray/80">
            {products.length} {products.length === 1 ? "Product" : "Products"}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-darkGray tracking-tight uppercase">
          {category.name}
        </h3>

        {/* Subtle decorative line accent */}
        <div className="w-full h-0.5 bg-brand-darkGreen/25 mt-3 sm:mt-4 rounded-full" />
      </div>

      {/* 2-Column Desktop / 1-Column Mobile Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        {products.map((product, index) => (
          <CatalogueProductCard
            key={product.id ? String(product.id) : (product.slug || `cat-${category.slug}-${index}`)}
            product={product}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export function PopularProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].slug);
  const navScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProductsList(data.data);
        }
      })
      .catch((err) => console.log("Using static catalogue fallback for popular products:", err?.message || err));
  }, []);

  // Group products by their 12 categories in order, filtering by search query
  const groupedCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return CATEGORIES.map((cat, idx) => {
      const catProducts = productsList.filter(
        (p) =>
          p.categorySlug === cat.slug ||
          p.category?.toLowerCase().trim() === cat.name.toLowerCase().trim()
      );

      const matchingProducts = !q
        ? catProducts
        : catProducts.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
              (p.description && p.description.toLowerCase().includes(q)) ||
              p.tags?.some((t) => t.toLowerCase().includes(q))
          );

      return {
        category: cat,
        categoryIndex: idx,
        products: matchingProducts,
      };
    }).filter((group) => group.products.length > 0);
  }, [searchQuery, productsList]);

  const totalMatchingProducts = useMemo(() => {
    return groupedCategories.reduce((acc, g) => acc + g.products.length, 0);
  }, [groupedCategories]);

  // Active category detection via IntersectionObserver
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        const topEntry = visibleEntries.reduce((prev, curr) =>
          curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
        );
        const slug = topEntry.target.getAttribute("data-category-slug");
        if (slug) {
          setActiveCategory(slug);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-100px 0px -60% 0px",
      threshold: [0, 0.1, 0.2],
    });

    CATEGORIES.forEach((cat) => {
      const targetId = getCategorySectionId(cat.slug);
      const el = document.getElementById(targetId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [groupedCategories]);

  // Smooth scroll to category
  const scrollToCategory = (slug: string) => {
    setActiveCategory(slug);
    const targetId = getCategorySectionId(slug);
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = window.innerWidth < 640 ? 130 : 150;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Keep active category pill visible on mobile horizontal swipe
  useEffect(() => {
    if (!navScrollRef.current) return;
    const activeBtn = navScrollRef.current.querySelector<HTMLButtonElement>(`[data-nav-slug="${activeCategory}"]`);
    if (activeBtn && window.innerWidth < 640) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeCategory]);

  return (
    <section className="py-12 sm:py-16 bg-[#9DCD5A] relative" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Products Section Header */}
        <div className="mb-6 sm:mb-8 space-y-3">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-darkGreen bg-white/70 backdrop-blur-xs px-3.5 py-1 rounded-full border border-brand-darkGreen/15 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-darkGreen" />
                <span>Complete Product Catalogue</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkGray tracking-tight">
                Products
              </h2>
              <p className="text-xs sm:text-sm text-brand-darkGray/90 mt-1 max-w-2xl leading-relaxed font-medium">
                Explore our full poultry catalogue categorized section by section. Continuous vertical scrolling with direct enquiry support.
              </p>
            </div>

            {/* Quick Search across full catalogue */}
            <div className="relative w-full md:w-80 shrink-0">
              <input
                type="text"
                placeholder="Search all products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm rounded-full bg-white border border-brand-darkGreen/20 focus:outline-none focus:ring-2 focus:ring-brand-darkGreen text-brand-darkGray shadow-sm transition placeholder:text-gray-400"
              />
              <Search className="w-4 h-4 text-brand-darkGray/60 absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-brand-darkGray text-xs p-0.5 cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Category Navigation Strip (All 12 visible at once on desktop) */}
        <div className="sticky top-[68px] sm:top-[76px] z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-2.5 sm:py-3 mb-8 sm:mb-12 bg-[#9DCD5A]/95 backdrop-blur-md border-b border-brand-darkGreen/15 shadow-xs transition-all duration-200">
          <div
            ref={navScrollRef}
            className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 overflow-x-auto sm:overflow-visible no-scrollbar gap-2 sm:gap-1.5 xl:gap-2 max-w-7xl mx-auto items-center"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.slug;
              const hasProducts = groupedCategories.some((g) => g.category.slug === cat.slug);

              // If searching and this category has no matching products, hide it
              if (searchQuery && !hasProducts) return null;

              return (
                <button
                  key={cat.id || cat.slug}
                  type="button"
                  data-nav-slug={cat.slug}
                  onClick={() => scrollToCategory(cat.slug)}
                  className={`w-full text-center py-2 sm:py-2.5 px-2.5 sm:px-1.5 rounded-full sm:rounded-xl xl:rounded-2xl text-xs sm:text-[11px] xl:text-[11.5px] 2xl:text-xs font-bold leading-tight transition-all duration-200 flex items-center justify-center min-h-[38px] sm:min-h-[44px] cursor-pointer select-none shrink-0 sm:shrink ${
                    isActive
                      ? "bg-brand-darkGreen text-white shadow-sm border border-brand-darkGreen scale-[1.02]"
                      : "bg-white/85 hover:bg-white text-brand-darkGray hover:text-brand-darkGreen border border-brand-darkGreen/15 shadow-2xs hover:shadow-xs"
                  }`}
                  aria-label={`Jump to ${cat.name}`}
                  title={cat.name}
                >
                  <span className="line-clamp-2 sm:line-clamp-2">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category-by-Category Product Sections */}
        {totalMatchingProducts === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-brand-darkGreen/15 max-w-md mx-auto my-8 shadow-card">
            <p className="font-bold text-brand-darkGray text-base mb-2">
              No products found
            </p>
            <p className="text-xs text-brand-gray mb-5">
              No products matched &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-darkGreen text-white text-xs font-bold hover:bg-brand-green transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Search</span>
            </button>
          </div>
        ) : (
          <div className="space-y-0">
            {groupedCategories.map((group) => (
              <CategoryGroupSection
                key={group.category.id || group.category.slug}
                category={group.category}
                categoryIndex={group.categoryIndex}
                products={group.products}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
