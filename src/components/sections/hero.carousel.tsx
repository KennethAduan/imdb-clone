"use client";

import {
  API_FOLDER_DETAILS,
  APP_LOGO,
  CAROUSEL_DETAILS,
  ROUTES,
} from "@/constants";
import { useLatestOMDBDataByType } from "@/services/react.query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Data } from "@/types/omdb.types";
import Image from "next/image";
import { Film, PlusIcon, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { useState } from "react";
import ErrorRefetch from "../error.refetch";

const HeroCardSkeleton = () => (
  <div
    data-testid="hero-card-skeleton"
    className="relative w-full h-[600px] overflow-hidden rounded-3x bg-primary/10"
  >
    <div className="relative flex flex-col justify-end h-full p-8 md:p-12">
      <div className="absolute top-6 left-8">
        <Skeleton className="w-16 h-8 rounded-full" />
      </div>
      <div className="max-w-2xl space-y-4">
        <Skeleton className="w-3/4 h-14" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-32 h-12 rounded-full" />
      </div>
    </div>
  </div>
);

const HeroCard = ({ omdbDetails }: { omdbDetails: Data }) => {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const imageSource =
    imgError || omdbDetails.Poster === CAROUSEL_DETAILS.N_A_IMAGE_SOURCE
      ? APP_LOGO
      : omdbDetails.Poster;

  const handleRedirectByType = (type: string) => {
    if (type === API_FOLDER_DETAILS.TYPE.MOVIE) {
      router.push(
        ROUTES.MOVIE_DETAILS_BY_ID.replace(":id", omdbDetails.imdbID)
      );
    } else {
      router.push(ROUTES.TV_DETAILS_BY_ID.replace(":id", omdbDetails.imdbID));
    }
  };
  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-3xl">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={imageSource}
            alt={omdbDetails.Title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            quality={90}
            priority
            onError={() => setImgError(true)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-end h-full p-8 md:p-12">
        {/* Movie Info */}
        <div className="max-w-2xl space-y-6">
          {/* Title */}
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl line-clamp-2">
            {omdbDetails.Title}
          </h2>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Type Badge */}
            <Badge className="bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full px-4 py-2.5 flex items-center gap-2 transition-all duration-300 border-0">
              {omdbDetails.Type === "movie" ? (
                <Film className="w-4 h-4 text-primary" />
              ) : (
                <Tv className="w-4 h-4 text-primary" />
              )}
              <span className="text-sm font-semibold tracking-wide">
                {omdbDetails.Type === "movie" ? "MOVIE" : "TV SERIES"}
              </span>
            </Badge>

            {/* Year Badge */}
            <Badge className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-4 py-2.5 transition-all duration-300 border-0">
              <span className="text-sm font-medium tracking-wide">
                {omdbDetails.Year}
              </span>
            </Badge>
          </div>

          {/* Description - if available */}
          {omdbDetails.Plot && (
            <p className="text-base text-gray-200 md:text-lg line-clamp-3 max-w-prose">
              {omdbDetails.Plot}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              size="lg"
              className="px-8 transition-transform duration-300 rounded-full hover:scale-105"
              onClick={() => handleRedirectByType(omdbDetails.Type)}
            >
              {CAROUSEL_DETAILS.WATCH_NOW_BUTTON_TEXT}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-12 p-0 transition-transform duration-300 border-0 rounded-full aspect-square hover:scale-105 bg-white/10 hover:bg-white/20"
            >
              <PlusIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
          {lastestOmdBDetails?.Search.map((omdbDetails) => (
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
