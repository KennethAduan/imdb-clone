import { useQuery } from "@tanstack/react-query";
import { SearchResponseParams } from "@/types/data.fetching.type";
import axios from "axios";
import { SearchResponse } from "@/types/omdb.types";

const getOMDBDataBySearch = async ({
  search = "",
  page = "",
}: SearchResponseParams) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/search?s=${search}&page=${page}`;

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

const useOMDBDataBySearch = ({
  search = "",
  page = "",
}: SearchResponseParams) => {
  return useQuery({
    queryKey: ["omdb-data-by-search", search, page],
    queryFn: () => getOMDBDataBySearch({ search, page }),
    retry: 1,
    enabled: Boolean(search) && search.length >= 3,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
    select: (data) => data || [],
  });
};

export default useOMDBDataBySearch;
