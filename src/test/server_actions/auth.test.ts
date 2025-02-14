import { signUpAction } from "@/server-actions/auth";
import { config } from "@/config/environment";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

// Mock dependencies
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe("Auth Server Actions", () => {
  const mockUser = {
    id: "123",
    email: "test@example.com",
    name: "Test User",
    password: "hashedPassword",
  };

  const mockInput = {
    email: "test@example.com",
    username: "Test User",
    password: "password123",
    confirmPassword: "password123",
  };

  const mockCookieStore = {
    set: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (cookies as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockCookieStore)
    );
  });

  describe("signUpAction", () => {
    it("should create a new user successfully", async () => {
      // Mock user not existing
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      // Mock user creation
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      // Mock password hashing
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");

      const result = await signUpAction(mockInput);

      expect(result?.data).toBe("User created successfully");
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        config.auth.jwt.sessionName,
        expect.any(String),
        expect.objectContaining({
          httpOnly: true,
        })
      );
    });

    it("should return error if user already exists", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await signUpAction(mockInput);

      expect(result?.data).toBe("User already exists");
      expect(mockCookieStore.set).not.toHaveBeenCalled();
    });
  });

  //   describe("signInAction", () => {
  //     it("should sign in user successfully", async () => {
  //       (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
  //       (bcrypt.compare as jest.Mock).mockResolvedValue(true);

  //       const result = await signInAction(mockInput);

  //       expect(result?.data).toBe("User signed in successfully");
  //       expect(mockCookieStore.set).toHaveBeenCalledWith(
  //         config.auth.jwt.sessionName,
  //         expect.any(String),
  //         expect.objectContaining({
  //           httpOnly: true,
  //         })
  //       );
  //     });

  //     it("should return error if user does not exist", async () => {
  //       (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

  //       const result = await signInAction(mockInput);

  //       expect(result?.data).toBe("Invalid credentials");
  //       expect(mockCookieStore.set).not.toHaveBeenCalled();
  //     });

  //     it("should return error if password is invalid", async () => {
  //       (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
  //       (bcrypt.compare as jest.Mock).mockResolvedValue(false);

  //       const result = await signInAction(mockInput);

  //       expect(result?.data).toBe("Invalid credentials");
  //       expect(mockCookieStore.set).not.toHaveBeenCalled();
  //     });
  //   });

  //   describe("signOutAction", () => {
  //     it("should sign out user successfully", async () => {
  //       const result = await signOutAction();

  //       expect(result?.data).toBe("User signed out successfully");
  //       expect(mockCookieStore.delete).toHaveBeenCalledWith(
  //         config.auth.jwt.sessionName
  //       );
  //     });

  //     it("should handle sign out errors", async () => {
  //       mockCookieStore.delete.mockRejectedValue(
  //         new Error("Cookie deletion failed")
  //       );

  //       const result = await signOutAction();

  //       expect(result?.data).toBe("Failed to sign out");
  //     });
  //   });
});
