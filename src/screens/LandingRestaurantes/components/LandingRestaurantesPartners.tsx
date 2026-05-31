"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/UI/Marquee";
import { partnerRestaurants } from "./landingRestaurantes.data";

export function LandingRestaurantesPartners() {
  return (
    <section className="py-20">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-cv-gray-500"
      >
        Restaurantes que ya transforman el bosque
      </motion.p>

      <div className="relative mt-10">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cv-cream-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cv-cream-50 to-transparent" />

        <Marquee>
          {partnerRestaurants.map((partner) => (
            <span
              key={partner}
              className="font-display mx-10 text-4xl font-medium text-cv-gray-400 transition-colors duration-300 hover:text-cv-green-800"
            >
              {partner}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
