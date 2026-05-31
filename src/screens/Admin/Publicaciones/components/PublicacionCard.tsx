import { CalendarDays, Eye, MapPin, User } from "lucide-react";
import type { Publicacion } from "../publicaciones.types";
import { ESTADO_VISUAL } from "../publicaciones.data";

function formatFecha(fechaStr: string): string {
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(fechaStr + "T00:00:00"));
}

export function PublicacionCard({ pub }: { pub: Publicacion }) {
  const v = ESTADO_VISUAL[pub.estado];

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-cv-cream-300 bg-white">
      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={pub.imagen}
        alt={pub.titulo}
        className="h-44 w-full object-cover"
      />

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Status + type badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wide"
            style={{ color: v.badgeColor, backgroundColor: v.badgeBg }}
          >
            {pub.estado}
          </span>
          <span className="rounded-md bg-cv-cream-100 px-2 py-0.5 text-xs font-medium text-cv-gray-600">
            {pub.tipo}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-2 line-clamp-2 text-sm font-bold text-cv-gray-900 leading-snug">
          {pub.titulo}
        </h3>

        {/* Description */}
        <p className="mt-1.5 line-clamp-3 text-xs text-cv-gray-500 leading-relaxed">
          {pub.descripcion}
        </p>

        {/* Meta */}
        <div className="mt-3 space-y-1.5 text-xs text-cv-gray-600">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 shrink-0 text-cv-gray-400" />
            <span>{pub.autor}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-cv-gray-400" />
            <span>{pub.ubicacion}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: v.countColor }}
            />
            <span style={{ color: v.countColor }}>{formatFecha(pub.fecha)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 border-t border-cv-cream-200 pt-3">
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-medium text-cv-green-600 transition-colors hover:text-cv-green-700"
          >
            <Eye className="h-3.5 w-3.5" />
            Click para ver detalles
          </button>
        </div>
      </div>
    </article>
  );
}
