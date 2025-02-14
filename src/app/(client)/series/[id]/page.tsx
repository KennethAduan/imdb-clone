import MovieSeriesDetailsSkeleton from "@/components/loaders/movie.series.details.skeleton";
import { config } from "@/config/environment";
import { APPLICATION_TYPES } from "@/constants";
import { SeriesResponse } from "@/types/omdb.types";
import { handleError } from "@/lib/server-utils";
import React, { Suspense } from "react";
import SeriesDetails from "@/components/pages/series/series.details";

const getTvShowById = async (id: string) => {
  const res = await fetch(
    `${config.api.baseUrl}/${APPLICATION_TYPES.SERIES}/${id}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    handleError(Error(res.statusText), res.status);
  }
  const data = await res.json();
  return data;
};
const TvShowById = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;
  const tvShow: SeriesResponse = await getTvShowById(id);
  console.log(tvShow);
  return (
    <Suspense
      key={tvShow.data.imdbID}
      fallback={<MovieSeriesDetailsSkeleton />}
    >
      <SeriesDetails series={tvShow.data} />
    </Suspense>
  );
};

export default TvShowById;
