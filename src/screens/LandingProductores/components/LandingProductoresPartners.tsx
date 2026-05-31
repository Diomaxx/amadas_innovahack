"use client";

import { UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";
import { Marquee } from "@/components/UI/Marquee";
import { partnerNames } from "./landingProductores.data";

export function LandingProductoresPartners() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cv-gold-600">
          Marcas aliadas
        </p>
        <h2 className="font-display mt-3 text-4xl font-semibold text-cv-green-900 sm:text-5xl">
          Tus productos en las mejores manos
        </h2>
      </motion.div>

      <div className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-cv-cream-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-cv-cream-50 to-transparent" />

        <Marquee>
          {partnerNames.map((name) => (
            <span
              key={name}
              className="mx-8 inline-flex items-center gap-2.5 text-cv-gray-400 transition-colors duration-300 hover:text-cv-green-800"
            >
              <UtensilsCrossed className="h-5 w-5" />
              <span className="font-display text-3xl font-medium">{name}</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
