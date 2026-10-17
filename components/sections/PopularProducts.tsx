"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { CatalogueProductCard } from "@/components/products/CatalogueProductCard";
import { Search, RotateCcw } from "lucide-react";
import { Product } from "@/types/product";

import { searchProducts } from "@/lib/search";
import { Sparkles } from "lucide-react";

// Helper to normalize category section IDs to client requirements
export const getCategorySectionId = (slug: string): string => {
  if (slug === "poultry-feed-ingredients") return "feed-ingredients";
  return slug;
};

export function PopularProducts() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [categoriesList, setCategoriesList] = useState<typeof CATEGORIES>(CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Initial batch of products loaded on first render; more loaded progressively as user scrolls
  const [visibleProductLimit, setVisibleProductLimit] = useState<number>(16);
  const navScrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Debounce search input for silky-smooth responsive typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 150);
    return () => clearTimeout(handler);
  }, [inputValue]);

  // Read URL query params on mount for direct deep-linking (?search=xyz, ?focus=slug)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const q = url.searchParams.get("search") || url.searchParams.get("q");
      if (q) {
        setInputValue(q);
        setSearchQuery(q);
      }
      const focus = url.searchParams.get("focus");
      if (focus) {
        setTimeout(() => {
          const el = document.getElementById(`product-${focus}`);
          if (el) {
            const navOffset = window.innerWidth < 640 ? 130 : 150;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            el.classList.add("ring-4", "ring-brand-darkGreen", "rounded-3xl", "transition-all", "duration-500");
            setTimeout(() => el.classList.remove("ring-4", "ring-brand-darkGreen"), 2500);
          }
        }, 300);
      }
    }
  }, []);

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
      .catch((err) => console.log("Using static products fallback:", err?.message || err));
  }, []);

  useEffect(() => {
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

  // Canonical ordering based on sortOrder (1 to 89)
  const orderedProducts = useMemo(() => {
    return [...productsList].sort(
      (a, b) => (a.sortOrder ?? a.itemNumber ?? 0) - (b.sortOrder ?? b.itemNumber ?? 0)
    );
  }, [productsList]);

  // Smart search calculation: Direct matches ranked by exactness & relevance + complementary related products
  const searchResult = useMemo(() => {
    if (!searchQuery.trim()) {
      return { matches: orderedProducts, related: [], query: "" };
    }
    return searchProducts(orderedProducts, searchQuery);
  }, [orderedProducts, searchQuery]);

  const isSearching = searchQuery.trim().length > 0;
  const directMatches = isSearching ? searchResult.matches : orderedProducts;
  const relatedProducts = isSearching ? searchResult.related : [];

  // Progressive slice: Only render products up to visibleProductLimit until user scrolls down
  const displayedProducts = useMemo(() => {
    if (isSearching) return directMatches;
    return directMatches.slice(0, visibleProductLimit);
  }, [directMatches, visibleProductLimit, isSearching]);

  const totalMatchingProducts = directMatches.length;
  const totalDisplayedProducts = displayedProducts.length;
  const hasMoreProducts = !isSearching && totalDisplayedProducts < totalMatchingProducts;

  // Progressive scroll-based loader: Detects when user scrolls near the bottom and loads next batch of 8 products (4 pairs)
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMoreProducts) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMoreProducts) {
          setVisibleProductLimit((prev) => Math.min(prev + 16, totalMatchingProducts));
        }
      },
      {
        root: null,
        rootMargin: "500px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMoreProducts, totalMatchingProducts]);

  // Map of first product index for each category slug
  const categoryFirstIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    directMatches.forEach((p, idx) => {
      const slug = p.categorySlug;
      if (slug && !map.has(slug)) {
        map.set(slug, idx);
      }
    });
    return map;
  }, [directMatches]);

  // Set of product IDs that act as category anchors
  const categoryAnchorIds = useMemo(() => {
    const set = new Map<string, string>();
    categoryFirstIndexMap.forEach((idx, catSlug) => {
      const p = directMatches[idx];
      if (p) {
        set.set(catSlug, String(p.id || p.slug));
      }
    });
    return set;
  }, [categoryFirstIndexMap, directMatches]);

  // Active category detection via IntersectionObserver across visible products
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-product-card-category]");
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, curr) =>
            curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
          );
          const slug = topEntry.target.getAttribute("data-product-card-category");
          if (slug) {
            setActiveCategory(slug);
          }
        }
      },
      {
        root: null,
        rootMargin: "-120px 0px -60% 0px",
        threshold: [0, 0.1, 0.2],
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [displayedProducts]);

  // Smooth scroll to category anchor
  const scrollToCategory = (slug: string) => {
    setActiveCategory(slug);

    const targetIdx = categoryFirstIndexMap.get(slug);
    if (targetIdx !== undefined && !isSearching) {
      if (targetIdx + 8 > visibleProductLimit) {
        setVisibleProductLimit(Math.max(targetIdx + 16, visibleProductLimit + 16));
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
    }, 80);
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

  const handleClearSearch = () => {
    setInputValue("");
    setSearchQuery("");
  };

  return (
    <section className="py-12 sm:py-16 bg-[#9DCD5A] relative" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Products Section Header */}
        <div className="mb-6 sm:mb-8 space-y-3">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-extrabold uppercase tracking-normal [word-spacing:0.3em] sm:[word-spacing:0.35em] text-brand-darkGreen leading-tight mb-1 sm:mb-1.5">
                COMPLETE PRODUCT CATALOGUE
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkGray tracking-tight">
                Products
              </h2>
              <p className="text-xs sm:text-sm text-brand-darkGray/90 mt-1 max-w-2xl leading-relaxed font-medium">
                Explore our full poultry catalogue arranged pair-by-pair in canonical sequence. Smooth continuous scrolling with direct enquiry support.
              </p>
            </div>

            {/* Smart Search Bar across full catalogue */}
            <div className="relative w-full md:w-80 shrink-0">
              <input
                id="catalogue-search-input"
                type="text"
                suppressHydrationWarning
                data-lpignore="true"
                data-1p-ignore="true"
                autoComplete="off"
                placeholder="Search products, breeds, feeds..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm rounded-full bg-white border border-brand-darkGreen/20 focus:outline-none focus:ring-2 focus:ring-brand-darkGreen text-brand-darkGray shadow-sm transition placeholder:text-gray-400"
              />
              <Search className="w-4 h-4 text-brand-darkGray/60 absolute left-3 top-3 pointer-events-none" />
              {inputValue && (
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={handleClearSearch}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-brand-darkGray text-xs p-0.5 cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Category Navigation Strip (Hidden when searching to focus on matched results) */}
        {!isSearching && (
          <div className="sticky top-[68px] sm:top-[76px] z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-2.5 sm:py-3 mb-8 sm:mb-12 bg-[#9DCD5A]/95 backdrop-blur-md border-b border-brand-darkGreen/15 shadow-xs transition-all duration-200">
            <div
              ref={navScrollRef}
              className="flex flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-visible no-scrollbar gap-1.5 sm:gap-2 max-w-7xl mx-auto items-center justify-start sm:justify-center"
            >
              {categoriesList.map((cat) => {
                const isActive = activeCategory === cat.slug;
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
        )}

        {/* Search Results Summary Banner when user is searching */}
        {isSearching && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-xs px-5 py-3 rounded-2xl border border-brand-darkGreen/15 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-darkGreen animate-pulse"></span>
              <span className="text-xs sm:text-sm font-bold text-brand-darkGray">
                {totalMatchingProducts > 0 ? (
                  <>
                    Found <span className="text-brand-darkGreen font-extrabold">{totalMatchingProducts}</span> {totalMatchingProducts === 1 ? "matching product" : "matching products"} for &ldquo;<span className="text-brand-darkGreen font-extrabold">{searchQuery}</span>&rdquo;
                  </>
                ) : (
                  <>
                    No direct matches for &ldquo;<span className="text-brand-darkGreen font-extrabold">{searchQuery}</span>&rdquo;
                  </>
                )}
              </span>
            </div>
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleClearSearch}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-darkGreen hover:text-black bg-white hover:bg-brand-softGreen/30 px-3.5 py-1.5 rounded-full border border-brand-darkGreen/20 shadow-2xs transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Full Catalogue</span>
            </button>
          </div>
        )}

        {/* Product Grid / Empty State */}
        {isSearching && totalMatchingProducts === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 text-center border border-brand-darkGreen/15 max-w-lg mx-auto my-6 shadow-card">
            <div className="w-12 h-12 rounded-full bg-brand-softGreen/40 text-brand-darkGreen flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-brand-darkGray text-lg sm:text-xl mb-1.5">No matching products found</h3>
            <p className="text-xs sm:text-sm text-brand-darkGray/75 mb-5 leading-relaxed">
              We couldn&apos;t find any products matching &ldquo;<span className="font-semibold text-brand-darkGreen">{searchQuery}</span>&rdquo;. Try searching by breed name (e.g. <span className="font-semibold">Aseel, Sonali, Broiler</span>), product type (e.g. <span className="font-semibold">Chicks, Incubators, Feed</span>), or check your spelling.
            </p>
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleClearSearch}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-darkGreen text-white text-xs sm:text-sm font-bold hover:bg-brand-green transition cursor-pointer shadow-sm hover:shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Search & View Catalogue</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {displayedProducts.map((product, index) => {
              // Check if this product is the first anchor for any category
              let anchorId: string | undefined = undefined;
              categoryAnchorIds.forEach((prodKey, catSlug) => {
                if (prodKey === String(product.id || product.slug)) {
                  anchorId = getCategorySectionId(catSlug);
                }
              });

              return (
                <div
                  key={product.id ? String(product.id) : (product.slug || `prod-${index}`)}
                  id={anchorId || `product-${product.slug}`}
                  data-product-card-category={product.categorySlug}
                  className="scroll-mt-36 sm:scroll-mt-44 h-full"
                >
                  <CatalogueProductCard product={product} index={index} />
                </div>
              );
            })}
          </div>
        )}

        {/* RELATED PRODUCTS SECTION (Displayed after matching products) */}
        {isSearching && relatedProducts.length > 0 && (
          <div className="mt-14 pt-10 border-t-2 border-brand-darkGreen/20">
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-darkGreen text-white text-[11px] font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>Complementary & Frequently Paired</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-darkGray tracking-tight">
                  Related Products
                </h3>
                <p className="text-xs sm:text-sm text-brand-darkGray/80 font-medium mt-0.5">
                  Frequently paired, breed-associated, or complementary items for &ldquo;{searchQuery}&rdquo;.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-darkGreen bg-white/90 px-3.5 py-1.5 rounded-full border border-brand-darkGreen/20 self-start sm:self-auto shadow-2xs whitespace-nowrap">
                {relatedProducts.length} Related {relatedProducts.length === 1 ? "Product" : "Products"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              {relatedProducts.map((product, relIdx) => (
                <div
                  key={`rel-${product.id ? String(product.id) : product.slug}`}
                  id={`product-${product.slug}`}
                  className="scroll-mt-36 sm:scroll-mt-44 h-full"
                >
                  <CatalogueProductCard product={product} index={relIdx} />
                </div>
              ))}
            </div>
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

        {!hasMoreProducts && totalMatchingProducts > 8 && !isSearching && (
          <div className="pt-8 pb-12 text-center text-xs font-semibold text-brand-darkGray/70">
            ✓ Complete catalogue loaded ({totalMatchingProducts} products displayed)
          </div>
        )}
      </div>
    </section>
  );
}
