import { config } from "@/config/environment";
import { NextResponse } from "next/server";
import {
  getRandomSearchTerm,
  isEmptyString,
  isFalse,
  isUndefined,
} from "@/lib/utils";
import { OmdbParams } from "../shared/types";
import { OMDBResponse } from "@/types/omdb.types";
import { handleError } from "@/lib/server-utils";
// Get default parameters
const getDefaultParams = (searchParams: URLSearchParams): OmdbParams => {
  const currentYear = (new Date().getFullYear() - 1).toString();

  return {
    page: searchParams.get("page") || "1",
    type: searchParams.get("type") || "",
    year: searchParams.get("y") || currentYear,
    searchTerm: getRandomSearchTerm(),
  };
};

// Build OMDB API URL with parameters
const buildOmdbUrl = (params: OmdbParams): URL => {
  const url = new URL(config.api.omdb.baseUrl || "");

  url.searchParams.append("apikey", config.api.omdb.key || "");
  url.searchParams.append("s", params.searchTerm);
  url.searchParams.append("type", params.type);
  url.searchParams.append("y", params.year);
  url.searchParams.append("page", params.page);

  return url;
};

export const GET = async (req: Request) => {
  try {
    // Validate request URL
    if (isUndefined(req.url) || isEmptyString(req.url)) {
      return handleError("Invalid request URL", 400);
    }
    const { searchParams } = new URL(req.url);
    const params = getDefaultParams(searchParams);
    const url = buildOmdbUrl(params);

    try {
      const response = await fetch(url);

      if (isFalse(response.ok)) {
        throw new Error(`OMDB API responded with status: ${response.status}`);
      }

      const data: OMDBResponse = await response.json();

      // Add null check before checking array length
      if (!data || !data.Search) {
        return handleError("No results found", 400);
      }

      // Only check if empty after confirming array exists
      if (Array.isArray(data.Search) && data.Search.length === 0) {
        return handleError("No results found", 400);
      }

      return NextResponse.json({
        ...data,
      });
    } catch (fetchError) {
      console.error("OMDB API fetch error:", fetchError);
      return handleError(fetchError, 503);
    }
  } catch (error) {
    console.error("General error in OMDB route:", error);
    return handleError(error);
  }
};
