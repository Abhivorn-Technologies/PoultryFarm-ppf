import type { Metadata } from "next";
import { getBaseUrl, getBreadcrumbSchema } from "@/lib/seo";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: "About Us | Heritage, Biosecurity & Leadership Since 2011",
  description:
    "Learn about PPF Group of Companies (Panndu Poultry Farms & Hatcheries). Founded in 2011, delivering bio-secure genetics, commercial hatchery machinery, and nationwide poultry supply.",
  keywords: [
    "About PPF Group",
    "Panndu Poultry Farms History",
    "Bio-secure Hatchery India",
    "Certified Poultry Breeder Hyderabad",
    "Commercial Poultry Farming Heritage",
  ],
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "About PPF Group of Companies | Certified Poultry Heritage",
    description:
      "Trusted poultry industry leadership since 2011 with certified biosecurity, state-of-the-art incubation, and nationwide direct supply.",
    url: `${baseUrl}/about`,
    siteName: "PPF Group of Companies",
    type: "website",
    images: [
      {
        url: "/assets/hero/main%20hero.png",
        width: 1200,
        height: 630,
        alt: "About PPF Group of Companies",
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "About Us", url: `${baseUrl}/about` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        id="breadcrumb-about"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
