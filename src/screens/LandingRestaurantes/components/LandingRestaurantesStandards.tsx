"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { standards } from "./landingRestaurantes.data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function LandingRestaurantesStandards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Image with floating quote */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-cv-green-900/20">
            <img
              src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=1200&q=80"
              alt="Chef preparando ingredientes"
              className="h-[30rem] w-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="absolute -bottom-6 -left-2 max-w-xs rounded-2xl border border-cv-cream-300 bg-cv-cream-50/95 p-5 shadow-xl backdrop-blur sm:-left-8"
          >
            <span className="font-display text-4xl leading-none text-cv-gold-500">&ldquo;</span>
            <p className="-mt-2 text-sm italic leading-relaxed text-cv-gray-700">
              La calidad del producto silvestre es incomparable con cualquier cultivo
              industrial.
            </p>
          </motion.div>
          <div className="absolute -right-4 -top-4 -z-10 h-28 w-28 rounded-full bg-cv-gold-300/40 blur-2xl" />
        </motion.div>

        {/* Copy + list */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-cv-gold-600"
          >
            Para chefs visionarios
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="font-display mt-3 text-4xl font-semibold leading-tight text-cv-green-900 sm:text-5xl"
          >
            Elevando el estándar culinario
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="mt-4 text-lg leading-relaxed text-cv-gray-700"
          >
            Buscamos chefs y restaurantes que vean en el bosque no solo una fuente de
            insumos, sino un aliado estratégico.
          </motion.p>

          <ul className="mt-8 space-y-5">
            {standards.map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.18 + index * 0.1, ease: EASE }}
                className="flex gap-4"
              >
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cv-green-100 ring-1 ring-cv-green-300">
                  <Check className="h-4 w-4 text-cv-green-700" />
                </span>
                <div>
                  <p className="font-semibold text-cv-green-900">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-cv-gray-700">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
