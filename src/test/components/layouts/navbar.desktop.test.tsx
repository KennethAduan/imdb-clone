/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import NavbarDesktop from "@/components/layouts/navbar.desktop";
import { NAVBAR_DETAILS, ROUTES } from "@/constants";

// Mock next/navigation
const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("NavbarDesktop", () => {
  const defaultProps = {
    isScrolled: false,
    pathname: "/",
  };

  it("renders logo and navigation links", () => {
    render(<NavbarDesktop {...defaultProps} />);

    // Check logo
    const logo = screen.getByAltText("Moviesflix logo");
    expect(logo).toBeInTheDocument();
    expect(logo.closest("a")).toHaveAttribute("href", ROUTES.HOME);

    // Check left side navigation links
    NAVBAR_DETAILS.NAVLINKS_LEFT_SIDE.forEach(({ label, href }) => {
      const link = screen.getByText(label);
      expect(link).toBeInTheDocument();
      expect(link.closest("a")).toHaveAttribute("href", href);
    });

    // Check right side navigation links
    NAVBAR_DETAILS.NAVLINKS_RIGHT_SIDE.forEach(({ label, href }) => {
      const link = screen.getByText(label);
      expect(link).toBeInTheDocument();
      expect(link.closest("a")).toHaveAttribute("href", href);
    });
  });

  it("highlights current page in navigation", () => {
    render(<NavbarDesktop {...defaultProps} pathname="/movies" />);

    const activeLink = screen.getByText("Movies").closest("a");
    expect(activeLink).toHaveClass("font-bold");
  });

  it("handles search input changes", async () => {
    render(<NavbarDesktop {...defaultProps} />);

    const searchInput = screen.getByRole("searchbox");
    fireEvent.change(searchInput, { target: { value: "test movie" } });

    // Wait for debounce
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(mockReplace).toHaveBeenCalledWith("/search/?title=test+movie");
  });
});
