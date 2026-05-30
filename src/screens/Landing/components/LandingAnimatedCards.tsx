"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { landingMotion } from "./landingMotion";

type LandingAnimatedCardsProps = {
  children: ReactNode;
};

export default function LandingAnimatedCards({
  children,
}: LandingAnimatedCardsProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-3 px-4 md:grid-cols-2 md:px-6"
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: landingMotion.cards.revealDuration,
        delay: landingMotion.cards.revealDelay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

