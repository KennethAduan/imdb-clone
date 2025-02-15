"use client";

import { Data } from "@/types/omdb.types";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trophy } from "lucide-react";
import { useState, useCallback } from "react";
import { MediaBadges } from "../../media.badge";
import { MediaPoster } from "../../media.poster";
import { WatchlistButton } from "../../watch.list.button";
import MovieInfo from "./movie.info";
import useWatchlist from "@/hooks/use.watchlist";
import { APPLICATION_TYPES, MOVIE_SERIES_DETAILS } from "@/constants";

type MovieDetailsProps = {
  movie: Data;
  userId: string;
  isInWatchlist: boolean;
};

const MovieDetails = ({ movie, userId, isInWatchlist }: MovieDetailsProps) => {
  const [imgError, setImgError] = useState<boolean>(false);

  const { inWatchlist, handleWatchlistClick, isAdding, isRemoving } =
    useWatchlist({
      isInWatchlist,
      userId,
    });

  const handleImageError = useCallback(() => setImgError(true), []);

  // Animation variants that respect the watchlist action
  const fadeIn = {
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div
      data-testid="movie-details-container"
      className="w-full p-4 mx-auto mt-12 max-w-7xl md:p-8 md:mt-22"
      role="main"
      aria-label={`Details for ${movie.Title}`}
    >
      <Card className="border-none shadow-none bg-background/60 backdrop-blur-lg">
        <CardContent className="p-6">
          <div className="flex flex-col justify-between gap-4 mb-8 sm:flex-row sm:items-center">
            <h1 data-testid="movie-title" className="text-xl font-bold">
              {movie.Title}
            </h1>
            <WatchlistButton
              isSaving={isAdding || isRemoving}
              isInWatchlist={inWatchlist}
              onToggleWatchlist={() =>
                handleWatchlistClick({
                  userId,
                  imdbId: movie.imdbID,
                  title: movie.Title,
                  poster: movie.Poster,
                  year: movie.Year,
                  type: movie.Type,
                })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            <MediaPoster
              posterUrl={movie.Poster}
              title={movie.Title}
              hasError={imgError}
              onError={handleImageError}
            />

            <motion.div {...fadeIn}>
              <MediaBadges media={movie} type={APPLICATION_TYPES.MOVIE} />
              <MovieInfo movie={movie} />

              <Separator className="my-4" />

              {/* Plot */}
              <div className="mb-6">
                <h2 className="mb-2 text-xl font-semibold">
                  {MOVIE_SERIES_DETAILS.PLOT_TITLE}
                </h2>
                <p
                  data-testid="movie-plot"
                  className="leading-relaxed text-muted-foreground"
                >
                  {movie.Plot}
                </p>
              </div>

              {/* Cast & Crew */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    {MOVIE_SERIES_DETAILS.CAST_TITLE}
                  </h2>
                  <p className="text-muted-foreground">{movie.Actors}</p>
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    {MOVIE_SERIES_DETAILS.DIRECTOR_TITLE}
                  </h2>
                  <p className="text-muted-foreground">{movie.Director}</p>
                </div>
              </div>

              {/* Awards if any */}
              {movie.Awards !== "N/A" && (
                <div className="mt-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-xl font-semibold">
                      {MOVIE_SERIES_DETAILS.AWARDS_TITLE}
                    </h2>
                  </div>
                  <p className="mt-2 text-muted-foreground">{movie.Awards}</p>
                </div>
              )}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieDetails;
