import { type NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";

export default {
  providers: [
    github,
    google,
  ],
} satisfies NextAuthConfig;
