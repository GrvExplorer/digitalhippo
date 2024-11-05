import { Category } from "@/db/models/index/category.model";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";

export const categoryRouter = createTRPCRouter({
  all: publicProcedure.query(async () => {
    const categories = await Category.find({});

    if (!categories)
      return {
        success: false,
        status: 404,
        error: "Not found",
      };

      return {
        success: true,
        status: 200,
        data: categories,
      }
  }),
});
