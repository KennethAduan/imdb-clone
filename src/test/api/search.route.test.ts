import { GET } from "@/app/api/v1/search/route";
import { config } from "@/config/environment";
import { mockSearchData } from "../data_mocks";

// Mock Next.js Response
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

describe("Search Route Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it("should successfully fetch search results", async () => {
    const mockResponse = {
      Search: mockSearchData,
      totalResults: "1",
      Response: "True",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const request = new Request(
      "http://localhost:3000/api/v1/search?s=breaking+bad&page="
    );
    const response = await GET(request);
    const data = await response.json();

    expect(data).toEqual({
      success: true,
      data: mockResponse,
    });
    expect(global.fetch).toHaveBeenCalledWith(
      `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&s=breaking bad&page=`
    );
  });

  it("should handle missing search term", async () => {
    const request = new Request("http://localhost:3000/api/v1/search");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      success: false,
      message: "Search term must be at least 2 characters long",
    });
  });

  it("should handle search term too short", async () => {
    const request = new Request("http://localhost:3000/api/v1/search?s=a");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      success: false,
      message: "Search term must be at least 2 characters long",
    });
  });

  it("should handle no results found", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          Response: "False",
          Error: "Movie not found!",
        }),
    });

    const request = new Request(
      "http://localhost:3000/api/v1/search?s=nonexistentmovie"
    );
    const response = await GET(request);
    const data = await response.json();

    expect(data).toEqual({
      success: true,
      data: {
        Error: "Movie not found!",
        Response: "False",
      },
    });
  });
});
