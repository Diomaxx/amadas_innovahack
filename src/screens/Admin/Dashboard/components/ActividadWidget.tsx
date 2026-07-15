"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ACCION_VISUAL } from "@/screens/Admin/Actividad/actividad.data";
import { useApiCollection } from "@/hooks/useApiCollection";
import { listActividadUi } from "@/lib/api/actividad";

function tiempoRelativo(fechaStr: string): string {
  const hoy = new Date("2026-05-31T12:00:00");
  const fecha = new Date(fechaStr + "T00:00:00");
  const diffDias = Math.round(
    (hoy.getTime() - fecha.getTime()) / 86_400_000,
  );
  if (diffDias <= 0) return "Hoy";
  if (diffDias === 1) return "Hace 1 día";
  return `Hace ${diffDias} días`;
}

export function ActividadWidget() {
  const { data } = useApiCollection(listActividadUi);
  const recientes = data.slice(0, 4);

  return (
    <section className="flex flex-col rounded-xl border border-cv-cream-300 bg-white p-5">
      <h2 className="mb-4 text-base font-bold text-cv-gray-900">
        Actividad Reciente
      </h2>

      <div className="space-y-3.5">
        {recientes.map((entrada) => {
          const visual = ACCION_VISUAL[entrada.accion];
          const { Icon } = visual;
          return (
            <div key={entrada.id} className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: visual.bg }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: visual.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-xs font-semibold text-cv-gray-800">
                  {entrada.titulo}
                </p>
                <p className="line-clamp-1 text-[11px] text-cv-gray-500">
                  {entrada.descripcion}
                </p>
                <p className="mt-0.5 text-[10px] font-medium text-cv-green-600">
                  {tiempoRelativo(entrada.fecha)}
                </p>
              </div>
            </div>
          );
        })}
        {recientes.length === 0 && (
          <p className="text-xs text-cv-gray-400">Sin actividad registrada.</p>
        )}
      </div>

      <Link
        href="/admin/actividad"
        className="mt-5 flex items-center gap-1 text-sm font-medium text-cv-green-700 transition-colors hover:text-cv-green-800"
      >
        Ver todo
        <ChevronRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
