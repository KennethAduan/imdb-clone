import { API_FOLDER_DETAILS } from "@/constants";
import { NextResponse } from "next/server";
import { config } from "@/config/environment";
import { ParamsRequest } from "../../shared/types";
import { isEmptyString, isFalse, isUndefined } from "@/lib/utils";

import { MovieResponse } from "@/types/omdb.types";
import { handleError } from "@/lib/server-utils";

const getMovieById = async ({ id }: ParamsRequest) => {
  try {
    const response = await fetch(
      `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&type=${API_FOLDER_DETAILS.TYPE.MOVIE}&i=${id}`
    );

    if (isFalse(response.ok)) {
      throw new Error(`Failed to fetch movie details`);
    }

    const data: MovieResponse = await response.json();

    if (isFalse(data.success)) {
      throw new Error(data.error?.message || "Movie not found");
    }

    return data;
  } catch (error) {
    console.error("Error fetching movie details:", { error, movieId: id });
    throw error;
  }
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    if (isUndefined(id) || isEmptyString(id)) {
      return handleError("Movie ID is required", 400);
    }

    const movie = await getMovieById({ id });
    console.info("Movie details:", { movie });
    return NextResponse.json({
      success: true,
      data: movie,
    });
  } catch (error) {
    console.error("Error in movie GET endpoint:", {
      error,
      movieId: id,
    });
    return handleError(error);
  }
}
