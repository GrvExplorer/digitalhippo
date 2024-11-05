"use client";
import { logout } from "@/app/_actions/auth.action";
import { useCurrentUser } from "@/app/_hooks/auth.hooks";
import { becomeSellerSchema } from "@/schemas";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "@/components/custom ui/form-error";
import FormSuccess from "@/components/custom ui/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

// FIXME: make this form useable for update of seller details also.
function SellerForm({ mode }: { mode: "become" | "update" }) {
  const user = useCurrentUser();
  const { toast } = useToast();
  const { mutateAsync: submitDetails, data } =
    trpc.user.becomeSeller.useMutation();

  const form = useForm<z.infer<typeof becomeSellerSchema>>({
    resolver: zodResolver(becomeSellerSchema),
    defaultValues: {
      userId: user?.id || "",
      logoUrl: "",
      bannerUrl: "",
    },
  });

  const onSubmit = (data: z.infer<typeof becomeSellerSchema>) => {
    submitDetails(data).then((res) => {
      if (res.success) {
        toast({
          title: "Success",
          description: "You need to login again to access seller dashboard",
        });
        logout();
      }
    });
    form.reset({
      name: "",
      address: "",
      phoneNo: "",
      email: "",
      description: "",
      logoUrl: "",
      bannerUrl: "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4 space-y-4">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Business Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="enter business name"
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Address</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="enter business address"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Phone Number</FormLabel>
              <FormControl>
                <Input
                  className="h-10"
                  placeholder="enter business phone number"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Business Email</FormLabel>
              <FormControl>
                <Input
                  className="h-10"
                  type="email"
                  placeholder="enter business email"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Business Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={2}
                  placeholder="enter business description"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Business Logo</FormLabel>
              <FormControl>{/* upload logoUrl here */}</FormControl>
              <FormDescription>
                This is your public display logo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bannerUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Business Banner</FormLabel>
              <FormControl>{/* upload banner here */}</FormControl>
              <FormDescription>
                This is your public display banner.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSuccess message={data?.message} />
        <FormError message={data?.error} />

        <div className="flex justify-end">
          <Button type="submit" className="px-6 py-2">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SellerForm;
