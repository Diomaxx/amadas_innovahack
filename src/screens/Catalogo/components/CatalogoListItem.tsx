"use client";

import Image from "next/image";
import { Leaf, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Temporada } from "./CatalogoFiltros";

/* ── Types ──────────────────────────────────────────────────────────── */
export interface EspecieListData {
  id: string;
  nombre: string;
  nombreCientifico: string;
  temporada: Temporada;
  imageSrc?: string;
}

interface CatalogoListItemProps {
  especie: EspecieListData;
  onClick?: () => void;
}

/* ── Status badge config ─────────────────────────────────────────────── */
const temporadaConfig: Record<
  Temporada,
  { label: string; icon: React.ReactNode; className: string }
> = {
  "En temporada": {
    label: "EN TEMPORADA",
    icon: <Leaf className="h-3 w-3" />,
    className: "border-cv-green-300 bg-cv-green-50 text-cv-green-700",
  },
  "Próximamente": {
    label: "PRÓXIMAMENTE",
    icon: <Clock className="h-3 w-3" />,
    className: "border-cv-gray-300 bg-cv-gray-100 text-cv-gray-600",
  },
  "Finalizando": {
    label: "FINALIZANDO",
    icon: <AlertTriangle className="h-3 w-3" />,
    className: "border-[#e9d1d1] bg-[#fdf3f3] text-[#8B2E2E]",
  },
};

/* ── Component ───────────────────────────────────────────────────────── */
export function CatalogoListItem({ especie, onClick }: CatalogoListItemProps) {
  const badge = temporadaConfig[especie.temporada];

  return (
    <article
      onClick={onClick}
      className="group flex cursor-pointer items-center gap-4 rounded-xl border border-cv-cream-300 bg-white px-4 py-3.5 transition-all duration-200 hover:border-cv-green-300 hover:shadow-sm"
    >
      {/* Icon / image thumbnail */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cv-cream-100">
        {especie.imageSrc ? (
          <Image
            src={especie.imageSrc}
            alt={especie.nombre}
            fill
            className="object-cover"
            sizes="40px"
          />
        ) : (
          <Leaf className="h-5 w-5 text-cv-green-400" />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-semibold text-cv-gray-900">{especie.nombre}</p>
        <p className="truncate text-xs italic text-cv-gray-500">{especie.nombreCientifico}</p>
      </div>

      {/* Badge */}
      <span
        className={cn(
          "flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
          badge.className
        )}
      >
        {badge.icon}
        {badge.label}
      </span>
    </article>
  );
}
