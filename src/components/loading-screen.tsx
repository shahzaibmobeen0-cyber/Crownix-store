"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
  const word = "CROWNIX";

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-onyx"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-[2px] overflow-hidden">
        {word.split("").map((letter, i) => (
          <motion.span
            key={i}
            className="font-display text-4xl md:text-6xl font-medium text-ivory"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <motion.div
        className="mt-4 h-[1px] w-40 bg-gradient-to-r from-transparent via-champagne to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
      />
      <motion.p
        className="eyebrow mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        Luxury Within Reach
      </motion.p>
    </motion.div>
  );
}
