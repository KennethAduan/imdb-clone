import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";
import { isNull } from "@/lib/utils";
import { getWatchlistByUserId } from "@/server-actions/user.action";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { getSession } from "@/lib/jwt";
import { Suspense } from "react";
import MoviesSeriesCardSkeleton from "@/components/loaders/movies.series.card.skeleton";
import WatchListDetails from "@/components/sections/watch.list.details";
import { WatchlistFormValues } from "@/schema/user.account.schema";

const WatchListPage = async () => {
  const user = await getSession();

  if (isNull(user)) {
    redirect(ROUTES.SIGN_IN);
  }

  if (isNull(user)) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 px-4">
        <div className="p-8 rounded-full bg-gradient-to-br from-primary/10 to-primary/30">
          <LogIn className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Authentication Required
          </h1>
          <p className="text-lg text-muted-foreground">
            Sign in to access your personal watchlist
          </p>
        </div>
        <Button asChild size="lg" className="animate-pulse">
          <Link href={ROUTES.SIGN_IN} className="gap-2">
            <LogIn className="w-5 h-5" />
            Sign In Now
          </Link>
        </Button>
      </div>
    );
  }

  const watchlist = await getWatchlistByUserId(user?.userId ?? "");

  return (
    <Suspense fallback={<MoviesSeriesCardSkeleton />}>
      <WatchListDetails
        watchlist={watchlist as WatchlistFormValues[]}
        userId={user?.userId ?? ""}
      />
    </Suspense>
  );
};

export default WatchListPage;
