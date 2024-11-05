"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCurrentUser } from "@/hooks/auth.hooks";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { FcSettings } from "react-icons/fc";
import { MdLogout } from "react-icons/md";
import LogoutButton from "../auth/logout-button";
import ManageAccountButton from "../auth/manage-account-button";
import UserAvatar from "./user-avatar";

interface UserButtonProps {
  mode?: "redirect" | "modal";
}

function UserButton({ mode = "modal" }: UserButtonProps) {
  const user = useCurrentUser();
  const [openDropdown, setOpenDropdown] = useState(false);
  if (user === undefined || user?.id === undefined) return notFound();

  // utils functions
  // console.log(generateBackground(user?.name!));

  return (
    <DropdownMenu
      open={openDropdown}
      onOpenChange={() => {
        setOpenDropdown(!openDropdown);
      }}
    >
      <DropdownMenuTrigger asChild>
        {/* FIXME: Shimmer avatar here */}
        <div className="">
          {user.name && user.image && user.email && (
            <UserAvatar
              userImage={user.image}
              userName={user.name}
              userEmail={user.email}
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2 w-80 rounded-xl">
        <DropdownMenuLabel>
          <div className="flex gap-4">
            {user.name && user.image && user.email && (
              <UserAvatar
                userImage={user.image}
                userName={user.name}
                userEmail={user.email}
              />
            )}

            <div className="flex flex-col">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm font-normal text-gray-800">{user?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* FIXME: open of Manage account should close dropdown */}

        <ManageAccountButton mode={mode} className="w-full">
          <div
            // onClick={() => {
            //   setOpenDropdown(!openDropdown);
            // }}
            className="flex cursor-pointer items-center gap-8 rounded-md px-4 py-2 outline-none transition-colors hover:bg-accent"
          >
            <p className="">
              <FcSettings />
            </p>
            <p className="">Manage Account</p>
          </div>
        </ManageAccountButton>

        <DropdownMenuSeparator />

        {user.isSeller && (
          <Link href={"/seller-dashboard"}>
            <DropdownMenuItem className="flex cursor-pointer gap-8 px-4 py-2">
              <p className="">
                <ShieldAlert />
              </p>
              <p className="text-lg">Seller</p>
            </DropdownMenuItem>
          </Link>
        )}

        <DropdownMenuSeparator />

        <LogoutButton>
          <DropdownMenuItem className="flex cursor-pointer gap-8 px-4 py-2">
            <p className="">
              <MdLogout />
            </p>
            <p className="">Logout</p>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
