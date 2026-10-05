import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { CATEGORIES } from "@/data/categories";

export function ShopCategories() {
  return (
    <section id="shop-categories" className="py-20 bg-brand-cream border-b border-brand-cream-muted">
      <Container size="large">
        <SectionHeading
          badge="Product Categories"
          badgeVariant="green"
          title={
            <>
              Explore All <span className="text-brand-green-700">Official Product Categories</span>
            </>
          }
          subtitle="From day-old chicks and heritage breeding stock to commercial incubators, battery cages, medicines, feeds, and frozen meat."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
