import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchDialog from "@/components/search.dialog";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock use-debounce
jest.mock("use-debounce", () => ({
  useDebouncedCallback: (callback: (...args: unknown[]) => unknown) => callback,
}));

describe("SearchDialog", () => {
  const mockReplace = jest.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it("renders search button with icon", () => {
    render(<SearchDialog />);

    const searchButton = screen.getByRole("button");
    const searchIcon = searchButton.querySelector("svg");

    expect(searchButton).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon).toHaveAttribute("aria-hidden", "true");
  });

  it("opens dialog when search button is clicked", () => {
    render(<SearchDialog />);

    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);

    const searchInput = screen.getByPlaceholderText("Search movie title");
    expect(searchInput).toBeInTheDocument();
  });

  it("closes dialog when close button is clicked", () => {
    render(<SearchDialog />);

    // Open dialog
    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);

    // Click close button
    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    // Check if dialog is closed
    const searchInput = screen.queryByPlaceholderText("Search movie title");
    expect(searchInput).not.toBeInTheDocument();
  });

  it("updates URL with search parameter when searching", () => {
    render(<SearchDialog />);

    // Open dialog
    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);

    // Type in search input
    const searchInput = screen.getByPlaceholderText("Search movie title");
    act(() => {
      fireEvent.change(searchInput, { target: { value: "Batman" } });
    });

    // Check if router.replace was called with correct URL
    expect(mockReplace).toHaveBeenCalledWith("/search/?title=Batman");
  });

  it("closes dialog after search is performed", () => {
    render(<SearchDialog />);

    // Open dialog
    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);

    // Perform search
    const searchInput = screen.getByPlaceholderText("Search movie title");
    fireEvent.change(searchInput, { target: { value: "Batman" } });

    // Check if dialog is closed
    const dialogContent = screen.queryByPlaceholderText("Search movie title");
    expect(dialogContent).not.toBeInTheDocument();
  });

  it("renders dialog with correct accessibility attributes", () => {
    render(<SearchDialog />);

    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveClass("max-w-md rounded-lg");
  });
});
