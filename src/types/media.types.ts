import { Data } from "@/types/omdb.types";

export type MediaDetailsProps = {
  media: Data;
  type: "movie" | "series";
};

export type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  testId?: string;
};

export const fadeInAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};
