import MovieSeriesDetailsSkeleton from "@/components/loaders/movie.series.details.skeleton";
import { config } from "@/config/environment";
import { APPLICATION_TYPES } from "@/constants";
import { SeriesResponse } from "@/types/omdb.types";
import { handleError } from "@/lib/server-utils";
import React, { Suspense } from "react";
import SeriesDetails from "@/components/pages/series/series.details";
import { checkIfInWatchlist } from "@/server-actions/user.action";
import { getSession } from "@/lib/jwt";
import { PageProps } from "@/types/page.type";
// Parallel data fetching function
const getSeriesData = async (id: string, userId?: string) => {
  try {
    const [seriesResponse, watchlistStatus] = await Promise.all([
      fetch(`${config.api.baseUrl}/${APPLICATION_TYPES.SERIES}/${id}`, {
        next: { revalidate: 3600 },
      }),
      checkIfInWatchlist(userId ?? "", id),
    ]);

    if (!seriesResponse.ok) {
      handleError(Error(seriesResponse.statusText), seriesResponse.status);
    }

    const seriesData: SeriesResponse = await seriesResponse.json();
    return { seriesData, isInWatchlist: watchlistStatus.success };
  } catch (error) {
    handleError(error as Error, 500);
  }
};

const TvShowById = async ({ params }: PageProps) => {
  const id = (await params).id;
  const user = await getSession();
  const data = await getSeriesData(id, user?.userId);

  if (!data) return null;

  const { seriesData, isInWatchlist } = data;

  return (
    <Suspense fallback={<MovieSeriesDetailsSkeleton />}>
      <SeriesDetails
        series={seriesData.data}
        userId={user?.userId ?? ""}
        isInWatchlist={isInWatchlist}
      />
    </Suspense>
  );
};

export default TvShowById;
