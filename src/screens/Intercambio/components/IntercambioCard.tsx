"use client";

import { BadgeCheck, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  titulo: string;
  busca: string;
  rango: string;
  productor: string;
  ubicacion: string;
  estado: "En Temporada" | "Disponible";
  tipo: "RAW_MATERIAL" | "SERVICIOS";
  rolProductor: string;
  accion: "Proponer Trato" | "Enviar Consulta";
  onAccion?: () => void;
}

export function IntercambioCard({
  titulo,
  busca,
  rango,
  productor,
  estado,
  tipo,
  rolProductor,
  accion,
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

  const isSocioEstrategico = rolProductor.toLowerCase().includes("socio");

  const producerInitials = productor
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const fanLabelDisplay =
    tipo === "SERVICIOS" ? "TARIFA SUGERIDA FAN" : "RANGO SUGERIDO FAN";
  const tipoLabel = tipo === "SERVICIOS" ? "SERVICES" : "RAW MATERIAL";

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg sm:rounded-2xl flex flex-col sm:flex-row">
      {/* Imagen — placeholder (catálogo) */}
      <div className="relative w-full h-32 sm:h-auto sm:w-[220px] sm:shrink-0 overflow-hidden rounded-t-xl sm:rounded-t-none sm:rounded-l-2xl bg-cv-cream-100">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-cv-cream-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cv-cream-200">
            <Leaf className="h-6 w-6 text-cv-green-400" />
          </div>
          <span className="text-xs text-cv-gray-400">Imagen próximamente</span>
        </div>

        <span
          className={cn(
            "absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold",
            estadoBadgeColor
          )}
        >
          {estado}
        </span>
      </div>

      {/* Contenido */}
      <div className="flex min-w-0 flex-1 flex-col justify-between p-4 sm:p-5 md:p-6">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-sm font-bold leading-snug text-cv-green-900 sm:text-base md:text-lg">
              {titulo}
            </h3>
            <span
              className={cn(
                "shrink-0 rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide sm:px-2.5 sm:py-1 sm:text-[10px]",
                typeBadgeColor
              )}
            >
              {tipoLabel}
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-cv-gray-600 sm:text-sm">
            <span className="font-medium text-cv-gray-700">Busca:</span> {busca}
          </p>
        </div>

        {/* Bloque FAN */}
        <div className="my-3 rounded-lg bg-cv-cream-100 px-3 py-2.5 sm:my-4 sm:rounded-xl sm:px-4 sm:py-3.5">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-cv-gold-600 sm:h-4 sm:w-4" strokeWidth={2} />
              <p className="text-[9px] font-bold uppercase tracking-wider text-cv-gold-600 sm:text-[10px]">
                {fanLabelDisplay}
              </p>
            </div>
            <p className="shrink-0 text-sm font-bold text-cv-gold-600 sm:text-base md:text-lg">{rango}</p>
          </div>

          {tipo === "RAW_MATERIAL" && (
            <>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cv-cream-300 sm:mt-3 sm:h-2">
                <div className="h-full w-[68%] rounded-full bg-cv-gold-600" />
              </div>
              <p className="mt-1.5 text-center text-[10px] italic text-cv-gray-500 sm:mt-2 sm:text-xs">
                Protección contra volatilidad del mercado activada.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-10 sm:w-10",
                isSocioEstrategico
                  ? "bg-[#F5D4BC] text-[#8B5A2B]"
                  : "bg-cv-green-200 text-cv-green-800"
              )}
            >
              {producerInitials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-cv-gray-900 sm:text-sm">{productor}</p>
              <p className="truncate text-[10px] text-cv-gray-500 sm:text-xs">{rolProductor}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onAccion}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:py-2 sm:text-sm",
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
