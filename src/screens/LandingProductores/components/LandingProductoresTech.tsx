"use client";

import { Leaf, BellRing, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import { techCards } from "./landingProductores.data";

const icons = [Leaf, BellRing, Handshake];
const EASE = [0.22, 1, 0.36, 1] as const;

export function LandingProductoresTech() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cv-gold-600">
          Plataforma
        </p>
        <h2 className="font-display mt-3 text-4xl font-semibold text-cv-green-900 sm:text-5xl">
          Tecnología al servicio del bosque
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-cv-gray-700">
          Herramientas digitales diseñadas para que las asociaciones locales gestionen su
          producción con eficiencia.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {techCards.map((card, index) => {
          const Icon = icons[index] ?? Leaf;

          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
              whileHover={{ y: -8 }}
              className="group relative min-h-[22rem] overflow-hidden rounded-3xl shadow-xl shadow-cv-green-900/20"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${card.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cv-green-900 via-cv-green-900/75 to-cv-green-900/40" />

              <div className="relative flex min-h-[22rem] flex-col justify-end p-7 text-white">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cv-gold-500/20 ring-1 ring-cv-gold-400/40 backdrop-blur transition-transform duration-500 group-hover:-translate-y-1">
                  <Icon className="h-5 w-5 text-cv-gold-300" />
                </span>
                <h3 className="font-display mt-5 text-2xl font-semibold leading-tight">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cv-cream-100/85">
                  {card.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
