"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/UI/MagneticButton";

const EASE = [0.22, 1, 0.36, 1] as const;

export function LandingRestaurantesCta() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-28 pt-10 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-cv-cream-300 bg-cv-cream-100 px-6 py-20 text-center">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 accent-shimmer" />
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-cv-gold-300/40 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-cv-green-200/50 blur-3xl" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-display relative mx-auto max-w-2xl text-4xl font-semibold leading-tight text-cv-green-900 sm:text-5xl"
        >
          ¿Listo para llevar el alma del bosque a tu menú?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="relative mx-auto mt-5 max-w-2xl text-lg text-cv-gray-700"
        >
          Únete a la red de chefs que están redefiniendo la alta gastronomía boliviana con
          responsabilidad ambiental.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          className="relative mt-10 flex flex-wrap justify-center gap-4"
        >
          <MagneticButton
            href="/auth"
            className="group inline-flex items-center gap-2 rounded-full bg-cv-green-800 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cv-green-900/20 transition-colors hover:bg-cv-green-700"
          >
            Unirse al Movimiento
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <a
            href="/catalogo"
            className="rounded-full border border-cv-green-700/70 px-8 py-3.5 text-sm font-semibold text-cv-green-800 transition hover:bg-cv-green-100"
          >
            Ver Catálogo de Temporada
          </a>
        </motion.div>
      </div>
    </section>
  );
}
