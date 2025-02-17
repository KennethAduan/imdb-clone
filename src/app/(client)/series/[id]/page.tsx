import MovieSeriesDetailsSkeleton from "@/components/loaders/movie.series.details.skeleton";
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
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${APPLICATION_TYPES.SERIES}/${id}`,
        {
          next: { revalidate: 3600 },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ),
      checkIfInWatchlist(userId ?? "", id),
    ]);

    if (!seriesResponse.ok) {
      console.error(
        `Series API error: ${seriesResponse.status} ${seriesResponse.statusText}`
      );
      handleError(Error(seriesResponse.statusText), seriesResponse.status);
    }

    const seriesData: SeriesResponse = await seriesResponse.json();
    return { seriesData, isInWatchlist: watchlistStatus.success };
  } catch (error) {
    console.error("Error fetching series data:", error);
    handleError(error as Error, 500);
  }
};

export const generateMetadata = async ({ params }: PageProps) => {
  const id = (await params).id;
  const seriesData = await getSeriesData(id, "");
  return {
    title: seriesData?.seriesData?.data?.Title ?? "Series Details",
  };
};

const TvShowById = async ({ params }: PageProps) => {
  const id = (await params).id;
  const user = await getSession();
  const data = await getSeriesData(id, user?.userId);

  if (!data) return null;

  const { seriesData, isInWatchlist } = data;

  return (
    <Suspense
      key={seriesData.data.imdbID}
      fallback={<MovieSeriesDetailsSkeleton />}
    >
      <SeriesDetails
        series={seriesData.data}
        userId={user?.userId ?? ""}
        isInWatchlist={isInWatchlist}
      />
    </Suspense>
  );
};

export default TvShowById;
