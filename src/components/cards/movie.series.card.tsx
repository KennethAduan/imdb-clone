"use client";
import { Data } from "@/types/omdb.types";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { APP_LOGO } from "@/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookmarkIcon, PlayIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
type MovieCardProps = {
  content: Data;
  showYear?: boolean;
  showType?: boolean;
  showBookmark?: boolean;
  onClick: () => void;
  "data-testid"?: string;
};

const MovieSeriesCard = ({
  content,
  onClick,
  showYear = false,
  showType = false,
  showBookmark = false,
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
          {showBookmark && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"icon"}
                    className="absolute z-10 text-xs top-2 right-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("clicked");
                    }}
                  >
                    <BookmarkIcon className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="text-white bg-black/90 dark:bg-white/90 dark:text-black">
                  <p>Add to Watchlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
