"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { type IOrder } from "@/db/models/index/order.model";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";
import OrderItem from "../product/order-item";
import { Separator } from "../ui/separator";

function OrderSheet({
  children,
  orderItems,
}: {
  children: React.ReactNode;
  orderItems: IOrder[] | undefined;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">{children}</Button>
      </SheetTrigger>

      <SheetContent className="mb-8 overflow-y-scroll">
        <SheetHeader className="mb-2 mt-0 flex flex-row items-start justify-between">
          <SheetTitle>Order ({orderItems?.length || 0})</SheetTitle>
          <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <Separator className="h-[2px]" />

        <div className="my-4 flex h-full flex-col gap-4">
          {orderItems?.length !== 0 && orderItems ? (
            <>
              {orderItems.map((orderItem) => (
                <div key={orderItem._id as string}>
                  <OrderItem orderItem={orderItem} />
                </div>
              ))}
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-4">
              <Image
                src={"/hippo-empty-cart.png"}
                width={200}
                height={200}
                alt="empty cart"
              />
              <div className="flex flex-col space-y-1">
                <p className="text-center text-lg font-semibold text-foreground">
                  No orders found
                </p>

                <p className="text-sm text-muted-foreground">
                  You have no orders yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>

      <SheetOverlay />
    </Sheet>
  );
}

export default OrderSheet;
