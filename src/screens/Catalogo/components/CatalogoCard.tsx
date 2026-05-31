"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  MessageCircle,
  Clock,
  Leaf,
  AlertTriangle,
} from "lucide-react";
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

/* ── Status badge config ─────────────────────────────────────────────── */
const temporadaConfig: Record<
  Temporada,
  { label: string; icon: React.ReactNode; className: string }
> = {
  "En temporada": {
    label: "En temporada",
    icon: <Leaf className="h-3 w-3" />,
    className: "bg-cv-green-700/95 text-white",
  },
  "Próximamente": {
    label: "Próximamente",
    icon: <Clock className="h-3 w-3" />,
    className: "bg-cv-gray-800/90 text-white",
  },
  "Finalizando": {
    label: "Stock Limitado",
    icon: <AlertTriangle className="h-3 w-3" />,
    className: "bg-[#8B2E2E]/95 text-white",
  },
};

/* ── Component ───────────────────────────────────────────────────────── */
export function CatalogoCard({ especie }: { especie: EspecieCardData }) {
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
            "absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm",
            badge.className,
          )}
        >
          {badge.icon}
          {badge.label}
        </span>
      </div>

      {/* ── Cuerpo ───────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-4">
        {/* Nombre + disponibilidad */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug text-cv-green-900">
            {especie.nombre}
          </h3>
          {especie.disponibilidad && especie.disponibilidad.length > 0 ? (
            <span className="mt-0.5 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-cv-gold-600">
              {especie.disponibilidad.length}{" "}
              {especie.disponibilidad.length === 1 ? "productor" : "productores"}
            </span>
          ) : null}
        </div>

        {/* Productor + descripción */}
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-cv-gray-600">
          {primaria ? (
            <span className="font-medium text-cv-gray-700">
              Por {primaria.productor}.{" "}
            </span>
          ) : null}
          {especie.descripcion}
        </p>

        {/* Divisor */}
        <div className="my-3 h-px bg-cv-cream-200" />

        {/* Estado destacado (usamos datos reales en lugar de precio) */}
        <p className="text-[10px] font-semibold uppercase tracking-widest text-cv-gray-400">
          {primaria ? "Disponibilidad" : "Categoría"}
        </p>
        <p
          className={cn(
            "text-sm font-bold",
            primaria ? "text-cv-green-800" : "text-cv-gray-700",
          )}
        >
          {primaria ? primaria.estado : especie.categoria}
        </p>

        {/* Acciones */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={`/catalogo/${especie.id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-cv-green-800 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-cv-green-700"
          >
            <FileText className="h-3.5 w-3.5" />
            Ficha Técnica
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-cv-gold-300 px-3 py-2 text-xs font-semibold text-cv-green-900 transition-colors hover:bg-cv-gold-400"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {accion}
          </button>
        </div>
      </div>
    </article>
  );
}
