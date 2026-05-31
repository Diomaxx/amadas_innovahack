"use client";

import Link from "next/link";
import Image from "next/image";
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
      className="print:bg-white print:p-8"
    >
      {/* Cabecera exclusiva para impresión */}
      <div className="hidden print:block mb-8">
        <div className="flex items-end justify-between border-b-2 border-[#2d4a3e] pb-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="ALMA Logo"
              width={42}
              height={42}
              className="object-contain"
            />
            <div className="leading-tight">
              <span className="block font-display text-2xl font-bold tracking-tight text-[#2d4a3e]">
                ALMA
              </span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-[#2d4a3e]/55">
                Fundación Amigos de la Naturaleza
              </span>
            </div>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c9a86a]">
            Recetario de los bosques de Bolivia
          </span>
        </div>
        <div className="mt-1 h-0.5 w-24 rounded-full bg-[#c9a86a]" />
      </div>

      <Link
        href="/recetas"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-[#2d4a3e]/70 transition-colors hover:text-[#2d4a3e] print:hidden"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a recetas
      </Link>

      <div className="relative flex aspect-[16/7] items-center justify-center overflow-hidden rounded-3xl print:hidden">
        {receta.imagen ? (
          <>
            <Image
              src={receta.imagen}
              alt={receta.nombre}
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover"
              priority
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B3A2D]/55 via-[#1B3A2D]/15 to-transparent" />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${visual.color} 0%, #2d4a3e 100%)`,
            }}
          />
        )}

        {!receta.imagen && (
          <Icon weight="duotone" className="relative h-24 w-24 text-[#f5f1e8]/25" />
        )}

        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#f5f1e8] px-3 py-1.5 text-xs font-semibold text-[#2d4a3e]">
          <Leaf weight="fill" className="h-3.5 w-3.5 text-[#7a9b76]" />
          En temporada
        </span>
      </div>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between print:mt-0 print:block">
        <div className="max-w-2xl print:max-w-full">
          <span
            className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide print:border print:border-[#2d4a3e]/20 print:text-[#2d4a3e] print:!bg-transparent"
            style={{ color: visual.color, backgroundColor: visual.bg }}
          >
            <Icon weight="fill" className="h-3.5 w-3.5 print:text-[#2d4a3e]" />
            {visual.label}
          </span>
          <h1 className="text-3xl font-bold uppercase leading-tight text-[#2d4a3e] sm:text-4xl print:text-[#2d4a3e]">
            {receta.nombre}
          </h1>
          <p className="mt-4 text-sm italic leading-relaxed text-[#2d4a3e]/65 print:text-[#2d4a3e]/80">
            Receta elaborada por: {receta.autores}. {receta.contexto}.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:w-56 lg:flex-col print:hidden">
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

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] print:mt-10 print:grid-cols-2 print:gap-12">
        <section>
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-[#2d4a3e] print:text-[#2d4a3e] print:border-b print:border-[#2d4a3e]/10 print:pb-2">
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
                      className="flex gap-2 text-sm leading-relaxed text-[#2d4a3e]/75 print:text-[#2d4a3e]/90"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a86a] print:bg-[#c9a86a]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 flex items-center gap-2.5 text-2xl font-bold text-[#2d4a3e] print:text-[#2d4a3e] print:border-b print:border-[#2d4a3e]/10 print:pb-2">
            <CookingPot weight="duotone" className="h-6 w-6 text-[#7a9b76]" />
            Preparación
          </h2>
          <div className="space-y-8">
            {receta.preparacion.map((seccion, i) => (
              <div key={i}>
                {seccion.seccion && (
                  <h3 className="mb-4 text-base font-semibold text-[#2d4a3e]/80">
                    {seccion.seccion}:
                  </h3>
                )}
                <ol className="space-y-5">
                  {seccion.pasos.map((paso, j) => (
                    <li key={j} className="flex gap-4 print:break-inside-avoid">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2d4a3e] text-sm font-semibold text-[#f5f1e8] print:bg-[#2d4a3e]/10 print:text-[#2d4a3e]">
                        {j + 1}
                      </span>
                      <p className="self-center text-base leading-relaxed text-[#2d4a3e]/80 print:text-[#2d4a3e]/90">
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
