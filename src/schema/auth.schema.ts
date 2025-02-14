import { z } from "zod";

export const authSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address." }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
