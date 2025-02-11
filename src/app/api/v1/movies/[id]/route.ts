import { API_FOLDER_DETAILS } from "@/constants";
import { NextResponse } from "next/server";
import { config } from "@/config/environment";
import { ParamsRequest } from "../../shared/types";
import { handleError, isEmptyString, isFalse, isUndefined } from "@/lib/utils";
import logger from "@/lib/logger";
import { MovieResponse } from "@/types/omdb.types";

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
    logger.error("Error fetching movie details:", { error, movieId: id });
    throw error;
  }
};

export const GET = async (
  req: Request,
  { params }: { params: ParamsRequest }
) => {
  const id = (await params).id;
  try {
    if (isUndefined(id) || isEmptyString(id)) {
      return handleError("Movie ID is required", 400);
    }

    const movie = await getMovieById({ id });
    logger.info("Movie details:", { movie });
    return NextResponse.json({
      success: true,
      data: movie,
    });
  } catch (error) {
    logger.error("Error in movie GET endpoint:", {
      error,
      movieId: id,
    });
    return handleError(error);
  }
};
