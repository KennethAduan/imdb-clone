import { useQuery } from "@tanstack/react-query";
import { getLatestOMDBDataByType } from "./axios";
import { LatestResponse } from "@/types/data.fetching.type";
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
    queryKey: ["latest-omdb-data-by-type", type, page, year, plot],
    queryFn: () => getLatestOMDBDataByType({ type, page, year, plot }),
  });
};

export { useLatestOMDBDataByType };
