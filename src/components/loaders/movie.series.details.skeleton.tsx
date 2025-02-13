import React from "react";
import { CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";

const MovieSeriesDetailsSkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-12 md:mt-22">
      <Card className="bg-background/60 backdrop-blur-lg border-none shadow-none">
        <CardContent className="p-6">
          {/* Title and Watchlist Button Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <Skeleton className="h-12 w-3/4 max-w-[500px]" />
            <Skeleton className="h-11 w-[180px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            {/* Poster Skeleton */}
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>

            {/* Details Section Skeleton */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-6 w-20" />
                ))}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-20 rounded-lg bg-secondary/50"
                  />
                ))}
              </div>

              {/* Separator */}
              <Skeleton className="h-px w-full my-4" />

              {/* Plot */}
              <div className="mb-6">
                <Skeleton className="h-8 w-24 mb-2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </div>

              {/* Cast & Crew */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-8 w-24 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5 mt-2" />
                </div>
                <div>
                  <Skeleton className="h-8 w-24 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/5 mt-2" />
                </div>
              </div>

              {/* Awards */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-8 w-24" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5 mt-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieSeriesDetailsSkeleton;
