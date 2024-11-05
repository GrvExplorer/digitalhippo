import CartItem from "@/components/product/cart-item";
import { type IOrder } from "@/db/models/index/order.model";
import { trpc } from "@/trpc/server";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

async function page({ params: { orderId } }: { params: { orderId: string } }) {
  const order = await trpc.order.byId({ orderId });

  const serializedOrder: IOrder = JSON.parse(JSON.stringify(order));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Payment successful</h1>
      <div className="flex items-center gap-4">
        <div className="">
          <Image
            src={"/checkout-thank-you.jpg"}
            alt="Thank you"
            width={800}
            height={800}
            className="object-fill"
          />
        </div>

        <div className="p-4">
          <div className="">
            <p className="text-sm text-gray-500">Order Successful</p>
            <h2 className="text-lg font-bold">Thanks for ordering</h2>
            <p className="text-sm text-muted-foreground">
              Your order was processed and your assets are available to download
              below. We&apos;ve sent your receipt and order details to your
              email.
            </p>
          </div>

          <div className="">
            <p className="py-1 text-sm text-muted-foreground">
              Order ID: {serializedOrder._id as string}
            </p>
          </div>

          <Separator className="h-[2px]" />

          <div className="my-8 max-h-[500px] overflow-y-scroll">
            {serializedOrder.kits.map((kit) => (
              <div key={kit._id as string}>
                <CartItem mode="show" kit={kit} />
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <p className="flex flex-col gap-1">
              <span className="font-bold">Shipping To</span>
              <span>demo@hippo.com</span>
            </p>

            <p className="flex flex-col gap-1">
              <span className="font-bold">Order Status</span>
              <span>Payment Successful</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
