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
    className="relative w-full h-[600px] overflow-hidden rounded-3xl bg-inherit"
  >
    <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
      <div className="absolute top-6 left-8">
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>
      <div className="max-w-2xl space-y-4">
        <Skeleton className="h-14 w-3/4" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-32 rounded-full" />
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
      <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
        {/* Movie Info */}
        <div className="max-w-2xl space-y-6">
          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 line-clamp-2 tracking-tight">
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
            <p className="text-gray-200 text-base md:text-lg line-clamp-3 max-w-prose">
              {omdbDetails.Plot}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              size="lg"
              className="rounded-full px-8 hover:scale-105 transition-transform duration-300"
              onClick={() => handleRedirectByType(omdbDetails.Type)}
            >
              {CAROUSEL_DETAILS.WATCH_NOW_BUTTON_TEXT}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full aspect-square p-0 w-12 hover:scale-105 transition-transform duration-300 bg-white/10 hover:bg-white/20 border-0"
            >
              <PlusIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeUpperCarousel = () => {
  const {
    data: lastestOmdBDetails,
    isLoading,
    error,
    refetch,
  } = useLatestOMDBDataByType({});

  if (isLoading) {
    return (
      <section className="w-full max-w-[95%] mx-auto mt-28 mb-4">
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
    <section className="w-full max-w-[95%] md:max-w-[90%] 2xl:max-w-[45%] mx-auto mb-4 mt-24">
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
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-0" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-0" />
      </Carousel>
    </section>
  );
};

export default HomeUpperCarousel;
