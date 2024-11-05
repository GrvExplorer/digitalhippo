
import mongoose, { type Document, type Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

const categorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  // slug: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
});

export const Category: Model<ICategory> = mongoose.models?.Category || mongoose.model<ICategory>("Category", categorySchema);
