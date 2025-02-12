"use client";
import { Data } from "@/types/omdb.types";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { APP_LOGO } from "@/constants";
import { Button } from "./ui/button";
import { PlayIcon } from "lucide-react";

type MovieCardProps = {
  content: Data;
  showYear?: boolean;
  onClick: () => void;
};

const MovieSeriesCard = ({
  content,
  onClick,
  showYear = false,
}: MovieCardProps) => {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <Card
      className="bg-transparent border-0 shadow-none cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
          <Image
            src={
              imgError || content.Poster === "N/A" ? APP_LOGO : content.Poster
            }
            alt={content.Title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            data-testid={`movie-poster-${content.imdbID}`}
            onError={() => setImgError(true)}
          />
        </div>
        <h3
          className="mt-2 text-sm font-medium text-center line-clamp-1"
          data-testid={`movie-title-${content.imdbID}`}
        >
          {content.Title}
        </h3>
      </CardContent>
      <CardFooter className="justify-center hidden mt-2 md:block">
        {showYear && (
          <p className="mb-4 text-sm text-center text-muted-foreground">
            {content.Year}
          </p>
        )}
        <Button variant="outline" className="w-full" onClick={onClick}>
          <PlayIcon className="w-4 h-4 mr-2" />
          Watch Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MovieSeriesCard;
