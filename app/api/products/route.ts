import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { PRODUCTS } from "@/data/products";
import { apiCache } from "@/lib/cache";

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { success: true, count: PRODUCTS.length, data: PRODUCTS },
        { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=120" } }
      );
    }

    // Serve from cache if fresh
    const cached = apiCache.getProducts();
    if (cached) {
      return NextResponse.json(cached, {
        headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=120" },
      });
    }

    await connectToDatabase();
    let products = await Product.find({}).sort({ itemNumber: 1 }).lean();

    // Auto-seed: If the database is completely empty on first run, seed with our initial products
    if (!products || products.length === 0) {
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
      products = await Product.find({}).sort({ itemNumber: 1 }).lean();
    }

    const transformed = (products || []).map((p: any) => ({
      ...p,
      id: p._id ? p._id.toString() : p.slug,
    }));

    const responsePayload = { success: true, count: transformed.length, data: transformed };
    apiCache.setProducts(responsePayload);

    return NextResponse.json(responsePayload, {
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=120" },
    });
  } catch (error: any) {
    console.warn("MongoDB products fetch fallback to static data:", error?.message || error);
    // Gracefully return local static products so the client never crashes with a 500 error
    return NextResponse.json({
      success: true,
      fallback: true,
      message: error?.message || "Database fallback active",
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

    apiCache.invalidateProducts();

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
