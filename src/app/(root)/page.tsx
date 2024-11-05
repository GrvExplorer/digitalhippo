import Products from "@/components/product/Products";
import Hero from "@/components/shared/Hero";
import { trpc } from "@/trpc/server";
import Link from "next/link";

export default async function Home() {
  const { data } = await trpc.kit.allCategoryWise();
  if (!data) return null;

  const serializedData = JSON.parse(JSON.stringify(data));

  return (
    <main className="">
      <Hero />
      {/* <Offers /> */}

      <div className="flex flex-col gap-4 px-4 md:px-8 lg:px-16">
        {serializedData.map((v: any, i: number) => (
          <div key={i} className="px-2 py-4">
            <div className="flex justify-between">
              <p className="text-2xl font-bold capitalize my-2">{v.name}</p>
              <Link href={`product/category/${v.name}`} className="text-blue-600 hover:underline">More {v.name}</Link>
            </div>
              <Products kits={v.kits} />
          </div>
        ))}
      </div>

      {/* New assets */}

      {/* UI Kits */}

      {/* icon packs */}

      {/* website templates */}

      {/* Components templates */}
    </main>
  );
}
