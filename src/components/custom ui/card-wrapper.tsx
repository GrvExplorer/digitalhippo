import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/custom ui/back-button";

interface CardWrapperProps {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  backButtonLabel?: {
    label: string;
    hrefText: string;
  };
  backButtonHref?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  title,
  subTitle,
  children,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader>
        <div className="flex items-center flex-col gap-2 w-full ">
          <CardTitle className="font-bold">{title}</CardTitle>
          <CardDescription>{subTitle}</CardDescription>
        </div>
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocial && (
        <>
    
          <CardFooter>
            <Social />
          </CardFooter>
        </>
      )}

      <CardFooter className="bg-gray-100 rounded-b-lg p-0">
      </CardFooter>
    </Card>
  );
};
