"use client";

import { type IOrder } from "@/db/models/index/order.model";
import { cn } from "@/utils/utils";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

function OrderItem({
  orderItem,
  className,
}: {
  orderItem: IOrder;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <Link href={`/payment/success/${orderItem._id}`}>
        <div className="flex w-full gap-4">
          <div className={cn("w-full pt-1")}>
            <p className="font-bold">{orderItem.kits.length} items</p>
            <p className="text-muted-foreground">{orderItem.status}</p>
            <p className="text-muted-foreground">Total: ${orderItem.amount / 100}</p>

            <p className="text-muted-foreground">
              {new Date(orderItem.createdAt).toLocaleDateString()}
            </p>

            <p className="text-muted-foreground">
              Order ID: {orderItem.paymentDetails.razorpay_order_id}
            </p>

            <p className="text-muted-foreground">
              Payment ID: {orderItem.paymentDetails.razorpay_payment_id}
            </p>

            <p className="text-muted-foreground">
              Signature: {orderItem.isPaid ? "Paid" : "Unpaid"}
            </p>
          </div>
        </div>
      </Link>
      <Separator className="my-2 h-[2px] bg-gray-200" />
    </div>
  );
}

export default OrderItem;
