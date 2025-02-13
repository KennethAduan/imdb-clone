import { API_URL } from "@/constants";
import { LatestResponse } from "@/types/data.fetching.type";
import { OMDBResponse } from "@/types/omdb.types";
import { useQuery } from "@tanstack/react-query";
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

const useLatestOMDBDataByType = ({
  type,
  page,
  year,
  plot,
}: LatestResponse) => {
  return useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
    queryKey: ["latest-omdb-data-by-type", type, page, year, plot],
    queryFn: () => getLatestOMDBDataByType({ type, page, year, plot }),
  });
};

export default useLatestOMDBDataByType;
