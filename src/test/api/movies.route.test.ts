import { NextResponse } from "next/server";
import { GET } from "@/app/api/v1/movie/[id]/route";
import { config } from "@/config/environment";

// Mock next/server
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

// Mock fetch
global.fetch = jest.fn();

describe("Movies API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return movie details successfully", async () => {
    // Mock successful response
    const mockMovie = {
      Title: "Test Movie",
      Year: "2024",
      imdbID: "tt32306375",
      success: true,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockMovie),
    });

    const request = new Request(
      "http://localhost:3000/api/v1/movies/tt32306375"
    );
    await GET(request, { params: Promise.resolve({ id: "tt32306375" }) });

    expect(global.fetch).toHaveBeenCalledWith(
      `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&type=movie&i=tt32306375`
    );
    expect(NextResponse.json).toHaveBeenCalledWith({
      success: true,
      data: mockMovie,
    });
  });

  it("should handle empty movie ID", async () => {
    const request = new Request("http://localhost:3000/api/v1/movies/");
    await GET(request, { params: Promise.resolve({ id: "" }) });

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        success: false,
        message: "Movie ID is required",
      },
      { status: 400 }
    );
  });

  it("should handle API error response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const request = new Request(
      "http://localhost:3000/api/v1/movies/tt32306375"
    );
    await GET(request, { params: Promise.resolve({ id: "tt32306375" }) });

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        success: false,
        message: "Failed to fetch movie details",
      },
      { status: 500 }
    );
  });
});
