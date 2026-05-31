import type { Contacto, TipoContacto } from "../contactos.types";
import { TIPO_PLURAL, TIPO_VISUAL } from "../contactos.data";

const TIPOS: TipoContacto[] = ["productor", "asociacion", "tienda", "proveedor"];

export function ContactosStatsBar({ contactos }: { contactos: Contacto[] }) {
  const counts = TIPOS.reduce(
    (acc, tipo) => {
      acc[tipo] = contactos.filter((c) => c.tipo === tipo).length;
      return acc;
    },
    {} as Record<TipoContacto, number>,
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {TIPOS.map((tipo) => {
        const visual = TIPO_VISUAL[tipo];
        return (
          <div
            key={tipo}
            className="rounded-xl border border-cv-cream-300 bg-white px-4 py-4"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: visual.dot }}
              />
              <span className="truncate text-xs font-semibold uppercase tracking-wide text-cv-gray-500">
                {TIPO_PLURAL[tipo]}
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold text-cv-green-900">
              {counts[tipo]}
            </p>
          </div>
        );
      })}
    </div>
  );
}
