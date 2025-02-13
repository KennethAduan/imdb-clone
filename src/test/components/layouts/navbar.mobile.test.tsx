/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import NavbarMobile from "@/components/layouts/navbar.mobile";
import { APP_NAME, NAVBAR_DETAILS, ROUTES } from "@/constants";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // Convert boolean priority to string if present
    const modifiedProps = {
      ...props,
      priority: props.priority?.toString() || undefined,
    };
    return <img {...modifiedProps} alt="Moviesflix logo" />;
  },
}));
// Mock the utils module
jest.mock("@/lib/utils", () => ({
  cn: (...inputs: string[]) => inputs.join(" "),
}));

describe("NavbarMobile", () => {
  const defaultProps = {
    pathname: "/",
    isScrolled: false,
  };

  it("renders mobile navigation elements", () => {
    render(<NavbarMobile {...defaultProps} />);

    // Check logo
    expect(screen.getByAltText("Moviesflix logo")).toBeInTheDocument();

    // Check menu button
    expect(screen.getByTestId("menu-button")).toBeInTheDocument();
  });

  it("opens sheet when menu button is clicked", () => {
    render(<NavbarMobile {...defaultProps} />);

    // Click menu button
    fireEvent.click(screen.getByTestId("menu-button"));

    // Check if sheet content is visible
    expect(screen.getByText(APP_NAME)).toBeInTheDocument();
  });

  it("renders navigation links in sheet", () => {
    render(<NavbarMobile {...defaultProps} />);

    // Open sheet
    fireEvent.click(screen.getByTestId("menu-button"));

    // Check all navigation links
    NAVBAR_DETAILS.NAVLINKS_LEFT_SIDE.forEach(({ label, href }) => {
      const link = screen.getByText(label);
      expect(link).toBeInTheDocument();
      expect(link.closest("a")).toHaveAttribute("href", href);
    });
  });

  it("shows user icon when signed in", () => {
    render(<NavbarMobile {...defaultProps} />);

    const userIcon = screen.getByRole("link", { name: "" });
    expect(userIcon).toHaveAttribute("href", ROUTES.WATCHLIST);
  });

  it("applies correct styling when pathname matches link", () => {
    render(<NavbarMobile {...defaultProps} />);

    // Open sheet
    fireEvent.click(screen.getByTestId("menu-button"));

    // Get home link (should be active since pathname is "/")
    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveClass(
      "flex",
      "gap-y-12",
      "text-lg",
      "cursor-pointer",
      "items-center",
      "justify-center",
      "bg-gradient-to-b",
      "from-primary/60",
      "to-primary",
      "bg-clip-text",
      "pb-1.5",
      "text-[16px]",
      "font-bold",
      "text-transparent",
      "transition-all",
      "hover:font-bold"
    );
  });

  it("closes sheet when navigation link is clicked", () => {
    render(<NavbarMobile {...defaultProps} />);

    // Open sheet
    fireEvent.click(screen.getByTestId("menu-button"));

    // Click a navigation link
    fireEvent.click(
      screen.getByText(NAVBAR_DETAILS.NAVLINKS_LEFT_SIDE[0].label)
    );

    // Check if sheet is closed (APP_NAME should not be visible)
    expect(screen.queryByText(APP_NAME)).not.toBeInTheDocument();
  });
});
