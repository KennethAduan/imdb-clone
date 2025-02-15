import { render, screen, fireEvent } from "@testing-library/react";
import MovieSeriesCard from "@/components/cards/movie.series.card";
import { Data } from "@/types/omdb.types";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    alt,
    "data-testid": dataTestId,
  }: {
    alt: string;
    "data-testid": string;
    // eslint-disable-next-line @next/next/no-img-element
  }) => <img alt={alt} data-testid={dataTestId} />,
}));

describe("MovieSeriesCard", () => {
  const mockData = {
    Title: "Test Movie",
    Year: "2024",
    imdbID: "tt1234567",
    Type: "movie",
    Poster: "test-poster.jpg",
  } as Data;

  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders basic card elements", () => {
    render(
      <MovieSeriesCard
        content={mockData}
        onClick={mockOnClick}
        data-testid="movie-card"
      />
    );

    // Check essential elements
    expect(screen.getByTestId("movie-card")).toBeInTheDocument();
    expect(
      screen.getByTestId(`movie-title-${mockData.imdbID}`)
    ).toHaveTextContent(mockData.Title);
    expect(
      screen.getByTestId(`movie-poster-${mockData.imdbID}`)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /watch now/i })
    ).toBeInTheDocument();
  });

  it("shows year when showYear prop is true", () => {
    render(
      <MovieSeriesCard
        content={mockData}
        onClick={mockOnClick}
        showYear={true}
      />
    );

    expect(screen.getByText(mockData.Year)).toBeInTheDocument();
  });

  it("shows type badge when showType prop is true", () => {
    render(
      <MovieSeriesCard
        content={mockData}
        onClick={mockOnClick}
        showType={true}
      />
    );

    expect(screen.getByText("MOVIE")).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", () => {
    render(
      <MovieSeriesCard
        content={mockData}
        onClick={mockOnClick}
        data-testid="movie-card"
      />
    );

    fireEvent.click(screen.getByTestId("movie-card"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("triggers onClick handler when interacting with card", () => {
    render(<MovieSeriesCard content={mockData} onClick={mockOnClick} />);

    // Click the watch now button
    fireEvent.click(screen.getByRole("button", { name: /watch now/i }));

    // Verify onClick was called
    expect(mockOnClick).toHaveBeenCalled();
  });
});
