import { render, screen, fireEvent } from "@testing-library/react";
import SearchResults from "@/components/sections/search.results";
import { useRouter, useSearchParams } from "next/navigation";
import { Data } from "@/types/omdb.types";

// Mock the hooks
jest.mock("@/hooks/use.omdb.data.by.search", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock the MovieSeriesCard component
jest.mock("@/components/cards/movie.series.card", () => ({
  __esModule: true,
  default: ({ content, onClick }: { content: Data; onClick: () => void }) => (
    <div data-testid={`movie-card-${content.imdbID}`} onClick={onClick}>
      {content.Title}
    </div>
  ),
}));

// Mock the ErrorData component
jest.mock("@/components/error.data", () => ({
  __esModule: true,
  default: ({ error }: { error: Error }) => (
    <div data-testid="error-message">Error: {error.message}</div>
  ),
}));

// Mock the MoviesSeriesCardSkeleton component
jest.mock("@/components/loaders/movies.series.card.skeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="movies-series-skeleton" />,
}));

// Mock the PagePagination component
jest.mock("@/components/page.pagination", () => ({
  __esModule: true,
  default: () => <div data-testid="pagination" />,
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
    const useOMDBDataBySearch = jest.requireMock(
      "@/hooks/use.omdb.data.by.search"
    ).default;
    useOMDBDataBySearch.mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
      isError: false,
    });

    render(<SearchResults search="test" />);
    expect(screen.getByTestId("movies-series-skeleton")).toBeInTheDocument();
  });

  it("renders error component when there is an error", () => {
    const useOMDBDataBySearch = jest.requireMock(
      "@/hooks/use.omdb.data.by.search"
    ).default;
    const mockError = new Error("Test error");
    useOMDBDataBySearch.mockReturnValue({
      isLoading: false,
      data: null,
      error: mockError,
      isError: true,
    });

    render(<SearchResults search="test" />);
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  it("renders no results message when search returns empty results", () => {
    const useOMDBDataBySearch = jest.requireMock(
      "@/hooks/use.omdb.data.by.search"
    ).default;
    useOMDBDataBySearch.mockReturnValue({
      isLoading: false,
      data: [],
      error: null,
      isError: false,
    });

    render(<SearchResults search="nonexistent" />);
    expect(screen.getByText(/No results found for/)).toBeInTheDocument();
  });

  it("renders search results correctly", () => {
    const useOMDBDataBySearch = jest.requireMock(
      "@/hooks/use.omdb.data.by.search"
    ).default;
    useOMDBDataBySearch.mockReturnValue({
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
    const useOMDBDataBySearch = jest.requireMock(
      "@/hooks/use.omdb.data.by.search"
    ).default;
    useOMDBDataBySearch.mockReturnValue({
      isLoading: false,
      data: mockSearchResults,
      error: null,
      isError: false,
    });

    render(<SearchResults search="test" />);

    const movieCard = screen.getByTestId("movie-card-tt4507428");
    fireEvent.click(movieCard);

    expect(mockRouter.push).toHaveBeenCalledWith("/movies/tt4507428");
  });

  it("navigates correctly when series card is clicked", () => {
    const useOMDBDataBySearch = jest.requireMock(
      "@/hooks/use.omdb.data.by.search"
    ).default;
    useOMDBDataBySearch.mockReturnValue({
      isLoading: false,
      data: mockSearchResults,
      error: null,
      isError: false,
    });

    render(<SearchResults search="test" />);

    const seriesCard = screen.getByTestId("movie-card-tt15164982");
    fireEvent.click(seriesCard);

    expect(mockRouter.push).toHaveBeenCalledWith("/series/tt15164982");
  });
});
