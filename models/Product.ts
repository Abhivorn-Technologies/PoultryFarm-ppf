import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  itemNumber: number;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  details: string[];
  image: string;
  price: number | null;
  priceDisplay: string;
  unit?: string;
  available: boolean;
  featured?: boolean;
  isPopular?: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    itemNumber: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true },
    categorySlug: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    details: { type: [String], default: [] },
    image: { type: String, required: true },
    price: { type: Number, default: null },
    priceDisplay: { type: String, default: "Price on Enquiry" },
    unit: { type: String, default: "per unit" },
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose model overwrite error in Next.js development hot-reloading
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
