import mongoose from "mongoose";
import { type AdapterUser } from "../user.model";
import { type IKit } from "./kit.model";

export interface IReview extends mongoose.Document {
  user: AdapterUser & string;
  kit: IKit & string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    kit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kit",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Review: mongoose.Model<IReview> =
  mongoose.models?.Review || mongoose.model<IReview>("Review", reviewSchema);
