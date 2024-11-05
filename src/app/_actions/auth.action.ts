"use server";

import { auth, signIn, signOut } from "@/auth";
import VerificationTokenModel from "@/db/models/verification-token.model";
import { loginWithResendSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const loginWithResend = async (
  formData: z.infer<typeof loginWithResendSchema>,
) => {
  try {
    const res = await signIn("resend", {
      email: "icodelife307@gmail.com",
      redirect: true,
      redirectTo: process.env.NEXT_PUBLIC_SIGN_IN_REDIRECT_URL || "/",
    });

    if (!res) {
      return { success: false, message: "Something went wrong" };
    }
    return { success: true, message: "signed up successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "DuplicateConditionalUI":
          return { success: false, message: "User already exists" };
        default:
          return { success: false, message: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const logout = async () => {
  const session = await auth();

  if (!session) {
    return { success: false, message: "Something went wrong" };
  }

  // FIXME: deleting only session that is created in this device
  await deleteVerificationToken(session.user.email as string);

  await signOut({
    redirect: true,
    redirectTo: process.env.NEXT_PUBLIC_LOGOUT_REDIRECT_URL || "/sign-in",
  });

  return { success: true, message: "logged out successfully" };
};

// login or signup with socials or Oauth
export const github = async () => {
  try {
    const res = await signIn("github", {
      redirect: true,
      redirectTo: process.env.NEXT_PUBLIC_SOCIAL_SIGN_IN_REDIRECT_URL || "/",
    });

    if (!res) {
      return { success: false, message: "Something went wrong" };
    }
    return { success: true, message: "signed up successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "DuplicateConditionalUI":
          return { success: false, message: "User already exists" };
        case "OAuthAccountNotLinked":
          return {
            success: false,
            message: "User not linked with Oauth provider",
          };
        default:
          return { success: false, message: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const google = async () => {
  try {
    const res = await signIn("google", {
      redirect: true,
      redirectTo: process.env.NEXT_PUBLIC_SOCIAL_SIGN_IN_REDIRECT_URL || "/",
    });
    if (!res) {
      return { success: false, message: "Something went wrong" };
    }
    console.log("not able to sign in with google");

    return { success: true, message: "signed up successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "DuplicateConditionalUI":
          return { success: false, message: "User already exists" };
        case "OAuthAccountNotLinked":
          return {
            success: false,
            message: "User not linked with Oauth provider",
          };
        default:
          return { success: false, message: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const deleteUser = async (id: string) => {};

export const signInWithStandardUI = async () => {
  try {
    const res = await signIn();

    if (!res) {
      return { success: false, message: "Something went wrong" };
    }
    return { success: true, message: "signed in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid email or password" };
        default:
          return { success: false, message: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const deleteVerificationToken = async (identifier: string) => {
  try {
    const res = await VerificationTokenModel.deleteMany({
      identifier,
    });

    if (!res) {
      return { success: false, message: "Something went wrong" };
    }
    return { success: true, message: "token deleted successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        default:
          return { success: false, message: "Something went wrong!" };
      }
    }
    throw error;
  }
};
