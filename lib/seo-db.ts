import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import type { SEOProduct, SEOCategory } from "@/lib/seo";

/**
 * Safely fetches categories and products for sitemap generation.
 * Falls back cleanly to static datasets if MongoDB is unreachable.
 */
export async function getSitemapData() {
  let categories: { slug: string; name: string; updatedAt: Date }[] = CATEGORIES.map((c) => ({
    slug: c.slug,
    name: c.name,
    updatedAt: new Date("2026-03-01"),
  }));

  let products: { slug: string; name: string; updatedAt: Date }[] = PRODUCTS.map((p) => ({
    slug: p.slug,
    name: p.name,
    updatedAt: new Date("2026-03-01"),
  }));

  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const dbCategories = await Category.find({}, "slug name updatedAt").lean<SEOCategory[]>();
      if (dbCategories && dbCategories.length > 0) {
        categories = dbCategories.map((c) => ({
          slug: c.slug,
          name: c.name,
          updatedAt: c.updatedAt ? new Date(c.updatedAt) : new Date("2026-03-01"),
        }));
      }

      const dbProducts = await Product.find({ available: true }, "slug name updatedAt").lean<SEOProduct[]>();
      if (dbProducts && dbProducts.length > 0) {
        products = dbProducts.map((p) => ({
          slug: p.slug,
          name: p.name,
          updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date("2026-03-01"),
        }));
      }
    }
  } catch (err) {
    console.warn("Using static data fallback for SEO sitemap:", (err as Error)?.message || err);
  }

  return { categories, products };
}

/**
 * Safely fetch individual product for SEO metadata generation.
 */
export async function getProductForSEO(slug: string): Promise<SEOProduct | null> {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const dbProduct = await Product.findOne({ slug }).lean<SEOProduct>();
      if (dbProduct) return dbProduct;
    }
  } catch (err) {
    console.warn("Product SEO DB fetch fallback:", (err as Error)?.message);
  }
  const fallback = PRODUCTS.find((p) => p.slug === slug);
  return fallback ? (fallback as unknown as SEOProduct) : null;
}

/**
 * Safely fetch individual category for SEO metadata generation.
 */
export async function getCategoryForSEO(slug: string): Promise<SEOCategory | null> {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const dbCategory = await Category.findOne({ slug }).lean<SEOCategory>();
      if (dbCategory) return dbCategory;
    }
  } catch (err) {
    console.warn("Category SEO DB fetch fallback:", (err as Error)?.message);
  }
  const fallback = CATEGORIES.find((c) => c.slug === slug);
  return fallback ? (fallback as unknown as SEOCategory) : null;
}
