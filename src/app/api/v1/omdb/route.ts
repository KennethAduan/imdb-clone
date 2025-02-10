import { config } from "@/config/environment";
import { NextResponse } from "next/server";
import { API_FOLDER_DETAILS } from "@/constants";
import { isEmptyObject } from "@/utils";

type OmdbParams = {
  page: string;
  type: string;
  year: string;
  searchTerm: string;
};

// Get random search term from popular searches
const getRandomSearchTerm = () => {
  const randomIndex = Math.floor(
    Math.random() * API_FOLDER_DETAILS.POPULAR_SEARCHES.length
  );
  return API_FOLDER_DETAILS.POPULAR_SEARCHES[randomIndex];
};

// Get default parameters
const getDefaultParams = (searchParams: URLSearchParams): OmdbParams => {
  const currentYear = (new Date().getFullYear() - 1).toString();

  return {
    page: searchParams.get("page") || "1",
    type: searchParams.get("type") || "movie",
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
    const { searchParams } = new URL(req.url);
    const params = getDefaultParams(searchParams);
    const url = buildOmdbUrl(params);

    const response = await fetch(url);
    const data = await response.json();
    if (isEmptyObject(data)) {
      return NextResponse.json({
        message: "No results found",
      });
    }
    return NextResponse.json({
      ...data,
      year: params.year,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch data from OMDB",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
