"use client";

import React, { useCallback, useTransition, memo } from "react";

import { APPLICATION_TYPES, ROUTES } from "@/constants";
import ErrorData from "../error.data";
import MoviesSeriesCardSkeleton from "../loaders/movies.series.card.skeleton";
import PagePagination from "../page.pagination";
import MovieSeriesCard from "../cards/movie.series.card";
import { Data } from "@/types/omdb.types";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useLatestOMDBDataByType from "@/hooks/use.latest.omdb.data.by.type";

const Movies = memo(() => {
  const params = useSearchParams();
  const page = params.get("page") || "1";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    data: moviesData,
    isLoading,
    error,
  } = useLatestOMDBDataByType({
    type: APPLICATION_TYPES.MOVIE,
    page: page,
    year: "",
    plot: "",
  });

  const handleCardClick = useCallback(
    (imdbID: string, type: string) => {
      startTransition(() => {
        if (
          type === APPLICATION_TYPES.MOVIE ||
          type === APPLICATION_TYPES.GAME
        ) {
          router.push(`${ROUTES.MOVIE}/${imdbID}`);
        } else if (type === APPLICATION_TYPES.SERIES) {
          router.push(`${ROUTES.TV}/${imdbID}`);
        }
      });
    },
    [router]
  );

  if (isLoading) {
    return <MoviesSeriesCardSkeleton data-testid="movies-series-skeleton" />;
  }
  if (error) {
    return <ErrorData error={error} data-testid="error-message" />;
  }

  return (
    <section
      data-testid="search-results-section"
      className="w-full lg:max-w-[95%] sm:max-w-[90%] 2xl:max-w-[45%] mx-auto mb-4 mt-24"
    >
      <PagePagination />
      <div
        data-testid="search-results-grid"
        className={`grid grid-cols-1 gap-6 p-6 md:grid-cols-5 ${
          isPending ? "opacity-70" : ""
        }`}
      >
        {moviesData?.Search?.map((item) => (
          <MovieSeriesCard
            showBookmark
            key={item.imdbID}
            showYear
            content={item as Data}
            onClick={() => handleCardClick(item.imdbID, item.Type)}
            data-testid={`movie-card-${item.imdbID}`}
          />
        ))}
      </div>
      <div data-testid="mobile-pagination" className="block sm:hidden">
        <PagePagination />
      </div>
    </section>
  );
});

Movies.displayName = "Movies";

export default Movies;
