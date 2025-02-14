"use client";

import { Data } from "@/types/omdb.types";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Calendar, Trophy, Globe } from "lucide-react";
import { useState } from "react";
import { InfoCard } from "../cards/info.card";
import { MediaBadges } from "../media.badge";
import { MediaPoster } from "../media.poster";
import { WatchlistButton } from "../watch.list.button";

type MovieDetailsProps = {
  movie: Data;
};

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [imgError, setImgError] = useState<boolean>(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const handleWatchlistClick = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <motion.div
      data-testid="movie-details-container"
      initial="initial"
      animate="animate"
      className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-12 md:mt-22"
    >
      <Card className="bg-background/60 backdrop-blur-lg border-none shadow-none">
        <CardContent className="p-6">
          {/* Title and Watchlist Section */}
          <motion.div
            {...fadeIn}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          >
            <h1 data-testid="movie-title" className="text-4xl font-bold">
              {movie.Title}
            </h1>
            <WatchlistButton
              isInWatchlist={isInWatchlist}
              onToggleWatchlist={handleWatchlistClick}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            {/* Poster Section */}
            <MediaPoster
              posterUrl={movie.Poster}
              title={movie.Title}
              hasError={imgError}
              onError={() => setImgError(true)}
            />

            {/* Details Section */}
            <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
              <MediaBadges media={movie} type="movie" />

              {/* Ratings and Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <InfoCard
                  icon={<Star className="w-4 h-4 text-yellow-400" />}
                  label="IMDb"
                  value={`${movie.imdbRating}/10`}
                  testId="imdb-rating"
                />
                <InfoCard
                  icon={<Clock className="w-4 h-4" />}
                  label="Runtime"
                  value={movie.Runtime}
                  testId="runtime-value"
                />
                <InfoCard
                  icon={<Calendar className="w-4 h-4" />}
                  label="Released"
                  value={movie.Released}
                  testId="release-date"
                />
                <InfoCard
                  icon={<Globe className="w-4 h-4" />}
                  label="Language"
                  value={movie.Language}
                  testId="language-value"
                />
              </div>

              <Separator className="my-4" />

              {/* Plot */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Plot</h2>
                <p
                  data-testid="movie-plot"
                  className="text-muted-foreground leading-relaxed"
                >
                  {movie.Plot}
                </p>
              </div>

              {/* Cast & Crew */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Cast</h2>
                  <p className="text-muted-foreground">{movie.Actors}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Director</h2>
                  <p className="text-muted-foreground">{movie.Director}</p>
                </div>
              </div>

              {/* Awards if any */}
              {movie.Awards !== "N/A" && (
                <motion.div
                  {...fadeIn}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-xl font-semibold">Awards</h2>
                  </div>
                  <p className="text-muted-foreground mt-2">{movie.Awards}</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MovieDetails;
