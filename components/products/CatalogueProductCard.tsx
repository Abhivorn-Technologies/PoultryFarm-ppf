"use client";

import React, { useRef, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface CatalogueProductCardProps {
  product: Product;
  index?: number;
}

export function CatalogueProductCard({ product, index = 0 }: CatalogueProductCardProps) {
  const { openEnquiryModal } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const description = product.description || product.shortDescription;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const staggerDelay = (index % 2) * 70;

  return (
    <div
      ref={cardRef}
      className="w-full h-full"
    >
      <div
        style={{
          transition: `opacity 450ms cubic-bezier(0.2, 0.8, 0.2, 1) ${staggerDelay}ms, transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1) ${staggerDelay}ms`,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
          willChange: "transform, opacity",
        }}
        className="group bg-white rounded-3xl p-6 sm:p-7 border border-brand-darkGreen/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-[box-shadow,translate] duration-300 flex flex-col justify-between h-full select-none"
      >
        <div>
          {/* 1. Product Image with Top-Left Category Badge */}
          <div className="relative rounded-2xl overflow-hidden bg-brand-lightGreen/40 aspect-[16/10] mb-5">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
            {product.category && (
              <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs text-brand-darkGreen border border-brand-darkGreen/15 shadow-xs text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full pointer-events-none">
                {product.category}
              </div>
            )}
          </div>

          {/* 2. Product Name & 3. Product Description */}
          <div className="space-y-2.5">
            <h3 className="font-extrabold text-xl sm:text-2xl text-brand-darkGray tracking-tight leading-snug">
              {product.name}
            </h3>

            {description && (
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* 4. Enquire Now Button */}
        <div className="pt-6 mt-6 border-t border-brand-softGreen/50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => openEnquiryModal(product)}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow active:scale-95 flex items-center justify-center cursor-pointer"
          >
            <span>Enquire Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
