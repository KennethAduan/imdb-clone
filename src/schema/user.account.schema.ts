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

export const watchlistSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  imdbId: z.string().min(1, "IMDB ID is required"),
  title: z.string().min(1, "Title is required"),
  poster: z.string().min(1, "Poster is required"),
  year: z.string().min(1, "Year is required"),
  type: z.string().min(1, "Type is required"),
});

export const removeFromWatchlistSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  imdbId: z.string().min(1, "IMDB ID is required"),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;
export type PasswordFormValues = z.infer<typeof passwordFormSchema>;
export type WatchlistFormValues = z.infer<typeof watchlistSchema>;
export type RemoveFromWatchlistFormValues = z.infer<
  typeof removeFromWatchlistSchema
>;
