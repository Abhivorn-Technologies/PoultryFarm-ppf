import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { PRODUCTS } from "@/data/products";

export async function GET() {
  try {
    await connectToDatabase();
    const rawEnquiries = await Enquiry.find({}).sort({ createdAt: -1 }).lean();

    // Ensure all enquiries have their proper category resolved
    const enquiries = await Promise.all(
      rawEnquiries.map(async (doc: any) => {
        if (!doc.category || doc.category === "General Farm Enquiry" || doc.category === "General Farm") {
          const matched = PRODUCTS.find(
            (p) => p.name.toLowerCase() === doc.productName?.toLowerCase()
          );
          if (matched) {
            doc.category = matched.category;
            // Persist to MongoDB in background
            Enquiry.findByIdAndUpdate(doc._id, { category: matched.category }).exec().catch(() => {});
          } else if (doc.productName && doc.productName.toLowerCase().includes("broiler")) {
            doc.category = "Live Birds";
            Enquiry.findByIdAndUpdate(doc._id, { category: "Live Birds" }).exec().catch(() => {});
          } else {
            doc.category = "Chicks & Young Birds";
          }
        }
        return doc;
      })
    );

    return NextResponse.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error: any) {
    console.error("Failed to fetch enquiries:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch enquiries", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (body.enquiryType !== "newsletter") {
      const name = body.customerName ? body.customerName.trim() : "";
      if (!name || name.length < 2) {
        return NextResponse.json(
          { success: false, error: "Please provide a valid full name (at least 2 characters)" },
          { status: 400 }
        );
      }

      const phone = body.phone ? body.phone.trim() : "";
      const digitsOnly = phone.replace(/\D/g, "");
      if (!phone || digitsOnly.length < 10 || digitsOnly.length > 15) {
        return NextResponse.json(
          { success: false, error: "Please provide a valid phone number with at least 10 digits" },
          { status: 400 }
        );
      }

      const email = body.email ? body.email.trim() : "";
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
          return NextResponse.json(
            { success: false, error: "Please provide a valid email address" },
            { status: 400 }
          );
        }
      }

      const message = body.message ? body.message.trim() : "";
      if (!message || message.length < 5) {
        return NextResponse.json(
          { success: false, error: "Please provide an enquiry message describing your requirement (at least 5 characters)" },
          { status: 400 }
        );
      }
    } else {
      if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(body.email.trim())) {
        return NextResponse.json(
          { success: false, error: "Please provide a valid email address for subscription" },
          { status: 400 }
        );
      }
    }

    // Resolve category if omitted
    let category = body.category;
    if (!category || category === "General Farm Enquiry") {
      const matched = PRODUCTS.find(
        (p) => p.name.toLowerCase() === body.productName?.toLowerCase()
      );
      if (matched) {
        category = matched.category;
      } else {
        category = "Chicks & Young Birds";
      }
    }

    // Deduplication guard: prevent accidental double-clicks within 15 seconds
    const fifteenSecondsAgo = new Date(Date.now() - 15000);
    const existingRecent = await Enquiry.findOne({
      phone: body.phone.trim(),
      customerName: body.customerName.trim(),
      createdAt: { $gte: fifteenSecondsAgo },
    });

    if (existingRecent) {
      return NextResponse.json(
        { success: true, message: "Enquiry already recorded", data: existingRecent },
        { status: 200 }
      );
    }

    const newEnquiry = await Enquiry.create({
      customerName: body.customerName.trim(),
      phone: body.phone.trim(),
      email: body.email ? body.email.trim() : "",
      category,
      enquiryType: body.enquiryType || (body.productName ? "product" : "general"),
      productName: body.productName || `Enquiry for ${category}`,
      quantity: body.quantity || "Not specified",
      message: body.message || "",
      status: "new",
    });

    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully", data: newEnquiry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Failed to submit enquiry:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await connectToDatabase();
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Enquiry ID and status are required" },
        { status: 400 }
      );
    }

    const updated = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update enquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Enquiry ID is required" },
        { status: 400 }
      );
    }

    await Enquiry.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
