"use client";

import { motion } from "framer-motion";
import { landingMotion } from "./landingMotion";

type LandingAnimatedHeroProps = {
  backgroundImage: string;
};

export default function LandingAnimatedHero({
  backgroundImage,
}: LandingAnimatedHeroProps) {
  return (
    <motion.article
      className="relative h-screen overflow-hidden"
      initial={{ height: landingMotion.hero.fullscreenHeight }}
      animate={{ height: landingMotion.hero.collapsedHeight }}
      transition={{
        duration: landingMotion.hero.shrinkDuration,
        delay: landingMotion.hero.shrinkDelay,
        ease: landingMotion.hero.shrinkEase,
      }}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-7xl"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: landingMotion.heroText.titleDuration,
            delay: landingMotion.heroText.titleDelay,
            ease: "easeOut",
          }}
        >
          Descubre los sabores
          <br />
          del <span className="text-[#e6b94d]">bosque</span>
        </motion.h1>
        <motion.p
          className="mt-5 max-w-3xl text-base text-white/90 md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: landingMotion.heroText.subtitleDuration,
            delay: landingMotion.heroText.subtitleDelay,
            ease: "easeOut",
          }}
        >
          Conoce qué productos están en temporada y encuentra inspiración
          gastronómica sostenible.
        </motion.p>
      </div>
    </motion.article>
  );
}

