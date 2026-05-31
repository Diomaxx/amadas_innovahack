"use client";

import { useRef } from "react";
import { ArrowRight, Sparkle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WordReveal } from "@/components/UI/WordReveal";
import { MagneticButton } from "@/components/UI/MagneticButton";
import { heroData } from "./landingRestaurantes.data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function LandingRestaurantesHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="bg-grain relative isolate min-h-[92vh] overflow-hidden border-b border-cv-cream-300"
    >
      {/* Parallax background */}
      <motion.div
        aria-hidden
        style={{ y: bgY, scale: bgScale, backgroundImage: `url('${heroData.backgroundImage}')` }}
        className="absolute inset-0 -z-20 bg-cover bg-center"
      />
      {/* Editorial light wash, fades toward forest on the right */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(96deg, rgba(250,247,242,0.97) 0%, rgba(250,247,242,0.88) 38%, rgba(250,247,242,0.45) 64%, rgba(20,41,31,0.55) 100%)",
        }}
      />
      {/* Organic gold glow */}
      <motion.div
        aria-hidden
        style={{ opacity: fade }}
        className="animate-float-slow absolute -right-24 top-24 -z-10 h-96 w-96 rounded-full bg-cv-gold-400/30 blur-[110px]"
      />

      <div className="mx-auto flex min-h-[92vh] max-w-6xl items-center px-6 sm:px-8">
        <motion.div style={{ opacity: fade }} className="max-w-2xl py-24">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-cv-green-300/60 bg-cv-green-50/80 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cv-green-800 backdrop-blur"
          >
            <Sparkle className="h-3.5 w-3.5 text-cv-gold-600" />
            {heroData.badge}
          </motion.p>

          <WordReveal
            as="h1"
            text={heroData.title}
            delay={0.15}
            className="font-display mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-cv-green-900 sm:text-7xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-cv-gray-700"
          >
            {heroData.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="/catalogo"
              className="group inline-flex items-center gap-2 rounded-full bg-cv-green-800 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cv-green-900/20 transition-colors hover:bg-cv-green-700"
            >
              Ver Catálogo de Temporada
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <a
              href="/menus"
              className="rounded-full border border-cv-green-700/70 px-8 py-3.5 text-sm font-semibold text-cv-green-800 transition hover:bg-cv-green-100"
            >
              Conocer más
            </a>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
