import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/utils/utils";

// HACK: 
function ProductCarousel({ images, className }: { images: string[]; className?: string }) {

  return (
    <Carousel className={cn("w-full", className)}>
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="">
                <CardContent className="group relative flex  items-center justify-center p-6 aspect-square">
                  <CarouselPrevious className="left-2 z-10 border-none bg-transparent text-transparent group-hover:bg-white group-hover:text-black" />
                  <Image
                    src={img}
                    alt={img}
                    fill
                    className="rounded-lg object-cover"
                  />
                  <CarouselNext className="right-2 z-10 border-none bg-transparent text-transparent group-hover:bg-white group-hover:text-black" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default ProductCarousel;
