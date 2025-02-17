import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

// Base config shared between both environments
const baseConfig: Config = {
  setupFilesAfterEnv: [
    "<rootDir>/src/test/__mocks__/next-router-mock.tsx",
    "<rootDir>/jest.setup.ts",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(lucide-react|next-safe-action|@hookform/resolvers)/)",
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
