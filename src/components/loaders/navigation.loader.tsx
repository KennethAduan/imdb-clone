"use client";
import { motion } from "framer-motion";

const NavigationLoader = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="h-full bg-primary"
        initial={{ width: "0%" }}
        animate={{
          width: "100%",
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
    </motion.div>
  );
};

export default NavigationLoader;
