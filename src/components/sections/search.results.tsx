"use client";

import { SearchResponseParams } from "@/types/data.fetching.type";

import React, { memo, useCallback, useTransition } from "react";
import MovieSeriesCard from "../cards/movie.series.card";
import { Data } from "@/types/omdb.types";
import { useRouter, useSearchParams } from "next/navigation";
import { APPLICATION_TYPES, ROUTES } from "@/constants";
import PagePagination from "../page.pagination";
import MoviesSeriesCardSkeleton from "../loaders/movies.series.card.skeleton";
import ErrorData from "../error.data";
import useOMDBDataBySearch from "@/hooks/use.omdb.data.by.search";

const SearchResults = memo(({ search }: SearchResponseParams) => {
  const params = useSearchParams();
  const page = params.get("page") || "1";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    data: searchResultsData,
    isLoading,
    error,
    isError,
  } = useOMDBDataBySearch({ search, page });

  const handleCardClick = useCallback(
    (imdbID: string, type: string) => {
      startTransition(() => {
        if (
          type === APPLICATION_TYPES.MOVIE ||
          type === APPLICATION_TYPES.GAME
        ) {
          router.push(`${ROUTES.MOVIE}/${imdbID}`);
        } else if (type === APPLICATION_TYPES.SERIES) {
          router.push(`${ROUTES.SERIES}/${imdbID}`);
        }
      });
    },
    [router]
  );

  if (isLoading) {
    return <MoviesSeriesCardSkeleton data-testid="movies-series-skeleton" />;
  }

  if (isError) {
    return <ErrorData error={error} data-testid="error-message" />;
  }

  if (!searchResultsData || searchResultsData.length === 0) {
    return (
      <section className="w-full max-w-[90%] md:max-w-[70%] mx-auto mb-4 mt-24">
        <div className="flex items-center justify-center p-4">
          <div className="text-lg">
            No results found for &quot;{search}&quot;
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      data-testid="search-results-section"
      className="w-full max-w-[90%] md:max-w-[70%] mx-auto mb-4 mt-24"
    >
      <PagePagination />
      <div
        data-testid="search-results-grid"
        className={`grid grid-cols-1 gap-6 p-6 md:grid-cols-5 ${
          isPending ? "opacity-70" : ""
        }`}
      >
        {searchResultsData.map((item) => (
          <MovieSeriesCard
            key={item.imdbID}
            showType
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

SearchResults.displayName = "SearchResults";

export default SearchResults;
