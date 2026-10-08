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
  const [isVisible, setIsVisible] = useState(true);
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
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Alternating subtle 3D flip rotation: odd index -8deg, even index +8deg
  const initialRotate = index % 2 === 0 ? -8 : 8;
  const staggerDelay = (index % 4) * 75; // 0ms, 75ms, 150ms, 225ms subtle stagger

  return (
    <div
      ref={cardRef}
      className="w-full h-full"
      style={{
        perspective: "1200px",
      }}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transition: `opacity 650ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}ms, transform 650ms cubic-bezier(0.22, 1, 0.36, 1) ${staggerDelay}ms`,
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translate3d(0, 0, 0) rotateY(0deg) scale(1)"
            : `translate3d(0, 32px, 0) rotateY(${initialRotate}deg) scale(0.96)`,
          willChange: "transform, opacity",
        }}
        className="group bg-white rounded-3xl p-6 sm:p-7 border border-brand-darkGreen/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-[box-shadow,translate] duration-300 flex flex-col justify-between h-full select-none"
      >
        <div>
          {/* 1. Large Product Image */}
          <div className="relative rounded-2xl overflow-hidden bg-brand-lightGreen/40 aspect-[16/9] mb-5">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
          </div>

          {/* 2. Product Information */}
          <div className="space-y-2.5">
            {/* Product Name */}
            <h3 className="font-extrabold text-xl sm:text-2xl text-brand-darkGray tracking-tight leading-snug">
              {product.name}
            </h3>

            {/* Product Description */}
            {description && (
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* 3. Bottom Action: Contact Farm Support CTA */}
        <div className="pt-6 mt-6 border-t border-brand-softGreen/50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => openEnquiryModal(product)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-darkGreen hover:bg-brand-green text-white text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Contact Farm Support</span>
          </button>
        </div>
      </div>
    </div>
  );
}


