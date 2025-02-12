import { config } from "@/config/environment";
import logger from "@/lib/logger";
import { handleError } from "@/lib/server-utils";
import { isFalse, isFalseString } from "@/lib/utils";
import { SearchResponse } from "@/types/omdb.types";
import { NextResponse } from "next/server";

const getSearchResults = async ({ searchTerm }: { searchTerm: string }) => {
  try {
    const response = await fetch(
      `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&s=${searchTerm}`
    );

    if (isFalse(response.ok)) {
      return handleError("Failed to fetch search results", 500);
    }

    const SearchResponseData: SearchResponse = await response.json();

    if (isFalseString(SearchResponseData.Response)) {
      return {
        success: false,
        data: {
          message: SearchResponseData.Error,
        },
      };
    }
    return SearchResponseData;
  } catch (error) {
    logger.error("Error fetching search results:", { error, searchTerm });
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

    if (!searchTerm || searchTerm.length < 2) {
      return handleError("Search term must be at least 2 characters long", 400);
    }

    const response = await getSearchResults({ searchTerm });

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    logger.error("Error in search route:", { error });
    return handleError(
      error instanceof Error ? error.message : "Internal server error",
      500
    );
  }
};
