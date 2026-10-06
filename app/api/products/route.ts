import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { PRODUCTS } from "@/data/products";

export async function GET() {
  try {
    await connectToDatabase();
    let products = await Product.find({}).sort({ itemNumber: 1 });

    // Auto-seed: If the database is completely empty on first run, seed with our initial products
    if (products.length === 0) {
      const initialBatch = PRODUCTS.map((p) => ({
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
        priceDisplay: p.priceDisplay,
        unit: p.unit || "per unit",
        available: p.available ?? true,
        featured: p.featured ?? false,
        isPopular: p.isPopular ?? false,
        tags: p.tags || [],
      }));
      await Product.insertMany(initialBatch);
      products = await Product.find({}).sort({ itemNumber: 1 });
    }

    return NextResponse.json({ success: true, count: products.length, data: products });
  } catch (error: any) {
    console.error("Failed to fetch products:", error);
    // If DB isn't connected yet, gracefully fallback to local products so site never breaks
    return NextResponse.json({
      success: false,
      fallback: true,
      message: error?.message || "Database connection error",
      data: PRODUCTS,
    });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.name || !body.category || !body.image) {
      return NextResponse.json(
        { success: false, error: "Name, category, and image are required" },
        { status: 400 }
      );
    }

    const count = await Product.countDocuments();
    const itemNumber = body.itemNumber || count + 1;
    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newProduct = await Product.create({
      ...body,
      itemNumber,
      slug,
      available: body.available ?? true,
    });

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
