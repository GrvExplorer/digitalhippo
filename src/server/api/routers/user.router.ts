import dbConnection from "@/db";
import { Seller } from "@/db/models/index/seller.model";
import User from "@/models/user.model";
import { becomeSellerSchema } from "@/schemas";
import {
  authedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/trpc";
import mongoose, { Model } from "mongoose";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  userList: publicProcedure.query(async () => {
    await dbConnection;
    const users = await User.find({});
    return users;
  }),
  byEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async (req) => {
      const { email } = req.input;
      await dbConnection;
      const user = await User.findOne({ email });
      return user;
    }),
  byId: publicProcedure.input(z.object({ id: z.string() })).query(async (req) => {
    const {id}  = req.input;

    const user = await User.findById(id);
    console.log("🚀 ~ file: user.router.ts:31 ~ byId:publicProcedure.input ~ user:", user)


    if (!user) return {
      success: false,
      status: 404,
      error: "User not found",
    }

    return {
      success: true,
      status: 200,
      data: user,
    };

  }),
  becomeSeller: authedProcedure
    .input(becomeSellerSchema)
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

      if (userId !== req.ctx.user.user.id) {
        return {
          success: false,
          status: 401,
          error: "Unauthorized",
        };
      }

      const sellerExists = await Seller.findOne({
        userId,
      });

      if (sellerExists) {
        if (sellerExists.status === "archived") {
          return {
            success: false,
            status: 400,
            error:
              "User already registered as a seller && will be verified soon",
          };
        }
        if (sellerExists.status === "canceled") {
          return {
            success: false,
            status: 400,
            error: "You have been prohibited from selling on our platform",
          };
        }
        return {
          success: false,
          status: 400,
          error: "User already registered as a seller",
        };
      }

      const seller = await Seller.create({
        userId: userId,
        name,
        address,
        phoneNo,
        email,
        description,
        logoUrl,
        bannerUrl,
      });

      await User.findByIdAndUpdate(userId, { isSeller: true, sellerId: seller._id });

      if (!seller) {
        return {
          success: false,
          status: 500,
          error: "Failed to create seller",
        };
      }

      return {
        success: true,
        status: 201,
        message: "Seller created successfully && will be verified soon",
      };
    }),
});
