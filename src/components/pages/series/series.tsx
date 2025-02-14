"use client";

import React, { useCallback, useTransition, memo } from "react";
import { APPLICATION_TYPES, ROUTES } from "@/constants";
import { Data } from "@/types/omdb.types";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useLatestOMDBDataByType from "@/hooks/use.latest.omdb.data.by.type";
import MovieSeriesCard from "@/components/cards/movie.series.card";
import ErrorData from "@/components/error.data";
import MoviesSeriesCardSkeleton from "@/components/loaders/movies.series.card.skeleton";
import PagePagination from "@/components/page.pagination";

const Series = memo(() => {
  const params = useSearchParams();
  const page = params.get("page") || "1";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    data: seriesData,
    isLoading,
    error,
  } = useLatestOMDBDataByType({
    type: APPLICATION_TYPES.SERIES,
    page: page,
    year: "",
    plot: "",
  });

  const handleCardClick = useCallback(
    (imdbID: string) => {
      startTransition(() => {
        router.push(`${ROUTES.SERIES}/${imdbID}`);
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
      className="w-full max-w-[90%] md:max-w-[80%] mx-auto mb-4 mt-24"
    >
      <PagePagination />
      <div
        data-testid="search-results-grid"
        className={`grid grid-cols-1 gap-6 p-6 md:grid-cols-5 ${
          isPending ? "opacity-70" : ""
        }`}
      >
        {seriesData?.Search?.map((item) => (
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
  );
});

Series.displayName = "Series";

export default Series;
