import { config } from "@/config/environment";
import { APPLICATION_TYPES } from "@/constants";
import axios from "axios";
import { MovieResponse } from "@/types/omdb.types";
import MovieDetails from "@/components/sections/movie.details";
import { Suspense } from "react";
import MovieSeriesDetailsSkeleton from "@/components/loaders/movie.series.details.skeleton";

const getMovieById = async (id: string) => {
  const res = await axios.get<MovieResponse>(
    `${config.api.baseUrl}/${APPLICATION_TYPES.MOVIE}/${id}`
  );
  const data = await res.data;
  return data;
};

const MoviePageById = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;
  const movie = await getMovieById(id);

  return (
    <Suspense key={movie.data.imdbID} fallback={<MovieSeriesDetailsSkeleton />}>
      <MovieDetails movie={movie.data} />
    </Suspense>
  );
};

export default MoviePageById;
