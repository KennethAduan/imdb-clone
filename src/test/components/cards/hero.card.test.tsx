import { render, screen, fireEvent } from "@testing-library/react";
import HeroCard from "@/components/cards/hero.card";
import { CAROUSEL_DETAILS } from "@/constants";
import { Data } from "@/types/omdb.types";

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} data-testid="hero-image" />
  ),
}));

describe("HeroCard", () => {
  const mockData = {
    Title: "Test Movie",
    Year: "2024",
    imdbID: "tt1234567",
    Type: "movie",
    Plot: "Test plot",
  } as const;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders essential elements", () => {
    render(<HeroCard omdbDetails={mockData as Data} onCardClick={mockPush} />);

    // Check if main elements are present
    expect(screen.getByText(mockData.Title)).toBeInTheDocument();
    expect(screen.getByText(mockData.Year)).toBeInTheDocument();
    expect(screen.getByText("MOVIE")).toBeInTheDocument();
    expect(screen.getByTestId("hero-image")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: CAROUSEL_DETAILS.WATCH_NOW_BUTTON_TEXT,
      })
    ).toBeInTheDocument();
  });

  it("handles navigation on watch button click", () => {
    render(<HeroCard omdbDetails={mockData as Data} onCardClick={mockPush} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: CAROUSEL_DETAILS.WATCH_NOW_BUTTON_TEXT,
      })
    );

    expect(mockPush).toHaveBeenCalledWith(`${mockData.imdbID}`, "movie");
  });
});
