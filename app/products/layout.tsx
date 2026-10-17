import type { Metadata } from "next";
import { getBaseUrl, getBreadcrumbSchema } from "@/lib/seo";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: "Official Product Catalogue | Live Birds, Feeds & Equipment",
  description:
    "Browse our comprehensive poultry catalogue: certified day-old chicks, heritage & commercial breeds, high-fertility hatching eggs, smart incubators, battery cages, and organic feeds with direct farm enquiry.",
  keywords: [
    "Poultry Product Catalogue",
    "Buy Day-Old Chicks Online",
    "Commercial Incubators India",
    "Poultry Cages Wholesale",
    "Organic Poultry Feeds",
    "Hatching Eggs Bulk Supply",
  ],
  alternates: {
    canonical: `${baseUrl}/products`,
  },
  openGraph: {
    title: "Official Product Catalogue | PPF Group of Companies",
    description:
      "Explore certified live birds, pure breeds, commercial incubation machinery, and high-performance feeds with direct farm enquiry.",
    url: `${baseUrl}/products`,
    siteName: "PPF Group of Companies",
    type: "website",
    images: [
      {
        url: "/assets/hero/main%20hero.png",
        width: 1200,
        height: 630,
        alt: "PPF Group Product Catalogue",
      },
    ],
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Products", url: `${baseUrl}/products` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        id="breadcrumb-products"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
