import { APPLICATION_TYPES } from "@/constants";
import MovieDetails from "@/components/pages/movies/movie.details";
import { Suspense } from "react";
import MovieSeriesDetailsSkeleton from "@/components/loaders/movie.series.details.skeleton";
import { MovieResponse } from "@/types/omdb.types";
import { handleError } from "@/lib/server-utils";
import { getSession } from "@/lib/jwt";
import { checkIfInWatchlist } from "@/server-actions/user.action";
import { PageProps } from "@/types/page.type";
// Parallel data fetching function
const getMovieData = async (id: string, userId: string | undefined) => {
  try {
    // Add more robust error logging
    console.log(`Fetching movie data for ID: ${id}`);

    const movieUrl = `${process.env.NEXT_PUBLIC_API_URL}/${APPLICATION_TYPES.MOVIE}/${id}`;
    console.log(`API URL: ${movieUrl}`);

    const [movieResponse, watchlistStatus] = await Promise.all([
      fetch(movieUrl, {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
      checkIfInWatchlist(userId ?? "", id),
    ]);

    if (!movieResponse.ok) {
      console.error(
        `Movie API error: ${movieResponse.status} ${movieResponse.statusText}`
      );
      handleError(Error(movieResponse.statusText), movieResponse.status);
    }

    const movieData: MovieResponse = await movieResponse.json();
    return { movieData, isInWatchlist: watchlistStatus.success };
  } catch (error) {
    console.error("Error fetching movie data:", error);
    handleError(error as Error, 500);
  }
};

export const generateMetadata = async ({ params }: PageProps) => {
  const id = (await params).id;
  const movieData = await getMovieData(id, "");
  return {
    title: movieData?.movieData?.data?.Title ?? "Movie Details",
  };
};

const MoviePageById = async ({ params }: PageProps) => {
  try {
    const id = (await params).id;
    const user = await getSession();

    if (!id) {
      console.error("No movie ID provided");
      return null;
    }

    const data = await getMovieData(id, user?.userId);

    if (!data || !data.movieData?.data) {
      console.error("No movie data returned");
      return null;
    }

    const { movieData, isInWatchlist } = data;

    return (
      <Suspense
        key={movieData.data.imdbID}
        fallback={<MovieSeriesDetailsSkeleton />}
      >
        <MovieDetails
          movie={movieData.data}
          userId={user?.userId ?? ""}
          isInWatchlist={isInWatchlist}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Error in MoviePageById:", error);
    return null;
  }
};

export default MoviePageById;
