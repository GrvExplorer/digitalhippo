"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";

// HACK: use this in reuseable component
export function StatusDropdown({
  id,
  status,
  statusArray,
  mutationFn,
  queryKeys,
}: {
  id: string;
  status: string;
  statusArray: any[];
  mutationFn: any;
  queryKeys: string[];
}) {
  const cache = useQueryClient();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex w-32 items-center justify-between"
        >
          <p className="truncate capitalize">{status}</p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50">
        <DropdownMenuRadioGroup
          defaultValue={status}
          value={status}
          onValueChange={(newValue) => {
            mutationFn({
              _id: id,
              status: newValue,
            });
            // FIXME: revalidate the query
            cache.invalidateQueries({ queryKey: queryKeys });
          }}
        >
          {statusArray.map((status, i) => (
            <DropdownMenuRadioItem
              key={i}
              value={status}
              className="capitalize"
            >
              {status}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
