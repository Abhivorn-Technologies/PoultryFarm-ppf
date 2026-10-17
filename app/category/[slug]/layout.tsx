import type { Metadata } from "next";
import { getBaseUrl, getBreadcrumbSchema } from "@/lib/seo";
import { getCategoryForSEO } from "@/lib/seo-db";

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = getBaseUrl();
  const category = await getCategoryForSEO(slug);

  if (!category) {
    return {
      title: "Poultry Sector Category",
      description: "Explore specialized poultry products from PPF Group of Companies.",
    };
  }

  const title = `${category.name}`;
  const description =
    category.description ||
    `Explore verified ${category.name} from PPF Group of Companies. Certified bio-secure stock, pure breeds, and commercial poultry solutions.`;

  return {
    title,
    description,
    keywords: [
      category.name,
      "PPF Group of Companies",
      "Poultry Farming India",
      "Commercial Poultry Sector",
      "Bio-secure Poultry Hyderabad",
    ],
    alternates: {
      canonical: `${baseUrl}/category/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | PPF Group of Companies`,
      description,
      url: `${baseUrl}/category/${category.slug}`,
      siteName: "PPF Group of Companies",
      type: "website",
      images: category.image
        ? [
            {
              url: category.image.startsWith("http")
                ? category.image
                : `${baseUrl}${category.image}`,
              alt: category.name,
            },
          ]
        : [],
    },
  };
}

export default async function CategoryLayout({ children, params }: CategoryLayoutProps) {
  const { slug } = await params;
  const baseUrl = getBaseUrl();
  const category = await getCategoryForSEO(slug);

  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "Categories", url: `${baseUrl}/categories` },
    ...(category ? [{ name: category.name, url: `${baseUrl}/category/${category.slug}` }] : []),
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        id={`breadcrumb-category-${slug}`}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
