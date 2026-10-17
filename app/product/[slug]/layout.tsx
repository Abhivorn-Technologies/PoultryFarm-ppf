import type { Metadata } from "next";
import {
  getBaseUrl,
  getProductSchema,
  getBreadcrumbSchema,
  BUSINESS_INFO,
} from "@/lib/seo";
import { getProductForSEO } from "@/lib/seo-db";

interface ProductLayoutProps {
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
  const product = await getProductForSEO(slug);

  if (!product) {
    return {
      title: "Poultry Product",
      description: "Explore certified poultry products from PPF Group of Companies.",
    };
  }

  const title = `${product.name}`;
  const description =
    product.shortDescription ||
    product.description?.slice(0, 160) ||
    `${product.name} - Certified high-yield, bio-secure poultry stock from PPF Group of Companies. Direct farm enquiries and nationwide booking.`;

  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${baseUrl}${product.image}`
    : `${baseUrl}${BUSINESS_INFO.logoPath}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.category,
      ...(Array.isArray(product.tags) ? product.tags : []),
      "PPF Group of Companies",
      "Poultry Farm India",
      "Buy Poultry Stock Online",
      BUSINESS_INFO.officialPhone,
    ],
    alternates: {
      canonical: `${baseUrl}/product/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | PPF Group of Companies`,
      description,
      url: `${baseUrl}/product/${product.slug}`,
      siteName: "PPF Group of Companies",
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | PPF Group of Companies`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductLayout({ children, params }: ProductLayoutProps) {
  const { slug } = await params;
  const baseUrl = getBaseUrl();
  const product = await getProductForSEO(slug);

  let productSchema: Record<string, unknown> | null = null;
  let breadcrumbSchema: Record<string, unknown> | null = null;

  if (product) {
    productSchema = getProductSchema(product, baseUrl);

    const breadcrumbs = [
      { name: "Home", url: baseUrl },
      { name: "Products", url: `${baseUrl}/products` },
      ...(product.categorySlug
        ? [{ name: product.category, url: `${baseUrl}/category/${product.categorySlug}` }]
        : []),
      { name: product.name, url: `${baseUrl}/product/${product.slug}` },
    ];

    breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  }

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          id={`schema-product-${slug}`}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          id={`breadcrumb-product-${slug}`}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {children}
    </>
  );
}
