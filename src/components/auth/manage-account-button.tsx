"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ManageAccountKeys,
  ManageAccountValues,
} from "@/constants/manage-account.const";
import { useCurrentUser } from "@/hooks/auth.hooks";
import { cn } from "@/utils/utils";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import LabelledIcon from "../custom ui/labelled-icon";
import UserAvatar from "../custom ui/user-avatar";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";

interface ManageAccountProps {
  children?: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  className?: string;
}

function ManageAccountButton({
  children,
  mode = "modal",
  className,
  asChild,
}: ManageAccountProps) {
  const user = useCurrentUser();
  
  const [labelIconActive, setLabelIconActive] = useState("profile");

  if (!user) return <></>

  if (mode === "redirect") {
    return <span>TODO: Implement Model</span>;
  }

  return (
    <Dialog>
      <DialogTrigger className={cn(className)}>{children}</DialogTrigger>
      <DialogContent  className={cn("flex p-0 md:max-w-[800px] min-h-[600px]")}>
        <DialogHeader className="space-y-6 w-96 px-4 py-6 lg:h-[600px] bg-[#f7f7f7]">
          <div className="px-4">
            <DialogTitle>Account</DialogTitle>
            <DialogDescription>Manage your account details.</DialogDescription>
          </div>

          <div className="flex flex-col gap-2">
            {ManageAccountKeys.map((labelledIcon) => (
              <LabelledIcon
                key={labelledIcon.label}
                icon={labelledIcon.icon}
                label={labelledIcon.label}
                className={labelledIcon.className}
                labelIconActive={labelIconActive}
                setLabelIconActive={setLabelIconActive}
              />
            ))}
          </div>
        </DialogHeader>

        <div className="w-full mr-4">
          {ManageAccountValues.map((manageValue, i) => {
            if ("profile" === labelIconActive) {
              return (
                <div key={i} className="space-y-6 py-6 px-2 w-full rounded-lg ">
                  <DialogTitle>Profile Details</DialogTitle>
                  <DropdownMenuSeparator />

                  <div className=" flex justify-between items-center">
                    <p className="font-medium">Profile</p>
                    <p className="text-muted-foreground truncate w-20 md:w-40 lg:w-fit flex items-center gap-4">
                      {/* FIXME: Add user image can be updated by user onclick */}
                      <UserAvatar
                        userName={user?.name!}
                        userImage={user?.image!}
                        userEmail={user?.email!}
                      />
                      {user?.name}  {
                        user.isSeller && '( seller )'
                      }
                    </p>
                  </div>
                  <DropdownMenuSeparator />

                  <div className=" flex justify-between">
                    <p className="font-medium">Email Address</p>
                    <p className="text-muted-foreground truncate w-20 md:w-40 lg:w-fit">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />

                  {user ? (
                    <>
                      <div className="flex justify-between">
                        <p className="font-medium">Connected Account</p>
                        <p className="text-muted-foreground">
                          {/* FIXME: get the logo of provider form api */}
                          {/* {user.accounts
                            .map((account) => account.provider)
                            .join(", ")} */}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <p className="font-medium">Change Password</p>
                        <p className="text-muted-foreground cursor-pointer">
                          
                     
                        </p>
                      </div>
                    </>
                  )}
                </div>
              );
            } else if ("security" === labelIconActive) {
              return (
                <div key={i}>
                  <div
                    key={manageValue.label}
                    className="space-y-6 py-6 px-2 w-full rounded-lg  mr-8"
                  >
                    <DialogTitle>Security</DialogTitle>
                    <DropdownMenuSeparator />

                    <div className=" flex justify-between">
                      <p className="font-medium">Two-step verification</p>
                      <p className="text-purple-600 flex items-center gap-2 font-medium ">
                        <MdAdd />
                        <p className="truncate w-20 md:w-40 lg:w-fit">
                          Add two-step verification
                        </p>
                      </p>
                    </div>
                    <DropdownMenuSeparator />

                    <div className=" flex justify-between">
                      <p className="font-medium">Active Devices</p>
                      <p className="text-purple-600 flex items-center gap-2 font-medium ">
                        {/* FIXME: add active devices, location, time and date */}
                      </p>
                    </div>
                    <DropdownMenuSeparator />

                    <div className=" flex justify-between">
                      <p className="font-medium">Delete Account</p>
                      {/* FIXME: Add delete account function */}
                      <p className="text-red-600 font-semibold cursor-pointer ">
                        Delete Account
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ManageAccountButton;
