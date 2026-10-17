import type { Metadata } from "next";
import { getBaseUrl, getBreadcrumbSchema } from "@/lib/seo";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: "Why Choose Us | Certified Genetics & Biosecurity Leadership",
  description:
    "Discover why commercial farmers, breeders, and agricultural businesses trust PPF Group for premium day-old chicks, verified heritage genetics, certified biosecurity, and nationwide supply.",
  keywords: [
    "Why Choose PPF Poultry",
    "Certified Day Old Chicks",
    "Verified Poultry Genetics",
    "Bio-secure Poultry Supply",
    "Commercial Poultry Farm India",
    "Poultry Incubators Equipment",
  ],
  alternates: {
    canonical: `${baseUrl}/why-choose-us`,
  },
  openGraph: {
    title: "Why Choose Us | PPF Group of Companies",
    description:
      "16+ years of verified genetics, certified biosecurity, state-of-the-art incubation, and nationwide direct supply across 9 states.",
    url: `${baseUrl}/why-choose-us`,
    siteName: "PPF Group of Companies",
    type: "website",
    images: [
      {
        url: "/assets/hero/main%20hero.png",
        width: 1200,
        height: 630,
        alt: "Why Choose PPF Group of Companies",
      },
    ],
  },
};

export default function WhyChooseUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Why Choose Us", url: `${baseUrl}/why-choose-us` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        id="breadcrumb-why-choose-us"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
