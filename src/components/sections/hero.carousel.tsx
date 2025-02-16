"use client";

import { API_FOLDER_DETAILS, CAROUSEL_DETAILS } from "@/constants";

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
import useLatestOMDBDataByType from "@/hooks/use.latest.omdb.data.by.type";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ROUTES } from "@/constants";
import { isTrue } from "@/lib/utils";
import NavigationLoader from "../loaders/navigation.loader";
import { AnimatePresence } from "framer-motion";
const HeroCarousel = () => {
  const {
    data: lastestOmdBDetails,
    isLoading,
    error,
    refetch,
  } = useLatestOMDBDataByType({});
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCardClick = useCallback(
    (imdbID: string, type: string) => {
      startTransition(() => {
        const route =
          type === API_FOLDER_DETAILS.TYPE.MOVIE
            ? ROUTES.MOVIE_DETAILS_BY_ID.replace(":id", imdbID)
            : ROUTES.SERIES_DETAILS_BY_ID.replace(":id", imdbID);

        router.push(route);
      });
    },
    [router]
  );

  if (isLoading) {
    return (
      <section className="w-full max-w-[90%] md:max-w-[70%] mx-auto mb-4 mt-24">
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
    <>
      <AnimatePresence>
        {isTrue(isPending) && <NavigationLoader />}
      </AnimatePresence>
      <section className="w-full max-w-[100%] md:max-w-[70%] mx-auto mb-4 mt-24">
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
                <HeroCard
                  omdbDetails={omdbDetails as Data}
                  onCardClick={handleCardClick}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -translate-y-1/2 border-0 left-4 top-1/2 bg-white/10 hover:bg-white/20" />
          <CarouselNext className="absolute -translate-y-1/2 border-0 right-4 top-1/2 bg-white/10 hover:bg-white/20" />
        </Carousel>
      </section>
    </>
  );
};

export default HeroCarousel;
