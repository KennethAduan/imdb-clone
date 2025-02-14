import MovieSeriesDetailsSkeleton from "@/components/loaders/movie.series.details.skeleton";
import { config } from "@/config/environment";
import { APPLICATION_TYPES } from "@/constants";
import { SeriesResponse } from "@/types/omdb.types";
import { handleError } from "@/lib/server-utils";
import React, { Suspense } from "react";
import SeriesDetails from "@/components/pages/series/series.details";
import { checkIfInWatchlist } from "@/server-actions/user.action";
import { Metadata } from "next";
import { getSession } from "@/lib/jwt";

// Parallel data fetching function
const getSeriesData = async (id: string, userId: string | undefined) => {
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

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = (await params).id;
  const { seriesData } = (await getSeriesData(id, undefined)) ?? {};

  return {
    title: seriesData?.data.Title ?? "Series Details",
    description: seriesData?.data.Plot,
    openGraph: {
      images: [{ url: seriesData?.data.Poster ?? "" }],
    },
  };
}

const TvShowById = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;
  const user = await getSession();
  const data = await getSeriesData(id, user?.userId);

  if (!data) return null;

  const { seriesData, isInWatchlist } = data;
  console.log(seriesData);
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
