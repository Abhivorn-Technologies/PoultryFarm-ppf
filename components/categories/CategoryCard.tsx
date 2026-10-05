import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types/product";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative rounded-3xl overflow-hidden bg-white border border-brand-softGreen/70 p-5 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1.5 flex flex-col justify-between block"
    >
      {/* Background Image Container */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-cream mb-4">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Item count tag */}
        <div className="absolute top-3 left-3 bg-brand-darkGreen/90 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold border border-brand-green/40">
          {category.itemCount} Products
        </div>

        {/* Badge if available */}
        {category.badge && (
          <div className="absolute top-3 right-3 bg-brand-yellow text-brand-darkGray font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            {category.badge}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-brand-darkGray group-hover:text-brand-darkGreen transition-colors">
            {category.name}
          </h3>
          <div className="w-8 h-8 rounded-full bg-brand-softGreen group-hover:bg-brand-darkGreen text-brand-darkGreen group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <p className="text-xs text-brand-gray line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
