import { config } from "@/config/environment";
import { APPLICATION_TYPES } from "@/constants";
import MovieDetails from "@/components/pages/movies/movie.details";
import { Suspense } from "react";
import MovieSeriesDetailsSkeleton from "@/components/loaders/movie.series.details.skeleton";
import { MovieResponse } from "@/types/omdb.types";
import { handleError } from "@/lib/server-utils";
import { getSession } from "@/lib/jwt";
import { checkIfInWatchlist } from "@/server-actions/user.action";
import { Metadata } from "next";

// Parallel data fetching function
const getMovieData = async (id: string, userId: string | undefined) => {
  try {
    const [movieResponse, watchlistStatus] = await Promise.all([
      fetch(`${config.api.baseUrl}/${APPLICATION_TYPES.MOVIE}/${id}`, {
        next: { revalidate: 3600 },
      }),
      checkIfInWatchlist(userId ?? "", id),
    ]);
    if (!movieResponse.ok) {
      handleError(Error(movieResponse.statusText), movieResponse.status);
    }

    const movieData: MovieResponse = await movieResponse.json();
    return { movieData, isInWatchlist: watchlistStatus.success };
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
  const { movieData } = (await getMovieData(params.id, undefined)) ?? {};

  return {
    title: movieData?.data.Title ?? "Movie Details",
    description: movieData?.data.Plot,
    openGraph: {
      images: [{ url: movieData?.data.Poster ?? "" }],
    },
  };
}

const MoviePageById = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const user = await getSession();
  const data = await getMovieData(id, user?.userId);

  if (!data) return null;

  const { movieData, isInWatchlist } = data;

  return (
    <Suspense fallback={<MovieSeriesDetailsSkeleton />}>
      <MovieDetails
        movie={movieData.data}
        userId={user?.userId ?? ""}
        isInWatchlist={isInWatchlist}
      />
    </Suspense>
  );
};

export default MoviePageById;
