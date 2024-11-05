import { z } from "zod";

// Auth
export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required." })
    .email({ message: "Enter a valid email address." }),
  password: z
    .string({ message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const loginWithResendSchema = z.object({
  email: z
    .string({ message: "Email is required." })
    .email({ message: "Enter a valid email address." }),
});

export const signupSchema = z.object({
  // TODO: Check username does it already exist
  name: z
    .string({ message: "Username is required." })
    .min(3, { message: "Username must be at least 3 characters." }),
  email: z
    .string({ message: "Email is required." })
    .email({ message: "Enter a valid email address." }),
  password: z
    .string({ message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." }),
  // TODO: Check password and confirm password match
  confirmPassword: z
    .string({ message: "Confirm password is required." })
    .min(6, { message: "Password must be at least 6 characters." }),
});

// become seller
export const becomeSellerSchema = z.object({
  userId: z.string(),
  name: z.string(),
  address: z.string(),
  phoneNo: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(10, { message: "Phone number must be at most 10 digits." }),
  email: z.string().email({ message: "Enter a valid email address." }),
  description: z
    .string()
    .min(100, { message: "Description must be at least 100 characters." })
    .max(500, { message: "Description must be at most 500 characters." }),
  logoUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
});

export const updateSellerSchema = z.object({
  userId: z.string(),
  name: z.string().optional(),
  address: z.string().optional(),
  phoneNo: z.string().optional(),
  email: z
    .string()
    .email({ message: "Enter a valid email address." })
    .optional(),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
});

// Product
export const addKitSchema = z.object({
  productName: z
    .string({ message: "Name is required." })
    .min(3, { message: "Name must be at least 3 characters." }),
  description: z.string({message: 'Description is required.' }),
  price: z
    .string({ message: "Price is required." })
    .min(0, { message: "Price must be at least 0." }),
  images: z
    .array(z.string())
    .min(1, { message: "Image is required." })
    .min(1, { message: "At least one image is required." }),
  categories: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "At least one category is required." })
    .max(3, { message: "Max Number of category is 3" }),
  features: z
    .array(z.string())
    .min(4, { message: "Features must be at least 4." })
    .optional(),
  tags: z
    .array(z.string())
    .max(3, { message: "Max Number of tags is 3" })
    .optional(),
  sellerId: z.string(),
  toPublish: z.boolean().optional(),
});

export const updateKitSchema = z.object({
  id: z.string(),
  productName: z.string().optional(),
  features: z.array(z.string()).optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  images: z.array(z.string()).optional(),
  category: z
    .array(z.string())
    .max(3, { message: "Max Number of category is 3" })
    .optional(),
  tags: z.array(z.string()).optional(),
  sellerId: z.string(),
  toPublish: z.boolean().optional(),
});
