import mongoose, { Schema, Document } from "mongoose";

export interface IGlimpse extends Document {
  id?: string;
  title: string;
  image: string;
  tag: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GlimpseSchema = new Schema<IGlimpse>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    tag: { type: String, default: "Active Stock" },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Glimpse ||
  mongoose.model<IGlimpse>("Glimpse", GlimpseSchema);
