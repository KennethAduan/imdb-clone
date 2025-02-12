import { NextResponse } from "next/server";

// Handle errors for API responses
export function handleError(error: unknown, statusCode: number = 500) {
  return NextResponse.json(
    {
      success: false,
      message:
        typeof error === "string"
          ? error
          : error instanceof Error
          ? error.message
          : "Something went wrong",
    },
    { status: statusCode }
  );
}
