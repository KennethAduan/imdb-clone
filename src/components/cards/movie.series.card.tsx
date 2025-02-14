"use client";
import { Data } from "@/types/omdb.types";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayIcon } from "lucide-react";
import ImagePlaceholder from "@/components/ui/image-placeholder";

type MovieCardProps = {
  content: Data;
  showYear?: boolean;
  showType?: boolean;
  onClick: () => void;
  "data-testid"?: string;
};

const MovieSeriesCard = ({
  content,
  onClick,
  showYear = false,
  showType = false,
  "data-testid": dataTestId,
}: MovieCardProps) => {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <Card
      className="bg-transparent border-0 shadow-none cursor-pointer"
      data-testid={dataTestId}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
          {showType && (
            <Badge className="absolute z-10 text-xs text-yellow-500 top-2 left-2 bg-black/90">
              {content.Type.toUpperCase()}
            </Badge>
          )}

          {imgError || content.Poster === "N/A" ? (
            <div className="relative w-full h-full">
              <ImagePlaceholder title={content.Title} />
            </div>
          ) : (
            <Image
              src={content.Poster}
              alt={content.Title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
              data-testid={`movie-poster-${content.imdbID}`}
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <h3
          className="mt-2 text-sm font-bold text-center line-clamp-1"
          data-testid={`movie-title-${content.imdbID}`}
        >
          {content.Title}
        </h3>
      </CardContent>
      <CardFooter className="justify-center block mt-2">
        {showYear && (
          <p className="mb-4 text-sm text-center text-muted-foreground">
            {content.Year}
          </p>
        )}
        <div>
          <Button className="w-full " variant={"secondary"} onClick={onClick}>
            <PlayIcon className="w-4 h-4 mr-2" />
            Watch Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MovieSeriesCard;
