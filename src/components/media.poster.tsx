"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import ImagePlaceholder from "./ui/image-placeholder";
import { memo } from "react";

type MediaPosterProps = {
  posterUrl: string;
  title: string;
  hasError: boolean;
  onError: () => void;
};

export const MediaPoster = memo(
  ({ posterUrl, title, hasError, onError }: MediaPosterProps) => {
    const fadeIn = {
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.2 },
    };

    return (
      <motion.div
        {...fadeIn}
        className="relative aspect-[2/3] rounded-lg overflow-hidden"
      >
        {hasError || posterUrl === "N/A" ? (
          <ImagePlaceholder title={title} />
        ) : (
          <Image
            src={posterUrl}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={onError}
          />
        )}
      </motion.div>
    );
  }
);

MediaPoster.displayName = "MediaPoster";
