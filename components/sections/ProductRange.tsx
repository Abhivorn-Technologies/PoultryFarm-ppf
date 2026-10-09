"use client";

import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

interface ProductRangeProps {
  onSelectCategory?: (key: string) => void;
}

export function ProductRange({ onSelectCategory }: ProductRangeProps) {
  const [categoriesList, setCategoriesList] = React.useState<any[]>(CATEGORIES);
  const [productsList, setProductsList] = React.useState<any[]>([]);

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
      .catch((err) => console.log("Using static categories fallback for ProductRange:", err?.message || err));

    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.success && Array.isArray(data.data)) {
          setProductsList(data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 bg-[#9DCD5A] border-t border-brand-darkGreen/15" id="all-categories-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-white/70 backdrop-blur-xs px-3.5 py-1 rounded-full border border-brand-darkGreen/15">
            {categoriesList.length} Specialized Sectors
          </span>
          <h2 className="text-3xl font-black text-brand-darkGray mt-2">Our Category Showcase</h2>
          <p className="text-sm text-brand-darkGray/90 mt-1 font-medium">
            Click any sector below to view its dedicated 2-column product catalogue, breed specifications, and direct enquiry options.
          </p>
        </div>

        {/* Dynamic Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoriesList.map((cat, idx) => {
            const count = productsList.length > 0
              ? productsList.filter((p) => p.categorySlug === cat.slug || p.category?.toLowerCase() === cat.name?.toLowerCase()).length
              : (cat.itemCount || 0);

            return (
              <Link
                key={cat.id || cat._id || cat.slug}
                className="bg-white rounded-2xl overflow-hidden border border-brand-softGreen/60 text-left hover:border-brand-darkGreen hover:shadow-card transition-all duration-300 group flex flex-col justify-between"
                href={`/category/${cat.slug}`}
                onClick={() => onSelectCategory && onSelectCategory(cat.slug)}
              >
                {/* Full Category Image Area */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-brand-cardCream">
                  <img
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    src={cat.image || "/assets/catgories/Chicks & Young Birds.png"}
                    loading="lazy"
                  />
                </div>

                {/* Category Info Content */}
                <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-[10px] font-black uppercase text-brand-freshGreen tracking-wider">
                      Category {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-brand-darkGray group-hover:text-brand-darkGreen transition-colors line-clamp-1 mt-1">
                      {cat.name}
                    </div>
                    <div className="text-xs text-brand-gray mt-1 font-medium">{count} {count === 1 ? "Product" : "Products"}</div>
                  </div>
                  <div className="pt-3 mt-3 border-t border-brand-softGreen/40 flex items-center justify-between">
                    <span className="text-brand-darkGreen text-xs group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform font-bold">
                      Explore Category →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
