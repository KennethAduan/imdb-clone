import { z } from "zod";

const envSchema = z.object({
  OMDB_API_KEY: z.string().optional().default(""),
  OMDB_API_URL: z.string().optional().default("https://www.omdbapi.com"),
  API_URL: z.string().optional().default("http://localhost:3000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  ALGORITHM: z.string().optional().default("HS256"),
  SESSION_NAME: z.string().optional().default("session"),
  JWT_SECRET: z.string().optional().default("your-secret-key"),
  JWT_EXPIRES_IN: z.string().default("7d"),
});

// This will not throw an error, but will log warnings
const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.warn(
    "⚠️ Some environment variables are missing:",
    envParse.error.flatten().fieldErrors
  );
}

// Use default values if parsing fails
export const env = envParse.success ? envParse.data : envSchema.parse({});

// API Constants
export const config = {
  api: {
    baseUrl: env.API_URL || process.env.API_URL,
    omdb: {
      baseUrl: env.OMDB_API_URL || process.env.OMDB_API_URL,
      key: env.OMDB_API_KEY || process.env.OMDB_API_KEY, // Fallback to process.env
    },
  },
  environment: env.NODE_ENV || process.env.NODE_ENV,
  auth: {
    jwt: {
      algorithm: env.ALGORITHM || process.env.ALGORITHM,
      sessionName: env.SESSION_NAME || process.env.SESSION_NAME,
      secret: env.JWT_SECRET || process.env.JWT_SECRET,
      expiresIn: env.JWT_EXPIRES_IN || process.env.JWT_EXPIRES_IN,
    },
  },
} as const;
