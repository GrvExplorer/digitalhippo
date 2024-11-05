"use client";
import { loginWithResend } from "@/app/_actions/auth.action";
import { CardWrapper } from "@/components/custom ui/card-wrapper";
import FormError from "@/components/custom ui/form-error";
import FormSuccess from "@/components/custom ui/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useErrorMessage, useSuccessMessage } from "@/lib/zustand";
import { loginWithResendSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SignInForm = () => {
  const search = useSearchParams();
  const error = search.get("error");

  const { errorMessage, setErrorMessage } = useErrorMessage((state: any) => state);
  const { successMessage, setSuccessMessage } = useSuccessMessage(
    (state: any) => state,
  );

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginWithResendSchema>>({
    resolver: zodResolver(loginWithResendSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (error && error === "OAuthAccountNotLinked") {
      setErrorMessage("You have used a different provider");
    }
    if (error && error === "OAuthCallbackError") {
      setErrorMessage("Cancelled by oAuth provider");
    }
    if (error && error === "EmailSignInError") {
      setErrorMessage("Invalid email");
    }
  }, [error, setErrorMessage]);

  const onSubmit = (data: z.infer<typeof loginWithResendSchema>) => {
    setSuccessMessage("");
    setErrorMessage("");

    startTransition(() => {
      loginWithResend(data).then((data) => {
        if (data?.success) {
          setSuccessMessage(data?.message);
        } else {
          setErrorMessage(data?.message);
        }
      });
    });
  };

  return (
    <CardWrapper
      title="🔐Auth JS"
      subTitle="Login to your account"
      backButtonLabel={{
        label: "don't have an account?",
        hrefText: "Sign up",
      }}
      backButtonHref={process.env.NEXT_PUBLIC_SIGN_UP_URL || "/sign-up"}
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    tabIndex={-1}
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TODO: coming in animation / good transitions */}
          <FormSuccess message={successMessage} />
          <FormError message={errorMessage} />

          <Button type="submit"  disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
