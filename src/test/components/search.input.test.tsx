import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "@/components/search.input";

describe("SearchInput", () => {
  it("renders with default placeholder", () => {
    render(<SearchInput />);

    const input = screen.getByRole("searchbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "The Dark Knight");
  });

  it("renders with custom placeholder", () => {
    render(<SearchInput placeholder="Search movies" />);

    const input = screen.getByRole("searchbox");
    expect(input).toHaveAttribute("placeholder", "Search movies");
  });

  it("renders with search icon", () => {
    render(<SearchInput />);

    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();
  });

  it("handles value changes", () => {
    const handleChange = jest.fn();
    render(<SearchInput value="" onChange={handleChange} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Batman" } });

    expect(handleChange).toHaveBeenCalledWith("Batman");
  });

  it("applies custom className", () => {
    render(<SearchInput className="custom-class" />);

    const input = screen.getByRole("searchbox");
    expect(input).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    render(<SearchInput />);

    const input = screen.getByRole("searchbox");
    expect(input).toHaveAttribute("aria-label", "Search input");
  });
});
