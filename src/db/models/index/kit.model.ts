import mongoose, { Document, Model } from "mongoose";
import { type ICategory } from "./category.model";
import { type ISeller } from "./seller.model";
import { type IOrder } from "./order.model";
import { type IReview } from "./review.model";

export interface IKit extends Document {
  productName: string;
  features: string[];
  description: string;
  price: number;
  images: string[];
  categories: ICategory[] & string[];
  tags: string[];
  seller: ISeller & string;
  orders:  IOrder[] & string[];
  isPublished: boolean;
  reviews: IReview[] & string[];
}

const kitSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
    },

    features: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
    },

    price: {
      type: Number,
    },

    images: [
      {
        type: String,
      },
    ],

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    tags: [{
      type: String,
    }],

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    isPublished: {
      type: Boolean,
      default: false,
    },

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true },
);

export const Kit: Model<IKit> = mongoose.models?.Kit || mongoose.model<IKit>("Kit", kitSchema);
