import { API_FOLDER_DETAILS } from "@/constants";
import { NextResponse } from "next/server";
import { config } from "@/config/environment";
import { ParamsRequest } from "../../shared/types";
import { handleError, isUndefined, isFalse, isEmptyString } from "@/lib/utils";
import logger from "@/lib/logger";
import { SeriesResponse } from "@/types/omdb.types";

const getSeriesById = async ({ id }: ParamsRequest) => {
  try {
    const response = await fetch(
      `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&type=${API_FOLDER_DETAILS.TYPE.SERIES}&i=${id}`
    );

    if (isFalse(response.ok)) {
      throw new Error(`Failed to fetch series details`);
    }

    const data: SeriesResponse = await response.json();

    if (isFalse(data.success)) {
      throw new Error(data.error?.message || "Series not found");
    }

    return data;
  } catch (error) {
    logger.error("Error fetching series details:", { error, seriesId: id });
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
      return handleError("Series ID is required", 400);
    }

    const series = await getSeriesById({ id });

    logger.info("Series details fetched successfully", {
      seriesId: id,
    });

    return NextResponse.json({
      success: true,
      data: series,
    });
  } catch (error) {
    logger.error("Error in series GET endpoint:", {
      error,
      seriesId: id,
    });
    return handleError(error);
  }
};
