/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, cleanup } from "@testing-library/react";
import HeroCarousel from "@/components/sections/hero.carousel";
import { useLatestOMDBDataByType } from "@/services/react.query";

// Mock the react-query hook
jest.mock("@/services/react.query", () => ({
  useLatestOMDBDataByType: jest.fn(),
}));

// Mock next/image as a simple div
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, fill, priority, ...props }: any) => (
    <div
      data-testid="mock-image"
      data-fill={fill ? "true" : "false"}
      data-priority={priority ? "true" : "false"}
      {...props}
    >
      {alt}
    </div>
  ),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the carousel component from shadcn
jest.mock("@/components/ui/carousel", () => ({
  Carousel: ({ children, ...props }: any) => (
    <div data-testid="movie-carousel" {...props}>
      {children}
    </div>
  ),
  CarouselContent: ({ children }: any) => (
    <div data-testid="carousel-content">{children}</div>
  ),
  CarouselItem: ({ children }: any) => (
    <div data-testid="carousel-item">{children}</div>
  ),
  CarouselPrevious: () => <button aria-label="Previous slide">Previous</button>,
  CarouselNext: () => <button aria-label="Next slide">Next</button>,
}));

describe("HomeUpperCarousel", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders loading skeleton when data is loading", () => {
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });

    render(<HeroCarousel />);

    // Check if skeleton carousel exists
    expect(screen.getByTestId("movie-carousel")).toBeInTheDocument();

    // Check if we have multiple skeleton items
    const skeletonItems = screen.getAllByTestId("hero-card-skeleton");
    expect(skeletonItems).toHaveLength(3);
  });

  it("renders error message and retry button when there is an error", () => {
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error: new Error("Failed to fetch data"),
    });

    render(<HeroCarousel />);
    expect(screen.getByText(/Error:/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("renders carousel with navigation controls when data is loaded", () => {
    (useLatestOMDBDataByType as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { Search: [{ Title: "Test Movie", imdbID: "123" }] },
      error: null,
    });

    render(<HeroCarousel />);

    // Check if carousel container exists
    expect(screen.getByTestId("movie-carousel")).toBeInTheDocument();

    // Check if navigation buttons are present
    expect(screen.getByLabelText("Previous slide")).toBeInTheDocument();
    expect(screen.getByLabelText("Next slide")).toBeInTheDocument();
  });
});
