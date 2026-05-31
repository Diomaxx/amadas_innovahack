"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import Link from "next/link";
import { Check, ChevronRight, Eye, X } from "lucide-react";
import { PUBLICACIONES_MOCK } from "@/screens/Admin/Publicaciones/publicaciones.data";
import type { Publicacion } from "@/screens/Admin/Publicaciones/publicaciones.types";
import { PublicacionVistaModal } from "./PublicacionVistaModal";

function tiempoRelativo(fechaStr: string): string {
  const hoy = new Date("2026-05-31T12:00:00");
  const fecha = new Date(fechaStr + "T00:00:00");
  const diffDias = Math.round(
    (hoy.getTime() - fecha.getTime()) / 86_400_000,
  );
  if (diffDias === 0) return "Hace 2 horas";
  if (diffDias === 1) return "Hace 1 día";
  return `Hace ${diffDias} días`;
}

const ALL_PENDIENTES = PUBLICACIONES_MOCK.filter((p) => p.estado === "pendiente");
const PENDIENTES = ALL_PENDIENTES.slice(0, 3);
const TOTAL_PENDIENTES = ALL_PENDIENTES.length;

function PubRow({ pub }: { pub: Publicacion }) {
  return (
    <DialogPrimitive.Root>
      <div className="flex items-center gap-3 py-3.5">
        {/* Thumbnail */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pub.imagen}
          alt={pub.titulo}
          className="h-12 w-12 shrink-0 rounded-lg object-cover"
        />

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-cv-gray-900">
            {pub.titulo}
          </p>
          <p className="text-xs font-medium text-cv-green-600">{pub.autor}</p>
          <p className="text-[11px] text-cv-gray-400">
            {tiempoRelativo(pub.fecha)}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            aria-label="Aprobar"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 transition-colors hover:bg-green-200"
          >
            <Check className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Rechazar"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-400 transition-colors hover:bg-red-200"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <DialogPrimitive.Trigger asChild>
            <button
              type="button"
              aria-label="Ver detalle"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-cv-cream-100 text-cv-gray-500 transition-colors hover:bg-cv-cream-200"
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
          </DialogPrimitive.Trigger>
        </div>
      </div>

      <PublicacionVistaModal pub={pub} />
    </DialogPrimitive.Root>
  );
}

export function PublicacionesWidget() {
  return (
    <section className="flex flex-col rounded-xl border border-cv-cream-300 bg-white p-5">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-bold text-cv-gray-900">
          Publicaciones Pendientes
        </h2>
        <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-600">
          {TOTAL_PENDIENTES} por revisar
        </span>
      </div>

      {/* List */}
      <div className="flex-1 divide-y divide-cv-cream-200">
        {PENDIENTES.map((pub) => (
          <PubRow key={pub.id} pub={pub} />
        ))}
      </div>

      {/* Footer link */}
      <Link
        href="/admin/publicaciones"
        className="mt-4 flex items-center gap-1 text-sm font-medium text-cv-green-700 transition-colors hover:text-cv-green-800"
      >
        Ver todas las publicaciones
        <ChevronRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
