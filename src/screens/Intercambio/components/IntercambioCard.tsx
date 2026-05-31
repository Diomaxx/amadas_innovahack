"use client";

import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  titulo: string;
  busca: string;
  productor: string;
  ubicacion: string;
  estado: string; // "En Temporada" | "Disponible"
  tipo: "RAW_MATERIAL" | "SERVICIOS";
  rolProductor: string;
  accion: string; // "Proponer Trato" | "Enviar Consulta"
  imagen?: string;
  onAccion?: () => void;
}

/** Quita el prefijo "Tengo:" / "Busco:" del título para mostrarlo limpio. */
function limpiarTitulo(titulo: string): string {
  return titulo.replace(/^\s*(Tengo|Busco)\s*:\s*/i, "");
}

export function IntercambioCard({
  titulo,
  busca,
  productor,
  estado,
  tipo,
  rolProductor,
  accion,
  imagen,
  onAccion,
}: Props) {
  const estadoBadgeColor =
    estado === "En Temporada"
      ? "bg-[#F5D4BC] text-[#8B5A2B]"
      : "bg-cv-green-100 text-cv-green-800";

  const typeBadgeColor =
    tipo === "SERVICIOS"
      ? "bg-[#F5D4BC] text-[#8B5A2B]"
      : "bg-[#C9E4D8] text-cv-green-800";

  const tipoLabel = tipo === "SERVICIOS" ? "SERVICIOS" : "MATERIA PRIMA";

  const isSocioEstrategico = rolProductor.toLowerCase().includes("socio");

  const producerInitials = productor
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg sm:flex-row">
      {/* Imagen */}
      <div className="relative h-44 w-full overflow-hidden bg-cv-cream-100 sm:h-auto sm:w-[240px] sm:shrink-0">
        {imagen ? (
          <img
            src={imagen}
            alt={limpiarTitulo(titulo)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cv-cream-200">
              <Leaf className="h-6 w-6 text-cv-green-400" />
            </div>
            <span className="text-xs text-cv-gray-400">Imagen próximamente</span>
          </div>
        )}

        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
            estadoBadgeColor
          )}
        >
          {estado}
        </span>
      </div>

      {/* Contenido */}
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="min-w-0 text-base font-bold leading-snug text-cv-green-900 sm:text-lg md:text-xl">
            {limpiarTitulo(titulo)}
          </h3>
          <span
            className={cn(
              "shrink-0 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
              typeBadgeColor
            )}
          >
            {tipoLabel}
          </span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-cv-gray-600">
          <span className="font-medium text-cv-gray-700">Busco:</span> {busca}
        </p>

        {/* Footer: vendedor + acción */}
        <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-10 sm:w-10",
                isSocioEstrategico
                  ? "bg-[#F5D4BC] text-[#8B5A2B]"
                  : "bg-cv-green-200 text-cv-green-800"
              )}
            >
              {producerInitials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-cv-gray-900">{productor}</p>
              <p className="truncate text-xs text-cv-gray-500">{rolProductor}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onAccion}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-lg px-5 py-2 text-sm font-semibold transition-colors",
              accion === "Proponer Trato"
                ? "border-2 border-cv-green-900 text-cv-green-900 hover:bg-cv-green-50"
                : "bg-cv-green-900 text-white hover:bg-cv-green-800"
            )}
          >
            {accion}
          </button>
        </div>
      </div>
    </article>
  );
}
