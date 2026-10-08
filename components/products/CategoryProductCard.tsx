"use client";

import React from "react";
import Link from "next/link";
import { Eye, Send, CheckCircle2, ShieldCheck, Sparkles, Layers } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface CategoryProductCardProps {
  product: Product;
}

export function CategoryProductCard({ product }: CategoryProductCardProps) {
  const { setQuickViewProduct, openEnquiryModal } = useCart();

  const keySpecs = product.details && product.details.length > 0
    ? product.details.slice(0, 3)
    : ["Certified Breed Standard", "Bio-Secure Sourced"];

  return (
    <div className="category-product-card group bg-white rounded-3xl p-5 sm:p-6 border border-brand-softGreen/70 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        {/* Card Header Media & Badges */}
        <div
          className="relative rounded-2xl overflow-hidden bg-brand-cardCream aspect-[16/10] sm:aspect-[16/9] mb-4 cursor-pointer"
          onClick={() => setQuickViewProduct(product)}
        >
          <img
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={product.image}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          
          <div className="absolute top-3 left-3 bg-brand-darkGreen text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs tracking-wider">
            Item #{product.itemNumber}
          </div>
          
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-brand-darkGreen text-[11px] font-bold px-3 py-1 rounded-full border border-brand-softGreen/80 shadow-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
            <span>Verified</span>
          </div>

          {product.subTypes && product.subTypes.length > 0 && (
            <div className="absolute bottom-3 right-3 flex items-center justify-end text-white text-xs">
              <span className="text-[10px] font-bold bg-brand-yellow text-brand-darkGray px-2 py-0.5 rounded-md shadow-xs">
                {product.subTypes.length} Available Variants
              </span>
            </div>
          )}
        </div>

        {/* Product Title & Short Description */}
        <div className="space-y-2">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-black text-brand-darkGray text-lg sm:text-xl group-hover:text-brand-darkGreen transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-brand-gray leading-relaxed line-clamp-3">
            {product.shortDescription || product.description}
          </p>
        </div>

        {/* Highlight Specifications & Details */}
        <div className="mt-4 pt-3 border-t border-brand-softGreen/50 space-y-2">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-brand-freshGreen">
            Key Highlights & Specifications
          </div>
          <div className="space-y-1.5">
            {keySpecs.map((spec, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-brand-darkGray bg-brand-cardCream/80 p-2 rounded-xl border border-brand-softGreen/40"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen shrink-0 mt-0.5" />
                <span className="line-clamp-2 leading-tight">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-5 border-t border-brand-softGreen/60 mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href={`/product/${product.slug}`}
          className="w-full py-3 rounded-2xl bg-brand-cream hover:bg-brand-softGreen text-brand-darkGreen border border-brand-softGreen/80 text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </Link>
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => openEnquiryModal(product)}
          className="w-full py-3 rounded-2xl bg-brand-darkGreen hover:bg-brand-green text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-98"
        >
          <Send className="w-4 h-4 text-brand-yellow" />
          <span>Enquire Now</span>
        </button>
      </div>
    </div>
  );
}
