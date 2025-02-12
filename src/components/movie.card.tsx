import { Data } from "@/types/omdb.types";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { APP_LOGO } from "@/constants";
type MovieCardProps = {
  movie: Data;
  onClick: () => void;
};
const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Card
      className="border-0 bg-transparent hover:scale-95 transition-all duration-300 cursor-pointer shadow-none"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
          <Image
            src={imgError || movie.Poster === "N/A" ? APP_LOGO : movie.Poster}
            alt={movie.Title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImgError(true)}
          />
        </div>
      </CardContent>
      <CardFooter className="justify-center mt-2">
        <h3 className="font-medium mt-2 text-sm line-clamp-1 text-center">
          {movie.Title}
        </h3>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
