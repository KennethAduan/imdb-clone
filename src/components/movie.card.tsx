import { Data } from "@/types/omdb.types";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
type MovieCardProps = {
  movie: Data;
};
const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <Card className="relative group overflow-hidden border-0 bg-transparent">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
          <Image
            src={posterUrl}
            alt={movie.Title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <PlayCircle className="w-12 h-12 text-white" />
          </div>
        </div>
        <h3 className="mt-2 text-sm font-medium text-white truncate">
          {movie.Title}
        </h3>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
