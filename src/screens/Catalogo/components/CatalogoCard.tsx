"use client";

import Image from "next/image";
import { ArrowRight, Clock, Leaf, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Temporada } from "./CatalogoFiltros";

/* ── Types ──────────────────────────────────────────────────────────── */
export interface EspecieCardData {
  id: string;
  nombre: string;
  nombreCientifico: string;
  categoria: string;
  temporada: Temporada;
  imageSrc?: string; // Optional — placeholder shown when missing
}

interface CatalogoCardProps {
  especie: EspecieCardData;
  onClick?: () => void;
}

/* ── Status badge config ─────────────────────────────────────────────── */
const temporadaConfig: Record<
  Temporada,
  { label: string; icon: React.ReactNode; className: string }
> = {
  "En temporada": {
    label: "En temporada",
    icon: <Leaf className="h-3 w-3" />,
    className: "bg-cv-green-700 text-white",
  },
  "Próximamente": {
    label: "Próximamente",
    icon: <Clock className="h-3 w-3" />,
    className: "bg-cv-gray-700 text-white",
  },
  "Finalizando": {
    label: "Finalizando",
    icon: <AlertTriangle className="h-3 w-3" />,
    className: "bg-[#8B2E2E] text-white",
  },
};

/* ── Component ───────────────────────────────────────────────────────── */
export function CatalogoCard({ especie, onClick }: CatalogoCardProps) {
  const badge = temporadaConfig[especie.temporada];

  return (
    <article
      onClick={onClick}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-cv-cream-300 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* ── Image area ───────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {especie.imageSrc ? (
          <Image
            src={especie.imageSrc}
            alt={especie.nombre}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          /* Placeholder: ready for image insertion */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-cv-cream-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cv-cream-200">
              <Leaf className="h-6 w-6 text-cv-green-400" />
            </div>
            <span className="text-xs text-cv-gray-400">Imagen próximamente</span>
          </div>
        )}

        {/* Status badge */}
        <span
          className={cn(
            "absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
            badge.className
          )}
        >
          {badge.icon}
          {badge.label}
        </span>
      </div>

      {/* ── Card body ────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
        <p className="text-sm font-semibold text-cv-gray-900 leading-snug">{especie.nombre}</p>
        <p className="mt-0.5 text-xs italic text-cv-gray-500">{especie.nombreCientifico}</p>

        {/* Divider */}
        <div className="my-3 h-px bg-cv-cream-200" />

        {/* Category + arrow */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-cv-gray-500">
            {especie.categoria}
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full text-cv-green-700 transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
