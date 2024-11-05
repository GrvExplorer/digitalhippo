import mongoose, {
  Document,
  Model,
  ObjectId,
  PopulatedDoc,
  Types,
} from "mongoose";
import { type IKit } from "./kit.model";
import { type AdapterUser } from "../user.model";

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface IOrder extends Document {
  user: AdapterUser & string;
  kits: IKit[] & string[];
  amount: number;
  status: OrderStatus;
  paymentDetails: IPaymentDetails;
  isPaid: boolean;
  createdAt: Date;
}

export interface IPaymentDetails {
  razorpay_order_id: string;
  razorpay_payment_id: string;
}

const paymentDetailsSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  kits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kit",
      required: true,
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  },
  paymentDetails: {
    type: paymentDetailsSchema,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order: Model<IOrder> =
  mongoose.models?.Order || mongoose.model<IOrder>("Order", orderSchema);
