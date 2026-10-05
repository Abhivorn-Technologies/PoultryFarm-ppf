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
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/types/product";

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("cat") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<"featured" | "name-asc" | "name-desc">("featured");

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Filter products by search and category
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
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
  }, [searchQuery, selectedCategory]);

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

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("featured");
  };

  const selectedCategoryObj = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-darkGray selection:bg-brand-softGreen selection:text-brand-darkGreen">
      {/* 1. Global Navigation Header */}
      <Header />

      <main className="flex-grow">
        {/* 2. Catalog Hero Section */}
        <section className="pt-10 pb-8 bg-gradient-to-b from-white to-brand-cream border-b border-brand-softGreen/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-brand-gray mb-4">
              <Link href="/" className="hover:text-brand-darkGreen transition">
                Home
              </Link>
              <span>/</span>
              <span className="text-brand-darkGreen font-bold">All Products Catalogue</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full border border-brand-freshGreen/30 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-brand-freshGreen" />
                  COMPLETE PRODUCT SHOWCASE
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkGray tracking-tight leading-tight">
                  All Poultry Products
                </h1>
                <p className="text-sm sm:text-base text-brand-gray mt-2 leading-relaxed">
                  Browse our complete product catalogue featuring day-old chicks, live birds, hatching & table eggs, commercial equipment, incubators, cages, and feeds.
                </p>
              </div>

              {/* Dynamic Catalog Counter Badge */}
              <div className="bg-white px-5 py-3.5 rounded-2xl border border-brand-softGreen shadow-card shrink-0 flex items-center gap-3 self-start md:self-auto">
                <div className="w-10 h-10 rounded-xl bg-brand-darkGreen text-white flex items-center justify-center font-black text-base">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-darkGray uppercase tracking-wider">
                    Full Catalogue
                  </div>
                  <div className="text-sm font-black text-brand-freshGreen">
                    Official Product Range
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Search, Sort & Category Filter Bar */}
        <section className="py-6 bg-brand-cream sticky top-[69px] z-30 backdrop-blur-md bg-brand-cream/95 border-b border-brand-softGreen/40 shadow-xs">
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
                  {selectedCategory === "all" && !searchQuery.trim() ? (
                    <span>Showing <strong className="text-brand-darkGreen">All Available</strong> Products</span>
                  ) : (
                    <span>
                      Showing{" "}
                      <span className="text-brand-darkGreen font-black">
                        {sortedProducts.length}
                      </span>{" "}
                      {sortedProducts.length === 1 ? "Product" : "Products"}
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
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedCategory === "all"
                    ? "bg-brand-darkGreen text-white shadow-sm"
                    : "bg-white text-brand-darkGray hover:bg-brand-softGreen/40 border border-brand-softGreen/60"
                }`}
              >
                <span>All Products</span>
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
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

        {/* 5. PRODUCT SHOWCASE GRID */}
        <div className="py-10">
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
                <motion.div
                  key={`all-products-grid-${selectedCategory}-${sortBy}`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {/* Responsive product catalogue grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </motion.div>
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
    <Suspense fallback={<div className="min-h-screen bg-brand-cream flex items-center justify-center font-bold text-brand-darkGreen">Loading catalogue...</div>}>
      <ProductsCatalogContent />
    </Suspense>
  );
}
