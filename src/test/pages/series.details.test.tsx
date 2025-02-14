/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent } from "@testing-library/react";
import SeriesDetails from "@/components/sections/series.details";
import { Data } from "@/types/omdb.types";

// Mock framer-motion with all motion properties
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => {
      const { animate, initial, whileHover, whileTap, transition, ...rest } =
        props;
      return <div {...rest}>{children}</div>;
    },
  },
}));

describe("SeriesDetails", () => {
  const mockSeries: Data = {
    Title: "Test Series",
    Year: "2020-2024",
    Rated: "TV-MA",
    Released: "01 Jan 2020",
    Runtime: "60 min",
    Genre: "Drama, Thriller",
    Director: "Test Director",
    Writer: "Test Writer",
    Actors: "Actor 1, Actor 2",
    Plot: "Test series plot description",
    Language: "English",
    Country: "USA",
    Awards: "Test Series Awards",
    Poster: "https://test-series-poster.jpg",
    Ratings: [{ Source: "Internet Movie Database", Value: "8.5/10" }],
    Metascore: "80",
    imdbRating: "8.5",
    imdbVotes: "50000",
    imdbID: "tt7654321",
    Type: "series",
    totalSeasons: "4",
    Response: "True",
    DVD: "01 Jan 2020",
    BoxOffice: "1000000",
    Production: "Test Production",
    Website: "https://test-series.com",
  };

  it("renders series details correctly", () => {
    render(<SeriesDetails series={mockSeries} />);

    expect(screen.getByTestId("series-details-container")).toBeInTheDocument();
    expect(screen.getByTestId("series-title")).toHaveTextContent("Test Series");
    expect(screen.getByTestId("series-plot")).toHaveTextContent(
      "Test series plot description"
    );
  });

  it("handles watchlist button click", () => {
    render(<SeriesDetails series={mockSeries} />);

    const watchlistButton = screen.getByRole("button", {
      name: /add to watchlist/i,
    });
    fireEvent.click(watchlistButton);

    expect(
      screen.getByRole("button", { name: /remove from watchlist/i })
    ).toBeInTheDocument();
  });

  it("displays awards section when awards are available", () => {
    render(<SeriesDetails series={mockSeries} />);

    expect(screen.getByText("Awards")).toBeInTheDocument();
    expect(screen.getByText("Test Series Awards")).toBeInTheDocument();
  });

  it("does not display awards section when awards are N/A", () => {
    const seriesWithoutAwards = { ...mockSeries, Awards: "N/A" };
    render(<SeriesDetails series={seriesWithoutAwards} />);

    expect(screen.queryByText("Awards")).not.toBeInTheDocument();
  });

  it("displays correct series information in info cards", () => {
    render(<SeriesDetails series={mockSeries} />);

    // Use test IDs instead of text content
    expect(screen.getByTestId("imdb-rating")).toHaveTextContent("8.5/10");
    expect(screen.getByTestId("runtime-value")).toHaveTextContent("60 min");
    expect(screen.getByTestId("release-date")).toHaveTextContent("01 Jan 2020");
    expect(screen.getByTestId("country-value")).toHaveTextContent("USA");
  });

  it("handles image error correctly", () => {
    render(<SeriesDetails series={mockSeries} />);

    const posterImage = screen.getByRole("img", { name: /Test Series/i });
    fireEvent.error(posterImage);

    // Update the expected fallback image path to match the actual implementation
    expect(posterImage).toHaveAttribute(
      "src",
      "http://localhost/_next/image?url=%2Fmovie-icon.png&w=3840&q=75"
    );
  });

  it("conditionally renders cast and director sections", () => {
    const seriesWithoutDirector = { ...mockSeries, Director: "N/A" };
    render(<SeriesDetails series={seriesWithoutDirector} />);

    expect(screen.getByText("Cast")).toBeInTheDocument();
    expect(screen.getByText("Actor 1, Actor 2")).toBeInTheDocument();
    expect(screen.queryByText("Director")).not.toBeInTheDocument();
  });

  it("handles N/A values in info cards", () => {
    const seriesWithNAValues = {
      ...mockSeries,
      imdbRating: "N/A",
      Runtime: "N/A",
      Released: "N/A",
      Country: "N/A",
    };
    render(<SeriesDetails series={seriesWithNAValues} />);

    expect(screen.queryByText("/10")).not.toBeInTheDocument();
    expect(screen.queryByText("N/A")).not.toBeInTheDocument();
  });
});
