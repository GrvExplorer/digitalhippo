import { IKit } from "@/db/models/index/kit.model";
import { Order } from "@/db/models/index/order.model";
import { authedProcedure, createTRPCRouter } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Kit } from "@/db/models/index/kit.model";

export const orderRouter = createTRPCRouter({
  create: authedProcedure
    .input(
      z.object({
        kits: z.array(z.string()),
        amount: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { kits, amount } = input;
      const { user } = ctx;

      const order = await Order.create({
        user: user.user.id,
        kits,
        amount,
      });

      return order;
    }),
  byId: authedProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { orderId } = input;
      const { user } = ctx;

      const order = await Order.findById(orderId)
        .populate<{ kits: IKit[] }>({
          path: "kits",
          model: Kit,
          populate: {
            path: "categories",
          },
        });

      const serializedOrder = JSON.parse(JSON.stringify(order));

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found",
        });
      }

      console.log("userId:", user.user.id);
      console.log("order.user:", serializedOrder.user);

      if (user.user.id !== serializedOrder.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this order",
        });
      }

      return serializedOrder;
    }),

  user: authedProcedure.query(async ({ ctx }) => {
    const { user } = ctx;

    const orders = await Order.find({ user: user.user.id });

    if (!orders) return {
      success: false,
      status: 404,
      error: "No orders found",
    }

    return {
      success: true,
      status: 200,
      data: orders,
    };
  }),
});
