"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MoviesSeriesCarouselSkeleton from "../loaders/movies.series.carousel.skeleton";
import ErrorRefetch from "../error.refetch";
import MovieSeriesCard from "../cards/movie.series.card";
import { Data } from "@/types/omdb.types";
import {
  API_FOLDER_DETAILS,
  LATEST_MOVIES_CAROUSEL_DETAILS,
  ROUTES,
} from "@/constants";
import { getYear, isTrue } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useLatestOMDBDataByType from "@/hooks/use.latest.omdb.data.by.type";
import { useCallback, useTransition } from "react";
import NavigationLoader from "../loaders/navigation.loader";
import { AnimatePresence } from "framer-motion";

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
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCardClick = useCallback(
    (imdbID: string) => {
      startTransition(() => {
        router.push(`${ROUTES.MOVIE}/${imdbID}`);
      });
    },
    [router]
  );

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
    <>
      <AnimatePresence>
        {isTrue(isPending) && <NavigationLoader />}
      </AnimatePresence>
      <section
        className="flex justify-center w-full py-12"
        data-testid="latest-movies-section"
      >
        <div className="container">
          {/* Header */}
          <div className="flex items-center justify-between mx-4 mb-8 md:mx-0">
            <div className="space-y-1">
              <h2
                className="text-lg font-bold tracking-tight md:text-2xl"
                data-testid="section-title"
              >
                {LATEST_MOVIES_CAROUSEL_DETAILS.TITLE} of {currentYear}
              </h2>
            </div>
            <Button
              variant="link"
              onClick={() =>
                router.push(
                  LATEST_MOVIES_CAROUSEL_DETAILS.EXPLORE_MORE_BUTTON_LINK
                )
              }
            >
              {LATEST_MOVIES_CAROUSEL_DETAILS.EXPLORE_MORE_BUTTON_TEXT}
            </Button>
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
                    <MoviesSeriesCarouselSkeleton
                      data-testid={`movie-skeleton`}
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
                        onClick={() => handleCardClick(movie.imdbID)}
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
    </>
  );
};

export default LatestMoviesCarousel;
