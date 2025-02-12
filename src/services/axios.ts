import { API_URL } from "@/constants";
import { LatestResponse } from "@/types/data.fetching.type";
import { OMDBResponse } from "@/types/omdb.types";
import axios from "axios";

const getLatestOMDBDataByType = async ({
  type,
  page,
  year,
  plot,
}: LatestResponse) => {
  try {
    const response = await axios<OMDBResponse>(
      `${API_URL}/omdb?type=${type}&page=${page}&y=${year}&plot=${plot}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data from OMDB API");
  }
};

export { getLatestOMDBDataByType };
