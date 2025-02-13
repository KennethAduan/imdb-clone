import MovieSeriesDetailsSkeleton from "@/components/loaders/movie.series.details.skeleton";
import SeriesDetails from "@/components/sections/series.details";
import { config } from "@/config/environment";
import { APPLICATION_TYPES } from "@/constants";
import { SeriesResponse } from "@/types/omdb.types";
import axios from "axios";
import React, { Suspense } from "react";

const getTvShowById = async (id: string) => {
  const res = await axios.get<SeriesResponse>(
    `${config.api.baseUrl}/${APPLICATION_TYPES.SERIES}/${id}`
  );
  const data = await res.data;
  return data;
};
const TvShowById = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;
  const tvShow = await getTvShowById(id);
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
