import { GET } from "@/app/api/v1/search/route";
import { config } from "@/config/environment";

// Mock fetch globally
global.fetch = jest.fn();

describe("Search API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSuccessResponse = {
    Search: [
      {
        Title: "Test Movie",
        Year: "2023",
        imdbID: "tt1234567",
        Type: "movie",
        Poster: "https://example.com/poster.jpg",
      },
    ],
    totalResults: "1",
    Response: "True",
  };

  it("should handle successful search", async () => {
    // Mock fetch implementation
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockSuccessResponse),
    });

    const req = new Request("http://localhost:3000/api/v1/search?s=test");
    const response = await GET(req);
    const data = await response.json();

    // Verify response
    expect(response.status).toBe(200);
    expect(data).toEqual(mockSuccessResponse);

    // Verify API call
    const fetchCall = (fetch as jest.Mock).mock.calls[0][0];
    expect(fetchCall).toBe(
      `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&s=test`
    );
  });

  it("should return 400 error for search term less than 2 characters", async () => {
    const req = new Request("http://localhost:3000/api/v1/search?s=a");
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: "Search term must be at least 2 characters long",
    });

    // Verify that fetch was not called
    expect(fetch).not.toHaveBeenCalled();
  });

  it("should return 400 error for missing search term", async () => {
    const req = new Request("http://localhost:3000/api/v1/search");
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: "Search term must be at least 2 characters long",
    });

    // Verify that fetch was not called
    expect(fetch).not.toHaveBeenCalled();
  });

  it("should handle API errors correctly", async () => {
    const errorMessage = "API Error";
    (fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const req = new Request("http://localhost:3000/api/v1/search?s=");
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: "Search term must be at least 2 characters long",
    });
  });
});
