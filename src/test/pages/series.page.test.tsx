import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import useLatestOMDBDataByType from "@/hooks/use.latest.omdb.data.by.type";
import Series from "@/components/pages/series/series";

// Mock the hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/hooks/use.latest.omdb.data.by.type");

// Mock data
const mockSeriesData = {
  Search: [
    {
      imdbID: "tt1234567",
      Title: "Test Series",
      Year: "2023",
      Type: "series",
      Poster: "/",
    },
  ],
};

describe("Series Component", () => {
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

    render(<Series />);
    expect(screen.getByTestId("movies-series-skeleton")).toBeInTheDocument();
  });

  it("should show error message when there is an error", () => {
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error: "Error fetching series",
    });

    render(<Series />);
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  it("should render series grid when data is loaded", () => {
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockSeriesData,
      error: null,
    });

    render(<Series />);

    expect(screen.getByTestId("search-results-section")).toBeInTheDocument();
    expect(screen.getByTestId("search-results-grid")).toBeInTheDocument();
    expect(
      screen.getByTestId(`movie-card-${mockSeriesData.Search[0].imdbID}`)
    ).toBeInTheDocument();
  });

  it("should navigate to series details when card is clicked", () => {
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockSeriesData,
      error: null,
    });

    render(<Series />);

    const seriesCard = screen.getByTestId(
      `movie-card-${mockSeriesData.Search[0].imdbID}`
    );
    fireEvent.click(seriesCard);

    expect(mockRouter.push).toHaveBeenCalledWith(
      `/series/${mockSeriesData.Search[0].imdbID}`
    );
  });

  it("should use correct page from search params", () => {
    const mockSearchParamsPage2 = new URLSearchParams("?page=2");
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParamsPage2);

    const mockUseLatestOMDBDataByType = useLatestOMDBDataByType as jest.Mock;

    render(<Series />);

    expect(mockUseLatestOMDBDataByType).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "series",
        page: "2",
      })
    );
  });

  it("should show mobile pagination on small screens", () => {
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockSeriesData,
      error: null,
    });

    render(<Series />);
    expect(screen.getByTestId("mobile-pagination")).toBeInTheDocument();
  });
});
