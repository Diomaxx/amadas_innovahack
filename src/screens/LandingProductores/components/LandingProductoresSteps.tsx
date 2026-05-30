"use client";

import { BadgeCheck, CalendarCheck, UsersRound, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/UI/MagneticButton";
import { steps } from "./landingProductores.data";

const icons = [BadgeCheck, CalendarCheck, UsersRound];
const EASE = [0.22, 1, 0.36, 1] as const;

export function LandingProductoresSteps() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cv-gold-600">
          Proceso
        </p>
        <h2 className="font-display mt-3 text-4xl font-semibold text-cv-green-900 sm:text-5xl">
          3 Pasos hacia tu Crecimiento
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-cv-gray-700">
          Simplificamos el acceso al mercado global para tu asociación.
        </p>
      </motion.div>

      <div className="relative mt-16 grid gap-12 md:grid-cols-3">
        <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-cv-green-300 to-transparent md:block" />

        {steps.map((step, index) => {
          const Icon = icons[index] ?? BadgeCheck;

          return (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
              className="relative"
            >
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cv-green-700 text-white shadow-lg shadow-cv-green-900/25 ring-4 ring-cv-cream-50">
                <Icon className="h-7 w-7" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-cv-gold-500 font-display text-xs font-bold text-white ring-2 ring-cv-cream-50">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-display mt-6 text-2xl font-semibold text-cv-green-900">
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-cv-gray-700">
                {step.description}
              </p>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        className="mt-16"
      >
        <MagneticButton
          href="/auth"
          className="group inline-flex items-center gap-2 rounded-full bg-cv-gold-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cv-gold-600/25 transition-colors hover:bg-cv-gold-500"
        >
          Solicitar Unión Ahora
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </MagneticButton>
      </motion.div>
    </section>
  );
}
