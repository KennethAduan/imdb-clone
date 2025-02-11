import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useTheme } from "next-themes";
import ToggleTheme from "@/components/toggle.mode";

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

// Mock the utils module
jest.mock("@/lib/utils", () => ({
  cn: (...inputs: string[]) => inputs.join(" "),
}));

describe("ToggleTheme", () => {
  const mockUseTheme = useTheme as jest.Mock;

  beforeEach(() => {
    // Reset mock before each test
    mockUseTheme.mockReset();
  });

  it("renders the moon icon in light mode", () => {
    mockUseTheme.mockReturnValue({ theme: "light", setTheme: jest.fn() });
    render(<ToggleTheme />);

    const moonIcon = screen.getByTestId("moon-icon");
    expect(moonIcon).toBeInTheDocument();
  });

  it("renders the sun icon in dark mode", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: jest.fn() });
    render(<ToggleTheme />);

    const sunIcon = screen.getByTestId("sun-icon");
    expect(sunIcon).toBeInTheDocument();
  });

  it("toggles theme from light to dark when clicked", () => {
    const setTheme = jest.fn();
    mockUseTheme.mockReturnValue({ theme: "light", setTheme });

    render(<ToggleTheme />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("toggles theme from dark to light when clicked", () => {
    const setTheme = jest.fn();
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme });

    render(<ToggleTheme />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(setTheme).toHaveBeenCalledWith("light");
  });

  it("has proper accessibility attributes", () => {
    mockUseTheme.mockReturnValue({ theme: "light", setTheme: jest.fn() });
    render(<ToggleTheme />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Toggle theme");
  });
});
