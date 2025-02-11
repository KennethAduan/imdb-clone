import { NextResponse } from "next/server";
import { GET } from "@/app/api/v1/movies/[id]/route";
import { config } from "@/config/environment";

// Mock next/server
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
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
      imdbID: "tt1234567",
      success: true,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockMovie),
    });

    const request = new Request(
      "http://localhost:3000/api/v1/movies/tt1234567"
    );
    await GET(request, {
      params: { id: "tt1234567" },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&type=movie&i=tt1234567`
    );
    expect(NextResponse.json).toHaveBeenCalledWith({
      success: true,
      data: mockMovie,
    });
  });

  it("should handle empty movie ID", async () => {
    const request = new Request("http://localhost:3000/api/v1/movies/");
    await GET(request, {
      params: { id: "" },
    });

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
      "http://localhost:3000/api/v1/movies/tt1234567"
    );
    await GET(request, {
      params: { id: "tt1234567" },
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        success: false,
        message: "Failed to fetch movie details",
      },
      { status: 500 }
    );
  });
});
