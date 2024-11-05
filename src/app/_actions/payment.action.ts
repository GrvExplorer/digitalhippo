"use server";

import { trpc } from "@/trpc/server";
import { currentUser } from "@/utils/auth.util";
import { redirect } from "next/navigation";
import Razorpay from "razorpay";
import { Orders } from "razorpay/dist/types/orders";

export async function createOrderOptions({
  order,
}: {
  order: Orders.RazorpayOrderCreateRequestBody;
}) {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You need to be logged in");
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay key not found");
    }

    const inst = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const getCartItems = await trpc.kit.getCartItems();

    if (!getCartItems.data) {
      throw new Error("Something went wrong while fetching the cart items");
    }

    const serializedCartItems = getCartItems?.data.map((kit) =>
      JSON.parse(JSON.stringify(kit._id)),
    );

    const [createdOrder, createdOrderOnDB] = await Promise.all([
      inst.orders.create(order),
      trpc.order.create({
        kits: serializedCartItems,
        amount: Number(order.amount),
      }),
    ]);

    if (!createdOrder) {
      throw new Error("Something went wrong while creating the order");
    }

    const serializedCreatedOrderOnDB = JSON.parse(
      JSON.stringify(createdOrderOnDB),
    );


    return {
      razorpay_order_id: createdOrder.id,
      order_id: serializedCreatedOrderOnDB._id,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: payment.action.ts:38 ~ paymentSession ~ error:",
      error,
    );
  }
}

// ** For order existing on Razorpay
// if (process.env.NODE_ENV !== "production") {
//   if (existsOrder) {
//     const orderOnRazorpay = await inst.orders.fetch(order.id);
//     if (!orderOnRazorpay) {
//       throw new Error("Something went wrong while fetching the order");
//     }
//     return { createdOrder: orderOnRazorpay };
//   }
// }

export async function getAllPlans() {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay key and secret not found");
    }

    const inst = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const plans = inst.plans.all();

    if (!plans) {
      throw new Error("Something went wrong while fetching the plans");
    }

    return { plans };
  } catch (error) {
    console.log(
      "🚀 ~ file: payment.action.ts:55 ~ getAllPlans ~ error:",
      error,
    );
  }
}

export async function createSubscriptionOptions(planId: string) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay key and secret not found");
    }

    const inst = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const createdSubscription = await inst.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      quantity: 1,
      total_count: 12,
      addons: [
        {
          item: {
            name: "Delivery charges",
            amount: 30000,
            currency: "INR",
          },
        },
      ],
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });

    if (!createdSubscription) {
      throw new Error("Something went wrong while creating the subscription");
    }

    const subscriptionOptions = {
      key: process.env.RAZORPAY_KEY_ID,
      name: "Acme Corp.",
      subscription_id: createdSubscription.id,
      description: "Monthly Test Plan",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "8818818806",
      },
      notes: {
        note_key_1: "Tea. Earl Grey. Hot",
        note_key_2: "Make it so.",
      },
    };

    return subscriptionOptions;
  } catch (error) {
    console.log(
      "🚀 ~ file: payment.action.ts:114 ~ createSubscription ~ error:",
      error,
    );
  }
}
