import { type IOrder } from "@/db/models/index/order.model";
import { trpc } from "@/trpc/server";

async function page({ params: { orderId } }: { params: { orderId: string } }) {
  const order = await trpc.order.byId({ orderId });
  const serializedOrder: IOrder = JSON.parse(JSON.stringify(order));

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Payment failed</h1>
      <p className="text-lg">Order ID: {serializedOrder._id as string}</p>

      <p className="text-red-500">
        Please try again or contact us at support@digitalhippo.com
      </p>
    </div>
  );
}

export default page;
