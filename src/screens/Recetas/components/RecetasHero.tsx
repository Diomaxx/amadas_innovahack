"use client";

import { motion } from "framer-motion";
import { Sparkle } from "@phosphor-icons/react";

const CHEFS = [
  "Julio Canedo Rosso",
  "Javier Libera Tapia",
  "Santos Coaquira Tantani",
];

export function RecetasHero({ total }: { total: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-[#2d4a3e] p-8 text-[#f5f1e8] sm:p-10 lg:p-12"
    >
      {/* Adornos de fondo */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#c9a86a] blur-3xl" />
        <div className="absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-[#7a9b76] blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a86a]/40 bg-[#c9a86a]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-[#c9a86a]">
            <Sparkle weight="fill" className="h-4 w-4" />
            Recetario que celebra la identidad chiquitana
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Sabores de la Chiquitanía
          </h1>
          <p className="mt-4 max-w-xl text-base italic leading-relaxed text-[#f5f1e8]/80">
            «Cada receta es un testimonio vivo de la sabiduría ancestral, un
            legado que combina conocimiento científico con creatividad
            culinaria.»
          </p>
          <p className="mt-6 text-xs uppercase tracking-widest text-[#f5f1e8]/50">
            Presentación del recetario · {total} recetas · 1.ª edición
          </p>
        </div>

        {/* Chefs colaboradores */}
        <div className="w-full max-w-xs shrink-0 rounded-2xl border border-[#f5f1e8]/15 bg-[#f5f1e8]/5 p-5 backdrop-blur">
          <p className="mb-3 text-sm font-semibold text-[#c9a86a]">
            Chefs Colaboradores
          </p>
          <ul className="space-y-1.5">
            {CHEFS.map((chef) => (
              <li key={chef} className="text-sm text-[#f5f1e8]/85">
                {chef}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-[#f5f1e8]/10 pt-3 text-xs text-[#f5f1e8]/50">
            54+ autoras y autores
          </p>
        </div>
      </div>
    </motion.section>
  );
}
