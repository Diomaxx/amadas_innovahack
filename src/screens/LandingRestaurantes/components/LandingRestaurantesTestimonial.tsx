"use client";

import { motion } from "framer-motion";
import { testimonial } from "./landingRestaurantes.data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function LandingRestaurantesTestimonial() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="bg-grain relative overflow-hidden rounded-[2.5rem] bg-cv-green-800 px-8 py-16 text-center text-white shadow-2xl shadow-cv-green-900/30 sm:px-16"
      >
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-cv-green-700/50 blur-[90px]" />
        <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-cv-gold-500/20 blur-[90px]" />

        <span className="font-display relative text-7xl leading-none text-cv-gold-400/80">
          &ldquo;
        </span>
        <p className="font-display relative mx-auto -mt-6 max-w-3xl text-2xl font-medium leading-snug text-cv-cream-50 sm:text-4xl">
          {testimonial.quote}
        </p>

        <div className="relative mt-10 flex items-center justify-center gap-4">
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="h-14 w-14 rounded-full border-2 border-cv-gold-400/70 object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-cv-cream-50">{testimonial.author}</p>
            <p className="text-xs text-cv-green-200">{testimonial.role}</p>
          </div>
        </div>
      </motion.article>
    </section>
  );
}
