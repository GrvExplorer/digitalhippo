import CheckoutButton from "@/components/payment/checkout-button";
import CartItem from "@/components/product/cart-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type IKit } from "@/db/models/index/kit.model";
import { trpc } from "@/trpc/server";
import Image from "next/image";
import { Orders } from "razorpay/dist/types/orders";

async function SummaryPage() {
  const { data: cartItems } = await trpc.kit.getCartItems();
  const serializedCartItems: IKit[] = JSON.parse(JSON.stringify(cartItems));

  const subtotal = serializedCartItems.reduce((acc, kit) => acc + kit.price, 0);
  const transactionFee = 1;

  const orderOptions: Orders.RazorpayOrderCreateRequestBody = {
    amount: (subtotal + transactionFee) * 100,
    currency: "INR",
  };

  const checkoutOption = {
    amount: (subtotal + transactionFee) * 100,
    currency: "INR",
    image: "https://example.com/your_logo",
    theme: {
      color: "#7080ec",
    },
  };

  return (
    <div className="my-4 px-6">
      <h1 className="py-2 text-2xl font-bold">Shopping Cart</h1>
      <div className="mt-6 flex justify-between gap-20">
        <div className="w-3/4">
          {serializedCartItems.length > 0 && (
            <Separator className="mb-4 h-[2px] bg-gray-200" />
          )}

          <div className="flex flex-col gap-4">
            {serializedCartItems?.length > 0 && serializedCartItems ? (
              <div className="max-h-[500px] overflow-y-scroll">
                {serializedCartItems.map((kit) => (
                  <div key={kit._id as string}>
                    <CartItem mode="spread" kit={kit} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 py-4">
                <Image
                  src={"/hippo-empty-cart.png"}
                  width={200}
                  height={200}
                  alt="empty cart"
                />
                <div className="flex flex-col space-y-1">
                  <p className="text-center text-lg font-semibold text-foreground">
                    Your cart is empty
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Add items to your cart to checkout.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* <Separator className="h-[2px]" /> */}
        </div>

        <div className="flex h-fit w-2/4 flex-col justify-center gap-3 rounded-lg bg-slate-100 px-6 py-4">
          <p className="text-lg font-bold">Order Summary</p>
          <p className="flex justify-between text-muted-foreground">
            <span className="font-bold">Subtotal:</span>{" "}
            <span>${subtotal}</span>
          </p>
          <Separator className="h-[2px]" />
          <p className="flex justify-between text-muted-foreground">
            <span className="font-bold">Flat Transaction Fee:</span>{" "}
            <span>${transactionFee}</span>
          </p>
          <Separator className="h-[2px]" />
          <p className="flex justify-between font-bold">
            <span className="font-bold">Order Total:</span>{" "}
            <span>${subtotal + transactionFee}</span>
          </p>
          <CheckoutButton
            mode="modal"
            orderOptions={orderOptions}
            checkoutOption={checkoutOption}
          >
            <Button
              disabled={serializedCartItems.length === 0}
              className="mt-4 w-full bg-primary"
            >
              Checkout
            </Button>
          </CheckoutButton>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
