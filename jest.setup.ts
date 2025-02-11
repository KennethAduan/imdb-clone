/* eslint-disable @typescript-eslint/no-require-imports */

if (typeof window !== "undefined") {
  // DOM-specific setup
  require("@testing-library/jest-dom");

  // DOM-specific mocks
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
}

// Conditionally mock Request based on environment
if (typeof global !== "undefined" && !global.Request) {
  global.Request = class Request {
    constructor(input: RequestInfo | URL, init?: RequestInit) {
      if (typeof window !== "undefined") {
        return new window.Request(input, init);
      }
      // Basic mock for node environment
      return {
        url: typeof input === "string" ? input : input.toString(),
        method: init?.method || "GET",
        headers: init?.headers || {},
        body: init?.body,
      } as any;
    }
  } as any;
}

// Add any non-DOM specific setup here
