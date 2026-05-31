import Link from "next/link";
import { ChevronRight, Clock, TrendingUp } from "lucide-react";

type StatusKey = "en-temporada" | "finalizando" | "proximamente";

const STATUS_META: Record<
  StatusKey,
  { label: string; color: string; bg: string }
> = {
  "en-temporada": { label: "En Temporada", color: "#166534", bg: "#dcfce7" },
  finalizando:    { label: "Finalizando",  color: "#991b1b", bg: "#fee2e2" },
  proximamente:   { label: "Próximamente", color: "#9a3412", bg: "#ffedd5" },
};

// Derived from temporadas.json for mayo (idx 4):
// Asaí (0-9)  → en temporada, next month Jun included → en-temporada
// Totaí (0, 4-11) → en temporada, next Jun included → en-temporada
// Pitón (0-4, 11) → en temporada, next Jun NOT included → finalizando
// Almendra (6-8) → not in May, starts Jul (idx 6, offset 2) → proximamente
const PRODUCTOS = [
  {
    id: "asai",
    nombre: "Asaí",
    ciclo: "Ene · Oct",
    status: "en-temporada" as StatusKey,
    imagen: "https://picsum.photos/seed/asai_dash/120/120",
  },
  {
    id: "totai",
    nombre: "Totaí",
    ciclo: "May · Dic",
    status: "en-temporada" as StatusKey,
    imagen: "https://picsum.photos/seed/totai_dash/120/120",
  },
  {
    id: "piton",
    nombre: "Pitón",
    ciclo: "Ene · May",
    status: "finalizando" as StatusKey,
    diasInfo: "Finaliza hoy",
    imagen: "https://picsum.photos/seed/piton_dash/120/120",
  },
  {
    id: "almendra",
    nombre: "Almendra Chiquitana",
    ciclo: "Jul · Sep",
    status: "proximamente" as StatusKey,
    diasInfo: "Inicia en 31 días",
    imagen: "https://picsum.photos/seed/alm_dash/120/120",
  },
];

export function EstadoTemporadasWidget() {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-cv-gray-900">
          Estado de Temporadas
        </h2>
        <Link
          href="/admin/flora"
          className="flex items-center gap-1 text-sm font-medium text-cv-green-700 transition-colors hover:text-cv-green-800"
        >
          Ver calendario completo
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {PRODUCTOS.map((p) => {
          const meta = STATUS_META[p.status];
          return (
            <div
              key={p.id}
              className="rounded-xl border border-cv-cream-300 bg-white p-4"
            >
              {/* Image with badge overlay */}
              <div className="relative mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="h-20 w-full rounded-lg object-cover"
                />
                <span
                  className="absolute right-1.5 top-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{ color: meta.color, backgroundColor: meta.bg }}
                >
                  {meta.label}
                </span>
              </div>

              <p className="text-sm font-semibold text-cv-gray-900">
                {p.nombre}
              </p>

              {/* Ciclo + days badge on the same row */}
              <div className="mt-0.5 flex flex-wrap items-center gap-2">
                <p className="text-xs text-cv-gray-500">{p.ciclo}</p>
                {p.diasInfo && (
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ color: meta.color, backgroundColor: meta.bg }}
                  >
                    {p.status === "finalizando" ? (
                      <Clock className="h-2.5 w-2.5" />
                    ) : (
                      <TrendingUp className="h-2.5 w-2.5" />
                    )}
                    {p.diasInfo}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
