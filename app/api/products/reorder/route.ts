import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { apiCache } from "@/lib/cache";
import { verifyAdminRequest } from "@/lib/auth";

export async function PUT(request: Request) {
  try {
    if (!(await verifyAdminRequest(request))) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const body = await request.json();

    const items: Array<{ id: string; sortOrder: number }> = body.items || [];
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid items array for reordering." },
        { status: 400 }
      );
    }

    const bulkOps = items.map((item) => {
      const filter = mongoose.Types.ObjectId.isValid(item.id)
        ? { _id: item.id }
        : { $or: [{ slug: item.id }, { itemNumber: Number(item.id) || 0 }] };

      return {
        updateOne: {
          filter,
          update: { $set: { sortOrder: Number(item.sortOrder) || 0 } },
        },
      };
    });

    await Product.bulkWrite(bulkOps);
    apiCache.invalidateProducts();

    return NextResponse.json({
      success: true,
      message: `Successfully reordered ${items.length} products.`,
    });
  } catch (error: any) {
    console.error("Failed to reorder products:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to reorder products." },
      { status: 500 }
    );
  }
}
