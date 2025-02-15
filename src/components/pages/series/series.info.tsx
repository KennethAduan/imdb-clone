import { InfoCard } from "@/components/cards/info.card";
import { MOVIE_SERIES_DETAILS } from "@/constants";
import { Data } from "@/types/omdb.types";
import { Star, Clock, Calendar, Globe } from "lucide-react";
import React, { memo } from "react";

const SeriesInfo = memo(({ series }: { series: Data }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    {series.imdbRating !== "N/A" && (
      <InfoCard
        icon={<Star className="w-4 h-4 text-yellow-400" />}
        label={MOVIE_SERIES_DETAILS.LABEL.IMDB}
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
));
SeriesInfo.displayName = "SeriesInfo";

export default SeriesInfo;
