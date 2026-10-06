import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { PRODUCTS } from "@/data/products";

export async function POST() {
  try {
    await connectToDatabase();

    // Check existing count
    const existingCount = await Product.countDocuments();

    // If already has products, wipe and re-seed with fresh catalog
    await Product.deleteMany({});

    const formattedProducts = PRODUCTS.map((p) => ({
      itemNumber: p.itemNumber,
      name: p.name,
      slug: p.slug,
      category: p.category,
      categorySlug: p.categorySlug,
      shortDescription: p.shortDescription || "",
      description: p.description || "",
      details: p.details || [],
      image: p.image,
      price: p.price,
      priceDisplay: p.priceDisplay || "Price on Enquiry",
      unit: p.unit || "per unit",
      available: p.available ?? true,
      featured: p.featured ?? false,
      isPopular: p.isPopular ?? false,
      tags: p.tags || [],
    }));

    const result = await Product.insertMany(formattedProducts);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${result.length} products into MongoDB!`,
      count: result.length,
      previousCount: existingCount,
    });
  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to seed products" },
      { status: 500 }
    );
  }
}
