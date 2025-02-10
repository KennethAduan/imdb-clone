import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/layouts/navbar";
import { NAVBAR_DETAILS, ROUTES } from "@/constants";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock the Image component from next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("Navbar", () => {
  it("renders the navbar with logo and navigation links", () => {
    render(<Navbar />);

    // Check if logo is present
    expect(screen.getByAltText("VitalJourney Logo")).toBeInTheDocument();

    // Check if left side navigation links are present
    NAVBAR_DETAILS.NAVLINKS_LEFT_SIDE.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    // Check if right side navigation links are present
    NAVBAR_DETAILS.NAVLINKS_RIGHT_SIDE.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("has correct navigation links with proper hrefs", () => {
    render(<Navbar />);

    // Check left side links
    NAVBAR_DETAILS.NAVLINKS_LEFT_SIDE.forEach(({ href, label }) => {
      const link = screen.getByText(label).closest("a");
      expect(link).toHaveAttribute("href", href);
    });

    // Check right side links
    NAVBAR_DETAILS.NAVLINKS_RIGHT_SIDE.forEach(({ href, label }) => {
      const link = screen.getByText(label).closest("a");
      expect(link).toHaveAttribute("href", href);
    });
  });

  // it("changes navbar style on scroll", () => {
  //   render(<Navbar />);

  //   const navbar = screen.getByRole("navigation");

  //   // Initial state (not scrolled)
  //   expect(navbar).toHaveClass("bg-transparent", "border-none", "shadow-none");

  //   // Simulate scroll
  //   fireEvent.scroll(window, { target: { scrollY: 100 } });

  //   // Scrolled state
  //   expect(navbar).toHaveClass(
  //     "bg-white/80",
  //     "dark:bg-black/90",
  //     "backdrop-blur-sm"
  //   );
  // });

  it("renders search input", () => {
    render(<Navbar />);

    // Check if search input is present
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("has correct logo link", () => {
    render(<Navbar />);

    const logoLink = screen.getByRole("link", { name: /VitalJourney Logo/i });
    expect(logoLink).toHaveAttribute("href", ROUTES.HOME);
  });
});
