"use client";
import { Data } from "@/types/omdb.types";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Star,
  Clock,
  Calendar,
  Trophy,
  Globe,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type MovieDetailsProps = {
  movie: Data;
};

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const handleWatchlistClick = () => {
    setIsInWatchlist(!isInWatchlist);
    // Here you would typically also update your backend/storage
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-12 md:mt-28"
    >
      <Card className="bg-background/60 backdrop-blur-lg border-none shadow-none">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            {/* Poster Section */}
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="relative aspect-[2/3] rounded-lg overflow-hidden group"
            >
              <Image
                src={movie.Poster}
                alt={movie.Title}
                fill
                className="object-cover"
                priority
              />
              {/* Watchlist Button - Absolute positioned over the poster */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-4 right-4"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleWatchlistClick}
                        variant="secondary"
                        size="icon"
                        className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/95 transition-all duration-200"
                      >
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          animate={{ scale: isInWatchlist ? [1, 1.2, 1] : 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isInWatchlist ? (
                            <BookmarkCheck className="w-5 h-5 text-primary fill-primary" />
                          ) : (
                            <Bookmark className="w-5 h-5" />
                          )}
                        </motion.div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {isInWatchlist
                          ? "Remove from watchlist"
                          : "Add to watchlist"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            </motion.div>

            {/* Details Section */}
            <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-4xl font-bold">{movie.Title}</h1>
                {/* Mobile Watchlist Button */}
                <div className="md:hidden">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handleWatchlistClick}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-background/20"
                        >
                          <motion.div
                            whileTap={{ scale: 0.9 }}
                            animate={{ scale: isInWatchlist ? [1, 1.2, 1] : 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {isInWatchlist ? (
                              <BookmarkCheck className="w-5 h-5 text-primary fill-primary" />
                            ) : (
                              <Bookmark className="w-5 h-5" />
                            )}
                          </motion.div>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {isInWatchlist
                            ? "Remove from watchlist"
                            : "Add to watchlist"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{movie.Year}</Badge>
                <Badge variant="secondary">{movie.Rated}</Badge>
                <Badge variant="secondary">{movie.Runtime}</Badge>
                {movie.Genre.split(", ").map((genre) => (
                  <Badge key={genre} variant="outline">
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Ratings and Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <InfoCard
                  icon={<Star className="w-4 h-4 text-yellow-400" />}
                  label="IMDb"
                  value={`${movie.imdbRating}/10`}
                />
                <InfoCard
                  icon={<Clock className="w-4 h-4" />}
                  label="Runtime"
                  value={movie.Runtime}
                />
                <InfoCard
                  icon={<Calendar className="w-4 h-4" />}
                  label="Released"
                  value={movie.Released}
                />
                <InfoCard
                  icon={<Globe className="w-4 h-4" />}
                  label="Language"
                  value={movie.Language}
                />
              </div>

              <Separator className="my-4" />

              {/* Plot */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Plot</h2>
                <p className="text-muted-foreground leading-relaxed">
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

// Info Card Component
const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center justify-center p-3 rounded-lg bg-secondary/50"
  >
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="text-sm text-muted-foreground">{value}</span>
  </motion.div>
);

export default MovieDetails;
