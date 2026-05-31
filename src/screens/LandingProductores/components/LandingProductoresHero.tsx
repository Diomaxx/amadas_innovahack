"use client";

import { useRef } from "react";
import { ArrowRight, Leaf } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WordReveal } from "@/components/UI/WordReveal";
import { MagneticButton } from "@/components/UI/MagneticButton";
import { heroData } from "./landingProductores.data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function LandingProductoresHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.26]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="bg-grain relative isolate flex min-h-[94vh] items-center justify-center overflow-hidden border-b border-cv-green-900 text-center"
    >
      <motion.div
        aria-hidden
        style={{ y: bgY, scale: bgScale, backgroundImage: `url('${heroData.backgroundImage}')` }}
        className="absolute inset-0 -z-20 bg-cover bg-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(110% 90% at 50% 18%, rgba(20,41,31,0.35) 0%, rgba(20,41,31,0.72) 55%, rgba(11,24,18,0.92) 100%)",
        }}
      />
      <motion.div
        aria-hidden
        style={{ opacity: fade }}
        className="animate-float-slow absolute left-[12%] top-[22%] -z-10 h-72 w-72 rounded-full bg-cv-gold-500/20 blur-[120px]"
      />

      <motion.div
        style={{ opacity: fade }}
        className="mx-auto max-w-4xl px-6 py-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-cv-gold-400/40 bg-white/5 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-cv-gold-300 backdrop-blur"
        >
          <Leaf className="h-3.5 w-3.5" />
          {heroData.badge}
        </motion.p>

        <WordReveal
          as="h1"
          text={heroData.title}
          delay={0.15}
          className="font-display mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-cv-cream-100/90"
        >
          {heroData.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            href="/auth"
            className="group inline-flex items-center gap-2 rounded-full bg-cv-gold-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/30 transition-colors hover:bg-cv-gold-500"
          >
            Comienza a Vender
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <a
            href="/menus"
            className="rounded-full border border-cv-cream-300/50 px-8 py-3.5 text-sm font-semibold text-white/95 backdrop-blur transition hover:bg-white/10"
          >
            Saber más
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
