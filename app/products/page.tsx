"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PopularProducts } from "@/components/sections/PopularProducts";

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#9DCD5A] text-brand-darkGray selection:bg-brand-softGreen selection:text-brand-darkGreen">
      <Header />

      <main className="flex-grow bg-[#9DCD5A]">
        {/* Breadcrumb Trail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 -mb-6">
          <div className="flex items-center gap-2 text-xs text-brand-darkGray/80 font-semibold">
            <Link href="/" className="hover:text-brand-darkGreen transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-darkGreen/60" />
            <span className="text-brand-darkGreen font-extrabold">Products</span>
          </div>
        </div>

        {/* Complete Category-Wise Product Catalogue (Exact Same Showcase as Home Page) */}
        <PopularProducts />
      </main>

      <Footer />
    </div>
  );
}
