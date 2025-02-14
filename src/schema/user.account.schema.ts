import * as z from "zod";

export const accountFormSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  username: z.string().min(2, "Username must be at least 2 characters"),
});

export const passwordFormSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;
export type PasswordFormValues = z.infer<typeof passwordFormSchema>;
