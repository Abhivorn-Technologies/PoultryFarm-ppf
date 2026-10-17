import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";
import { getSitemapData } from "@/lib/seo-db";

export const revalidate = 86400; // Revalidate sitemap daily

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const { categories, products } = await getSitemapData();

  // Core public static marketing routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/why-choose-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // All 12 public specialized category sectors
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: cat.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Individual product URLs
  const productRoutes: MetadataRoute.Sitemap = products.map((prod) => ({
    url: `${baseUrl}/product/${prod.slug}`,
    lastModified: prod.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Deduplicate and filter out any invalid entries
  const seenUrls = new Set<string>();
  const fullSitemap: MetadataRoute.Sitemap = [];

  for (const entry of [...staticRoutes, ...categoryRoutes, ...productRoutes]) {
    if (entry.url && !seenUrls.has(entry.url)) {
      seenUrls.add(entry.url);
      fullSitemap.push(entry);
    }
  }

  return fullSitemap;
}
