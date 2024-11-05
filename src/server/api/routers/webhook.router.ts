import { Kit } from "@/db/models/index/kit.model";
import { Order } from "@/db/models/index/order.model";
import { Seller } from "@/db/models/index/seller.model";
import User from "@/db/models/user.model";
import { authedProcedure, createTRPCRouter } from "@/server/trpc";
import { z } from "zod";

export const webhookRouter = createTRPCRouter({
  captured: authedProcedure
    .input(
      z.object({
        razorpay_payment_id: z.string(),
        razorpay_order_id: z.string(),
        razorpay_signature: z.string(),
        databaseOrderId: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      console.log(
        "🚀 ~ file: webhook.router.ts:20 ~ .mutation ~ input:",
        input,
      );

      // FIXME: VERIFY SIGNATURE
      // const generate_signature = crypto
      //   .createHash("sha256", process.env.RAZORPAY_KEY_SECRET!)
      //   .update(
      //     `${input.razorpay_order_id}|${input.razorpay_payment_id}`,
      //     "utf-8",
      //   )
      //   .digest("hex");

      // if (generate_signature !== input.razorpay_signature) {
      //   await dbConnection;
      //   console.log(
      //     "🚀 ~ file: webhooks.router.ts:6 ~ activated:publicProcedure.mutation ~ opts:",
      //     opts,
      //   );
      //   return {success: false}
      // }

      const order = await Order.findByIdAndUpdate(input.databaseOrderId, {
        paymentDetails: {
          razorpay_order_id: input.razorpay_order_id,
          razorpay_payment_id: input.razorpay_payment_id,
        },
        isPaid: true,
      });
      const serializedOrder = JSON.parse(JSON.stringify(order));

      await User.findByIdAndUpdate(order?.user, {
        $set: { cartItems: [] },
      });

      if (!order)
        return {
          success: false,
          error:
            "Not able to update order in database contact us at support@digitalhippo.com",
        };

      await User.findByIdAndUpdate(order?.user, {
        $push: {
          orders: serializedOrder._id,
        },
      });

      await Kit.updateMany(
        {
          _id: { $in: serializedOrder.kits },
        },
        { $push: { orders: serializedOrder._id } },
      );

      await Seller.updateMany(
        {
          _id: { $in: serializedOrder.kits.map((kit: any) => kit.seller) },
        },
        { $push: { orders: serializedOrder._id } },
      );

      return { success: true, message: "Payment successful" };
    }),
});
