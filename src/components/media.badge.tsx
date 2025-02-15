import { Badge } from "@/components/ui/badge";
import { TvIcon } from "lucide-react";
import { Data } from "@/types/omdb.types";
import { MOVIE_SERIES_DETAILS } from "@/constants";

type MediaBadgesProps = {
  media: Data;
  type: "movie" | "series";
};

export const MediaBadges = ({ media, type }: MediaBadgesProps) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {media.Year !== MOVIE_SERIES_DETAILS.N_A_VALUE && (
      <Badge variant="secondary">{media.Year}</Badge>
    )}
    {media.Rated !== MOVIE_SERIES_DETAILS.N_A_VALUE && (
      <Badge variant="secondary">{media.Rated}</Badge>
    )}
    {media.Runtime !== MOVIE_SERIES_DETAILS.N_A_VALUE && (
      <Badge variant="secondary">{media.Runtime}</Badge>
    )}
    {media.Genre.split(", ").map((genre) => (
      <Badge key={genre} variant="outline">
        {genre}
      </Badge>
    ))}
    {type === "series" && media.totalSeasons && (
      <Badge variant="secondary" className="flex items-center gap-1">
        <TvIcon className="w-3 h-3" />
        {media.totalSeasons} {MOVIE_SERIES_DETAILS.SEASON_TITLE}
        {media.totalSeasons !== "1" && "s"}
      </Badge>
    )}
  </div>
);
