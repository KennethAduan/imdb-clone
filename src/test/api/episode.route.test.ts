import { NextResponse } from "next/server";
import { GET } from "@/app/api/v1/episode/[id]/route";
import { config } from "@/config/environment";

import { mockEpisodeData } from "../mock";

// Mock Next.js Response
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

// Mock logger to prevent console output during tests
jest.mock("@/lib/logger", () => ({
  error: jest.fn(),
  info: jest.fn(),
}));

describe("Episode Route Handler", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it("should successfully fetch episode details", async () => {
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEpisodeData),
    });

    const request = new Request(
      "http://localhost:3000/api/v1/episode/tt0959621"
    );
    await GET(request, {
      params: { id: "tt0959621" },
    });

    // Verify the fetch call
    expect(global.fetch).toHaveBeenCalledWith(
      `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&type=episode&i=tt0959621`
    );

    // Verify response
    expect(NextResponse.json).toHaveBeenCalledWith({
      success: true,
      data: mockEpisodeData,
    });
  });

  it("should handle empty episode ID", async () => {
    const request = new Request("http://localhost:3000/api/v1/episode/");
    await GET(request, {
      params: { id: "" },
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        success: false,
        message: "Episode ID is required",
      },
      { status: 400 }
    );
  });

  it("should handle undefined episode ID", async () => {
    const request = new Request("http://localhost:3000/api/v1/episode/");
    await GET(request, {
      params: { id: "" },
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        success: false,
        message: "Episode ID is required",
      },
      { status: 400 }
    );
  });

  it("should handle API error response", async () => {
    // Mock failed fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const request = new Request(
      "http://localhost:3000/api/v1/episode/tt0959621"
    );
    await GET(request, {
      params: { id: "tt0959621" },
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        success: false,
        message: "Failed to fetch episode details",
      },
      { status: 500 }
    );
  });

  it("should handle network error", async () => {
    // Mock network error
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    const request = new Request(
      "http://localhost:3000/api/v1/episode/tt0959621"
    );
    await GET(request, {
      params: { id: "tt0959621" },
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        success: false,
        message: "Network error",
      },
      { status: 500 }
    );
  });
});
