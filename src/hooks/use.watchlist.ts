import {
  addToWatchlist,
  removeFromWatchlist,
} from "@/server-actions/user.action";
import { useAction } from "next-safe-action/hooks";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { WatchlistFormValues } from "@/schema/user.account.schema";

type UseWatchlistProps = {
  isInWatchlist: boolean;
  userId: string;
};
const useWatchlist = ({ isInWatchlist, userId }: UseWatchlistProps) => {
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);

  const { execute: add, isExecuting: isAdding } = useAction(addToWatchlist, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        setInWatchlist(true);
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: ({ error }) => {
      toast.error(error?.serverError || "Please login to add to watchlist");
    },
  });

  const { execute: remove, isExecuting: isRemoving } = useAction(
    removeFromWatchlist,
    {
      onSuccess: ({ data }) => {
        if (data?.success) {
          setInWatchlist(false);
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      },
    }
  );

  const handleWatchlistClick = useCallback(
    ({ imdbId, title, poster, year, type }: WatchlistFormValues) => {
      if (inWatchlist) {
        remove({
          userId,
          imdbId,
        });
      } else {
        add({
          userId,
          imdbId,
          title,
          poster,
          year,
          type,
        });
      }
    },
    [add, remove, inWatchlist, userId]
  );

  return {
    inWatchlist,
    handleWatchlistClick,
    isAdding,
    isRemoving,
  };
};

export default useWatchlist;
