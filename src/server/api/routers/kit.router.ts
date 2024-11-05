import { Category, type ICategory } from "@/db/models/index/category.model";
import { type IKit, Kit } from "@/db/models/index/kit.model";
import { Order, type IOrder } from "@/db/models/index/order.model";
import { Review, type IReview } from "@/db/models/index/review.model";
import { Seller, type ISeller } from "@/db/models/index/seller.model";
import User from "@/db/models/user.model";
import {
  authedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/trpc";
import { z } from "zod";

export const kitRouter = createTRPCRouter({
  all: publicProcedure.query(async (req) => {
    const kits = await Kit.find({ isPublished: { $eq: true } });

    if (!kits)
      return {
        success: false,
        status: 404,
        error: "No kits found",
      };

    return {
      success: true,
      status: 200,
      data: kits,
    };
  }),

  byCategory: publicProcedure
    .input(z.object({ categories: z.array(z.string()) }))
    .query(async (req) => {
      const { categories } = req.input;

      let kits = await Kit.find({
        categories: { $in: categories },
        isPublished: { $eq: true },
      }).populate("categories");

      if (!kits)
        return {
          success: false,
          status: 404,
          error: "No kits found with this category",
        };

      return {
        success: true,
        status: 200,
        data: kits,
      };
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (req) => {
      const { id } = req.input;

      const kit = await Kit.findById(id)
        .populate<{ categories: ICategory[] & string[] }>({
          path: "categories",
          model: Category,
        })
        .populate<{ seller: ISeller & string }>({
          path: "seller",
          model: Seller,
        })
        .populate<{ orders: IOrder[] & string[] }>({
          path: "orders",
          model: Order,
        })
        .populate<{ reviews: IReview[] & string[] }>({
          path: "reviews",
          model: Review,
        })
        .lean();

      if (!kit)
        return {
          success: false,
          status: 404,
          error: "Kit not found",
        };

      return {
        success: true,
        status: 200,
        data: kit,
      };
    }),

  allCategoryWise: publicProcedure.query(async (req) => {
    const categories: {
      _id: string;
      name: string;
      kits: IKit[];
    }[] = await Category.aggregate([
      {
        $lookup: {
          from: "kits", // MongoDB collection name is lowercase
          localField: "_id",
          foreignField: "categories",
          as: "kits",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          kits: {
            $slice: [
              {
                $filter: {
                  input: "$kits",
                  as: "kit",
                  cond: {
                    $and: [
                      { $ne: ["$$kit", null] },
                      { $ne: ["$$kit.isPublished", false] },
                    ],
                  },
                },
              },
              10, // Limit the number of kits to 10
            ],
          },
        },
      },
      {
        $match: {
          "kits.0": { $exists: true }, // Only include categories that have kits
        },
      },
    ]);

    if (!categories)
      return {
        success: false,
        status: 404,
        error: "No kits found",
      };

    return {
      success: true,
      status: 200,
      data: categories,
    };
  }),

  addToCart: authedProcedure
    .input(z.object({ kitId: z.string() }))
    .mutation(async (req) => {
      const { kitId } = req.input;

      const user = await User.findById(req.ctx.user.user.id);

      if (!user)
        return {
          success: false,
          status: 404,
          error: "User not found",
        };

      user.cartItems.push(kitId);
      await user.save();

      return {
        success: true,
        status: 200,
        message: "Kit added to cart",
      };
    }),

  getCartItems: authedProcedure.query(async (req) => {
    const user = await User.findById(req.ctx.user.user.id).populate<{
      cartItems: IKit[] & string[];
    }>({
      path: "cartItems",
      populate: {
        path: "categories",
      },
    });

    if (!user)
      return {
        success: false,
        status: 404,
        error: "User not found",
      };

    return {
      success: true,
      status: 200,
      data: user?.cartItems,
    };
  }),

  removeFromCart: authedProcedure
    .input(z.object({ kitId: z.string() }))
    .mutation(async (req) => {
      const { kitId } = req.input;

      // FIXME: $pull removes the first occurrence of the kitId from the cartItems array
      const user = await User.findByIdAndUpdate(
        req.ctx.user.user.id,
        {
          $pull: { cartItems: kitId },
        },
        { new: true },
      );

      if (!user)
        return {
          success: false,
          status: 404,
          error: "User not found",
        };

      return {
        success: true,
        status: 200,
        message: "Kit removed from cart",
      };
    }),
});
