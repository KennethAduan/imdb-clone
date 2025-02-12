"use client";
import { Data } from "@/types/omdb.types";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { APP_LOGO } from "@/constants";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PlayIcon } from "lucide-react";

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
  console.log(content);
  return (
    <Card
      className="bg-transparent border-0 shadow-none cursor-pointer"
      onClick={onClick}
      data-testid={dataTestId}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
          {showType && (
            <Badge className="absolute z-10 text-xs text-yellow-500 top-2 left-2 bg-black/90">
              {content.Type.toUpperCase()}
            </Badge>
          )}
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
      <CardFooter className="justify-center block mt-2">
        {showYear && (
          <p className="mb-4 text-sm text-center text-muted-foreground">
            {content.Year}
          </p>
        )}
        <Button variant="outline" className="w-full " onClick={onClick}>
          <PlayIcon className="w-4 h-4 mr-2" />
          Watch Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MovieSeriesCard;
