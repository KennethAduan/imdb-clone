import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface MoviesSeriesSkeletonProps {
  "data-testid"?: string;
}

const MoviesSeriesCarouselSkeleton = ({
  "data-testid": dataTestId,
}: MoviesSeriesSkeletonProps) => {
  return (
    <div data-testid={dataTestId}>
      <Card className="bg-transparent border-0">
        <CardContent className="p-0">
          <Skeleton className="aspect-[2/3] rounded-xl" />
          <Skeleton className="w-3/4 h-4 mx-auto mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default MoviesSeriesCarouselSkeleton;
