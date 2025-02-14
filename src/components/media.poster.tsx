"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInAnimation } from "@/types/media.types";
import ImagePlaceholder from "./ui/image-placeholder";

type MediaPosterProps = {
  posterUrl: string;
  title: string;
  hasError: boolean;
  onError: () => void;
};

export const MediaPoster = ({
  posterUrl,
  title,
  hasError,
  onError,
}: MediaPosterProps) => (
  <motion.div
    {...fadeInAnimation}
    transition={{ delay: 0.2 }}
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
