import { NextResponse } from "next/server";
import { GET } from "@/app/api/v1/series/[id]/route";
import { config } from "@/config/environment";

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

describe("Series Route Handler", () => {
  const mockSeriesData = {
    Title: "Breaking Bad",
    Year: "2008–2013",
    Type: "series",
    imdbID: "tt0903747",
    Response: "True",
  };

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it("should successfully fetch series details", async () => {
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSeriesData),
    });

    const request = new Request(
      "http://localhost:3000/api/v1/series/tt0903747"
    );
    await GET(request, {
      params: { id: "tt0903747" },
    });

    // Verify the fetch call
    expect(global.fetch).toHaveBeenCalledWith(
      `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&type=series&i=tt0903747`
    );

    // Verify response
    expect(NextResponse.json).toHaveBeenCalledWith({
      success: true,
      data: mockSeriesData,
    });
  });

  it("should handle empty series ID", async () => {
    const request = new Request("http://localhost:3000/api/v1/series/");
    await GET(request, {
      params: { id: "" },
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        success: false,
        message: "Series ID is required",
      },
      { status: 400 }
    );
  });

  it("should handle undefined series ID", async () => {
    const request = new Request("http://localhost:3000/api/v1/series/");
    await GET(request, {
      params: { id: "" },
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        success: false,
        message: "Series ID is required",
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
      "http://localhost:3000/api/v1/series/tt0903747"
    );
    await GET(request, {
      params: { id: "tt0903747" },
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        success: false,
        message: "Failed to fetch series details",
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
      "http://localhost:3000/api/v1/series/tt0903747"
    );
    await GET(request, {
      params: { id: "tt0903747" },
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
