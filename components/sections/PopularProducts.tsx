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
  category: {
    id?: string | number;
    slug: string;
    name: string;
    description?: string;
    image?: string;
    itemCount?: number;
  };
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

      {/* 2-Column Desktop / 1-Column Mobile Product Grid or Empty State */}
      {products.length === 0 ? (
        <div className="bg-white/80 rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center border border-brand-darkGreen/15 shadow-sm max-w-xl mx-auto">
          <span className="inline-block p-3 rounded-full bg-brand-softGreen/50 text-brand-darkGreen mb-3">
            <Sparkles className="w-5 h-5 text-brand-darkGreen" />
          </span>
          <h4 className="font-bold text-brand-darkGray text-base sm:text-lg">
            Products coming soon for {category.name}
          </h4>
          <p className="text-xs sm:text-sm text-brand-darkGray/80 mt-1 max-w-md mx-auto">
            We are preparing stock for this sector. Contact our farm team directly for customized availability or wholesale enquiries.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {products.map((product, index) => (
            <CatalogueProductCard
              key={product.id ? String(product.id) : (product.slug || `cat-${category.slug}-${index}`)}
              product={product}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function PopularProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [categoriesList, setCategoriesList] = useState<typeof CATEGORIES>(CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]?.slug || "poultry-feed-ingredients");
  
  // Initial 4 products shown on first load for maximum performance; more loaded progressively as user scrolls
  const [visibleProductLimit, setVisibleProductLimit] = useState<number>(4);
  const navScrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

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

    fetch("/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCategoriesList(data.data);
          if (data.data[0]?.slug) {
            setActiveCategory(data.data[0].slug);
          }
        }
      })
      .catch((err) => console.log("Using static categories fallback:", err?.message || err));
  }, []);

  // Auto-reset active category if the currently active one was deleted
  useEffect(() => {
    if (categoriesList.length > 0) {
      const exists = categoriesList.some((c) => c.slug === activeCategory);
      if (!exists && categoriesList[0]?.slug) {
        setActiveCategory(categoriesList[0].slug);
      }
    }
  }, [categoriesList, activeCategory]);

  // Group products by dynamic categories, filtering by search query
  const groupedCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return categoriesList
      .map((cat, idx) => {
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
          totalCategoryProducts: catProducts.length,
        };
      })
      .filter((group) => {
        // If searching, only show groups with matching products
        if (searchQuery) return group.products.length > 0;
        // When not searching, show all categories (including newly added empty ones)
        return true;
      });
  }, [searchQuery, productsList, categoriesList]);

  const totalMatchingProducts = useMemo(() => {
    return groupedCategories.reduce((acc, g) => acc + g.products.length, 0);
  }, [groupedCategories]);

  // Progressive slice: Only render products up to visibleProductLimit until the user scrolls down
  const displayedGroups = useMemo(() => {
    if (searchQuery) {
      // When searching, display all matched products immediately
      return groupedCategories;
    }

    let quota = visibleProductLimit;
    const result = [];

    for (const group of groupedCategories) {
      if (quota <= 0) break;

      const takeCount = Math.min(group.products.length, quota);
      const sliced = group.products.slice(0, takeCount);
      quota -= sliced.length;

      if (sliced.length > 0 || group.products.length === 0) {
        result.push({
          ...group,
          products: sliced,
        });
      }
    }

    return result;
  }, [groupedCategories, visibleProductLimit, searchQuery]);

  const totalDisplayedProducts = useMemo(() => {
    return displayedGroups.reduce((acc, g) => acc + g.products.length, 0);
  }, [displayedGroups]);

  const hasMoreProducts = !searchQuery && totalDisplayedProducts < totalMatchingProducts;

  // Progressive scroll-based loader: Detects when user scrolls near the bottom and loads next batch of 4 products
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMoreProducts) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMoreProducts) {
          setVisibleProductLimit((prev) => Math.min(prev + 4, totalMatchingProducts));
        }
      },
      {
        root: null,
        rootMargin: "300px 0px", // Trigger 300px ahead of time for smooth continuous scrolling
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMoreProducts, totalMatchingProducts]);

  // Active category detection via IntersectionObserver across currently displayed groups
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

    displayedGroups.forEach((group) => {
      const targetId = getCategorySectionId(group.category.slug);
      const el = document.getElementById(targetId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [displayedGroups]);

  // Smooth scroll to category - automatically unlocks and renders products up to that category if not loaded yet
  const scrollToCategory = (slug: string) => {
    setActiveCategory(slug);

    if (!searchQuery) {
      let needed = 0;
      for (const g of groupedCategories) {
        needed += Math.max(g.products.length, 1);
        if (g.category.slug === slug) break;
      }
      if (needed > visibleProductLimit) {
        setVisibleProductLimit(Math.max(needed, visibleProductLimit + 4));
      }
    }

    setTimeout(() => {
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
    }, 60);
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
                Explore our full poultry catalogue categorized section by section. Smooth continuous scrolling with direct enquiry support.
              </p>
            </div>

            {/* Quick Search across full catalogue */}
            <div className="relative w-full md:w-80 shrink-0">
              <input
                type="text"
                suppressHydrationWarning
                data-lpignore="true"
                data-1p-ignore="true"
                autoComplete="off"
                placeholder="Search all products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm rounded-full bg-white border border-brand-darkGreen/20 focus:outline-none focus:ring-2 focus:ring-brand-darkGreen text-brand-darkGray shadow-sm transition placeholder:text-gray-400"
              />
              <Search className="w-4 h-4 text-brand-darkGray/60 absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  suppressHydrationWarning
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

        {/* Sticky Category Navigation Strip (Responsive wrapping flex) */}
        <div className="sticky top-[68px] sm:top-[76px] z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-2.5 sm:py-3 mb-8 sm:mb-12 bg-[#9DCD5A]/95 backdrop-blur-md border-b border-brand-darkGreen/15 shadow-xs transition-all duration-200">
          <div
            ref={navScrollRef}
            className="flex flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-visible no-scrollbar gap-1.5 sm:gap-2 max-w-7xl mx-auto items-center justify-start sm:justify-center"
          >
            {categoriesList.map((cat) => {
              const isActive = activeCategory === cat.slug;
              const group = groupedCategories.find((g) => g.category.slug === cat.slug);

              // If searching and this category has no matching products, hide it
              if (searchQuery && (!group || group.products.length === 0)) return null;

              return (
                <button
                  key={cat.id || cat.slug}
                  type="button"
                  suppressHydrationWarning
                  data-nav-slug={cat.slug}
                  onClick={() => scrollToCategory(cat.slug)}
                  className={`text-center py-2 sm:py-2 px-3 sm:px-3.5 rounded-full text-xs sm:text-[11.5px] font-bold leading-tight transition-all duration-200 flex items-center justify-center min-h-[36px] sm:min-h-[40px] cursor-pointer select-none shrink-0 ${
                    isActive
                      ? "bg-brand-darkGreen text-white shadow-sm border border-brand-darkGreen scale-[1.02]"
                      : "bg-white/85 hover:bg-white text-brand-darkGray hover:text-brand-darkGreen border border-brand-darkGreen/15 shadow-2xs hover:shadow-xs"
                  }`}
                  aria-label={`Jump to ${cat.name}`}
                  title={cat.name}
                >
                  <span className="whitespace-nowrap">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category-by-Category Product Sections */}
        {searchQuery && totalMatchingProducts === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-brand-darkGreen/15 max-w-md mx-auto my-8 shadow-card">
            <p className="font-bold text-brand-darkGray text-base mb-2">
              No products found
            </p>
            <p className="text-xs text-brand-gray mb-5">
              No products matched &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setSearchQuery("")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-darkGreen text-white text-xs font-bold hover:bg-brand-green transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Search</span>
            </button>
          </div>
        ) : (
          <div className="space-y-0">
            {displayedGroups.map((group) => (
              <CategoryGroupSection
                key={group.category.id || group.category.slug}
                category={group.category}
                categoryIndex={group.categoryIndex}
                products={group.products}
              />
            ))}
          </div>
        )}

        {/* Progressive Loading Sentinel and Live Streaming Status */}
        {hasMoreProducts && (
          <div ref={sentinelRef} className="pt-8 pb-14 flex justify-center items-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-xs text-brand-darkGreen border border-brand-darkGreen/15 shadow-sm text-xs font-bold transition-all">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-freshGreen opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-darkGreen"></span>
              </span>
              <span>Scroll down to view more products ({totalDisplayedProducts} of {totalMatchingProducts} loaded)</span>
            </div>
          </div>
        )}

        {!hasMoreProducts && totalMatchingProducts > 4 && !searchQuery && (
          <div className="pt-8 pb-12 text-center text-xs font-semibold text-brand-darkGray/70">
            ✓ Complete catalogue loaded ({totalMatchingProducts} products displayed)
          </div>
        )}
      </div>
    </section>
  );
}
