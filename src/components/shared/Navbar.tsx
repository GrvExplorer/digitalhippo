import { type IOrder } from "@/db/models/index/order.model";
import { trpc } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import SignedIn from "../auth/signed-in";
import SignedOut from "../auth/signed-out";
import SignInButton from "../auth/signin-button";
import CartSheet from "../custom ui/cart-sheet";
import OrderSheet from "../custom ui/order-sheet";
import UserButton from "../custom ui/user-button";
import { type IKit } from "@/db/models/index/kit.model";

async function Navbar() {
  const { data: cartItems } = await trpc.kit.getCartItems();
  const serializedCartItems: IKit[] = JSON.parse(JSON.stringify(cartItems));

  const orders = await trpc.order.user();
  const serializedOrderItems: IOrder[] = JSON.parse(
    JSON.stringify(orders.data),
  );

  return (
    <header className="mx-auto w-full max-w-6xl rounded-lg bg-base-100 shadow-md">
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href={"/"}>
            <Image src="/favicon.ico" width={40} height={40} alt="Logo" />
          </Link>
          {/* FIXME: ADD navigation menu */}
          <p className="flex items-center gap-1">
            UI Kits
            <FaAngleDown className="" />
          </p>

          <p className="flex items-center gap-1">
            Icons
            <FaAngleDown className="" />
          </p>
        </div>

        <ul className="flex items-center gap-6">
          <OrderSheet orderItems={serializedOrderItems}>
            <li className="flex flex-row-reverse items-center justify-center gap-1">
              <p className="">Orders: {serializedOrderItems?.length || 0} </p>
            </li>
          </OrderSheet>

          <li>
            <SignedOut>
              <SignInButton>Sign In</SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
          <CartSheet cartItems={serializedCartItems}>
            <li className="flex flex-row-reverse items-center justify-center gap-1">
              <p className="">{serializedCartItems?.length || 0} </p>
              <span className="">
                <CiShoppingCart className="h-6 w-6" />
              </span>
            </li>
          </CartSheet>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
