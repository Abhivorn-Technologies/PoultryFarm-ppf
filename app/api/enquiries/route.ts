import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function GET() {
  try {
    await connectToDatabase();
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });

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

    if (!body.customerName || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone number are required" },
        { status: 400 }
      );
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
      productName: body.productName || "General Farm Enquiry",
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
