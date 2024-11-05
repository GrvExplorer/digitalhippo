import { Category } from "@/db/models/index/category.model";
import { type IKit, Kit } from "@/db/models/index/kit.model";
import { Order } from "@/db/models/index/order.model";
import { Seller } from "@/db/models/index/seller.model";
import { addKitSchema, updateKitSchema, updateSellerSchema } from "@/schemas";
import {
  authedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const sellerRouter = createTRPCRouter({
  all: publicProcedure.query(async (req) => {
    const sellers = await Seller.find({});

    if (
      sellers === undefined ||
      sellers.length === 0 ||
      sellers.length === undefined
    )
      return {
        success: false,
        status: 404,
        data: [],
        count: 0,
        offset: 0,
        limit: 5,
      };

    return {
      success: true,
      status: 200,
      data: sellers,
      count: sellers.length,
      offset: 0,
      limit: 5,
    };
  }),

  changeStatus: authedProcedure
    .input(z.object({ _id: z.string(), status: z.string() }))
    .mutation(async (req) => {
      const { _id, status } = req.input;

      const { ctx } = req;

      if (ctx.user.user.email !== process.env.ADMIN_EMAIL)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      const seller = await Seller.findByIdAndUpdate(
        _id,
        { status },
        { new: true },
      );

      if (!seller) throw new TRPCError({ code: "NOT_FOUND" });

      return { success: true, status: 200, message: "Status updated" };
    }),

  updateDetails: authedProcedure
    .input(updateSellerSchema)
    .mutation(async (req) => {
      const {
        userId,
        name,
        address,
        phoneNo,
        email,
        description,
        logoUrl,
        bannerUrl,
      } = req.input;

      const { ctx } = req;

      if (ctx.user.user.id !== userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const seller = await Seller.findOneAndUpdate(
        { user: userId },
        {
          name,
          address,
          phoneNo,
          email,
          description,
          logoUrl,
          bannerUrl,
        },
        { new: true },
      );

      if (!seller) throw new TRPCError({ code: "NOT_FOUND" });

      return { success: true, status: 202, message: "update successful" };
    }),

  addKit: authedProcedure.input(addKitSchema).mutation(async (req) => {
    const {
      productName,
      description,
      price,
      images,
      features,
      tags,
      categories,
      sellerId,
      toPublish,
    } = req.input;

    const { ctx } = req;

    if (ctx.user.user.sellerId !== sellerId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const sellerExists = await Seller.findOne({ _id: sellerId });

    if (!sellerExists) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    if (sellerExists.status === "canceled") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    if (sellerExists.status === "archived") {
      return {
        success: false,
        status: 400,
        error: "Seller is archived",
      };
    }

    // FIXME: add category, tags, features

    const createKit = await Kit.create({
      productName,
      description,
      price,
      images,
      features,
      tags,
      seller: sellerId,
      isPublished: toPublish,
    });

    if (categories) {
      const getCategory = await Category.find({
        name: { $in: categories.map((v) => v.value) },
      });

      const categoryExists = getCategory.length === categories.length;

      if (!categoryExists) {
        console.log("creating categories......");
        console.log();
        categories.map(async (v, i) => {
          const res = await Category.findOne({ name: v.value });
          if (!res) {
            console.log();
            console.log("creating category:", v.value);
            const createdCategory = await Category.create({
              name: v.value,
            });
            await Kit.findByIdAndUpdate(
              createKit._id,
              {
                $push: { categories: createdCategory._id },
              },
              { new: true },
            );
            console.log();
            return;
          }

          console.log();
          console.log("category already exists:", v.value);
          console.log();

          await Kit.findByIdAndUpdate(
            createKit._id,
            {
              $push: { categories: res._id },
            },
            { new: true },
          );
        });

        // FIXME: finding all category of kit and adding it to the kit at ONE Single query.
        // const searchFor = category.map((v) => v.value);
        // console.log(
        //   "🚀 ~ file: seller.router.ts:171 ~ addKit:authedProcedure.input ~ searchFor:",
        //   searchFor,
        // );

        // FIXME: not able to get the category which is create in this function and getting the category which is already exists in the database.
        // const allCategoryOfKit = await Category.find(
        //   {
        //     name: { $in: searchFor },
        //   },
        //   { new: true },
        // );

        // console.log(
        //   "🚀 ~ file: seller.router.ts:212 ~ addKit:authedProcedure.input ~ allCategoryOfKit:",
        //   allCategoryOfKit,
        // );

        // const addCategoryToKit = await Kit.findByIdAndUpdate(
        //   createKit._id,
        //   {
        //     $push: {$each: allCategoryOfKit.map((v) => v._id)},
        //   },
        //   { new: true },
        // );
        // console.log(
        //   "🚀 ~ file: seller.router.ts:212 ~ addKit:authedProcedure.input ~ allCategoryOfKit:",
        //   addCategoryToKit,
        // );
      } else {
        console.log("All category already exists");
        const addCategoryToKit = await Kit.findByIdAndUpdate(
          createKit._id,
          {
            $push: { categories: { $each: getCategory.map((v) => v._id) } },
          },
          { new: true },
        );
      }
    }

    if (!createKit)
      return {
        success: false,
        status: 500,
        error: "Failed to create kit. try again ?",
      };

    await Seller.findOneAndUpdate(
      { _id: sellerId },
      {
        $push: {
          kits: createKit._id,
        },
      },
      { new: true },
    );

    return {
      success: true,
      status: 201,
      message: "Kit created successfully",
    };
  }),

  updateKit: authedProcedure.input(updateKitSchema).mutation(async (req) => {
    const {
      productName,
      features,
      description,
      price,
      images,
      category,
      tags,
      sellerId,
      toPublish,
      id,
    } = req.input;

    const { ctx } = req;

    if (ctx.user.user.sellerId !== sellerId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const sellerExists = await Seller.findOne({ _id: sellerId });

    if (!sellerExists) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    if (sellerExists.status === "canceled") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    if (sellerExists.status === "archived") {
      return {
        success: false,
        status: 400,
        error: "Seller is archived",
      };
    }
    if (!sellerExists.kits.includes(id)) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    // FIXME: add category
    const updateKit = await Kit.findByIdAndUpdate(
      id,
      {
        productName,
        features,
        description,
        price,
        images,
        tags,
        isPublished: toPublish,
      },
    );

    if (category) {
      const getCategory = await Category.find({ name: { $in: category } });

      const categoryExists = getCategory.length === category.length;

      if (!categoryExists) {
        category.map(async (v, i) => {
          if (getCategory[i].name === v) {
            return v;
          } else {
            await Category.create({
              name: v,
            });
          }
        });

        const allCategoryOfKit = await Category.find({
          name: { $in: category },
        });

        await Kit.findByIdAndUpdate(updateKit?.id, {
          $push: allCategoryOfKit.map((v) => v._id),
        });
      }

      await Kit.findByIdAndUpdate(updateKit?._id, {
        $push: getCategory.map((v) => v._id),
      });
    }

    if (!updateKit)
      return {
        success: false,
        status: 500,
        error: "Not able to update Kit details try again",
      };

    if (toPublish) {
      // TODO: implement publish
    }

    revalidatePath("/seller-dashboard", "page");

    return {
      success: true,
      status: 202,
      message: "Updated the kit details Successfully",
    };
  }),

  getKits: authedProcedure
    .input(
      z.object({ sellerId: z.string(), limit: z.number(), offset: z.number() }),
    )
    .query(async (req) => {
      const { sellerId, limit, offset } = req.input;
      const { ctx } = req;

      if (ctx.user.user.sellerId !== sellerId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const sellerExists = await Seller.findOne({ _id: sellerId }).populate<{
        kits: IKit[];
      }>({
        path: "kits",
        model: Kit,
        options: {
          limit: limit,
        },
        populate: [
          {
            path: "categories",
            model: Category,
          },
          {
            path: "orders",
            model: Order,
          },
        ],
      });

      if (!sellerExists)
        return {
          success: false,
          status: 404,
          error: "Seller id provided does not exists",
        };

      return {
        success: true,
        status: 200,
        data: sellerExists,
      };
    }),
});
