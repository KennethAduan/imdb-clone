"use client";
import React from "react";
import { Data } from "@/types/omdb.types";
import { Button } from "../ui/button";
import Link from "next/link";
import { APPLICATION_TYPES, ROUTES } from "@/constants";
import MovieSeriesCard from "../cards/movie.series.card";
import { WatchlistFormValues } from "@/schema/user.account.schema";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { removeFromWatchlist } from "@/server-actions/user.action";
import { toast } from "sonner";

type WatchListDetailsProps = {
  watchlist: WatchlistFormValues[];
  userId: string;
};
const WatchListDetails = ({ watchlist, userId }: WatchListDetailsProps) => {
  const router = useRouter();

  const { execute, isExecuting } = useAction(removeFromWatchlist, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data.message);
      } else {
        toast.error(data?.message ?? "");
      }
    },
  });

  const handleRemoveFromWatchlist = (imdbId: string) => {
    execute({ userId, imdbId });
  };

  const handleRedirect = (imdbId: string, type: string) => {
    if (type === APPLICATION_TYPES.MOVIE) {
      router.push(`${ROUTES.MOVIE}/${imdbId}`);
    } else {
      router.push(`${ROUTES.SERIES}/${imdbId}`);
    }
  };
  return (
    <div className="container mx-auto w-full max-w-[90%] space-y-8 py-16 md:max-w-[85%] mt-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">My Watchlist</h1>
          <p className="text-muted-foreground">
            {watchlist?.length} {watchlist?.length === 1 ? "title" : "titles"}{" "}
            saved
          </p>
        </div>
      </div>

      {watchlist?.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 rounded-xl bg-muted/30 p-8 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Your watchlist is empty
            </h2>
            <p className="text-muted-foreground">
              Start adding movies and shows you want to watch later
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href={ROUTES.HOME} className="gap-2">
              Browse Titles
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-5">
          {watchlist?.map((item) => (
            <div
              key={item.imdbId}
              className="group relative transition-all hover:scale-[1.02]"
            >
              <MovieSeriesCard
                content={
                  {
                    Title: item.title,
                    Year: item.year,
                    Poster: item.poster,
                    imdbID: item.imdbId,
                    Type: item.type,
                  } as Data
                }
                onClick={() => handleRedirect(item.imdbId, item.type)}
              />
              <Button
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleRemoveFromWatchlist(item.imdbId)}
                disabled={isExecuting}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchListDetails;
