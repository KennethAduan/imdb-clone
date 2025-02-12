"use client";
import { API_FOLDER_DETAILS, APP_LOGO, ROUTES } from "@/constants";
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
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const HeroCardSkeleton = () => (
  <div
    data-testid="hero-card-skeleton"
    className="relative w-full h-[600px] overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-300"
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
  const posterUrl =
    omdbDetails.Poster !== "N/A" ? omdbDetails.Poster : APP_LOGO;
  const router = useRouter();

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
            src={posterUrl}
            alt={omdbDetails.Title}
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
        <Badge className="absolute top-6 left-8 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium text-white">8.5</span>
        </Badge>
        {/* Movie Info */}
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 line-clamp-2">
            {omdbDetails.Title}
          </h2>
          <p className="text-gray-200 text-sm md:text-base mb-6 line-clamp-2">
            {omdbDetails.Plot ||
              "After a shipwreck, an intelligent robot called Rod is stranded on an uninhabited island. To survive the harsh environment, Rod bonds with the island's animals and cares for an orphaned baby."}
          </p>
          <Button
            className="rounded-full"
            onClick={() => handleRedirectByType(omdbDetails.Type)}
          >
            Watch Now
          </Button>
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
  } = useLatestOMDBDataByType({
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
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <section className="w-full max-w-[95%] md:max-w-[80%] mx-auto mt-6 mb-4 md:mt-28">
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
      <div className="flex justify-center gap-2 mt-4">
        {lastestOmdBDetails?.Search.map((_, index) => (
          <div
            key={index}
            data-testid="navigation-dot"
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === 0 ? "w-8 bg-blue-600" : "w-2 bg-gray-600"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeUpperCarousel;
