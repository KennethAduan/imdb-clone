import { GET } from "@/app/api/v1/omdb/route";
import { config } from "@/config/environment";
import { API_FOLDER_DETAILS } from "@/constants";

// Mock fetch globally
global.fetch = jest.fn();

describe("OMDB API Route", () => {
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
      },
    ],
    totalResults: "1",
    Response: "True",
  };

  it("should handle successful API call with default parameters", async () => {
    // Mock fetch implementation
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockSuccessResponse),
    });

    const req = new Request("http://localhost:3000/api/v1/omdb");
    const response = await GET(req);
    const data = await response.json();

    // Verify response
    expect(response.status).toBe(200);
    expect(data.Search).toEqual(mockSuccessResponse.Search);

    // Verify default parameters
    const fetchCall = (fetch as jest.Mock).mock.calls[0][0] as URL;
    expect(fetchCall.searchParams.get("apikey")).toBe(config.api.omdb.key);
    expect(fetchCall.searchParams.get("page")).toBe("1");
    expect(fetchCall.searchParams.get("type")).toBe("movie");
    expect(fetchCall.searchParams.get("y")).toBe(
      (new Date().getFullYear() - 1).toString()
    );
  });

  it("should handle custom parameters correctly", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockSuccessResponse),
    });

    const req = new Request(
      "http://localhost:3000/api/v1/omdb?page=2&type=series&y=2020"
    );
    await GET(req);

    // Verify parameters in fetch call
    const fetchCall = (fetch as jest.Mock).mock.calls[0][0] as URL;
    expect(fetchCall.searchParams.get("page")).toBe("2");
    expect(fetchCall.searchParams.get("type")).toBe("series");
    expect(fetchCall.searchParams.get("y")).toBe("2020");
  });

  it("should handle API errors correctly", async () => {
    const errorMessage = "API Error";
    (fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const req = new Request("http://localhost:3000/api/v1/omdb");
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Failed to fetch data from OMDB");
    expect(data.message).toBe(errorMessage);
  });

  it("should use random search term from popular searches", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockSuccessResponse),
    });

    const req = new Request("http://localhost:3000/api/v1/omdb");
    await GET(req);

    const fetchCall = (fetch as jest.Mock).mock.calls[0][0] as URL;
    const searchTerm = fetchCall.searchParams.get("s");

    expect(API_FOLDER_DETAILS.POPULAR_SEARCHES).toContain(searchTerm);
  });

  it("should build correct OMDB URL", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockSuccessResponse),
    });

    const req = new Request("http://localhost:3000/api/v1/omdb");
    await GET(req);

    const fetchCall = (fetch as jest.Mock).mock.calls[0][0] as URL;
    expect(fetchCall.origin).toBe(config.api.omdb.baseUrl);
    expect(fetchCall.searchParams.has("apikey")).toBe(true);
    expect(fetchCall.searchParams.has("s")).toBe(true);
    expect(fetchCall.searchParams.has("type")).toBe(true);
    expect(fetchCall.searchParams.has("y")).toBe(true);
    expect(fetchCall.searchParams.has("page")).toBe(true);
  });
});
