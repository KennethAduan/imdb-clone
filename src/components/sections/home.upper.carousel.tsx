"use client";
import { API_FOLDER_DETAILS, APP_LOGO } from "@/constants";
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
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroCardSkeleton = () => (
  <div className="relative w-full h-[600px] overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-400">
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

const HeroCard = ({ movie }: { movie: Data }) => {
  const posterUrl = movie.Poster !== "N/A" ? movie.Poster : APP_LOGO;

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-3xl">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={posterUrl}
            alt={movie.Title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            quality={90}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
        {/* Rating Badge */}
        <div className="absolute top-6 left-8 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium text-white">8.5</span>
        </div>

        {/* Movie Info */}
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 line-clamp-2">
            {movie.Title}
          </h2>
          <p className="text-gray-200 text-sm md:text-base mb-6 line-clamp-2">
            {movie.Plot ||
              "After a shipwreck, an intelligent robot called Rod is stranded on an uninhabited island. To survive the harsh environment, Rod bonds with the island's animals and cares for an orphaned baby."}
          </p>
          <Button className="rounded-full">Watch Now</Button>
        </div>
      </div>
    </div>
  );
};

const HomeUpperCarousel = () => {
  const { data, isLoading, error } = useLatestOMDBDataByType({
    type: API_FOLDER_DETAILS.TYPE.MOVIE,
    year: "2025",
  });

  if (isLoading) {
    return (
      <section className="w-full max-w-[95%] mx-auto my-6  md:my-28">
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
      <div className="flex items-center justify-center min-h-[600px] text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <section className="w-full max-w-[95%] mx-auto mt-6 mb-4 md:mt-28">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {data?.Search.map((movie) => (
            <CarouselItem key={movie.imdbID}>
              <HeroCard movie={movie as Data} />
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
