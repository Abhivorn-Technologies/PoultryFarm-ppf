import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEnquiry extends Document {
  customerName: string;
  phone: string;
  email?: string;
  productName?: string;
  quantity?: string;
  message?: string;
  status: "new" | "contacted" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true },
    productName: { type: String, default: "General Enquiry" },
    quantity: { type: String, default: "Not specified" },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "completed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);

export default Enquiry;
