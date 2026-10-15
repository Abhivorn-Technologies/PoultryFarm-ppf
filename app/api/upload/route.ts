import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";
import { verifyAdminRequest } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    if (!(await verifyAdminRequest(request))) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate mime type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Please upload a valid image file (JPG, PNG, WebP, GIF, SVG)" },
        { status: 400 }
      );
    }

    // Generate safe clean filename with timestamp
    const cleanOriginalName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-")
      .replace(/-+/g, "-");
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e4)}`;
    const filename = `${uniqueSuffix}-${cleanOriginalName}`;

    // 1. If Vercel Blob token is set, upload to Vercel Object Storage
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`uploads/${filename}`, file, {
        access: "public",
        contentType: file.type,
      });

      return NextResponse.json({
        success: true,
        url: blob.url,
        filename,
        storage: "vercel-blob",
        message: "Image uploaded to Vercel Blob successfully",
      });
    }

    // 2. Local disk fallback for local development without Vercel token
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), "public", "assets", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, buffer);

    const publicUrl = `/assets/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      storage: "local-disk",
      message: "Image uploaded successfully (local disk)",
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
