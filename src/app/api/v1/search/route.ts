import { config } from "@/config/environment";
import { handleError } from "@/lib/server-utils";
import { isFalse, isUndefined } from "@/lib/utils";
import { SearchResponse } from "@/types/omdb.types";
import { NextResponse } from "next/server";

const getSearchResults = async ({
  searchTerm,
  page,
}: {
  searchTerm: string;
  page?: string;
}) => {
  try {
    const response = await fetch(
      `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&s=${searchTerm}&page=${page}`
    );

    if (isFalse(response.ok)) {
      return handleError("Failed to fetch search results", 500);
    }

    const SearchResponseData: SearchResponse = await response.json();

    if (isUndefined(SearchResponseData)) {
      return {
        success: false,
        data: {
          message: "No results found",
        },
      };
    }
    return SearchResponseData;
  } catch (error) {
    console.error("Error fetching search results:", { error, searchTerm });
    return handleError(
      error instanceof Error ? error.message : "Failed to fetch search results",
      500
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("s");
    const page = searchParams.get("page");
    if (!searchTerm || searchTerm.length < 2) {
      return handleError("Search term must be at least 2 characters long", 400);
    }

    const response = await getSearchResults({ searchTerm, page: page ?? "" });

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error in search route:", { error });
    return handleError(
      error instanceof Error ? error.message : "Internal server error",
      500
    );
  }
};
