"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShareNetwork,
  Printer,
  Leaf,
  BookOpen,
  CookingPot,
} from "@phosphor-icons/react";
import type { Receta } from "../recetas.types";
import { CATEGORIA_VISUAL } from "./recetaVisuals";

export function RecetaDetail({ receta }: { receta: Receta }) {
  const visual = CATEGORIA_VISUAL[receta.categoria];
  const { Icon } = visual;

  const handleCompartir = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: receta.nombre, url });
      } else {
        await navigator.clipboard.writeText(`${receta.nombre} — ${url}`);
      }
    } catch {
      /* el usuario canceló el diálogo de compartir */
    }
  };

  const handleImprimir = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href="/recetas"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-[#2d4a3e]/70 transition-colors hover:text-[#2d4a3e]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a recetas
      </Link>

      {/* Hero visual */}
      <div
        className="relative flex aspect-[16/7] items-center justify-center overflow-hidden rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${visual.color} 0%, #2d4a3e 100%)`,
        }}
      >
        <Icon weight="duotone" className="h-24 w-24 text-[#f5f1e8]/25" />
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#f5f1e8] px-3 py-1.5 text-xs font-semibold text-[#2d4a3e]">
          <Leaf weight="fill" className="h-3.5 w-3.5 text-[#7a9b76]" />
          En temporada
        </span>
      </div>

      {/* Título + acciones */}
      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <span
            className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: visual.color, backgroundColor: visual.bg }}
          >
            <Icon weight="fill" className="h-3.5 w-3.5" />
            {visual.label}
          </span>
          <h1 className="font-serif text-3xl font-bold uppercase leading-tight text-[#2d4a3e] sm:text-4xl">
            {receta.nombre}
          </h1>
          <p className="mt-4 text-sm italic leading-relaxed text-[#2d4a3e]/65">
            Receta elaborada por: {receta.autores}. {receta.contexto}.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col lg:w-56">
          <button
            type="button"
            onClick={handleCompartir}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2d4a3e] px-5 py-2.5 text-sm font-medium text-[#f5f1e8] transition-colors hover:bg-[#2d4a3e]/90"
          >
            <ShareNetwork className="h-4 w-4" />
            Compartir receta
          </button>
          <button
            type="button"
            onClick={handleImprimir}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#b06a4a]/40 px-5 py-2.5 text-sm font-medium text-[#b06a4a] transition-colors hover:bg-[#b06a4a]/5"
          >
            <Printer className="h-4 w-4" />
            Imprimir
          </button>
        </div>
      </div>

      {/* Ingredientes + Preparación */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Ingredientes */}
        <section>
          <h2 className="mb-5 flex items-center gap-2 font-serif text-xl font-bold text-[#2d4a3e]">
            <BookOpen weight="duotone" className="h-5 w-5 text-[#7a9b76]" />
            Ingredientes
          </h2>
          <div className="space-y-5">
            {receta.ingredientes.map((seccion, i) => (
              <div key={i}>
                {seccion.seccion && (
                  <h3 className="mb-2 text-sm font-semibold text-[#2d4a3e]/80">
                    {seccion.seccion}:
                  </h3>
                )}
                <ul className="space-y-1.5">
                  {seccion.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-2 text-sm leading-relaxed text-[#2d4a3e]/75"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c9a86a]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Preparación */}
        <section>
          <h2 className="mb-5 flex items-center gap-2 font-serif text-xl font-bold text-[#2d4a3e]">
            <CookingPot weight="duotone" className="h-5 w-5 text-[#7a9b76]" />
            Preparación
          </h2>
          <div className="space-y-6">
            {receta.preparacion.map((seccion, i) => (
              <div key={i}>
                {seccion.seccion && (
                  <h3 className="mb-3 text-sm font-semibold text-[#2d4a3e]/80">
                    {seccion.seccion}:
                  </h3>
                )}
                <ol className="space-y-3">
                  {seccion.pasos.map((paso, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2d4a3e] text-xs font-semibold text-[#f5f1e8]">
                        {j + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-[#2d4a3e]/75">
                        {paso}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
