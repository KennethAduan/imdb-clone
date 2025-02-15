"use client";

import { Data } from "@/types/omdb.types";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { MediaBadges } from "@/components/media.badge";
import { MediaPoster } from "@/components/media.poster";
import { WatchlistButton } from "@/components/watch.list.button";
import useWatchlist from "@/hooks/use.watchlist";
import SeriesInfo from "./series.info";
import { Trophy } from "lucide-react";
import { MOVIE_SERIES_DETAILS } from "@/constants";

type SeriesDetailsProps = {
  series: Data;
  userId: string;
  isInWatchlist: boolean;
};

const SeriesDetails = ({
  series,
  userId,
  isInWatchlist,
}: SeriesDetailsProps) => {
  const [imgError, setImgError] = useState<boolean>(false);
  const { inWatchlist, handleWatchlistClick, isAdding, isRemoving } =
    useWatchlist({
      isInWatchlist,
      userId,
    });
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
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
              isSaving={isAdding || isRemoving}
              isInWatchlist={inWatchlist}
              onToggleWatchlist={() =>
                handleWatchlistClick({
                  userId,
                  imdbId: series.imdbID,
                  title: series.Title,
                  poster: series.Poster,
                  year: series.Year,
                  type: series.Type,
                })
              }
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
              <SeriesInfo series={series} />

              <Separator className="my-4" />

              {/* Plot */}
              {series.Plot !== MOVIE_SERIES_DETAILS.N_A_VALUE && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {MOVIE_SERIES_DETAILS.PLOT_TITLE}
                  </h2>
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
                {series.Actors !== MOVIE_SERIES_DETAILS.N_A_VALUE && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {MOVIE_SERIES_DETAILS.CAST_TITLE}
                    </h2>
                    <p className="text-muted-foreground">{series.Actors}</p>
                  </div>
                )}
                {series.Director !== "N/A" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {MOVIE_SERIES_DETAILS.DIRECTOR_TITLE}
                    </h2>
                    <p className="text-muted-foreground">{series.Director}</p>
                  </div>
                )}
              </div>

              {/* Awards if any */}
              {series.Awards !== MOVIE_SERIES_DETAILS.N_A_VALUE && (
                <motion.div
                  {...fadeIn}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-xl font-semibold">
                      {MOVIE_SERIES_DETAILS.AWARDS_TITLE}
                    </h2>
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
