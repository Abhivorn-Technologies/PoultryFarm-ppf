import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";
import { CATEGORIES } from "@/data/categories";
import { apiCache } from "@/lib/cache";

export async function GET() {
  try {
    const cached = apiCache.getCategories();
    if (cached) {
      return NextResponse.json(cached, {
        headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=120" },
      });
    }

    await connectToDatabase();
    let categories = await Category.find({}).sort({ createdAt: 1 }).lean();

    // Auto-seed initial 12 categories if database is empty
    if (!categories || categories.length === 0) {
      await Category.insertMany(
        CATEGORIES.map((c) => ({
          slug: c.slug,
          name: c.name,
          badge: c.badge || "Specialized Sector",
          description: c.description || "",
          image: c.image,
          icon: c.icon || "Layers",
          itemCount: c.itemCount || 0,
        }))
      );
      categories = await Category.find({}).sort({ createdAt: 1 }).lean();
    }

    const payload = { success: true, count: categories.length, data: categories };
    apiCache.setCategories(payload);

    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=120" },
    });
  } catch (error: any) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch categories", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const existing = await Category.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A category with this name already exists" },
        { status: 400 }
      );
    }

    const newCategory = await Category.create({
      slug,
      name: body.name.trim(),
      badge: body.badge?.trim() || "Specialized Sector",
      description: body.description?.trim() || "",
      image: body.image || "/assets/catgories/Chicks & Young Birds.png",
      icon: body.icon || "Layers",
      itemCount: body.itemCount || 0,
    });

    apiCache.invalidateCategories();

    return NextResponse.json(
      { success: true, message: "Category created successfully", data: newCategory },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Failed to create category:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
