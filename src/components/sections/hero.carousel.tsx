"use client";

import { CAROUSEL_DETAILS } from "@/constants";
import { useLatestOMDBDataByType } from "@/services/react.query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Data } from "@/types/omdb.types";
import ErrorRefetch from "../error.refetch";
import HeroCardSkeleton from "../loaders/hero.card.skeleton";
import HeroCard from "../cards/hero.card";

const HeroCarousel = () => {
  const {
    data: lastestOmdBDetails,
    isLoading,
    error,
    refetch,
  } = useLatestOMDBDataByType({});

  if (isLoading) {
    return (
      <section className="w-full lg:max-w-[95%] sm:max-w-[90%] 2xl:max-w-[45%] mx-auto mb-4 mt-24">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {[1, 2, 3].map((index) => (
              <CarouselItem key={index}>
                <HeroCardSkeleton />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    );
  }

  if (error) {
    return (
      <ErrorRefetch
        error={error}
        refetch={refetch}
        buttonText={CAROUSEL_DETAILS.RETRY_BUTTON_TEXT}
      />
    );
  }

  return (
    <section className="w-full lg:max-w-[95%] sm:max-w-[90%] 2xl:max-w-[45%] mx-auto mb-4 mt-24">
      <Carousel
        data-testid="movie-carousel"
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {lastestOmdBDetails?.Search?.map((omdbDetails) => (
            <CarouselItem key={omdbDetails.imdbID}>
              <HeroCard omdbDetails={omdbDetails as Data} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -translate-y-1/2 border-0 left-4 top-1/2 bg-white/10 hover:bg-white/20" />
        <CarouselNext className="absolute -translate-y-1/2 border-0 right-4 top-1/2 bg-white/10 hover:bg-white/20" />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
