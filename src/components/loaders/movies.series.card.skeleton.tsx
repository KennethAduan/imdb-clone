import React from "react";
import { Skeleton } from "../ui/skeleton";
type MoviesSeriesCardSkeletonProps = {
  "data-testid"?: string;
};
const MoviesSeriesCardSkeleton = ({
  "data-testid": dataTestId,
}: MoviesSeriesCardSkeletonProps) => {
  return (
    <section
      data-testid={dataTestId}
      className="w-full max-w-[90%] md:max-w-[80%] mx-auto mb-4 mt-24"
    >
      <div className="grid grid-cols-1 gap-6 p-6 mt-16 md:mt-32 md:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="aspect-[2/3] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-3 w-[60%]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoviesSeriesCardSkeleton;
