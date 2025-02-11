import { clsx, type ClassValue } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isFalse = (value: boolean) => {
  return value === false;
};

export const isTrue = (value: boolean) => {
  return value === true;
};

export const isEmptyObject = (value: object) => {
  return Object.keys(value).length === 0;
};

export const isEmptyArray = (value: []) => {
  return value.length === 0;
};

export const isEmptyString = (value: string) => {
  return value === "";
};

export const isUndefined = (value: unknown) => {
  return value === undefined;
};

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
