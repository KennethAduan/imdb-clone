import { GET } from "@/app/api/v1/series/[id]/route";
import { config } from "@/config/environment";
import { API_FOLDER_DETAILS } from "@/constants";

// Mock fetch globally
global.fetch = jest.fn();

describe("Series API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSeriesResponse = {
    Title: "Breaking Bad",
    Year: "2008–2013",
    Rated: "TV-MA",
    Released: "20 Jan 2008",
    Runtime: "49 min",
    Genre: "Crime, Drama, Thriller",
    Director: "N/A",
    Writer: "Vince Gilligan",
    Actors: "Bryan Cranston, Aaron Paul, Anna Gunn",
    Plot: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's financial future as he battles terminal lung cancer.",
    Language: "English, Spanish",
    Country: "United States",
    Awards: "Won 16 Primetime Emmys.",
    Poster: "https://example.com/poster.jpg",
    imdbRating: "9.5",
    imdbVotes: "1,900,000",
    imdbID: "tt0903747",
    Type: "series",
    totalSeasons: "5",
    Response: "True",
  };

  it("should fetch series details successfully", async () => {
    // Mock fetch implementation
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockSeriesResponse),
    });

    const params = { id: "tt0903747" };
    const req = new Request("http://localhost:3000/api/v1/series/tt0903747");
    const response = await GET(req, { params });
    const data = await response.json();

    // Verify response structure
    expect(data).toEqual({
      data: mockSeriesResponse,
    });

    // Verify API call
    const fetchCall = (fetch as jest.Mock).mock.calls[0][0];
    const expectedUrl = `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&type=${API_FOLDER_DETAILS.TYPE.SERIES}&i=${params.id}`;
    expect(fetchCall).toBe(expectedUrl);
  });

  it("should handle API errors correctly", async () => {
    const errorMessage = "API Error";
    (fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const params = { id: "invalid_id" };
    const req = new Request("http://localhost:3000/api/v1/series/invalid_id");
    const response = await GET(req, { params });
    const data = await response.json();

    expect(data).toEqual({
      message: {},
    });
  });

  it("should handle OMDB API error response", async () => {
    const errorResponse = {
      Response: "False",
      Error: "Series not found!",
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(errorResponse),
    });

    const params = { id: "nonexistent" };
    const req = new Request("http://localhost:3000/api/v1/series/nonexistent");
    const response = await GET(req, { params });
    const data = await response.json();

    expect(data).toEqual({
      data: errorResponse,
    });
  });

  it("should include series type in API request", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockSeriesResponse),
    });

    const params = { id: "tt0903747" };
    const req = new Request("http://localhost:3000/api/v1/series/tt0903747");
    await GET(req, { params });

    const fetchCall = (fetch as jest.Mock).mock.calls[0][0];
    expect(fetchCall).toContain(`type=${API_FOLDER_DETAILS.TYPE.SERIES}`);
  });
});
