"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface MonthData {
  mes: string;
  estado: string; // 'no-disponible', 'comienza', 'en-temporada', 'ultimos-dias'
}

interface CalendarioCosecha {
  temporadaPrincipal: string;
  meses: MonthData[];
  mensaje: string;
}

interface ProductHeroProps {
  nombre: string;
  nombreCientifico: string;
  temporada: string;
  calendarioCosecha?: CalendarioCosecha;
  imageSrc?: string;
}

/* ── Helpers for Timeline Colors ───────────────────────────────────── */
function getEstadoColor(estado: string) {
  switch (estado) {
    case "comienza":
      return "bg-[#8AA773]"; // light green
    case "en-temporada":
      return "bg-[#2D5741]"; // dark green
    case "ultimos-dias":
      return "bg-[#D4A017]"; // gold/yellow
    case "no-disponible":
    default:
      return "bg-[#E2E8E4]"; // light gray/greenish
  }
}

export function ProductHero({
  nombre,
  nombreCientifico,
  temporada,
  calendarioCosecha,
  imageSrc,
}: ProductHeroProps) {
  // Pill for season (simplified, using the UI from image)
  const isActiva = temporada !== "Próximamente" && temporada !== "No disponible";

  return (
    <div className="flex flex-col gap-6">
      {/* ── Back button ── */}
      <Link
        href="/catalogo"
        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#4A4A4A] transition hover:text-[#24503C]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al Catálogo
      </Link>

      {/* ── Main Hero Grid ── */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        {/* Left: Image */}
        <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden rounded-[2rem] shadow-sm">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={nombre}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-cv-cream-200">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cv-cream-300">
                <Leaf className="h-8 w-8 text-cv-green-500" />
              </div>
              <span className="text-sm font-medium text-cv-gray-500">Imagen próximamente</span>
            </div>
          )}
        </div>

        {/* Right: Info & Calendar */}
        <div className="flex flex-col">
          <span className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#8D5A3A]">
            {nombreCientifico}
          </span>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C6D2CA] bg-[#E9EFEA] px-3.5 py-1.5 text-xs font-bold tracking-wide text-[#24503C]">
            <div className={cn("h-2.5 w-2.5 rounded-full", isActiva ? "bg-[#24503C]" : "bg-[#8B2E2E]")} />
            {isActiva ? "TEMPORADA ACTIVA" : "FUERA DE TEMPORADA"}
          </div>

          <h1 className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight text-cv-green-900 lg:text-5xl break-words">
            {nombre}
          </h1>

          {/* ── Calendario de Cosecha Card ── */}
          {calendarioCosecha && (
            <div className="rounded-3xl border border-[#E8E8E8] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#14291F]">Calendario de Cosecha</h3>
                <Calendar className="h-6 w-6 text-[#8D5A3A]" />
              </div>

              {/* Timeline bars */}
              <div className="mb-6 flex w-full gap-2">
                {calendarioCosecha.meses.map((item, idx) => (
                  <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-[#14291F]">
                      {item.mes}
                    </span>
                    <div
                      className={cn(
                        "h-2 w-full rounded-full",
                        getEstadoColor(item.estado)
                      )}
                    />
                  </div>
                ))}
              </div>

              <p className="mb-6 text-[15px] italic text-[#4A4A4A]">
                Temporada principal: {calendarioCosecha.temporadaPrincipal}
              </p>

              {/* Legend */}
              <div className="mb-6 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold text-[#4A4A4A]">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#E2E8E4]" />
                  No disponible
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#8AA773]" />
                  Comienza la cosecha
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#2D5741]" />
                  En temporada
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#D4A017]" />
                  Ultimos días
                </div>
              </div>

              {/* Notice Box */}
              <div className="flex items-start gap-3 rounded-xl bg-[#EAF0EC] p-4 border-l-4 border-[#2D5741]">
                <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5741]" />
                <p className="text-xs font-semibold leading-relaxed text-[#2D5741]">
                  {calendarioCosecha.mensaje}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
