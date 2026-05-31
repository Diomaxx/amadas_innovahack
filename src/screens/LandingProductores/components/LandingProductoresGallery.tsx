"use client";

import { motion } from "framer-motion";
import { galleryImages } from "./landingProductores.data";

const EASE = [0.22, 1, 0.36, 1] as const;
// Editorial masonry rhythm: some tiles span two rows.
const spans = [
  "sm:row-span-2",
  "",
  "",
  "",
  "sm:row-span-2",
  "",
];

export function LandingProductoresGallery() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-28 pt-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cv-gold-600">
          El bosque
        </p>
        <h2 className="font-display mt-3 text-4xl font-semibold text-cv-green-900 sm:text-5xl">
          Un Tesoro de Biodiversidad
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-cv-gray-700">
          Explora la riqueza natural de donde provienen nuestros productos.
        </p>
      </motion.div>

      <div className="mt-12 grid auto-rows-[12rem] grid-cols-2 gap-4 lg:grid-cols-3">
        {galleryImages.map((image, index) => (
          <motion.div
            key={`${image}-${index}`}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
            className={`group relative overflow-hidden rounded-2xl ${spans[index] ?? ""}`}
          >
            <img
              src={image}
              alt={`Bosques de Bolivia ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cv-green-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute bottom-3 left-4 font-display text-sm tracking-widest text-cv-cream-50 opacity-0 transition-all duration-500 group-hover:opacity-100">
              0{index + 1} — Bolivia
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
