import { render, screen, fireEvent } from "@testing-library/react";
import SearchResults from "@/components/sections/search.results";
import { useOMDBDataBySearch } from "@/services/react.query";
import { useRouter, useSearchParams } from "next/navigation";

// Mock the hooks
jest.mock("@/services/react.query");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock data
const mockSearchResults = [
  {
    Title: "NBA",
    Year: "1954–",
    imdbID: "tt15164982",
    Type: "series",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMWE3OGIyNWQtNTQ3NS00YjljLWEwMTYtYTMwZTc3YWE4Yzg5XkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    Title: "NBA 2K16",
    Year: "2015",
    imdbID: "tt4507428",
    Type: "game",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTg5YmEwOWUtMzA5MC00NmEwLTkwZjctNjY2YWNjNzQwZmNiXkEyXkFqcGdeQXVyNjE4Njk5NTM@._V1_SX300.jpg",
  },
];

describe("SearchResults", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup default mocks
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue("1"),
    });
  });

  it("renders loading skeleton when data is loading", () => {
    (useOMDBDataBySearch as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
      isError: false,
    });

    render(<SearchResults search="test" />);
    expect(screen.getByTestId("movies-series-skeleton")).toBeInTheDocument();
  });

  it("renders error component when there is an error", () => {
    const mockError = new Error("Test error");
    (useOMDBDataBySearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error: mockError,
      isError: true,
    });

    render(<SearchResults search="test" />);
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  it("renders no results message when search returns empty results", () => {
    (useOMDBDataBySearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: null,
      isError: false,
    });

    render(<SearchResults search="nonexistent" />);
    expect(screen.getByText(/No results found for/)).toBeInTheDocument();
  });

  it("renders search results correctly", () => {
    (useOMDBDataBySearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockSearchResults,
      error: null,
      isError: false,
    });

    render(<SearchResults search="test" />);

    expect(screen.getByTestId("search-results-section")).toBeInTheDocument();
    expect(screen.getByTestId("search-results-grid")).toBeInTheDocument();
    expect(screen.getByText("NBA")).toBeInTheDocument();
    expect(screen.getByText("NBA 2K16")).toBeInTheDocument();
  });

  it("navigates correctly when movie card is clicked", () => {
    (useOMDBDataBySearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockSearchResults,
      error: null,
      isError: false,
    });

    render(<SearchResults search="test" />);

    const movieCard = screen.getByTestId("movie-card-tt15164982");
    fireEvent.click(movieCard);

    expect(mockRouter.push).toHaveBeenCalledWith("/tv/tt15164982");
  });

  it("navigates correctly when series card is clicked", () => {
    (useOMDBDataBySearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockSearchResults,
      error: null,
      isError: false,
    });

    render(<SearchResults search="test" />);

    const seriesCard = screen.getByTestId("movie-card-tt15164982");
    fireEvent.click(seriesCard);

    expect(mockRouter.push).toHaveBeenCalledWith("/tv/tt15164982");
  });
});
