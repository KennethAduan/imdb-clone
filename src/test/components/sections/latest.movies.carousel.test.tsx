import { render, screen } from "@testing-library/react";
import LatestMoviesCarousel from "@/components/sections/latest.movies.carousel";
import { Data } from "@/types/omdb.types";
import "../../__mocks__/next-router-mock";

// Mock the react-query hook
jest.mock("@/hooks/use.latest.omdb.data.by.type", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  })),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the MovieSeriesCard component
jest.mock("@/components/cards/movie.series.card", () => ({
  __esModule: true,
  default: ({ content }: { content: Data }) => (
    <div data-testid={`movie-card-${content.imdbID}`}>{content.Title}</div>
  ),
}));

// Mock the ErrorRefetch component
jest.mock("@/components/error.refetch", () => ({
  __esModule: true,
  default: ({ buttonText }: { buttonText: string }) => (
    <div data-testid="error-component">
      <button>{buttonText}</button>
    </div>
  ),
}));

// Mock the MoviesSeriesCarouselSkeleton component
jest.mock("@/components/loaders/movies.series.carousel.skeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="movies-series-skeleton" />,
}));

// Mock the Carousel components
jest.mock("@/components/ui/carousel", () => ({
  Carousel: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    props: {
      align: string;
      loop: boolean;
    };
  }) => (
    <div data-testid="movies-carousel" {...props}>
      {children}
    </div>
  ),
  CarouselContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel-content">{children}</div>
  ),
  CarouselItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel-item">{children}</div>
  ),
  CarouselPrevious: () => (
    <button data-testid="carousel-previous">Previous</button>
  ),
  CarouselNext: () => <button data-testid="carousel-next">Next</button>,
}));

// Mock the Button component
jest.mock("@/components/ui/button", () => ({
  __esModule: true,
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

describe("LatestMoviesCarousel", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("renders loading state correctly", () => {
    // Mock loading state
    const useLatestOMDBDataByTypeMock = jest.requireMock(
      "@/hooks/use.latest.omdb.data.by.type"
    ).default;
    useLatestOMDBDataByTypeMock.mockImplementation(() => ({
      data: null,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    }));

    render(<LatestMoviesCarousel />);

    // Changed to match the correct data-testid
    const skeletonItems = screen.getAllByTestId("movies-series-skeleton");
    expect(skeletonItems).toHaveLength(6);
  });

  it("renders error state correctly", () => {
    // Mock error state
    const useLatestOMDBDataByTypeMock = jest.requireMock(
      "@/hooks/use.latest.omdb.data.by.type"
    ).default;
    useLatestOMDBDataByTypeMock.mockImplementation(() => ({
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch"),
      refetch: jest.fn(),
    }));

    render(<LatestMoviesCarousel />);

    // Changed to look for the error component
    expect(screen.getByTestId("error-component")).toBeInTheDocument();
  });

  it("renders movies data correctly", () => {
    // Mock successful data fetch with valid image URL
    const mockMovies = {
      Search: [
        {
          Title: "Tougen Anki: Dark Demon of Paradise",
          Year: "2025–",
          imdbID: "tt32344704",
          Type: "series",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BYjI4Y2IwMmEtZjhkMS00ZTdlLWIxZGMtMTkyNDMwNTUxNzg1XkEyXkFqcGc@._V1_SX300.jpg",
        },
      ],
    };

    const useLatestOMDBDataByTypeMock = jest.requireMock(
      "@/hooks/use.latest.omdb.data.by.type"
    ).default;
    useLatestOMDBDataByTypeMock.mockImplementation(() => ({
      data: mockMovies,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    }));

    render(<LatestMoviesCarousel />);

    // Changed to look for the movie card by testid
    expect(screen.getByTestId(`movie-card-tt32344704`)).toBeInTheDocument();
  });

  it("renders section title and description", () => {
    const useLatestOMDBDataByTypeMock = jest.requireMock(
      "@/hooks/use.latest.omdb.data.by.type"
    ).default;
    useLatestOMDBDataByTypeMock.mockImplementation(() => ({
      data: { Search: [] },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    }));

    render(<LatestMoviesCarousel />);

    // Check if section title and description are rendered
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByTestId("section-title")).toBeInTheDocument();
  });
});
