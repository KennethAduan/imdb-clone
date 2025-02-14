import { config } from "@/config/environment";
import { APPLICATION_TYPES } from "@/constants";
import MovieDetails from "@/components/sections/movie.details";
import { Suspense } from "react";
import MovieSeriesDetailsSkeleton from "@/components/loaders/movie.series.details.skeleton";
import { MovieResponse } from "@/types/omdb.types";
import { handleError } from "@/lib/server-utils";
import { getSession } from "@/lib/jwt";

const getMovieById = async (id: string) => {
  const res = await fetch(
    `${config.api.baseUrl}/${APPLICATION_TYPES.MOVIE}/${id}`,
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

const MoviePageById = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;
  const user = await getSession();
  const movie: MovieResponse = await getMovieById(id);

  return (
    <Suspense key={movie.data.imdbID} fallback={<MovieSeriesDetailsSkeleton />}>
      <MovieDetails movie={movie.data} userId={user?.userId ?? ""} />
    </Suspense>
  );
};

export default MoviePageById;
