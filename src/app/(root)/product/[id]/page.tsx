import ProductCard from "@/components/product/product-card";
import Products from "@/components/product/Products";
import { type IKit } from "@/db/models/index/kit.model";
import { trpc } from "@/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) return <></>;

  const product = await trpc.kit.byId({ id });
  if (!product.data || !product || !product.success || product.error)
    return (
      <>
        <div className="flex items-center justify-center">{product.error}</div>
      </>
    );
  const serializedProduct: IKit = JSON.parse(JSON.stringify(product.data));

  const categoryWise = await trpc.kit.byCategory({
    categories: serializedProduct.categories.map((v) => v._id as string),
  });
  const serializedCategoryWise: IKit[] = JSON.parse(
    JSON.stringify(categoryWise.data),
  );

  return (
    <div>
      <ProductCard mode="detailed" kit={serializedProduct} />
      <div className="px-2 py-4 my-4">
        <div className="flex justify-between">
          <p className="text-2xl font-bold capitalize my-2">Similar Products</p>
        </div>
        <Products kits={serializedCategoryWise} />

        {/* TODO:Reviews */}
      </div>
    </div>
  );
}
