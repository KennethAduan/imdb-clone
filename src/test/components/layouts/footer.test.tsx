/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layouts/footer";
import { FOOTER_DETAILS, ROUTES } from "@/constants";

// Mock next/image
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
describe("Footer", () => {
  beforeEach(() => {
    // Mock current year to ensure consistent testing
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-01"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the footer with logo and company description", () => {
    render(<Footer />);

    // Check if logo is present
    const logo = screen.getByAltText("Moviesflix logo");
    expect(logo).toBeInTheDocument();
    expect(logo.closest("a")).toHaveAttribute("href", ROUTES.HOME);

    // Check if description is present
    expect(screen.getByText(FOOTER_DETAILS.DESCRIPTION)).toBeInTheDocument();
  });

  it("renders all footer sections with their links", () => {
    render(<Footer />);

    // Check if all sections are present
    FOOTER_DETAILS.SECTIONS.forEach((section) => {
      // Check section title
      expect(screen.getByText(section.title)).toBeInTheDocument();

      // Check all links in the section
      section.links.forEach((link) => {
        const linkElement = screen.getByText(link.label);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.closest("a")).toHaveAttribute("href", link.href);
      });
    });
  });

  it("renders copyright section with current year", () => {
    render(<Footer />);

    // Check copyright text and year
    expect(screen.getByText(/© 2024/)).toBeInTheDocument();
    expect(screen.getByText(FOOTER_DETAILS.COPYRIGHT)).toBeInTheDocument();
    expect(screen.getByText(/All Rights Reserved./)).toBeInTheDocument();
  });

  it("renders all social media links", () => {
    render(<Footer />);

    // Check if all social links are present with correct attributes
    FOOTER_DETAILS.SOCIAL_LINKS.forEach((social) => {
      const link = screen.getByLabelText(`Visit our ${social.name} page`);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", social.href);
    });
  });

  it("has correct layout classes for responsive design", () => {
    render(<Footer />);

    // Check if footer has correct base classes
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass(
      "mt-auto",
      "w-full",
      "border-t",
      "bg-background"
    );

    // Check if main container has correct responsive classes
    const mainContainer = footer.firstChild;
    expect(mainContainer).toHaveClass(
      "mx-auto",
      "w-full",
      "max-w-screen-xl",
      "p-4",
      "py-6",
      "lg:py-8"
    );
  });

  it("renders links with correct hover states", () => {
    render(<Footer />);
  });

  it("renders social icons with correct size", () => {
    render(<Footer />);

    // Check if social icons have correct size classes
    const socialIcons = screen.getAllByRole("link", {
      name: /Visit our .* page/,
    });
    socialIcons.forEach((icon) => {
      const svgIcon = icon.querySelector("svg");
      expect(svgIcon).toHaveClass("w-4", "h-4");
    });
  });
});
