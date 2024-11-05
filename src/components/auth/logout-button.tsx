"use client";

import { logout } from "@/app/_actions/auth.action";

interface SignUpButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function LogoutButton({
  children,
  mode = "redirect",
  asChild,
}: SignUpButtonProps) {
  const onClick = () => {
    logout();
  };

  if (mode === "modal") {
    return <span>TODO: Implement Model</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
