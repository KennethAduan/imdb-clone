import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import useLatestOMDBDataByType from "@/hooks/use.latest.omdb.data.by.type";
import Movies from "@/components/sections/movies";
import { ROUTES } from "@/constants";

// Mock the hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/hooks/use.latest.omdb.data.by.type");

// Mock data
const mockMoviesData = {
  Search: [
    {
      imdbID: "tt1234567",
      Title: "Test Movie",
      Year: "2023",
      Type: "movie",
      Poster: "/",
    },
  ],
};

describe("Movies Component", () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockSearchParams = new URLSearchParams("?page=1");

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show loading skeleton initially", () => {
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });

    render(<Movies />);
    expect(screen.getByTestId("movies-series-skeleton")).toBeInTheDocument();
  });

  it("should show error message when there is an error", () => {
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error: "Error fetching movies",
    });

    render(<Movies />);
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  it("should render movies grid when data is loaded", () => {
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockMoviesData,
      error: null,
    });

    render(<Movies />);

    expect(screen.getByTestId("search-results-section")).toBeInTheDocument();
    expect(screen.getByTestId("search-results-grid")).toBeInTheDocument();
    expect(
      screen.getByTestId(`movie-card-${mockMoviesData.Search[0].imdbID}`)
    ).toBeInTheDocument();
  });

  it("should navigate to movie details when card is clicked", () => {
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockMoviesData,
      error: null,
    });

    render(<Movies />);

    const movieCard = screen.getByTestId(
      `movie-card-${mockMoviesData.Search[0].imdbID}`
    );
    fireEvent.click(movieCard);

    expect(mockRouter.push).toHaveBeenCalledWith(
      `${ROUTES.MOVIE}/${mockMoviesData.Search[0].imdbID}`
    );
  });

  it("should use correct page from search params", () => {
    const mockSearchParamsPage2 = new URLSearchParams("?page=2");
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParamsPage2);

    const mockUseLatestOMDBDataByType = useLatestOMDBDataByType as jest.Mock;

    render(<Movies />);

    expect(mockUseLatestOMDBDataByType).toHaveBeenCalledWith(
      expect.objectContaining({
        page: "2",
      })
    );
  });

  it("should show mobile pagination on small screens", () => {
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockMoviesData,
      error: null,
    });

    render(<Movies />);
    expect(screen.getByTestId("mobile-pagination")).toBeInTheDocument();
  });
});
