import type { ActividadEntry } from "../actividad.types";
import { STATS_VISUAL } from "../actividad.data";

function isToday(fechaStr: string): boolean {
  const today = new Date();
  const fecha = new Date(fechaStr + "T00:00:00");
  return (
    fecha.getFullYear() === today.getFullYear() &&
    fecha.getMonth() === today.getMonth() &&
    fecha.getDate() === today.getDate()
  );
}

export function ActividadStatsBar({
  actividades,
}: {
  actividades: ActividadEntry[];
}) {
  const stats = {
    hoy:        actividades.filter((a) => isToday(a.fecha)).length,
    asociacion: actividades.filter((a) => a.categoria === "asociacion").length,
    tienda:     actividades.filter((a) => a.categoria === "tienda").length,
    proveedor:  actividades.filter((a) => a.categoria === "proveedor").length,
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {(Object.keys(STATS_VISUAL) as (keyof typeof STATS_VISUAL)[]).map(
        (key) => {
          const { dot, label } = STATS_VISUAL[key];
          return (
            <div
              key={key}
              className="rounded-xl border border-cv-cream-300 bg-white px-4 py-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: dot }}
                />
                <span className="truncate text-xs font-semibold uppercase tracking-wide text-cv-gray-500">
                  {label}
                </span>
              </div>
              <p className="mt-2 text-3xl font-bold text-cv-green-900">
                {stats[key]}
              </p>
            </div>
          );
        },
      )}
    </div>
  );
}
