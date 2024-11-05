"use client";

import { StatusDropdown } from "@/components/custom ui/status-dropdown";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { trpc } from "@/trpc/client";
import { MoreHorizontal } from "lucide-react";

export function Product({ product }: { product: any }) {

  const { mutate } = trpc.seller.changeStatus.useMutation()

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        {/* <Image
          alt="Business logo"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.logoUrl}
          width="64"
        /> */}
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <StatusDropdown
          id={product._id}
          status={product.status}
          statusArray={["active", "archived", "canceled"]}
          mutationFn={mutate}
          queryKeys={["seller", "all"]}
        />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {new Date(product.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
