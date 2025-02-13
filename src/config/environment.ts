import { z } from "zod";

const envSchema = z.object({
  OMDB_API_KEY: z.string().min(1, "OMDB API key is required"),
  OMDB_API_URL: z.string().min(1, "OMDB API URL is required"),
  API_URL: z.string().min(1, "API URL is required"),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  JWT_SECRET: z.string().min(32, "JWT secret must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),
});

// This will throw an error if the environment variables are invalid
const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error(
    "❌ Invalid environment variables:",
    envParse.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

export const env = envParse.data;

// API Constants
export const config = {
  api: {
    baseUrl: env.API_URL,
    omdb: {
      baseUrl: env.OMDB_API_URL,
      key: env.OMDB_API_KEY,
    },
  },
  environment: env.NODE_ENV,
  auth: {
    jwt: {
      secret: env.JWT_SECRET,
      expiresIn: env.JWT_EXPIRES_IN,
    },
  },
} as const;
