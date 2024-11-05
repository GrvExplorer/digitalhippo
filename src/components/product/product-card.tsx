"use client";

import { useCurrentUser } from "@/app/_hooks/auth.hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type IKit } from "@/db/models/index/kit.model";
import { trpc } from "@/trpc/client";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { IoMdCheckmarkCircleOutline, IoMdMore } from "react-icons/io";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import ProductCarousel from "./product-carousel";

function ProductCard({
  kit,
  mode,
}: {
  kit: IKit;
  mode: "detailed" | "simple";
}) {
  const user = useCurrentUser();

  const {
    mutate: publishKit,
    isPending,
    data,
  } = trpc.seller.updateKit.useMutation();
  const { mutate: addToCart } = trpc.kit.addToCart.useMutation();
  const { toast } = useToast();
  // const cache = useQueryClient();

  function submit() {
    publishKit({
      id: kit._id as string,
      toPublish: !kit.isPublished,
      sellerId: user!.sellerId,
    });
    if (!data?.success) {
      toast({
        title: "Error",
        description: data?.error || "Something went wrong",
        variant: "destructive",
      });
    }
    toast({
      title: "Success",
      description: data?.message || "Kit published successfully",
    });
    // cache.invalidateQueries({ queryKey: ["seller", "getKits"] });
  }

  if (mode === "detailed") {
    return (
      <div className="mx-12 my-12 flex items-center justify-between">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">Home / Products</p>
            <p className="text-4xl font-bold capitalize">{kit.productName}</p>
            <p className="font-medium">
              ${kit.price} |{" "}
              <span className="text-gray-500">
                {kit.categories.map((category) => category.name).join(", ")}
              </span>
            </p>
            <div className="">
              {kit.features.map((feature, i) => (
                <p key={i} className="flex items-center gap-2">
                  <IoMdCheckmarkCircleOutline className="text-green-500" />
                  {feature}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <Button
              className="w-full bg-primary"
              onClick={() => {
                addToCart({ kitId: kit._id as string });
              }}
            >
              Add to Cart
            </Button>
            <p className="flex items-center gap-2 text-sm capitalize text-gray-500">
              <IoMdCheckmarkCircleOutline className="text-green-500" />
              <span>30 day money back guarantee</span>
            </p>
          </div>
        </div>

        <ProductCarousel images={kit.images} className="w-1/2" />
      </div>
    );
  }

  return (
    <div>
      <ProductCarousel images={kit.images} />
      <div className="flex justify-between px-2">
        <div className="">
          <Link href={`/product/${kit._id}`}>
            <p className="font-bold">{kit.productName}</p>
          </Link>
          <p>Price: ${kit.price}</p>
        </div>

        {user?.isSeller && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="mt-2 h-fit w-fit">
              <button className="">
                <IoMdMore className="text-xl" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel className="flex w-full justify-between">
                General
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel className="flex w-full justify-between">
                  orders
                  <p className="">{kit.orders.length}</p>
                </DropdownMenuLabel>

                <DropdownMenuLabel className="flex w-full justify-between">
                  reviews
                  <p className="">{kit.reviews.length}</p>
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuLabel className="flex">
                <Button
                  onClick={submit}
                  disabled={isPending}
                  variant={"link"}
                  className="px-0 tracking-wide text-black"
                >
                  {kit.isPublished ? "Unpublish" : "Publish"}
                </Button>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
