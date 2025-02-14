"use client";

import { Data } from "@/types/omdb.types";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Calendar, Trophy, Globe } from "lucide-react";
import { useState } from "react";
import { InfoCard } from "@/components/cards/info.card";
import { MediaBadges } from "@/components/media.badge";
import { MediaPoster } from "@/components/media.poster";
import { WatchlistButton } from "@/components/watch.list.button";

type SeriesDetailsProps = {
  series: Data;
};

const SeriesDetails = ({ series }: SeriesDetailsProps) => {
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
      data-testid="series-details-container"
      initial="initial"
      animate="animate"
      className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-12 md:mt-22"
    >
      <Card className="bg-background/60 backdrop-blur-lg border-none shadow-none">
        <CardContent className="p-6">
          {/* Title and Watchlist Section */}
          <motion.div
            {...fadeIn}
            data-testid="title-section"
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          >
            <h1 data-testid="series-title" className="text-xl font-bold">
              {series.Title}
            </h1>
            <WatchlistButton
              isSaving={false}
              isInWatchlist={isInWatchlist}
              onToggleWatchlist={handleWatchlistClick}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            {/* Poster Section */}
            <MediaPoster
              posterUrl={series.Poster}
              title={series.Title}
              hasError={imgError}
              onError={() => setImgError(true)}
            />

            {/* Details Section */}
            <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
              <MediaBadges media={series} type="series" />

              {/* Ratings and Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {series.imdbRating !== "N/A" && (
                  <InfoCard
                    icon={<Star className="w-4 h-4 text-yellow-400" />}
                    label="IMDb"
                    value={`${series.imdbRating}/10`}
                    testId="imdb-rating"
                  />
                )}
                {series.Runtime !== "N/A" && (
                  <InfoCard
                    icon={<Clock className="w-4 h-4" />}
                    label="Runtime"
                    value={series.Runtime}
                    testId="runtime-value"
                  />
                )}
                {series.Released !== "N/A" && (
                  <InfoCard
                    icon={<Calendar className="w-4 h-4" />}
                    label="Released"
                    value={series.Released}
                    testId="release-date"
                  />
                )}
                {series.Country !== "N/A" && (
                  <InfoCard
                    icon={<Globe className="w-4 h-4" />}
                    label="Country"
                    value={series.Country}
                    testId="country-value"
                  />
                )}
              </div>

              <Separator className="my-4" />

              {/* Plot */}
              {series.Plot !== "N/A" && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Plot</h2>
                  <p
                    data-testid="series-plot"
                    className="text-muted-foreground leading-relaxed"
                  >
                    {series.Plot}
                  </p>
                </div>
              )}

              {/* Cast & Crew */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {series.Actors !== "N/A" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Cast</h2>
                    <p className="text-muted-foreground">{series.Actors}</p>
                  </div>
                )}
                {series.Director !== "N/A" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Director</h2>
                    <p className="text-muted-foreground">{series.Director}</p>
                  </div>
                )}
              </div>

              {/* Awards if any */}
              {series.Awards !== "N/A" && (
                <motion.div
                  {...fadeIn}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-xl font-semibold">Awards</h2>
                  </div>
                  <p className="text-muted-foreground mt-2">{series.Awards}</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SeriesDetails;
