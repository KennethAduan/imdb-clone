import { Skeleton } from "../ui/skeleton";

const HeroCardSkeleton = () => (
  <div
    data-testid="hero-card-skeleton"
    className="relative w-full h-[600px] overflow-hidden rounded-3x bg-primary/10"
  >
    <div className="relative flex flex-col justify-end h-full p-8 md:p-12">
      <div className="absolute top-6 left-8">
        <Skeleton className="w-16 h-8 rounded-full" />
      </div>
      <div className="max-w-2xl space-y-4">
        <Skeleton className="w-3/4 h-14" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-32 h-12 rounded-full" />
      </div>
    </div>
  </div>
);
export default HeroCardSkeleton;
