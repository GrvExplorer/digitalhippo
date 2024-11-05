import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  label: string;
  href: string;
  hrefText: string;
}

export function BackButton({ label, href, hrefText }: BackButtonProps) {
  return (
    <div className="flex justify-center p-4 items-center w-full ">
      <Link href={href}>
      <span className="text-muted-foreground">{label}</span>
        <Button variant={"link"} className="p-0 pl-1">
          {hrefText}
        </Button>
      </Link>
    </div>
  );
}
