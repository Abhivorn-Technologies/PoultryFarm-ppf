import type { Metadata } from "next";
import { getBaseUrl, getBreadcrumbSchema } from "@/lib/seo";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: "Specialized Poultry Sectors (12 Core Categories)",
  description:
    "Explore all 12 specialized poultry sectors from PPF Group of Companies: broiler chicks, country desi breeds, fertile hatching eggs, commercial incubators, feeding systems, and biosecurity solutions.",
  keywords: [
    "Poultry Categories",
    "12 Specialized Poultry Sectors",
    "Broiler Chicks Category",
    "Country Desi Chicken Breeds",
    "Hatching Eggs Wholesale",
    "Commercial Egg Incubators",
  ],
  alternates: {
    canonical: `${baseUrl}/categories`,
  },
  openGraph: {
    title: "12 Specialized Poultry Sectors | PPF Group of Companies",
    description:
      "Explore certified live birds, pure breeds, commercial incubation machinery, and high-performance feeds across 12 sectors.",
    url: `${baseUrl}/categories`,
    siteName: "PPF Group of Companies",
    type: "website",
    images: [
      {
        url: "/assets/hero/main%20hero.png",
        width: 1200,
        height: 630,
        alt: "PPF Specialized Poultry Sectors",
      },
    ],
  },
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Categories", url: `${baseUrl}/categories` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        id="breadcrumb-categories"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
