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
            className="rounded-xl border border-transparent p-5"
            style={{ backgroundColor: v.cardBg }}
          >
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: v.badgeBg }}
              >
                <Icon className="h-4 w-4" style={{ color: v.countColor }} />
              </div>
              <span
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: v.countColor }}
              >
                {v.label}
              </span>
            </div>

            <p
              className="mt-3 text-4xl font-bold"
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
