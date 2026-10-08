"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Send,
  Layers,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    openEnquiryModal,
  } = useCart();

  if (!quickViewProduct) return null;

  const handleEnquire = () => {
    const prod = quickViewProduct;
    setQuickViewProduct(null);
    openEnquiryModal(prod);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-brand-softGreen overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-brand-cardCream hover:bg-brand-softGreen text-brand-darkGray transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-cardCream border border-brand-softGreen">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-brand-darkGreen text-white font-bold text-[10px] tracking-wider px-2.5 py-1 rounded-full uppercase shadow-xs">
              Catalogue #{quickViewProduct.itemNumber}
            </div>
            {quickViewProduct.dataReviewRequired && (
              <div className="absolute bottom-3 left-3 right-3 bg-amber-50 border border-amber-300 text-amber-900 px-2.5 py-1.5 rounded-xl text-[10px] flex items-center gap-1 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>DATA REVIEW REQUIRED</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-extrabold uppercase text-brand-darkGreen bg-brand-softGreen px-2.5 py-0.5 rounded-md">
                  {quickViewProduct.category}
                </span>
                <span className="text-[11px] text-brand-freshGreen font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Stock
                </span>
              </div>

              <h2 className="font-bold text-xl sm:text-2xl text-brand-darkGray leading-snug">
                {quickViewProduct.name}
              </h2>

              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed my-3 line-clamp-4">
                {quickViewProduct.shortDescription || quickViewProduct.description}
              </p>

              {/* Key Features Pill */}
              {quickViewProduct.details && quickViewProduct.details.length > 0 && (
                <div className="space-y-1.5 my-3">
                  {quickViewProduct.details.slice(0, 2).map((det, i) => (
                    <div
                      key={i}
                      className="text-[11px] text-brand-darkGray flex items-start gap-1.5 bg-brand-cardCream p-2 rounded-lg border border-brand-softGreen/50"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{det}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-brand-softGreen space-y-2.5">
              <button
                type="button"
                suppressHydrationWarning
                onClick={handleEnquire}
                className="w-full py-3 px-4 rounded-xl bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs sm:text-sm shadow transition flex items-center justify-center gap-2 active:scale-98"
              >
                <Send className="w-4 h-4 text-brand-yellow" />
                <span>Enquire About This Product</span>
              </button>

              <div className="text-center pt-1">
                <Link
                  href={`/product/${quickViewProduct.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="inline-flex items-center gap-1 text-xs text-brand-darkGreen hover:text-brand-freshGreen hover:underline font-bold"
                >
                  <span>View Full Product Specifications & Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

