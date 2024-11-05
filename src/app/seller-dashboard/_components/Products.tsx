"use client";

import ProductCard from "@/components/product/product-card";
import { trpc } from "@/trpc/client";
import { useCurrentUser } from "../../_hooks/auth.hooks";

function Products({ mode }: { mode: "all" | "draft" | "published" }) {
  const user = useCurrentUser();

  if (!user) return <></>;

  const { data, isPending } = trpc.seller.getKits.useQuery({
    sellerId: user.sellerId,
    limit: 10,
    offset: 0,
  });

  if (isPending) return <div>Loading...</div>;

  if (!data?.data) return <div>Error</div>;

  const kits = data.data.kits.filter((v) => {
    if (mode === "all") return true;
    if (mode === "draft") return v.isPublished === false;
    if (mode === "published") return v.isPublished === true;
    return false;
  });

  return (
    <div className="flex flex-wrap gap-8">
      {kits.map((v, i) => {
        return <ProductCard mode="simple" key={i} kit={v} />;
      })}
    </div>
  );
}

export default Products;
