import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/trpc/server";
import { currentUser } from "@/utils/auth.util";
import Products from "./_components/Products";

export default async function SellerProductsDetails() {
  const user = await currentUser();
  if (!user) return <></>;

  // FIXME: RangeError: Maximum call stack size exceeded on prefetching
  // await trpc.seller.getKits.prefetch({
  //   sellerId: user.sellerId,
  //   limit: 10,
  //   offset: 0,
  // });

  return (
    <Tabs defaultValue="all">
      <TabsList className="flex w-fit items-center gap-2">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="draft">Draft</TabsTrigger>
        <TabsTrigger value="published">Published</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <div className="px-2 py-4">
          <Products mode="all" />
        </div>
      </TabsContent>
      <TabsContent value="draft">
        <div className="px-2 py-4">
          <Products mode="draft" />
        </div>
      </TabsContent>

      <TabsContent value="published">
        <div className="px-2 py-4">
          <Products mode="published" />
        </div>
      </TabsContent>
    </Tabs>
  );
}
