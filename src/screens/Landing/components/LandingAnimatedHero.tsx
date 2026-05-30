"use client";

import { motion } from "framer-motion";
import { Sparkle, Leaf, MapPin, Sprout } from "lucide-react";
import { landingMotion } from "./landingMotion";

type LandingAnimatedHeroProps = {
  backgroundImage: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const titleWords = ["Descubre", "los", "sabores"];
const trustChips = [
  { icon: Leaf, label: "100% silvestre" },
  { icon: MapPin, label: "Bosque Chiquitano" },
  { icon: Sprout, label: "Comercio regenerativo" },
];

export default function LandingAnimatedHero({
  backgroundImage,
}: LandingAnimatedHeroProps) {
  return (
    <motion.article
      className="bg-grain relative isolate overflow-hidden rounded-b-[2.5rem]"
      initial={{ height: landingMotion.hero.fullscreenHeight }}
      animate={{ height: landingMotion.hero.collapsedHeight }}
      transition={{
        duration: landingMotion.hero.shrinkDuration,
        delay: landingMotion.hero.shrinkDelay,
        ease: landingMotion.hero.shrinkEase,
      }}
    >
      {/* Slow zoom background */}
      <motion.div
        aria-hidden
        initial={{ scale: 1.18 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 6, ease: "easeOut" }}
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 10%, rgba(20,41,31,0.30) 0%, rgba(20,41,31,0.60) 55%, rgba(11,24,18,0.88) 100%)",
        }}
      />
      <motion.div
        aria-hidden
        className="animate-float-slow absolute left-[15%] top-[20%] -z-10 h-72 w-72 rounded-full bg-cv-gold-500/20 blur-[120px]"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-cv-gold-400/40 bg-white/5 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-cv-gold-300 backdrop-blur"
        >
          <Sparkle className="h-3.5 w-3.5" />
          Calendario Vivo
        </motion.p>

        <h1 className="font-display mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-8xl">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12, delayChildren: landingMotion.heroText.titleDelay },
              },
            }}
            className="inline-block"
          >
            {titleWords.map((word, i) => (
              <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "115%" },
                    visible: { y: 0, transition: { duration: 0.85, ease: EASE } },
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <br />
            <span className="mr-[0.28em] inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "115%" },
                  visible: { y: 0, transition: { duration: 0.85, ease: EASE } },
                }}
              >
                del
              </motion.span>
            </span>
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="text-gradient-gold inline-block"
                variants={{
                  hidden: { y: "115%" },
                  visible: { y: 0, transition: { duration: 0.85, ease: EASE } },
                }}
              >
                bosque
              </motion.span>
            </span>
          </motion.span>
        </h1>

        <motion.p
          className="mt-6 max-w-2xl text-base text-cv-cream-100/90 md:text-2xl"
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

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: landingMotion.heroText.subtitleDelay + 0.3, ease: EASE }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {trustChips.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-cv-cream-100 backdrop-blur"
            >
              <Icon className="h-4 w-4 text-cv-gold-300" />
              {label}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: landingMotion.hero.shrinkDelay + 0.5, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-cv-cream-300/40 p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-cv-gold-400/80" />
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
