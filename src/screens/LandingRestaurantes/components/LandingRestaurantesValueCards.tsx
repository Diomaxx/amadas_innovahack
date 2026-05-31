"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { valueCards } from "./landingRestaurantes.data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function LandingRestaurantesValueCards() {
  return (
    <section className="mx-auto -mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        {valueCards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
            whileHover={{ y: -8 }}
            className="group relative min-h-[20rem] overflow-hidden rounded-3xl border border-white/10 shadow-xl shadow-cv-green-900/10 ring-1 ring-cv-cream-300/40"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: `url('${card.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cv-green-900 via-cv-green-900/40 to-transparent transition-opacity duration-500 group-hover:from-cv-green-900 group-hover:via-cv-green-900/55" />

            {/* index marker */}
            <span className="absolute right-5 top-5 font-display text-sm font-medium tracking-widest text-cv-gold-300/80">
              0{index + 1}
            </span>

            <div className="relative flex min-h-[20rem] flex-col justify-end p-7 text-white">
              <div className="h-px w-12 origin-left scale-x-100 bg-cv-gold-400 transition-all duration-500 group-hover:w-20" />
              <h2 className="font-display mt-4 text-3xl font-semibold leading-tight">
                {card.title}
              </h2>
              <p className="mt-2 max-w-xs translate-y-1 text-sm leading-relaxed text-cv-cream-100/90 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {card.description}
              </p>
              <ArrowUpRight className="mt-4 h-5 w-5 text-cv-gold-300 opacity-0 transition-all duration-500 group-hover:opacity-100" />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
