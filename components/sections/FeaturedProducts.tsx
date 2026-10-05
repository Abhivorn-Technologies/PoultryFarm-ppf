import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS } from "@/data/products";

export function FeaturedProducts() {
  const featuredList = PRODUCTS.filter((p) =>
    [26, 27, 28, 29, 37, 39, 41, 42].includes(p.itemNumber)
  ).slice(0, 4);

  return (
    <section className="py-20 bg-white border-b border-brand-cream-muted">
      <Container size="large">
        <SectionHeading
          badge="Equipment & Feed Highlights"
          badgeVariant="green"
          title={
            <>
              Hatchery Technology, Feeds & <span className="text-brand-green-700">Processed Meat</span>
            </>
          }
          subtitle="Commercial egg incubators, vaccination equipment, battery cages, Soya DOC and hygienic poultry meat from our catalog."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
