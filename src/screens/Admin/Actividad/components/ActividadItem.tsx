import type { ActividadEntry } from "../actividad.types";
import { ACCION_VISUAL } from "../actividad.data";

function formatFecha(fechaStr: string): string {
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(fechaStr + "T00:00:00"));
}

export function ActividadItem({ entrada }: { entrada: ActividadEntry }) {
  const visual = ACCION_VISUAL[entrada.accion];
  const { Icon } = visual;

  return (
    <div className="flex items-start gap-4 px-5 py-4 sm:px-6">
      {/* Icon circle */}
      <div
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: visual.bg }}
        aria-hidden="true"
      >
        <Icon className="h-4 w-4" style={{ color: visual.color }} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-cv-gray-900">
              {entrada.titulo}
            </p>
            <p className="mt-0.5 text-sm text-cv-gray-600">
              {entrada.descripcion}
            </p>
            {entrada.autor && (
              <p className="mt-1 text-xs font-medium text-cv-green-500">
                Por {entrada.autor}
              </p>
            )}
          </div>

          {/* Date */}
          <time
            dateTime={entrada.fecha}
            className="shrink-0 text-xs text-cv-gray-400"
          >
            {formatFecha(entrada.fecha)}
          </time>
        </div>
      </div>
    </div>
  );
}
