import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  id?: string;
  slug: string;
  name: string;
  badge: string;
  description: string;
  image: string;
  icon?: string;
  itemCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    badge: { type: String, default: "Specialized Sector" },
    description: { type: String, default: "" },
    image: { type: String, required: true },
    icon: { type: String, default: "Layers" },
    itemCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
