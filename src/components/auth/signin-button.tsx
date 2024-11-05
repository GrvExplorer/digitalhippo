"use client";

import { cn } from "@/utils/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { DialogOverlay } from "../ui/dialog";
import { SignInForm } from "./signin-form";

interface SignInButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function SignInButton({
  children,
  mode = "redirect",
  asChild,
}: SignInButtonProps) {
  const router = useRouter();

  const onClick = async () => {
    if (mode !== "modal") {
      if (process.env.NEXT_PUBLIC_SIGN_IN_URL) {
        router.push(process.env.NEXT_PUBLIC_SIGN_IN_URL);
      }
      router.push("/sign-in");
    }
  };

  if (mode === "modal") {
    return (
      <span onClick={onClick} className="cursor-pointer">
        <DialogPrimitive.Dialog>
          <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
          <DialogPrimitive.Content
            className={cn(
              "fixed left-[50%] top-[50%] z-50 grid max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            )}
          >
            <SignInForm />
          </DialogPrimitive.Content>
          <DialogOverlay className="" />
        </DialogPrimitive.Dialog>
      </span>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
