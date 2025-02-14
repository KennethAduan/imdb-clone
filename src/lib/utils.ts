import { API_FOLDER_DETAILS } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Client-side utilities
export const isFalse = (value: boolean) => {
  return value === false;
};

export const isTrue = (value: boolean) => {
  return value === true;
};

export const isEmptyObject = (value: object) => {
  return Object.keys(value).length === 0;
};

export const isEmptyArray = (value: unknown[]) => {
  return value.length === 0;
};

export const isEmptyString = (value: string) => {
  return value === "";
};

export const isUndefined = (value: unknown) => {
  return value === undefined;
};

export const isNull = (value: unknown) => {
  return value === null;
};

export const isFalseString = (value: string) => {
  return value === "False";
};

// Get random search term from popular searches
export const getRandomSearchTerm = () => {
  const randomIndex = Math.floor(
    Math.random() * API_FOLDER_DETAILS.POPULAR_SEARCHES.length
  );
  return API_FOLDER_DETAILS.POPULAR_SEARCHES[randomIndex];
};

export const getYear = () => {
  const currentYear = new Date().getFullYear();
  return currentYear.toString();
};
