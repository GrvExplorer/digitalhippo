import authConfig from "@/auth.config";
import {
  apiAuthPrefix,
  apiUploadPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const currentPath = req.nextUrl.pathname;
  const isApiAuthPrefix = currentPath.startsWith(apiAuthPrefix);
  const isApiUploadPrefix = currentPath.startsWith(apiUploadPrefix);
  const isAuthRoutes = authRoutes.includes(currentPath);
  const isPublicRoutes = publicRoutes.includes(currentPath);

  const country = req.geo?.country?.toString(); // Getting geo location

  if (isApiAuthPrefix) return NextResponse.next();
  if (isApiUploadPrefix) return NextResponse.next();

  if (isAuthRoutes && isLoggedIn)
    return NextResponse.redirect(
      new URL(process.env.NEXT_PUBLIC_SIGN_IN_REDIRECT_URL || "/", req.nextUrl),
    );

  if (isPublicRoutes) return NextResponse.next();

  if (!isLoggedIn && !isAuthRoutes && !isPublicRoutes) {
    return NextResponse.redirect(
      new URL(process.env.NEXT_PUBLIC_SIGN_IN_URL || "/sign-in", req.nextUrl),
    );
  }

  return null;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
