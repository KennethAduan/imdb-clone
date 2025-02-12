"use client";

import { useLatestOMDBDataByType } from "@/services/react.query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { LATEST_MOVIES_CAROUSEL_DETAILS } from "@/constants";
import { Data } from "@/types/omdb.types";
import ErrorRefetch from "@/components/error.refetch";
import MovieCard from "../movie.card";
import MoviesSeriesSkeleton from "../movies.series.skeleton";

const HomeLatestMoviesCarousel = () => {
  const {
    data: latestMovies,
    isLoading,
    error,
    refetch,
  } = useLatestOMDBDataByType({
    type: "movie",
    year: "2024",
  });

  if (error)
    return (
      <ErrorRefetch
        error={error}
        refetch={refetch}
        buttonText={LATEST_MOVIES_CAROUSEL_DETAILS.RETRY_BUTTON_TEXT}
      />
    );

  return (
    <section className="w-full py-12 flex justify-center">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">
              {LATEST_MOVIES_CAROUSEL_DETAILS.TITLE}
            </h2>
            <p className="text-muted-foreground">
              {LATEST_MOVIES_CAROUSEL_DETAILS.DESCRIPTION}
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {isLoading
                ? // Skeleton Loading State
                  Array.from({ length: 6 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-4 basis-[250px] md:basis-[200px] lg:basis-[250px]"
                    >
                      <MoviesSeriesSkeleton />
                    </CarouselItem>
                  ))
                : // Actual Content
                  latestMovies?.Search?.map((movie) => (
                    <CarouselItem
                      key={movie.imdbID}
                      className="pl-4 basis-[250px] md:basis-[200px] lg:basis-[250px]"
                    >
                      <MovieCard movie={movie as Data} onClick={() => {}} />
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HomeLatestMoviesCarousel;
