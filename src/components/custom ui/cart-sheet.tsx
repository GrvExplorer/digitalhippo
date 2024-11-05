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
import { type IKit } from "@/db/models/index/kit.model";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import CartItem from "../product/cart-item";
import { Separator } from "../ui/separator";
import { useState } from "react";

function CartSheet({
  children,
  cartItems,
}: {
  children: React.ReactNode;
  cartItems: IKit[] | undefined;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">{children}</Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-scroll mb-8">
        <SheetHeader className="mb-2 mt-0 flex flex-row items-start justify-between">
          <SheetTitle>Cart ({cartItems?.length || 0})</SheetTitle>
          <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <Separator className="h-[2px]" />

        <div className="my-4 flex h-full flex-col gap-4">
          {cartItems?.length !== 0 && cartItems ? (
            <>
              {cartItems.map((kit) => (
                <div key={kit._id as string}>
                  <CartItem mode="compact" kit={kit} />
                </div>
              ))}
              <Button asChild onClick={() => setOpen(false)} className="w-full bg-primary mt-4 mb-8">
                <Link href="/product/order/summary">Checkout</Link>
              </Button>
             
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
                  Your cart is empty
                </p>

                <p className="text-sm text-muted-foreground">
                  Add items to your cart to checkout.
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

export default CartSheet;
