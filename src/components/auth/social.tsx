"use client";

import { github, google } from "@/app/_actions/auth.action";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function Social() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <div className="flex w-full items-center justify-center gap-x-2">
        <div className="h-[1.2px] w-2/4 bg-gray-100" />
        <span className="text-sm font-light">or</span>
        <div className="h-[1.2px] w-2/4 bg-gray-100" />
      </div>
      <div className="flex w-full items-center gap-x-2">
        <Button
          size={"lg"}
          className="flex w-full gap-2 text-slate-600"
          variant={"outline"}
          onClick={async () => {
            const res = await google();
          }}
        >
          <FcGoogle className="text-2xl" />
          Google
        </Button>
        <Button
          size={"lg"}
          className="flex w-full gap-2 text-slate-600"
          variant={"outline"}
          onClick={async () => {
            const res = await github();
          }}
        >
          <FaGithub className="text-2xl" />
          Github
        </Button>

        {/* TODO: Be be implemented this https://authjs.dev/guides/pages/signin */}
      </div>
    </div>
  );
}
