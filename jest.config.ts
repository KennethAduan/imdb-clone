import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Base config shared between both environments
const baseConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  transformIgnorePatterns: [
    // The pattern below tells Jest to not transform any node_module except lucide-react
    "/node_modules/(?!(lucide-react)/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

// Create separate configs for different test environments
const config: Config = {
  ...baseConfig,
  projects: [
    {
      ...baseConfig,
      displayName: "dom",
      testEnvironment: "jsdom",
      testMatch: [
        "<rootDir>/src/test/components/**/*.test.{ts,tsx}",
        "<rootDir>/src/test/pages/**/*.test.{ts,tsx}",
        // Add other patterns for tests that need DOM
      ],
    },
    {
      ...baseConfig,
      displayName: "node",
      testEnvironment: "node",
      testMatch: [
        "<rootDir>/src/test/api/**/*.test.{ts,tsx}",
        "<rootDir>/src/test/utils/**/*.test.{ts,tsx}",
        // Add other patterns for tests that don't need DOM
      ],
    },
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
