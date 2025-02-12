"use client";

import { useLatestOMDBDataByType } from "@/services/react.query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MoviesSeriesSkeleton from "../movies.series.skeleton";
import ErrorRefetch from "../error.refetch";
import MovieSeriesCard from "../movie.series.card";
import { Data } from "@/types/omdb.types";
import { API_FOLDER_DETAILS } from "@/constants";
import { getYear } from "@/lib/utils";

const LatestMoviesCarousel = () => {
  const currentYear = getYear();
  const {
    data: latestMovies,
    isLoading,
    error,
    refetch,
  } = useLatestOMDBDataByType({
    type: API_FOLDER_DETAILS.TYPE.MOVIE,
    year: currentYear,
  });

  if (error)
    return (
      <ErrorRefetch
        error={error}
        refetch={refetch}
        buttonText="Retry"
        data-testid="error-component"
      />
    );

  return (
    <section
      className="flex justify-center w-full py-12"
      data-testid="latest-movies-section"
    >
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2
              className="text-2xl font-bold tracking-tight"
              data-testid="section-title"
            >
              Latest Movies of {currentYear}
            </h2>
            <p
              className="text-muted-foreground"
              data-testid="section-description"
            >
              Discover the newest releases in cinema
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative" data-testid="carousel-container">
          {isLoading ? (
            <div className="flex gap-4" data-testid="loading-container">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="basis-[250px] md:basis-[200px] lg:basis-[250px]"
                >
                  <MoviesSeriesSkeleton
                    data-testid={`movie-skeleton-${index}`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              data-testid="movies-carousel"
            >
              <CarouselContent className="-ml-4">
                {latestMovies?.Search?.map((movie) => (
                  <CarouselItem
                    key={movie.imdbID}
                    className="pl-4 basis-[250px] md:basis-[200px] lg:basis-[250px]"
                    data-testid="carousel-item"
                  >
                    <MovieSeriesCard
                      data-testid={`movie-card-${movie.imdbID}`}
                      content={movie as Data}
                      onClick={() => {}}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                className="hidden md:flex -left-12"
                data-testid="carousel-previous"
              />
              <CarouselNext
                className="hidden md:flex -right-12"
                data-testid="carousel-next"
              />
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestMoviesCarousel;
