import { InfoCard } from "@/components/cards/info.card";
import React from "react";
import { Data } from "@/types/omdb.types";
import { Star, Clock, Calendar, Globe } from "lucide-react";
import { memo } from "react";
import { MOVIE_SERIES_DETAILS } from "@/constants";

const MovieInfo = memo(({ movie }: { movie: Data }) => (
  <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
    <InfoCard
      icon={<Star className="w-4 h-4 text-yellow-400" />}
      label={MOVIE_SERIES_DETAILS.LABEL.IMDB}
      value={`${movie.imdbRating}/10`}
      testId="imdb-rating"
    />
    <InfoCard
      icon={<Clock className="w-4 h-4" />}
      label={MOVIE_SERIES_DETAILS.LABEL.RUNTIME}
      value={movie.Runtime}
      testId="runtime-value"
    />
    <InfoCard
      icon={<Calendar className="w-4 h-4" />}
      label={MOVIE_SERIES_DETAILS.LABEL.RELEASED}
      value={movie.Released}
      testId="release-date"
    />
    <InfoCard
      icon={<Globe className="w-4 h-4" />}
      label={MOVIE_SERIES_DETAILS.LABEL.LANGUAGE}
      value={movie.Language}
      testId="language-value"
    />
  </div>
));
MovieInfo.displayName = "MovieInfo";

export default MovieInfo;
