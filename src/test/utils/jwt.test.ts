import { config } from "@/config/environment";
import { encrypt, decrypt, getSession, refreshSession } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Mock next/headers
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

// Mock config
jest.mock("@/config/environment", () => ({
  config: {
    auth: {
      jwt: {
        secret: "test-secret-key-minimum-32-characters-long",
        algorithm: "HS256",
        expiresIn: "1h",
        sessionName: "test-session",
      },
    },
  },
}));

describe("JWT Utils", () => {
  const mockPayload = {
    userId: "123",
    email: "test@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("encrypt", () => {
    it("should encrypt payload successfully", async () => {
      const token = await encrypt(mockPayload);
      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3); // JWT has 3 parts
    });
  });

  describe("decrypt", () => {
    it("should decrypt token successfully", async () => {
      const token = await encrypt(mockPayload);
      const decrypted = await decrypt(token);

      expect(decrypted.userId).toBe(mockPayload.userId);
      expect(decrypted.email).toBe(mockPayload.email);
    });

    it("should throw error for invalid token", async () => {
      await expect(decrypt("invalid-token")).rejects.toThrow();
    });
  });

  describe("getSession", () => {
    it("should return null when no session cookie exists", async () => {
      (cookies as jest.Mock).mockImplementation(() => ({
        get: () => undefined,
      }));

      const session = await getSession();
      expect(session).toBeNull();
    });

    it("should return session data when valid cookie exists", async () => {
      const token = await encrypt(mockPayload);
      (cookies as jest.Mock).mockImplementation(() => ({
        get: () => ({ value: token }),
      }));

      const session = await getSession();
      expect(session?.userId).toBe(mockPayload.userId);
      expect(session?.email).toBe(mockPayload.email);
    });
  });

  describe("refreshSession", () => {
    it("should return null when no session cookie exists", async () => {
      const mockRequest = {
        cookies: {
          get: () => undefined,
        },
      } as unknown as NextRequest;

      const result = await refreshSession(mockRequest);
      expect(result).toBeNull();
    });

    it("should refresh session and return response with new cookie", async () => {
      // Create initial token
      const token = await encrypt(mockPayload);

      // Mock request with existing session
      const mockRequest = {
        cookies: {
          get: () => ({ value: token }),
        },
      } as unknown as NextRequest;

      // Mock NextResponse
      const mockSetCookie = jest.fn();
      const mockNext = jest.fn();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (NextResponse as any).next = mockNext.mockReturnValue({
        cookies: {
          set: mockSetCookie,
        },
      });

      const result = await refreshSession(mockRequest);

      expect(result).not.toBeNull();
      expect(mockSetCookie).toHaveBeenCalledWith(
        expect.objectContaining({
          name: config.auth.jwt.sessionName,
          httpOnly: true,
        })
      );
    });
  });
});
