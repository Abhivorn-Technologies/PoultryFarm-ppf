import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Glimpse from "@/models/Glimpse";
import { apiCache } from "@/lib/cache";

const DEFAULT_GLIMPSES = [
  {
    title: "Live Day-Old Chicks",
    image: "/assets/products/chicks/broiler-chicks.jpg",
    tag: "Active Stock",
    order: 1,
  },
  {
    title: "Fertile Hatching Eggs",
    image: "/assets/products/eggs/hatching-eggs.jpg",
    tag: "Candled & Graded",
    order: 2,
  },
  {
    title: "Modern Poultry Equipment",
    image: "/assets/products/equipment/feeder.jpg",
    tag: "High Durability",
    order: 3,
  },
  {
    title: "Nutritious Feeds & Grains",
    image: "/assets/products/feeds/feed-bag.jpg",
    tag: "Formulated Feed",
    order: 4,
  },
  {
    title: "Central Storage Warehouse",
    image: "/assets/about/warehouse.jpg",
    tag: "Storage & Logistics",
    order: 5,
  },
];

// GET: Fetch all glimpses (auto-seed defaults if database is empty)
export async function GET() {
  try {
    const cached = apiCache.getGlimpses();
    if (cached) {
      return NextResponse.json(cached, {
        headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=120" },
      });
    }

    await connectToDatabase();
    let glimpses = await Glimpse.find({}).sort({ order: 1, createdAt: -1 }).lean();

    if (!glimpses || glimpses.length === 0) {
      await Glimpse.insertMany(DEFAULT_GLIMPSES);
      glimpses = await Glimpse.find({}).sort({ order: 1, createdAt: -1 }).lean();
    }

    const payload = {
      success: true,
      data: glimpses,
    };
    apiCache.setGlimpses(payload);

    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=120" },
    });
  } catch (error: any) {
    console.error("GET /api/glimpses error:", error);
    // Graceful fallback to default glimpses if MongoDB connection fails
    return NextResponse.json({
      success: true,
      data: DEFAULT_GLIMPSES.map((g, idx) => ({ ...g, _id: `fallback-${idx}` })),
      fallback: true,
    });
  }
}

// POST: Admin create new glimpse
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, image, tag, order } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 }
      );
    }

    if (!image || !image.trim()) {
      return NextResponse.json(
        { success: false, error: "Image URL or uploaded file path is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newGlimpse = await Glimpse.create({
      title: title.trim(),
      image: image.trim(),
      tag: tag && tag.trim() ? tag.trim() : "Active Stock",
      order: typeof order === "number" ? order : 0,
    });

    apiCache.invalidateGlimpses();

    return NextResponse.json({
      success: true,
      data: newGlimpse,
      message: "Glimpse created successfully",
    });
  } catch (error: any) {
    console.error("POST /api/glimpses error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create glimpse" },
      { status: 500 }
    );
  }
}

// DELETE: Admin remove a glimpse
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Glimpse ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const deleted = await Glimpse.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Glimpse not found" },
        { status: 404 }
      );
    }

    apiCache.invalidateGlimpses();

    return NextResponse.json({
      success: true,
      message: "Glimpse removed successfully",
    });
  } catch (error: any) {
    console.error("DELETE /api/glimpses error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete glimpse" },
      { status: 500 }
    );
  }
}

// PUT: Admin update an existing glimpse
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, image, tag, order } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Glimpse ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updated = await Glimpse.findByIdAndUpdate(
      id,
      {
        ...(title ? { title: title.trim() } : {}),
        ...(image ? { image: image.trim() } : {}),
        ...(tag ? { tag: tag.trim() } : {}),
        ...(typeof order === "number" ? { order } : {}),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Glimpse not found" },
        { status: 404 }
      );
    }

    apiCache.invalidateGlimpses();

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Glimpse updated successfully",
    });
  } catch (error: any) {
    console.error("PUT /api/glimpses error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update glimpse" },
      { status: 500 }
    );
  }
}
