import ProductCard from "@/components/product/product-card";
import { type IKit } from "@/db/models/index/kit.model";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

function Products({ kits }: { kits: IKit[] }) {
  // const slice = kits.some;
  const chunkSize = 4;
  const strucher = Array.from(
    { length: Math.ceil(kits.length / chunkSize) },
    (_, i) => ({
      [i]: kits.slice(i * chunkSize, (i + 1) * chunkSize),
    }),
  );

  return (
    <div className="flex justify-center">
      <Carousel className="w-full max-w-6xl">
        <CarouselContent className="flex gap-1">
          {strucher.map((strucherKits, i: number) => (
            <CarouselItem className="flex gap-12 overflow-hidden" key={i}>
              {strucherKits[i].map((v, i) => {
                return (
                  <div key={i}>
                    <ProductCard mode="simple" kit={v} />
                  </div>
                );
              })}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Products;
