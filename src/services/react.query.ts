import { useQuery } from "@tanstack/react-query";
import { getLatestOMDBDataByType, getOMDBDataBySearch } from "./axios";
import {
  LatestResponse,
  SearchResponseParams,
} from "@/types/data.fetching.type";
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
export { useLatestOMDBDataByType, useOMDBDataBySearch };
