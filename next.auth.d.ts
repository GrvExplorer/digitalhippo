import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    _id: string;
    isSeller: boolean;
    sellerId: string;
  }

  interface Session {
    user: {
      isSeller: boolean;
      sellerId: string;
    } & DefaultSession["user"];
  }
}

// Add JWT type extension
declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    isSeller: boolean;
    sellerId: string;
  }
}
