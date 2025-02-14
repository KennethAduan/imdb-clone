"use client";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type WatchlistButtonProps = {
  isInWatchlist: boolean;
  isSaving: boolean;
  onToggleWatchlist: () => void;
};

export const WatchlistButton = ({
  isInWatchlist,
  onToggleWatchlist,
  isSaving,
}: WatchlistButtonProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onToggleWatchlist}
          variant="outline"
          className="flex items-center gap-2 h-11"
          disabled={isSaving}
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            animate={{ scale: isInWatchlist ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {isInWatchlist ? (
              <BookmarkCheck className="w-5 h-5 text-primary fill-primary" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
            <span className="hidden sm:inline">
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </span>
          </motion.div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
