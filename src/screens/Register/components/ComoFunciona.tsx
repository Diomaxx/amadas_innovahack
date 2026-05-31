"use client";

import { motion } from "framer-motion";
import { PASOS_RED } from "../register.data";

export function ComoFunciona() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-14 rounded-3xl border border-cv-cream-300 bg-cv-cream-50/70 p-8 sm:p-10"
    >
      <h2 className="text-center font-display text-2xl font-bold text-cv-green-900">
        ¿Cómo funciona nuestra red?
      </h2>

      <div className="relative mt-10 grid gap-8 sm:grid-cols-3">
        {/* Línea conectora (solo desktop) */}
        <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-5 hidden h-px bg-cv-cream-300 sm:block" />

        {PASOS_RED.map((paso, i) => {
          const { Icon } = paso;
          return (
            <motion.div
              key={paso.numero}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.5 + i * 0.12 }}
              className="relative flex flex-col items-center text-center"
            >
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-cv-green-800 ring-2 ring-cv-green-200">
                {paso.numero}
              </span>
              <div className="mt-4 flex items-center gap-2">
                <Icon className="h-4 w-4 text-cv-green-600" />
                <h3 className="text-sm font-semibold text-cv-gray-800">
                  {paso.title}
                </h3>
              </div>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-cv-gray-600">
                {paso.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
