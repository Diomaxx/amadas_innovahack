"use client";

import Image from "next/image";
import Link from "next/link";
import { FileText, MessageCircle, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Temporada } from "./CatalogoFiltros";

/* ── Types ──────────────────────────────────────────────────────────── */
interface Disponibilidad {
  productor: string;
  estado: string;
  accion: string;
  icon?: string;
}

export interface EspecieCardData {
  id: string;
  nombre: string;
  nombreCientifico: string;
  categoria: string;
  temporada: Temporada;
  descripcion?: string;
  disponibilidad?: Disponibilidad[];
  imageSrc?: string;
}

interface CatalogoCardProps {
  especie: EspecieCardData;
  onContact?: (especie: EspecieCardData) => void;
}

/* ── Status badge config ─────────────────────────────────────────────── */
const temporadaConfig: Record<
  Temporada,
  { label: string; className: string }
> = {
  "En temporada": {
    label: "En temporada",
    className: "bg-cv-green-700/95 text-white",
  },
  "Próximamente": {
    label: "Próximamente",
    className: "bg-cv-gray-800/90 text-white",
  },
  "Finalizando": {
    label: "Stock Limitado",
    className: "bg-[#8B2E2E]/95 text-white",
  },
};

/* ── Component ───────────────────────────────────────────────────────── */
export function CatalogoCard({ especie, onContact }: CatalogoCardProps) {
  const badge = temporadaConfig[especie.temporada];
  const primaria = especie.disponibilidad?.[0];
  const accion = primaria?.accion ?? "Consultar";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cv-cream-300 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cv-green-900/10">
      {/* ── Imagen ───────────────────────────────────────────────── */}
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
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-cv-cream-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cv-cream-200">
              <Leaf className="h-6 w-6 text-cv-green-400" />
            </div>
            <span className="text-xs text-cv-gray-400">Imagen próximamente</span>
          </div>
        )}

        {/* Badge de temporada */}
        <span
          className={cn(
            "absolute right-2.5 top-2.5 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm",
            badge.className,
          )}
        >
          {badge.label}
        </span>
      </div>

      {/* ── Cuerpo ───────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-4">
        {/* Nombre */}
        <h3 className="text-base font-bold leading-snug text-cv-green-900">
          {especie.nombre}
        </h3>

        {/* Productor + descripción */}
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-cv-gray-600">
          {primaria ? (
            <span className="font-medium text-cv-gray-700">
              Por {primaria.productor}.{" "}
            </span>
          ) : null}
          {especie.descripcion}
        </p>

        {/* Disponibilidad (solo si hay productores con stock) */}
        {primaria && (
          <>
            <div className="my-3 h-px bg-cv-cream-200" />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-cv-gray-400">
              Disponibilidad
            </p>
            <p className="text-sm font-bold text-cv-green-800">
              {primaria.estado}
            </p>
          </>
        )}

        {/* Acciones */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <Link
            href={`/catalogo/${especie.id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-cv-green-800 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-cv-green-700"
          >
            <FileText className="h-3.5 w-3.5" />
            Ficha Técnica
          </Link>
          <button
            type="button"
            onClick={() => onContact?.(especie)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-cv-green-800 px-3 py-2 text-xs font-semibold text-cv-green-800 transition-colors hover:bg-cv-green-50"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {accion}
          </button>
        </div>
      </div>
    </article>
  );
}
