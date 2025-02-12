import { API_FOLDER_DETAILS } from "@/constants";
import { NextResponse } from "next/server";
import { config } from "@/config/environment";
import { ParamsRequest } from "../../shared/types";
import { isEmptyString, isFalse, isUndefined } from "@/lib/utils";
import logger from "@/lib/logger";
import { EpisodeResponse } from "@/types/omdb.types";
import { handleError } from "@/lib/server-utils";

const getEpisodeById = async ({ id }: ParamsRequest) => {
  try {
    const response = await fetch(
      `${config.api.omdb.baseUrl}?apikey=${config.api.omdb.key}&type=${API_FOLDER_DETAILS.TYPE.EPISODE}&i=${id}`
    );

    if (isFalse(response.ok)) {
      throw new Error(`Failed to fetch episode details`);
    }

    const data: EpisodeResponse = await response.json();

    if (isFalse(data.success)) {
      throw new Error(data.error?.message || "Episode not found");
    }

    return data;
  } catch (error) {
    logger.error("Error fetching episode details:", { error, episodeId: id });
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
      return handleError("Episode ID is required", 400);
    }
    const episode = await getEpisodeById({ id });
    logger.info("Episode details:", { episode });
    return NextResponse.json({
      success: true,
      data: episode,
    });
  } catch (error) {
    logger.error("Error in episode GET endpoint:", {
      error,
      episodeId: id,
    });
    return handleError(error);
  }
};
