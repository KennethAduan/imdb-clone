import { GET } from "@/app/api/v1/omdb/route";
import { config } from "@/config/environment";
import { omdbMockSuccessResponse, omdbMockEmptyResponse } from "../mock";

// Mock the fetch function
global.fetch = jest.fn();

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data, options) => ({
      status: options?.status || 200,
      json: async () => data,
    })),
  },
}));

// Mock logger to prevent console output during tests
jest.mock("@/lib/logger", () => ({
  error: jest.fn(),
  info: jest.fn(),
}));

describe("OMDB API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return successful response with movie data", async () => {
    // Mock fetch implementation
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => omdbMockSuccessResponse,
    });

    const request = new Request(
      `${config.api.omdb.baseUrl}?type=movie&y=2023&page=1`
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.Search).toEqual(omdbMockSuccessResponse.Search);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it("should handle empty search results", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => omdbMockEmptyResponse,
    });

    const request = new Request(
      `${config.api.omdb.baseUrl}?type=movie&y=2023&page=1`
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toBe("No results found");
  });

  it("should handle OMDB API errors", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 503,
    });

    const request = new Request(
      `${config.api.omdb.baseUrl}?type=movie&y=2023&page=1`
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.success).toBe(false);
    expect(data.message).toContain("OMDB API responded with status: 503");
  });

  it("should handle invalid request URL", async () => {
    // Create a Request with undefined URL by mocking
    const invalidRequest = {
      url: undefined,
    } as unknown as Request;

    const response = await GET(invalidRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toBe("Invalid request URL");
  });
});
