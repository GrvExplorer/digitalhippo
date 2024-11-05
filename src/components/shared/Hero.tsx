import { heroItems } from "@/constants";
import { Button } from "../ui/button";
import { GoArrowRight } from "react-icons/go";
import { createLandingH1 } from "@/utils/landing.util";

// HACK: 
function Hero() {
  return (
    <section className="my-28 mx-auto max-w-6xl space-y-8 text-center">
      <div className="px-2">
        <div className="flex items-center justify-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:max-w-3xl md:text-6xl lg:max-w-4xl">
            {createLandingH1(heroItems.h1)}
          </h1>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <p className="max-w-md text-sm text-base-300 md:max-w-2xl md:text-lg">
            {heroItems.h2}
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button className="bg-primary hover:bg-blue-700">{heroItems.cta_1}</Button>
        <Button variant={"ghost"}>
          {heroItems.cta_2}
          <span className="pl-1">
            <GoArrowRight />
          </span>
        </Button>
      </div>
    </section>
  );
}

export default Hero;
