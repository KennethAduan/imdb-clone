import React from "react";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface MoviesSeriesSkeletonProps {
  "data-testid"?: string;
}

const MoviesSeriesSkeleton = ({
  "data-testid": dataTestId,
}: MoviesSeriesSkeletonProps) => {
  return (
    <div data-testid={dataTestId}>
      <Card className="border-0 bg-transparent">
        <CardContent className="p-0">
          <Skeleton className="aspect-[2/3] rounded-xl" />
          <Skeleton className="h-4 w-3/4 mx-auto mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default MoviesSeriesSkeleton;
