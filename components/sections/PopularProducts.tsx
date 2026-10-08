"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { CatalogueProductCard } from "@/components/products/CatalogueProductCard";
import {
  Sparkles,
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PopularProductsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function PopularProducts({ activeTab: externalTab, onTabChange }: PopularProductsProps) {
  const [internalTab, setInternalTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [slideDirection, setSlideDirection] = useState<number>(1); // 1 = forward/right, -1 = backward/left
  const [isTransitioning, setIsTransitioning] = useState(false);
  const itemsPerPage = 2; // Exactly 2 products per page
  const activeCategory = externalTab || internalTab;
  const shouldReduceMotion = useReducedMotion();

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const [productsList, setProductsList] = useState(PRODUCTS);

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

  // Filter products based on category slug and search query
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.categorySlug === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        (product.shortDescription && product.shortDescription.toLowerCase().includes(q)) ||
        (product.description && product.description.toLowerCase().includes(q)) ||
        product.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [productsList, activeCategory, searchQuery]);

  // Reset to page 1 on filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Directional navigation without page jumps
  const handlePrevPage = () => {
    if (currentPage <= 1 || isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection(-1);
    setCurrentPage((prev) => Math.max(1, prev - 1));
    setTimeout(() => setIsTransitioning(false), 320);
  };

  const handleNextPage = () => {
    if (currentPage >= totalPages || isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection(1);
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    setTimeout(() => setIsTransitioning(false), 320);
  };

  const handlePageChange = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    if (validPage === currentPage || isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection(validPage > currentPage ? 1 : -1);
    setCurrentPage(validPage);
    setTimeout(() => setIsTransitioning(false), 320);
  };

  return (
    <section className="py-20 bg-[#9DCD5A]" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-darkGreen bg-white/70 backdrop-blur-xs px-3.5 py-1 rounded-full border border-brand-darkGreen/15 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-darkGreen" />
                <span>Complete Official Catalogue ({PRODUCTS.length} Products)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkGray tracking-tight">
                Explore Our Products
              </h2>
              <p className="text-sm sm:text-base text-brand-darkGray/90 mt-1 max-w-2xl leading-relaxed font-medium">
                Browse our complete selection of healthy chicks, heritage live birds, hatching & table eggs, incubators, cages, and high-performance feed.
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72 shrink-0">
              <input
                type="text"
                placeholder="Search all 89 products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm rounded-full bg-white/95 border border-brand-darkGreen/20 focus:outline-none focus:ring-2 focus:ring-brand-darkGreen text-brand-darkGray shadow-sm transition placeholder:text-gray-400"
              />
              <Search className="w-4 h-4 text-brand-darkGray/60 absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-brand-darkGray text-xs p-0.5"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="relative w-full min-w-0 pt-2">
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none no-scrollbar w-full min-w-0 scroll-smooth">
              <div className="flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-xs rounded-full border border-brand-darkGreen/20 shadow-xs shrink-0 whitespace-nowrap min-w-max">
                <button
                  key="all"
                  type="button"
                  suppressHydrationWarning
                  onClick={(e) => {
                    handleTabClick("all");
                    e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                  }}
                  className={`product-tab px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    activeCategory === "all"
                      ? "bg-brand-darkGreen text-white shadow-sm"
                      : "text-brand-darkGray hover:text-brand-darkGreen hover:bg-brand-softGreen/30"
                  }`}
                >
                  All Products ({PRODUCTS.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    suppressHydrationWarning
                    onClick={(e) => {
                      handleTabClick(cat.slug);
                      e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                    }}
                    className={`product-tab px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
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
          </div>
        </div>

        {/* Results Info Counter */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between text-xs font-bold text-brand-darkGray pb-4 mb-6 border-b border-brand-darkGreen/20">
            <div>
              Showing <strong className="text-brand-darkGreen font-black">{startIndex + 1}–{endIndex}</strong> of{" "}
              <strong className="text-brand-darkGreen font-black">{filteredProducts.length}</strong> products
            </div>
            <div>
              Page <span className="font-black text-brand-darkGreen">{currentPage}</span> of {totalPages}
            </div>
          </div>
        )}

        {/* 2-Column Product Catalogue Grid with Floating Side Arrows */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white/90 rounded-3xl p-10 text-center border border-brand-darkGreen/15 max-w-md mx-auto my-8">
            <p className="font-bold text-brand-darkGray text-sm mb-3">
              No products found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                handleTabClick("all");
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-darkGreen text-white text-xs font-bold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Relative Grid Wrapper with Floating Side Navigation Arrows */}
            <div className="relative group/catalogue">
              {/* Floating Left Navigation Arrow */}
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={currentPage === 1 || isTransitioning}
                aria-label="Previous products"
                className="hidden md:flex absolute -left-5 lg:-left-7 xl:-left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full items-center justify-center bg-white hover:bg-brand-darkGreen border border-brand-darkGreen/20 text-brand-darkGreen hover:text-white shadow-md hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed disabled:pointer-events-none disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:text-brand-darkGreen cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2.5} />
              </button>

              {/* Floating Right Navigation Arrow */}
              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages || isTransitioning}
                aria-label="Next products"
                className="hidden md:flex absolute -right-5 lg:-right-7 xl:-right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full items-center justify-center bg-white hover:bg-brand-darkGreen border border-brand-darkGreen/20 text-brand-darkGreen hover:text-white shadow-md hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed disabled:pointer-events-none disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:text-brand-darkGreen cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2.5} />
              </button>

              {/* Directional Slide Container */}
              <div className="overflow-hidden">
                <AnimatePresence custom={slideDirection} mode="wait" initial={false}>
                  <motion.div
                    key={`products-page-${currentPage}`}
                    custom={slideDirection}
                    variants={{
                      enter: (dir: number) => ({
                        x: shouldReduceMotion ? 0 : dir > 0 ? 32 : -32,
                        opacity: 0,
                      }),
                      center: {
                        x: 0,
                        opacity: 1,
                      },
                      exit: (dir: number) => ({
                        x: shouldReduceMotion ? 0 : dir > 0 ? -32 : 32,
                        opacity: 0,
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.28,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
                    id="products-grid"
                  >
                    {paginatedProducts.map((product, index) => (
                      <CatalogueProductCard
                        key={product.id ? String(product.id) : (product.slug || `prod-${product.itemNumber}-${index}`)}
                        product={product}
                        index={index}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Pagination Controls Bar (2 products per page) */}
            {totalPages > 1 && (
              <div className="bg-white p-4 sm:p-5 rounded-3xl border border-brand-darkGreen/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div className="text-xs font-bold text-brand-darkGray/80 order-2 sm:order-1">
                  Page <strong className="text-brand-darkGreen font-black">{currentPage}</strong> of{" "}
                  <strong className="text-brand-darkGreen font-black">{totalPages}</strong>
                </div>

                <div className="flex items-center gap-1.5 order-1 sm:order-2 flex-wrap justify-center">
                  {/* First Page */}
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1 || isTransitioning}
                    className="p-2 rounded-xl border border-brand-softGreen/80 text-brand-darkGray hover:bg-brand-softGreen/40 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                    title="First Page"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>

                  {/* Previous Page */}
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1 || isTransitioning}
                    className="px-3 py-2 rounded-xl border border-brand-softGreen/80 text-xs font-bold text-brand-darkGray hover:bg-brand-softGreen/40 disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  {/* Numbered Page Buttons */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => {
                      return (
                        p === 1 ||
                        p === totalPages ||
                        Math.abs(p - currentPage) <= 2
                      );
                    })
                    .map((p, idx, arr) => {
                      const prev = arr[idx - 1];
                      const showEllipsis = prev && p - prev > 1;

                      return (
                        <React.Fragment key={p}>
                          {showEllipsis && (
                            <span className="px-1 text-xs text-brand-gray font-bold">...</span>
                          )}
                          <button
                            onClick={() => handlePageChange(p)}
                            disabled={isTransitioning}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                              currentPage === p
                                ? "bg-brand-darkGreen text-white shadow-xs font-black"
                                : "border border-brand-softGreen/80 text-brand-darkGray hover:bg-brand-softGreen/40"
                            }`}
                          >
                            {p}
                          </button>
                        </React.Fragment>
                      );
                    })}

                  {/* Next Page */}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || isTransitioning}
                    className="px-3 py-2 rounded-xl border border-brand-softGreen/80 text-xs font-bold text-brand-darkGray hover:bg-brand-softGreen/40 disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Last Page */}
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages || isTransitioning}
                    className="p-2 rounded-xl border border-brand-softGreen/80 text-brand-darkGray hover:bg-brand-softGreen/40 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                    title="Last Page"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
