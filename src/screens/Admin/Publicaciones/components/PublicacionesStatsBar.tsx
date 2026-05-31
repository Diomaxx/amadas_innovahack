import type { EstadoPublicacion, Publicacion } from "../publicaciones.types";
import { ESTADO_VISUAL } from "../publicaciones.data";

const ESTADOS: EstadoPublicacion[] = ["pendiente", "aprobado", "rechazado"];

export function PublicacionesStatsBar({
  publicaciones,
}: {
  publicaciones: Publicacion[];
}) {
  const counts = ESTADOS.reduce(
    (acc, estado) => {
      acc[estado] = publicaciones.filter((p) => p.estado === estado).length;
      return acc;
    },
    {} as Record<EstadoPublicacion, number>,
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {ESTADOS.map((estado) => {
        const v = ESTADO_VISUAL[estado];
        const { Icon } = v;
        return (
          <div
            key={estado}
            className="rounded-xl border border-cv-cream-300 bg-white p-5"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ backgroundColor: v.badgeBg }}
              >
                <Icon className="h-4 w-4" style={{ color: v.countColor }} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-cv-gray-500">
                {v.label}
              </span>
            </div>

            <p
              className="mt-3 text-4xl font-bold tabular-nums"
              style={{ color: v.countColor }}
            >
              {counts[estado]}
            </p>

            <p className="mt-1 text-xs text-cv-gray-500">{v.subtexto}</p>
          </div>
        );
      })}
    </div>
  );
}
