"use client";

import { useCurrentUser } from "@/app/_hooks/auth.hooks";
import FileUploader from "@/components/custom ui/file-uploader-input";
import FormError from "@/components/custom ui/form-error";
import FormSuccess from "@/components/custom ui/form-success";
import { Button } from "@/components/ui/button";
import { AutosizeTextarea } from "@/components/ui/extende/autosize-textarea";
import MultipleSelector from "@/components/ui/extende/multiple-selector";
import { TagsInput } from "@/components/ui/extende/tag-input";
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
import { Toggle } from "@/components/ui/toggle";
import { addKitSchema } from "@/schemas";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function ProductForm({ mode }: { mode: "add" | "update" }) {
  const user = useCurrentUser();

  const [files, setFiles] = useState<File[] | null>(null);

  const {
    mutate: submitDetails,
    data,
    isPending,
  } = trpc.seller.addKit.useMutation({
    retryDelay: 80000,
  });

  const form = useForm<z.infer<typeof addKitSchema>>({
    resolver: zodResolver(addKitSchema),
    defaultValues: {
      sellerId: user?.sellerId || "",
      toPublish: true,
      categories: [],
      features: [],
    },
  });

  const onSubmit = (data: z.infer<typeof addKitSchema>) => {
    submitDetails(data);
    form.reset({
      productName: "",
      description: "",
      price: "",
      images: [],
      tags: [],
      categories: [],
      toPublish: true,
      features: [],
    });
    setFiles(null);
  };

  const { data: categories, isPending: categoriesLoading } =
    trpc.category.all.useQuery();

  const categoryOptions = categories?.data?.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4 space-y-4">
        <FormField
          control={form.control}
          name="sellerId"
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
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Kit Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name you product"
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name of the product.
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
              <FormLabel className="text-lg">Description</FormLabel>
              <FormControl>
                <AutosizeTextarea
                  {...field}
                  placeholder="write a description of your product."
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="h-10"
                  placeholder="enter the price of product"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display price.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Upload Images</FormLabel>
              <FormControl>
                <FileUploader
                  values={field.value}
                  onValueChange={field.onChange}
                  files={files}
                  setFiles={setFiles}
                />
              </FormControl>
              <FormDescription>
                This is your public display picture of product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Add Features</FormLabel>
              <FormControl></FormControl>
              <FormDescription>
                Will be displayed in numerical order.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Add Category</FormLabel>
              <FormControl>
                <MultipleSelector
                  badgeClassName="bg-black hover:bg-gray-800"
                  defaultOptions={categoryOptions}
                  options={categoryOptions}
                  creatable={true}
                  placeholder="Select category your kit belongs to."
                  emptyIndicator={
                    !categoriesLoading && (
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    )
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Select categories your product belongs to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Add Tags</FormLabel>
              <FormControl>
                <TagsInput
                  placeholder="Enter anything"
                  className="w-full"
                  value={field.value || []}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                tags your product it belongs to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="toPublish"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel className="text-lg">Publish to public</FormLabel>
                <FormControl>
                  <Toggle
                    className="bg-none"
                    pressed={field.value}
                    onPressedChange={field.onChange}
                  >
                    {field.value ? "On" : "Off"}
                  </Toggle>
                </FormControl>
              </div>
              <FormDescription>
                If option is selected, your product will be visible to all
                users.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSuccess message={data?.message} />
        <FormError message={data?.error} />

        <div className="flex justify-end">
          <Button type="submit" className="px-6 py-2" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ProductForm;
