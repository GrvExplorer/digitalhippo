"use client";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCheckIcon, Trash2Icon } from "lucide-react";
import ProductCarousel from "./product-carousel";

import { type IKit } from "@/db/models/index/kit.model";
import { trpc } from "@/trpc/client";
import { cn } from "@/utils/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { Button } from "../ui/button";

function CartItem({
  kit,
  mode,
  className,
}: {
  kit: IKit;
  mode: "compact" | "spread" | "show";
  className?: string;
}) {
  const { mutate: removeFromCart } = trpc.kit.removeFromCart.useMutation();

  const cache = useQueryClient();

  return (
    <div className={cn("flex flex-col", mode === "spread" && "", className)}>
      <div className="flex w-full gap-4">
        <ProductCarousel
          className={cn("w-1/4", mode === "spread" && "w-1/6")}
          images={kit.images}
        />
        <div
          className={cn(
            "w-full pt-1",
            mode === "show" && "flex flex-col justify-center"
          )}
        >
          <div className="flex w-full justify-between">
            <Link href={`/product/${kit._id}`}>
              <p className="font-bold">{kit.productName}</p>
            </Link>

            {mode !== "show" && (
              <>
                {mode === "spread" ? (
                  <>
                    <Button
                      variant="link"
                      onClick={() => {
                        removeFromCart({ kitId: kit._id as string });
                      }}
                    >
                      <Cross2Icon className="h-5 w-6 text-black" />
                    </Button>
                  </>
                ) : (
                  <p>Price: ${kit.price}</p>
                )}
              </>
            )}
          </div>

          <p className="text-muted-foreground">
            {kit.categories.map((cat) => cat.name).join(", ")}
          </p>

         <div>
            {mode !== "show" && (
              <>
                {mode === "spread" ? (
                  <p>Price: ${kit.price}</p>
                ) : (
                  <Button
                    variant="link"
                    onClick={() => {
                      removeFromCart({ kitId: kit._id as string });
                    }}
                    className="flex items-center gap-1 p-0 text-red-500"
                  >
                    <Trash2Icon className="h-4 w-4" />
                    Remove
                  </Button>
                )}
              </>
            )}
          </div>

          {mode === "spread" && kit.features.length > 0 && (
            <div className="my-4 flex gap-2">
              <CheckCheckIcon className="h-4 w-4 text-green-500" />
              <p className="text-muted-foreground">{kit.features.join(", ")}</p>
            </div>
          )}
        </div>
      </div>
      <Separator className="my-2 h-[2px] bg-gray-200" />

      {mode === "compact" && (
        <div className="flex flex-col gap-1">
          <div className="flex w-full justify-between">
            <p className="text-lg font-semibold">Shipping</p>
            <p className="text-lg">Free</p>
          </div>
          <div className="flex w-full justify-between">
            <p className="text-lg font-semibold">Transaction fee</p>
            <p className="text-lg">$1.00</p>
          </div>
          <div className="flex w-full justify-between">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg">${kit.price + 1}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
