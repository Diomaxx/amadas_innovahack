"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import type { Receta } from "../recetas.types";
import { CATEGORIA_VISUAL } from "./recetaVisuals";

export function RecetaCard({
  receta,
  index,
}: {
  receta: Receta;
  index: number;
}) {
  const visual = CATEGORIA_VISUAL[receta.categoria];
  const { Icon } = visual;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04 }}
    >
      <Link
        href={`/recetas/${receta.id}`}
        className="group flex h-full flex-col rounded-2xl border border-[#e8e0d0] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#7a9b76]/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d4a3e]"
      >
        {/* Categoría */}
        <div
          className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
          style={{ color: visual.color, backgroundColor: visual.bg }}
        >
          <Icon weight="fill" className="h-3.5 w-3.5" />
          {visual.label}
        </div>

        {/* Nombre */}
        <h3 className="mb-1 text-lg font-bold leading-snug text-[#2d4a3e] transition-colors group-hover:text-[#1B3A2D]">
          {receta.nombre}
        </h3>
        <p className="mb-4 line-clamp-1 text-xs text-[#2d4a3e]/55">
          Por: {receta.autores}
        </p>

        {/* Insumos */}
        {receta.insumos.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-1.5">
            {receta.insumos.map((insumo) => (
              <span
                key={insumo}
                className="rounded-md bg-[#7a9b76]/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#2d4a3e]/70"
              >
                {insumo}
              </span>
            ))}
          </div>
        )}

        {/* Acción */}
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#2d4a3e]">
          Ver receta
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.article>
  );
}
