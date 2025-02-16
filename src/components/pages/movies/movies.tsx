"use client";

import React, { useCallback, useTransition, memo } from "react";
import { AnimatePresence } from "framer-motion";

import { APPLICATION_TYPES, ROUTES } from "@/constants";
import ErrorData from "../../error.data";
import MoviesSeriesCardSkeleton from "../../loaders/movies.series.card.skeleton";
import PagePagination from "../../page.pagination";
import MovieSeriesCard from "../../cards/movie.series.card";
import { Data } from "@/types/omdb.types";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useLatestOMDBDataByType from "@/hooks/use.latest.omdb.data.by.type";
import NavigationLoader from "../../loaders/navigation.loader";
import { isTrue } from "@/lib/utils";

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
    (imdbID: string) => {
      startTransition(() => {
        router.push(`${ROUTES.MOVIE}/${imdbID}`);
      });
    },
    [router]
  );

  if (isTrue(isLoading)) {
    return <MoviesSeriesCardSkeleton data-testid="movies-series-skeleton" />;
  }
  if (error) {
    return <ErrorData error={error} data-testid="error-message" />;
  }

  return (
    <>
      <AnimatePresence>
        {isTrue(isPending) && <NavigationLoader />}
      </AnimatePresence>
      <section
        data-testid="search-results-section"
        className="w-full max-w-[90%] md:max-w-[80%] mx-auto mb-4 mt-24"
      >
        <PagePagination />
        <div
          data-testid="search-results-grid"
          className={`grid grid-cols-1 gap-6 p-6 md:grid-cols-5 ${
            isTrue(isPending) ? "opacity-70" : ""
          }`}
        >
          {moviesData?.Search?.map((item) => (
            <MovieSeriesCard
              key={item.imdbID}
              showYear
              content={item as Data}
              onClick={() => handleCardClick(item.imdbID)}
              data-testid={`movie-card-${item.imdbID}`}
            />
          ))}
        </div>
        <div data-testid="mobile-pagination" className="block sm:hidden">
          <PagePagination />
        </div>
      </section>
    </>
  );
});

Movies.displayName = "Movies";

export default Movies;
