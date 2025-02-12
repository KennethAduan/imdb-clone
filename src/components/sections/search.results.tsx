"use client";
import { SearchResponseParams } from "@/types/data.fetching.type";
import { useOMDBDataBySearch } from "@/services/react.query";
import React, { memo, useCallback, useTransition } from "react";
import MovieSeriesCard from "../movie.series.card";
import { Data } from "@/types/omdb.types";
import { Skeleton } from "@/components/ui/skeleton";
import { XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { APPLICATION_TYPES, ROUTES } from "@/constants";
import PagePagination from "../page.pagination";

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
          router.push(`${ROUTES.TV}/${imdbID}`);
        }
      });
    },
    [router]
  );

  if (isLoading) {
    return (
      <section className="w-full lg:max-w-[95%] sm:max-w-[90%] 2xl:max-w-[45%] mx-auto mb-4 mt-24">
        <div className="grid grid-cols-1 gap-6 p-6 mt-16 md:mt-32 md:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-[2/3] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-3 w-[60%]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full lg:max-w-[95%] sm:max-w-[90%] 2xl:max-w-[45%] mx-auto mb-4 mt-24">
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-8">
          <XCircle className="w-16 h-16 text-red-500 animate-pulse" />
          <div className="text-center">
            <p className="text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "An unknown error occurred"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!searchResultsData || searchResultsData.length === 0) {
    return (
      <section className="w-full lg:max-w-[95%] sm:max-w-[90%] 2xl:max-w-[45%] mx-auto mb-4 mt-24">
        <div className="flex items-center justify-center p-4">
          <div className="text-lg">
            No results found for &quot;{search}&quot;
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full lg:max-w-[95%] sm:max-w-[90%] 2xl:max-w-[45%] mx-auto mb-4 mt-24">
      <PagePagination />
      <div
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
          />
        ))}
      </div>
      <div className="block sm:hidden">
        <PagePagination />
      </div>
    </section>
  );
});

SearchResults.displayName = "SearchResults";

export default SearchResults;
