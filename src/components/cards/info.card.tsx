"use client";
import { motion } from "framer-motion";
import { InfoCardProps } from "@/types/media.types";

export const InfoCard = ({ icon, label, value, testId }: InfoCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center justify-center p-3 rounded-lg bg-secondary/50"
  >
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span data-testid={testId} className="text-sm text-muted-foreground">
      {value}
    </span>
  </motion.div>
);
