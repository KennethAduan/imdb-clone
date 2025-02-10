import { z } from "zod";

export const searchParamsSchema = z.object({
  s: z.string().min(2).max(100),
  type: z.enum(["movie", "series", "episode"]).optional(),
  y: z
    .string()
    .regex(/^\d{4}$/)
    .optional(),
  page: z.string().regex(/^\d+$/).optional(),
});

export const idSchema = z.string().regex(/^\d+$/);
