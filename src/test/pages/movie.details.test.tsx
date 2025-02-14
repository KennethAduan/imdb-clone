/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent } from "@testing-library/react";
import MovieDetails from "@/components/pages/movies/movie.details";
import { Data } from "@/types/omdb.types";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => {
      const { animate, initial, whileHover, whileTap, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
  },
}));

// Mock Prisma client
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    watchlist: {
      create: jest.fn(),
      delete: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));

// Create a mock for useWatchlist with state management
const mockHandleWatchlistClick = jest.fn();
let mockIsInWatchlist = false;

jest.mock("@/hooks/use.watchlist", () => ({
  __esModule: true,
  default: () => ({
    addToWatchlist: jest.fn().mockResolvedValue(undefined),
    removeFromWatchlist: jest.fn().mockResolvedValue(undefined),
    isLoading: false,
    isInWatchlist: mockIsInWatchlist,
    handleWatchlistClick: mockHandleWatchlistClick.mockImplementation(
      async () => {
        mockIsInWatchlist = !mockIsInWatchlist;
        return Promise.resolve();
      }
    ),
  }),
}));

// Mock server actions
jest.mock("@/server-actions/user.action", () => ({
  __esModule: true,
  addToWatchlist: jest.fn(),
  removeFromWatchlist: jest.fn(),
}));

describe("MovieDetails", () => {
  const mockMovie: Data = {
    Title: "Test Movie",
    Year: "2024",
    Rated: "PG-13",
    Released: "01 Jan 2024",
    Runtime: "120 min",
    Genre: "Action, Drama",
    Director: "Test Director",
    Writer: "Test Writer",
    Actors: "Actor 1, Actor 2",
    Plot: "Test plot description",
    Language: "English",
    Country: "USA",
    Awards: "Test Awards",
    Poster: "https://test-poster.jpg",
    Ratings: [{ Source: "Internet Movie Database", Value: "8.0/10" }],
    Metascore: "75",
    imdbRating: "8.0",
    imdbVotes: "10000",
    imdbID: "tt1234567",
    Type: "movie",
    DVD: "01 Feb 2024",
    BoxOffice: "$1,000,000",
    Production: "Test Production",
    Website: "N/A",
    Response: "True",
    totalSeasons: "1",
  };

  beforeEach(() => {
    mockIsInWatchlist = false;
    mockHandleWatchlistClick.mockClear();
  });

  it("renders movie details correctly", () => {
    render(
      <MovieDetails movie={mockMovie} userId={""} isInWatchlist={false} />
    );

    expect(screen.getByTestId("movie-details-container")).toBeInTheDocument();
    expect(screen.getByTestId("movie-title")).toHaveTextContent("Test Movie");
    expect(screen.getByTestId("movie-plot")).toHaveTextContent(
      "Test plot description"
    );
  });

  it("displays awards section when awards are available", () => {
    render(
      <MovieDetails movie={mockMovie} userId={""} isInWatchlist={false} />
    );

    expect(screen.getByText("Awards")).toBeInTheDocument();
    expect(screen.getByText("Test Awards")).toBeInTheDocument();
  });

  it("does not display awards section when awards are N/A", () => {
    const movieWithoutAwards = { ...mockMovie, Awards: "N/A" };
    render(
      <MovieDetails
        movie={movieWithoutAwards}
        userId={""}
        isInWatchlist={false}
      />
    );

    expect(screen.queryByText("Awards")).not.toBeInTheDocument();
  });

  it("displays correct movie information in info cards", () => {
    render(
      <MovieDetails movie={mockMovie} userId={""} isInWatchlist={false} />
    );

    expect(screen.getByTestId("imdb-rating")).toHaveTextContent("8.0/10");
    expect(screen.getByTestId("runtime-value")).toHaveTextContent("120 min");
    expect(screen.getByTestId("release-date")).toHaveTextContent("01 Jan 2024");
    expect(screen.getByTestId("language-value")).toHaveTextContent("English");
  });

  it("handles image error correctly", () => {
    render(
      <MovieDetails movie={mockMovie} userId={""} isInWatchlist={false} />
    );

    const posterImage = screen.getByRole("img", { name: /Test Movie/i });
    fireEvent.error(posterImage);

    // Update the expected fallback image path
    expect(posterImage).toHaveAttribute(
      "src",
      "http://localhost/_next/image?url=https%3A%2F%2Ftest-poster.jpg&w=3840&q=75"
    );
  });
});
