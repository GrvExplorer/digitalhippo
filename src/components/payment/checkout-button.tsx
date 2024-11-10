"use client";

import { revalidatePathAction } from "@/app/_actions/action";
import { createOrderOptions } from "@/app/_actions/payment.action";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Orders } from "razorpay/dist/types/orders";

declare global {
  interface Window {
    Razorpay: any; // or the type of Razorpay if you have it
  }
}

function CheckoutButton({
  children,
  mode,
  orderOptions,
  checkoutOption,
}: {
  children: React.ReactNode;
  mode: "modal" | "redirect";
  orderOptions: Orders.RazorpayOrderCreateRequestBody;
  checkoutOption: object;
}) {
  
  const router = useRouter()
  const { mutateAsync: capturePayment } = trpc.webhook.captured.useMutation()

  const onClick = async () => {
    const orderIds = await createOrderOptions({
      order: orderOptions,
    });

    checkoutOption = {
      order_id: orderIds?.razorpay_order_id,
      key: process.env.RAZORPAY_KEY_ID,
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response
        try {
        const res = await capturePayment({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          databaseOrderId: orderIds?.order_id,
        })
        await revalidatePathAction(`/product/order/summary`, "layout");
          console.log("🚀 ~ file: payment.action.ts:73 ~ res:", res)
          if (res.success) {
            router.push(`/payment/success/${orderIds?.order_id}`);
          }
          if (!res.success) {
            router.push(`/payment/failed/${orderIds?.order_id}`);
          }
        } catch (error) {
          console.log(
            "🚀 ~ file: payment.action.ts:55 ~ createOrderOptions ~ error:",
            error,
          );
        }
      },
      ...checkoutOption
    }

    if (!checkoutOption) return;

    if (mode === "modal") {
      const rzp1 = new window.Razorpay(checkoutOption);
      rzp1.open();

      rzp1.on("payment.captured", async (response: any) => {
        console.log(
          "🚀 ~ file: checkout-button.tsx:22 ~ rzp1.on ~ response:",
          response,
        );
      });
    }
  };

  // FIXME: Redirect mode not working
  // if (mode === "redirect") {
  //   return (
  //     <form
  //       method="POST"
  //       action="https://api.razorpay.com/v1/checkout/embedded"
  //     >
  //       <input type="hidden" name="key_id" value={options.key} />
  //       <input type="hidden" name="amount" value={options.amount} />
  //       <input type="hidden" name="order_id" value={options.order_id} />
  //       <input type="hidden" name="name" value={options.name} />
  //       <input type="hidden" name="description" value={options.description} />
  //       <input type="hidden" name="image" value={options.image} />
  //       <input
  //         type="hidden"
  //         name="prefill[name]"
  //         value={options.prefill.name}
  //       />
  //       <input
  //         type="hidden"
  //         name="prefill[contact]"
  //         value={options.prefill.contact}
  //       />
  //       <input
  //         type="hidden"
  //         name="prefill[email]"
  //         value={options.prefill.email}
  //       />
  //       <input
  //         type="hidden"
  //         name="notes[shipping address]"
  //         value={options.notes.address}
  //       />
  //       <input
  //         type="hidden"
  //         name="callback_url"
  //         value="https://example.com/payment-callback"
  //       />
  //       <input
  //         type="hidden"
  //         name="cancel_url"
  //         value="https://example.com/payment-cancel"
  //       />
  //       <span>{children}</span>
  //     </form>
  //   );
  // }

  return <span onClick={onClick}>{children}</span>;
}

export default CheckoutButton;
