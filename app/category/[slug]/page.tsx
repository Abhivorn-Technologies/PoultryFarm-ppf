"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Layers,
  Sparkles,
  Send,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { CatalogueProductCard } from "@/components/products/CatalogueProductCard";
import { useCart } from "@/context/CartContext";

export default function CategoryDetailPage() {
  const routeParams = useParams();
  const slug = (routeParams?.slug as string) || "";

  const [categoriesList, setCategoriesList] = useState<any[]>(CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [productsList, setProductsList] = useState(PRODUCTS);
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { openEnquiryModal } = useCart();

  React.useEffect(() => {
    fetch("/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCategoriesList(data.data);
        }
      })
      .catch((err) => console.log("Using static categories fallback for category detail:", err?.message || err));

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
      .catch((err) => console.log("Using static catalogue fallback for category products:", err?.message || err));
  }, []);

  const categoryIndex = categoriesList.findIndex((c) => c.slug === slug);
  const category = categoryIndex !== -1 ? categoriesList[categoryIndex] : null;

  // Products belonging strictly to this category
  const categoryProducts = useMemo(() => {
    if (!category) return [];
    return productsList.filter(
      (p) =>
        p.categorySlug === category.slug ||
        p.category?.toLowerCase() === category.name?.toLowerCase()
    );
  }, [category, productsList]);

  // Search filtered products within category
  const filteredProducts = useMemo(() => {
    if (!category) return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return categoryProducts;

    return categoryProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [category, categoryProducts, searchQuery]);

  // Progressive slice: initial 4 products, more loaded on scroll
  const displayedProducts = useMemo(() => {
    if (searchQuery) return filteredProducts;
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount, searchQuery]);

  const hasMore = !searchQuery && displayedProducts.length < filteredProducts.length;

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setVisibleCount((prev) => Math.min(prev + 4, filteredProducts.length));
        }
      },
      {
        root: null,
        rootMargin: "300px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, filteredProducts.length]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-[#9DCD5A] text-brand-darkGray">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20 text-center bg-[#9DCD5A]">
          <div className="bg-white p-12 rounded-3xl border border-brand-darkGreen/15 shadow-card max-w-md mx-auto">
            <h1 className="font-black text-2xl text-brand-darkGray mb-4">
              Category Not Found
            </h1>
            <p className="text-sm text-brand-gray mb-6">
              The category you requested does not exist in our poultry catalogue.
            </p>
            <Link
              href="/products"
              className="px-6 py-2.5 rounded-full bg-brand-darkGreen text-white font-bold text-xs shadow hover:bg-brand-green transition"
            >
              Browse All Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Category numbering: "CATEGORY 01 OF 12"
  const categoryNumberStr = String(categoryIndex + 1).padStart(2, "0");
  const totalCategoriesStr = String(categoriesList.length).padStart(2, "0");

  // Previous and Next category navigation
  const prevCategory =
    categoryIndex > 0
      ? categoriesList[categoryIndex - 1]
      : categoriesList[categoriesList.length - 1];
  const nextCategory =
    categoryIndex < categoriesList.length - 1
      ? categoriesList[categoryIndex + 1]
      : categoriesList[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#9DCD5A] text-brand-darkGray selection:bg-brand-softGreen selection:text-brand-darkGreen">
      <Header />

      <main className="flex-grow py-8 sm:py-10 bg-[#9DCD5A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs text-brand-gray truncate">
              <Link href="/" className="hover:text-brand-darkGreen transition">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/categories"
                className="hover:text-brand-darkGreen transition"
              >
                Categories
              </Link>
              <span>/</span>
              <span className="text-brand-darkGreen font-bold truncate">
                {category.name}
              </span>
            </div>
          </div>

          {/* Category Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-softGreen shadow-card mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-3xl space-y-2.5">
                {/* Category Number */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full border border-brand-freshGreen/30">
                    <Sparkles className="w-3.5 h-3.5 text-brand-freshGreen" />
                    CATEGORY {categoryNumberStr} OF {totalCategoriesStr}
                  </span>
                  {category.badge && (
                    <span className="text-[11px] font-extrabold bg-brand-lightGreen text-brand-darkGreen px-2.5 py-0.5 rounded-full">
                      {category.badge}
                    </span>
                  )}
                </div>

                {/* Category Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkGray uppercase tracking-tight leading-tight">
                  {category.name}
                </h1>

                {/* Category Description */}
                <p className="text-sm sm:text-base text-brand-gray leading-relaxed max-w-2xl pt-1">
                  {category.description}
                </p>

                {/* Category Product Count Badge */}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cardCream border border-brand-softGreen text-xs font-black text-brand-darkGreen">
                    <Layers className="w-3.5 h-3.5 text-brand-freshGreen" />
                    <span>
                      {categoryProducts.length}{" "}
                      {categoryProducts.length === 1 ? "Product" : "Products"} in
                      Catalogue
                    </span>
                  </span>
                </div>
              </div>

              {/* Category Quick Actions & Enquire */}
              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                <button
                  type="button"
                  onClick={() => openEnquiryModal(null)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-brand-darkGreen hover:bg-brand-green text-white font-extrabold text-xs shadow-md transition active:scale-98 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-brand-yellow" />
                  <span>Enquire About {category.name}</span>
                </button>

                <div className="flex items-center gap-2 justify-between bg-brand-cream p-1.5 rounded-2xl border border-brand-softGreen">
                  <Link
                    href={`/category/${prevCategory.slug}`}
                    className="flex-1 px-3 py-2 rounded-xl bg-white hover:bg-brand-softGreen text-brand-darkGray hover:text-brand-darkGreen text-[11px] font-bold text-center transition flex items-center justify-center gap-1"
                    title={`Previous: ${prevCategory.name}`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Prev</span>
                  </Link>
                  <span className="text-[10px] font-bold text-brand-gray px-1">
                    {categoryNumberStr}/{totalCategoriesStr}
                  </span>
                  <Link
                    href={`/category/${nextCategory.slug}`}
                    className="flex-1 px-3 py-2 rounded-xl bg-white hover:bg-brand-softGreen text-brand-darkGray hover:text-brand-darkGreen text-[11px] font-bold text-center transition flex items-center justify-center gap-1"
                    title={`Next: ${nextCategory.name}`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Search bar within Category */}
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder={`Search within ${category.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-brand-softGreen/80 focus:outline-none focus:ring-2 focus:ring-brand-freshGreen text-brand-darkGray shadow-xs transition placeholder:text-gray-400"
              />
              <Search className="w-4 h-4 text-brand-gray absolute left-3.5 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-2.5 text-gray-400 hover:text-brand-darkGray text-xs p-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="text-xs font-bold text-brand-gray">
              Showing{" "}
              <span className="text-brand-darkGreen font-black">
                {filteredProducts.length}
              </span>{" "}
              of {categoryProducts.length} products
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-brand-softGreen max-w-lg mx-auto my-12 shadow-card">
              <div className="w-16 h-16 rounded-full bg-brand-softGreen/50 text-brand-darkGreen flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-black text-2xl text-brand-darkGray mb-2">
                {searchQuery ? "No matching products" : "Stock Arriving Soon"}
              </h3>
              <p className="text-sm text-brand-gray mb-6">
                {searchQuery
                  ? `No products in ${category.name} matched "${searchQuery}".`
                  : `Products are currently being prepared for ${category.name}. Enquire directly with our farm team for custom requests.`}
              </p>
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2.5 rounded-full bg-brand-darkGreen text-white font-bold text-xs shadow hover:bg-brand-green transition cursor-pointer"
                >
                  Clear Search
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openEnquiryModal(null)}
                  className="px-6 py-2.5 rounded-full bg-brand-darkGreen text-white font-bold text-xs shadow hover:bg-brand-green transition cursor-pointer"
                >
                  Enquire Now
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {displayedProducts.map((product, index) => (
                  <CatalogueProductCard
                    key={
                      product.id
                        ? String(product.id)
                        : product.slug || `cat-prod-${product.itemNumber}-${index}`
                    }
                    product={product}
                    index={index}
                  />
                ))}
              </div>

              {/* Progressive Scroll Loading Sentinel Indicator */}
              {hasMore && (
                <div ref={sentinelRef} className="pt-8 pb-10 flex justify-center items-center">
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-xs text-brand-darkGreen border border-brand-darkGreen/15 shadow-sm text-xs font-bold transition-all">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-freshGreen opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-darkGreen"></span>
                    </span>
                    <span>Scroll down to view more products ({displayedProducts.length} of {filteredProducts.length} loaded)</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Category Footer Navigation Rail */}
          <div className="mt-16 pt-10 border-t border-brand-softGreen/60">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-brand-darkGray">
                  Explore Other Poultry Categories
                </h3>
                <p className="text-xs text-brand-gray mt-0.5">
                  Browse through all 12 specialized poultry sectors.
                </p>
              </div>
              <Link
                href="/categories"
                className="text-xs font-bold text-brand-darkGreen hover:underline flex items-center gap-1"
              >
                <span>View All 12 Categories</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6">
              {CATEGORIES.map((cat, idx) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    cat.slug === category.slug
                      ? "bg-brand-darkGreen text-white border-brand-darkGreen shadow-sm"
                      : "bg-white hover:bg-brand-cardCream text-brand-darkGray border-brand-softGreen/60"
                  }`}
                >
                  <div className="text-[10px] font-black uppercase opacity-70">
                    Category {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="text-xs font-bold mt-1 line-clamp-1">
                    {cat.name}
                  </div>
                  <div
                    className={`text-[10px] mt-0.5 ${
                      cat.slug === category.slug
                        ? "text-brand-yellow"
                        : "text-brand-freshGreen"
                    }`}
                  >
                    {cat.itemCount} Products
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
