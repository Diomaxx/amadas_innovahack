"use client";

import { Pencil, Trash2, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductoTemporada } from "../temporada.types";
import { ESTADO_VISUAL, formatCiclo, mesesToCiclos } from "../temporada.data";

type Props = {
  producto: ProductoTemporada;
  onEditar: (producto: ProductoTemporada) => void;
  onEliminar: (producto: ProductoTemporada) => void;
};

export function TemporadaCard({ producto, onEditar, onEliminar }: Props) {
  const ciclos = mesesToCiclos(producto.temporadaMeses ?? []);
  const estadoClase = ESTADO_VISUAL[producto.temporada] ?? ESTADO_VISUAL["Fuera de temporada"];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-cv-cream-300 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-1 flex-col p-5">
        {/* Nombre + estado */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug text-cv-green-900">
            {producto.nombre}
          </h3>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold",
              estadoClase,
            )}
          >
            {producto.temporada}
          </span>
        </div>

        <p className="mt-0.5 text-xs italic text-cv-gray-500">
          {producto.nombreCientifico}
        </p>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-cv-gray-600">
          {producto.descripcion}
        </p>

        {/* Ciclos de cosecha */}
        {ciclos.length > 0 && (
          <div className="mt-3 space-y-0.5">
            {ciclos.map((ciclo, i) => (
              <p
                key={`${ciclo.inicio}-${ciclo.fin}`}
                className="flex items-center gap-1.5 text-xs text-cv-gray-600"
              >
                <CalendarDays className="h-3.5 w-3.5 shrink-0 text-cv-green-600" />
                {ciclos.length > 1 && (
                  <span className="font-medium text-cv-gray-700">Ciclo {i + 1}:</span>
                )}
                {formatCiclo(ciclo)}
              </p>
            ))}
          </div>
        )}

        {/* Uso gastronómico */}
        {producto.usoGastronomico && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-cv-gray-500">
            <span className="font-medium text-cv-gray-700">Uso gastronómico:</span>{" "}
            {producto.usoGastronomico}
          </p>
        )}

        {/* Propiedades */}
        {producto.propiedades.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-cv-gray-500">
              Propiedades:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {producto.propiedades.map((p) => (
                <span
                  key={p}
                  className="rounded-md bg-cv-green-100 px-2 py-0.5 text-[10px] font-medium text-cv-green-800"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="mt-auto flex gap-2 pt-5">
          <button
            type="button"
            onClick={() => onEditar(producto)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-cv-cream-300 px-3 py-2 text-xs font-semibold text-cv-gray-700 transition-colors hover:bg-cv-cream-100"
          >
            <Pencil className="h-3.5 w-3.5" />
            Editar
          </button>
          <button
            type="button"
            onClick={() => onEliminar(producto)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
