"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Send } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CATEGORIES } from "@/data/categories";
import { useCart } from "@/context/CartContext";

export default function CategoriesDirectoryPage() {
  const { openEnquiryModal } = useCart();
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
      .catch((err) => console.log("Using static categories fallback:", err?.message || err));

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
      .catch((err) => console.log("Using static products fallback:", err?.message || err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#9DCD5A] text-brand-darkGray selection:bg-brand-softGreen selection:text-brand-darkGreen">
      <Header />

      <main className="flex-grow py-6 sm:py-8 bg-[#9DCD5A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
            <div className="flex items-center gap-2 text-xs text-brand-gray">
              <Link href="/" className="hover:text-brand-darkGreen transition">
                Home
              </Link>
              <span>/</span>
              <span className="text-brand-darkGreen font-bold">Categories Directory</span>
            </div>
          </div>

          {/* Hero Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-softGreen shadow-card mb-6 sm:mb-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full border border-brand-freshGreen/30 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-brand-freshGreen" />
                {categoriesList.length} SPECIALIZED SECTORS
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkGray tracking-tight leading-tight">
                Poultry Product Categories
              </h1>
              <p className="text-sm sm:text-base text-brand-gray mt-2 leading-relaxed">
                Explore our specialized poultry sectors. Click on any category to view its dedicated product showcase, specifications, and direct enquiry options.
              </p>
            </div>
          </div>

          {/* Dynamic Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesList.map((category, index) => {
              const catNumber = String(index + 1).padStart(2, "0");
              const totalCatStr = String(categoriesList.length).padStart(2, "0");
              const productCount = productsList.length > 0
                ? productsList.filter((p) => p.categorySlug === category.slug || p.category?.toLowerCase() === category.name?.toLowerCase()).length
                : (category.itemCount || 0);

              return (
                <div
                  key={category.id || category._id || category.slug}
                  className="group bg-white rounded-3xl p-6 border border-brand-softGreen/80 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Media Frame */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-brand-cardCream mb-4">
                      <img
                        src={category.image || "/assets/catgories/Chicks & Young Birds.png"}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3 bg-brand-darkGreen text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-xs">
                        Category {catNumber} of {totalCatStr}
                      </div>

                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-brand-darkGreen text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                        {productCount} {productCount === 1 ? "Product" : "Products"}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors">
                          {category.name}
                        </h2>
                      </div>

                      <p className="text-xs text-brand-gray leading-relaxed line-clamp-3">
                        {category.description || "Browse top-grade stock, accessories and specifications for this category."}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 border-t border-brand-softGreen/60 mt-5 flex items-center gap-3">
                    <Link
                      href={`/category/${category.slug}`}
                      className="flex-1 py-2.5 rounded-2xl bg-brand-darkGreen hover:bg-brand-green text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                    >
                      <span>View Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => openEnquiryModal(null)}
                      className="p-2.5 rounded-2xl bg-brand-cream hover:bg-brand-softGreen text-brand-darkGreen border border-brand-softGreen text-xs font-bold transition active:scale-98"
                      title="Enquire about this category"
                    >
                      <Send className="w-4 h-4 text-brand-freshGreen" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
