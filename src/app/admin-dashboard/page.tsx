"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/trpc/client";
import { File, PlusCircle } from "lucide-react";
import { ProductsTable } from "./_components/products-table";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? "";
  const offset = searchParams.offset ?? 0;
  const { data:sellers, isLoading } = trpc.seller.all.useQuery();

  const { data, count, offset: newOffset, limit } = sellers ?? {
    data: [],
    count: 0,
    offset: 0,
    limit: 5,
  };

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Canceled</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            {" "}
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-gray-900"></div>{" "}
          </div>
        ) : (
          <ProductsTable
            products={data}
            offset={newOffset ?? 0}
            totalProducts={count}
            productsPerPage={limit}
          />
        )}
      </TabsContent>
    </Tabs>
  );
}
