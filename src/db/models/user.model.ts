import mongoose, { Model, Types } from "mongoose";
import { User as IUser } from "next-auth";
import { type ISeller } from "./index/seller.model";
import { type IKit } from "./index/kit.model";
import { type IOrder } from "./index/order.model";

export interface AdapterUser extends IUser {
  id: string;
  email: string;
  emailVerified: Date | null;
  isSeller: boolean;
  sellerId: ISeller & string;
  cartItems: IKit[] & string[];
  orders: IOrder[] & string[];
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // removes whitespace from the name field
    },
    email: {
      type: String,
      trim: true,
    },
    emailVerified: {
      type: Date || null,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    cartItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kit",
      },
    ],

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const registerModel = mongoose.models?.User;

const User: Model<AdapterUser> =
  registerModel || mongoose.model<AdapterUser>("User", userSchema);

export default User;
