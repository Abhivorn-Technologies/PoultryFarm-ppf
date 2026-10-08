"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { CatalogueProductCard } from "@/components/products/CatalogueProductCard";
import { Product } from "@/types/product";

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("cat") || "all";

  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<"featured" | "name-asc" | "name-desc">("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [slideDirection, setSlideDirection] = useState<number>(1); // 1 = forward/right, -1 = backward/left
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(2); // 2 products per page

  const shouldReduceMotion = useReducedMotion();

  // Fetch live products from farm catalogue system with fallback
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
      .catch((err) => console.log("Using static catalogue fallback:", err?.message || err));
  }, []);

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Filter products by search and category
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.categorySlug === selectedCategory;

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
  }, [productsList, searchQuery, selectedCategory]);

  // Sort helper
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "name-asc") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === "name-desc") {
      return list.sort((a, b) => b.name.localeCompare(a.name));
    }
    return list.sort((a, b) => a.itemNumber - b.itemNumber);
  }, [filteredProducts, sortBy]);

  // Reset page to 1 when filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sortedProducts.length);
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

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

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("featured");
    setCurrentPage(1);
  };

  const selectedCategoryObj = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-[#9DCD5A] text-brand-darkGray selection:bg-brand-softGreen selection:text-brand-darkGreen">
      {/* 1. Global Navigation Header */}
      <Header />

      <main className="flex-grow bg-[#9DCD5A]">
        {/* 2. Catalog Hero Section */}
        <section className="pt-10 pb-8 bg-[#9DCD5A] border-b border-brand-darkGreen/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-brand-darkGray/80 mb-4">
              <Link href="/" className="hover:text-brand-darkGreen transition">
                Home
              </Link>
              <span>/</span>
              <span className="text-brand-darkGreen font-bold">All Products Catalogue</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-darkGreen bg-white/70 backdrop-blur-xs px-3.5 py-1 rounded-full border border-brand-darkGreen/15 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-brand-darkGreen" />
                  COMPLETE PRODUCT SHOWCASE ({PRODUCTS.length} PRODUCTS)
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkGray tracking-tight leading-tight">
                  All Poultry Products
                </h1>
                <p className="text-sm sm:text-base text-brand-darkGray/90 mt-2 leading-relaxed font-medium">
                  Browse our complete product catalogue featuring day-old chicks, live birds, hatching & table eggs, commercial equipment, incubators, cages, and feeds.
                </p>
              </div>

              {/* Dynamic Catalog Counter Badge */}
              <div className="bg-white px-5 py-3.5 rounded-2xl border border-brand-darkGreen/15 shadow-sm shrink-0 flex items-center gap-3 self-start md:self-auto">
                <div className="w-10 h-10 rounded-xl bg-brand-darkGreen text-white flex items-center justify-center font-black text-base">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-darkGray uppercase tracking-wider">
                    Full Catalogue
                  </div>
                  <div className="text-sm font-black text-brand-freshGreen">
                    {PRODUCTS.length} Unique Products
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Search, Sort & Category Filter Bar */}
        <section className="py-6 bg-[#9DCD5A]/95 sticky top-[69px] z-30 backdrop-blur-md border-b border-brand-darkGreen/20 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search Bar */}
              <div className="md:col-span-7 relative">
                <input
                  type="text"
                  placeholder="Search chicks, breeds, eggs, equipment, feeds, medicines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm rounded-2xl bg-white border border-brand-softGreen/80 focus:outline-none focus:ring-2 focus:ring-brand-freshGreen text-brand-darkGray shadow-sm transition placeholder:text-gray-400"
                />
                <Search className="w-4 h-4 text-brand-gray absolute left-3.5 top-3.5 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-3 text-gray-400 hover:text-brand-darkGray text-xs p-1"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Product Count Display */}
              <div className="md:col-span-2 text-center md:text-left">
                <span className="text-xs font-bold text-brand-darkGray">
                  {sortedProducts.length === 0 ? (
                    <span>0 Products</span>
                  ) : (
                    <span>
                      Page <strong className="text-brand-darkGreen font-black">{currentPage}</strong> of {totalPages}
                    </span>
                  )}
                </span>
              </div>

              {/* Sort Dropdown */}
              <div className="md:col-span-3 flex items-center justify-end gap-2">
                <div className="relative w-full sm:w-auto flex-1 sm:flex-initial">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "featured" | "name-asc" | "name-desc")
                    }
                    className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white border border-brand-softGreen/80 text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen shadow-xs cursor-pointer"
                  >
                    <option value="featured">Featured Collection</option>
                    <option value="name-asc">Product Name: A to Z</option>
                    <option value="name-desc">Product Name: Z to A</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Category Filter Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-brand-darkGreen text-white shadow-sm"
                    : "bg-white text-brand-darkGray hover:bg-brand-softGreen/40 border border-brand-softGreen/60"
                }`}
              >
                <span>All Products ({PRODUCTS.length})</span>
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedCategory === cat.slug
                      ? "bg-brand-darkGreen text-white shadow-sm"
                      : "bg-white text-brand-darkGray hover:bg-brand-softGreen/40 border border-brand-softGreen/60"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      selectedCategory === cat.slug
                        ? "bg-white/20 text-white"
                        : "bg-brand-cream text-brand-gray"
                    }`}
                  >
                    {cat.itemCount}
                  </span>
                </button>
              ))}
            </div>

            {/* Banner when single category is filtered with direct link to its 2-column dedicated page */}
            {selectedCategoryObj && selectedCategory !== "all" && (
              <div className="mt-4 p-3.5 rounded-2xl bg-white border border-brand-softGreen/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-brand-darkGreen">{selectedCategoryObj.name}</span>:{" "}
                  <span className="text-brand-gray">{selectedCategoryObj.description}</span>
                </div>
                <Link
                  href={`/category/${selectedCategoryObj.slug}`}
                  className="shrink-0 text-brand-darkGreen font-extrabold hover:underline flex items-center gap-1 bg-brand-softGreen/60 px-3 py-1.5 rounded-full"
                >
                  <span>Open Dedicated Category View</span>
                  <span>→</span>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* 5. PRODUCT SHOWCASE GRID WITH 2 PRODUCTS PER PAGE */}
        <div id="catalog-products-section" className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {sortedProducts.length === 0 ? (
                /* Empty State */
                <motion.div
                  key="empty-state"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="bg-white rounded-3xl p-12 text-center border border-brand-softGreen max-w-lg mx-auto my-12 shadow-card"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-softGreen/50 text-brand-darkGreen flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="font-black text-2xl text-brand-darkGray mb-2">
                    No products found
                  </h3>
                  <p className="text-sm text-brand-gray mb-6">
                    {searchQuery
                      ? `No matching products for "${searchQuery}". Try another search term or reset filters.`
                      : "No products available in this category with current filters."}
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-darkGreen text-white font-bold text-xs shadow hover:bg-brand-green transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Filters</span>
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-10">
                  {/* Results count header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-brand-darkGray/90 pb-2 border-b border-brand-darkGreen/20">
                    <div>
                      Showing <strong className="text-brand-darkGray font-black">{startIndex + 1}–{endIndex}</strong> of{" "}
                      <strong className="text-brand-darkGreen font-black">{sortedProducts.length}</strong> products
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-brand-darkGray">Products per page:</span>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="bg-white border border-brand-darkGreen/30 rounded-lg px-2.5 py-1 text-xs font-bold text-brand-darkGray focus:outline-none focus:ring-1 focus:ring-brand-darkGreen cursor-pointer"
                      >
                        <option value={2}>2 products</option>
                        <option value={4}>4 products</option>
                        <option value={6}>6 products</option>
                        <option value={12}>12 products</option>
                      </select>
                    </div>
                  </div>

                  {/* 2-Column Product Catalogue Grid with Floating Side Arrows */}
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

                  {/* Pagination Controls Bar */}
                  {totalPages > 1 && (
                    <div className="bg-white p-4 sm:p-5 rounded-3xl border border-brand-darkGreen/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
                      <div className="text-xs font-medium text-brand-gray order-2 sm:order-1">
                        Page <strong className="text-brand-darkGray font-bold">{currentPage}</strong> of{" "}
                        <strong className="text-brand-darkGray font-bold">{totalPages}</strong>
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
                            // Show first, last, current, and +/- 2 around current
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
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductsCatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#9DCD5A] flex items-center justify-center font-bold text-brand-darkGreen">
          Loading catalogue...
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}
