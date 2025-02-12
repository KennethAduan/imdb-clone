import { API_URL } from "@/constants";
import {
  LatestResponse,
  SearchResponseParams,
} from "@/types/data.fetching.type";
import { OMDBResponse, SearchResponse } from "@/types/omdb.types";
import axios from "axios";

const getLatestOMDBDataByType = async ({
  type = "",
  page = "1",
  year = "",
  plot = "",
}: LatestResponse) => {
  try {
    const response = await axios<OMDBResponse>(
      `${API_URL}/omdb?type=${type}&page=${page}&y=${year}&plot=${plot}`
    );

    if (response.data.Response === "True") {
      return response.data;
    }

    throw new Error(response.data.error?.message || "No results found");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || `Network error: ${error.message}`
      );
    }
    throw error;
  }
};

const getOMDBDataBySearch = async ({
  search = "",
  page = "",
}: SearchResponseParams) => {
  try {
    const url = `${API_URL}/search?s=${search}&page=${page}`;

    const response = await axios<SearchResponse>(url);

    if (response.data.data.Response === "False") {
      throw new Error(response.data.data?.Error || "No results found");
    }

    return response.data.data.Search;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.Error ||
          error.response?.data?.message ||
          `Network error: ${error.message}`
      );
    }
    throw error;
  }
};

export { getLatestOMDBDataByType, getOMDBDataBySearch };
