"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/UI/MagneticButton";
import { steps } from "./landingRestaurantes.data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function LandingRestaurantesSteps() {
  return (
    <section className="relative overflow-hidden bg-cv-green-900 py-24 text-center">
      <div className="bg-grain pointer-events-none absolute inset-0" />
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cv-green-700/40 blur-[120px]" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cv-gold-500/15 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-cv-gold-400"
        >
          El recorrido
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          className="font-display mt-3 text-4xl font-semibold text-cv-cream-50 sm:text-5xl"
        >
          Cómo conectar con el bosque
        </motion.h2>

        <div className="relative mt-16 grid gap-12 md:grid-cols-3">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-cv-green-500/50 to-transparent md:block" />

          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
              className="relative"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cv-gold-500/40 bg-cv-green-800 font-display text-xl font-semibold text-cv-gold-300 shadow-lg shadow-black/30">
                {index + 1}
              </div>
              <h3 className="font-display mt-6 text-2xl font-semibold text-cv-cream-50">
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-cv-cream-100/70">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-16"
        >
          <MagneticButton
            href="/catalogo"
            className="group inline-flex items-center gap-2 rounded-full border border-cv-gold-500/60 px-8 py-3.5 text-sm font-semibold text-cv-cream-50 transition hover:bg-cv-gold-500/10"
          >
            Explorar temporada
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
