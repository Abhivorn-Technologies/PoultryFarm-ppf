"use client";

import React from "react";
import Link from "next/link";
import { Eye, Send, CheckCircle2 } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { setQuickViewProduct, openEnquiryModal } = useCart();

  const getProductKeySpec = () => {
    if (product.details && product.details.length > 0) {
      return product.details[0];
    }
    if (product.subTypes && product.subTypes.length > 0) {
      return `${product.subTypes.length} Available Variants`;
    }
    return "Official Verified Quality";
  };

  return (
    <div className="product-card group bg-white rounded-2xl p-4 border border-brand-softGreen/70 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full">
      <div>
        {/* Aspect Square Image Frame */}
        <div
          className="relative rounded-xl overflow-hidden bg-brand-cardCream aspect-square mb-3 cursor-pointer"
          onClick={() => setQuickViewProduct(product)}
        >
          <img
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={product.image}
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5 bg-brand-darkGreen text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-xs">
            Item #{product.itemNumber}
          </div>
          <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-brand-darkGreen text-[10px] font-bold px-2 py-0.5 rounded-md border border-brand-softGreen/60 shadow-xs flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-brand-freshGreen" />
            <span>Verified</span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="flex items-center justify-between text-xs text-brand-gray mb-1">
          <span className="text-brand-freshGreen font-semibold text-[11px] truncate">{product.category}</span>
          <span className="text-[10px] font-bold text-brand-gray bg-brand-cream px-1.5 py-0.5 rounded shrink-0">
            Entry #{product.itemNumber}
          </span>
        </div>

        {/* Title & Short Description */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-bold text-brand-darkGray text-sm group-hover:text-brand-darkGreen transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] text-brand-gray mt-1 line-clamp-2 leading-relaxed min-h-[32px]">
          {product.shortDescription || product.description}
        </p>

        {/* Key Specification Highlight */}
        <div className="mt-2.5 p-2 rounded-xl bg-brand-cardCream border border-brand-softGreen/50 text-[10.5px] text-brand-darkGray font-medium flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen shrink-0" />
          <span className="truncate">{getProductKeySpec()}</span>
        </div>
      </div>

      {/* Bottom Action CTAs */}
      <div className="pt-3.5 border-t border-brand-softGreen/40 mt-3 grid grid-cols-2 gap-2">
        <Link
          href={`/product/${product.slug}`}
          className="w-full py-2.5 rounded-xl bg-brand-darkGreen hover:bg-brand-green text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </Link>
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => openEnquiryModal(product)}
          className="w-full py-2.5 rounded-xl bg-brand-softGreen text-brand-darkGreen hover:bg-brand-freshGreen hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-98"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Enquire</span>
        </button>
      </div>
    </div>
  );
}
