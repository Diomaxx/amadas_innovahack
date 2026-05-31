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
    <article className="flex overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg">
      {/* Imagen — placeholder (catálogo) */}
      <div className="relative w-[220px] shrink-0 overflow-hidden rounded-l-2xl bg-cv-cream-100 sm:w-[260px]">
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
      <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-base font-bold leading-snug text-cv-green-900 sm:text-lg">
              {titulo}
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
            <span className="font-medium text-cv-gray-700">Busca:</span> {busca}
          </p>
        </div>

        {/* Bloque FAN */}
        <div className="my-4 rounded-xl bg-cv-cream-100 px-4 py-3.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <BadgeCheck className="h-4 w-4 shrink-0 text-cv-gold-600" strokeWidth={2} />
              <p className="text-[10px] font-bold uppercase tracking-wider text-cv-gold-600">
                {fanLabelDisplay}
              </p>
            </div>
            <p className="shrink-0 text-base font-bold text-cv-gold-600 sm:text-lg">{rango}</p>
          </div>

          {tipo === "RAW_MATERIAL" && (
            <>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-cv-cream-300">
                <div className="h-full w-[68%] rounded-full bg-cv-gold-600" />
              </div>
              <p className="mt-2 text-center text-xs italic text-cv-gray-500">
                Protección contra volatilidad del mercado activada.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                isSocioEstrategico
                  ? "bg-[#F5D4BC] text-[#8B5A2B]"
                  : "bg-cv-green-200 text-cv-green-800"
              )}
            >
              {producerInitials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-cv-gray-900">{productor}</p>
              <p className="text-xs text-cv-gray-500">{rolProductor}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onAccion}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
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
