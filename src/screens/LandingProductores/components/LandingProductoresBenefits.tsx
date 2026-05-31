"use client";

import { ChartNoAxesCombined, Medal, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { benefits } from "./landingProductores.data";

const icons = [ChartNoAxesCombined, ShieldCheck, Medal];
const EASE = [0.22, 1, 0.36, 1] as const;

export function LandingProductoresBenefits() {
  return (
    <section className="relative overflow-hidden bg-cv-green-900 py-24">
      <div className="bg-grain pointer-events-none absolute inset-0" />
      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-cv-green-700/40 blur-[130px]" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cv-gold-500/12 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-display text-center text-4xl font-semibold text-cv-cream-50 sm:text-5xl"
        >
          Beneficios Exclusivos de la Red
        </motion.h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {benefits.map((item, index) => {
            const Icon = icons[index] ?? Medal;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm transition-colors hover:border-cv-gold-400/40"
              >
                <div
                  className="absolute inset-0 -z-10 bg-cover bg-center opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cv-gold-500/20 ring-1 ring-cv-gold-400/40 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-cv-gold-300" />
                </span>
                <h3 className="font-display mt-6 text-2xl font-semibold leading-tight text-cv-cream-50">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cv-cream-100/80">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
