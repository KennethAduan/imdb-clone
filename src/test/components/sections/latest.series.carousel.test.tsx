import { render, screen } from "@testing-library/react";
import { useLatestOMDBDataByType } from "@/services/react.query";
import LatestSeriesCarousel from "@/components/sections/latest.series.carousel";
import "../../__mocks__/next-router-mock";

// Mock the react-query hook
jest.mock("@/services/react.query", () => ({
  useLatestOMDBDataByType: jest.fn(),
}));

describe("LatestSeriesCarousel", () => {
  it("renders loading state correctly", () => {
    // Mock loading state
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    render(<LatestSeriesCarousel />);

    // Check if skeleton loading items are rendered
    const skeletonItems = screen.getAllByTestId(/^movie-skeleton-/);
    expect(skeletonItems).toHaveLength(6);
  });

  it("renders error state correctly", () => {
    // Mock error state
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch"),
      refetch: jest.fn(),
    });

    render(<LatestSeriesCarousel />);

    // Check if error message is displayed
    expect(screen.getByText(/retry/i)).toBeInTheDocument();
  });

  it("renders series data correctly", () => {
    // Mock successful data fetch with valid image URL
    const mockSeries = {
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

    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      data: mockSeries,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<LatestSeriesCarousel />);

    // Update the test to match the new mock data
    expect(
      screen.getByText("Tougen Anki: Dark Demon of Paradise")
    ).toBeInTheDocument();
  });

  it("renders section title and description", () => {
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      data: { Search: [] },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<LatestSeriesCarousel />);

    // Check if section title and description are rendered
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/latest/i)).toBeInTheDocument();
  });
});
