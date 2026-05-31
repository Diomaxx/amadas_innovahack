"use client";

import { motion } from "framer-motion";
import { testimonials } from "./landingProductores.data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function LandingProductoresTestimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cv-gold-600">
          Voces de la red
        </p>
        <h2 className="font-display mt-3 text-4xl font-semibold text-cv-green-900 sm:text-5xl">
          Líderes de la Red
        </h2>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {testimonials.map((item, index) => (
          <motion.article
            key={item.author}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
            className="bg-grain relative overflow-hidden rounded-3xl bg-cv-green-800 p-9 text-white shadow-xl shadow-cv-green-900/25"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cv-gold-500/15 blur-2xl" />
            <span className="font-display relative text-6xl leading-none text-cv-gold-400/70">
              &ldquo;
            </span>
            <p className="font-display relative -mt-4 text-xl font-medium leading-snug text-cv-cream-50">
              {item.quote}
            </p>
            <div className="relative mt-7 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cv-gold-500/20 font-display text-lg font-semibold text-cv-gold-300 ring-1 ring-cv-gold-400/40">
                {item.author.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-semibold text-cv-cream-50">{item.author}</p>
                <p className="text-xs text-cv-green-200">{item.role}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
