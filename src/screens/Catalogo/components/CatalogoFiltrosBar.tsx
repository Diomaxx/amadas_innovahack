"use client";

import { Leaf, Clock, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { StyledSelect } from "@/components/UI/StyledSelect";

/* ── Types (compartidos con la página) ───────────────────────────────── */
export type Temporada = "En temporada" | "Próximamente" | "Finalizando";
export type Categoria =
  | "Frutas"
  | "Nueces y Semillas"
  | "Hierbas e Infusiones"
  | "Mieles";
export type UsoSugerido = "Consumo fresco" | "Repostería" | "Aceites";

export interface FiltrosState {
  temporadas: Temporada[];
  categorias: Categoria[];
  usos: UsoSugerido[];
}

interface CatalogoFiltrosBarProps {
  filtros: FiltrosState;
  onChange: (filtros: FiltrosState) => void;
  total: number;
}

/* ── Opciones ────────────────────────────────────────────────────────── */
const TEMPORADAS: { value: Temporada; icon: React.ReactNode }[] = [
  { value: "En temporada", icon: <Leaf className="h-3.5 w-3.5" /> },
  { value: "Próximamente", icon: <Clock className="h-3.5 w-3.5" /> },
  { value: "Finalizando", icon: <AlertTriangle className="h-3.5 w-3.5" /> },
];
const CATEGORIAS: Categoria[] = [
  "Frutas",
  "Nueces y Semillas",
  "Hierbas e Infusiones",
  "Mieles",
];
const USOS: UsoSugerido[] = ["Consumo fresco", "Repostería", "Aceites"];

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

/** Estilo compacto (blanco) para los selects de la barra de filtros. */
const filtroTriggerClass = "h-11 bg-white font-medium text-cv-green-900";

/* ── Toolbar de filtros (encima de los cards) ────────────────────────── */
export function CatalogoFiltrosBar({
  filtros,
  onChange,
  total,
}: CatalogoFiltrosBarProps) {
  const categoriaValue = filtros.categorias[0] ?? "todas";
  const usoValue = filtros.usos[0] ?? "todos";

  const hayFiltros =
    filtros.temporadas.length > 0 ||
    filtros.categorias.length > 0 ||
    filtros.usos.length > 0;

  const limpiar = () =>
    onChange({ temporadas: [], categorias: [], usos: [] });

  return (
    <div>
      {/* Caja de filtros */}
      <div className="rounded-2xl border border-cv-cream-300 bg-white/70 p-4 backdrop-blur sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Selects: categoría + uso */}
          <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-md">
            <StyledSelect
              aria-label="Categoría"
              value={categoriaValue}
              onValueChange={(v) =>
                onChange({
                  ...filtros,
                  categorias: v === "todas" ? [] : [v as Categoria],
                })
              }
              className={filtroTriggerClass}
              options={[
                { value: "todas", label: "Todas las categorías" },
                ...CATEGORIAS.map((c) => ({ value: c, label: c })),
              ]}
            />

            <StyledSelect
              aria-label="Uso sugerido"
              value={usoValue}
              onValueChange={(v) =>
                onChange({
                  ...filtros,
                  usos: v === "todos" ? [] : [v as UsoSugerido],
                })
              }
              className={filtroTriggerClass}
              options={[
                { value: "todos", label: "Todos los usos" },
                ...USOS.map((u) => ({ value: u, label: u })),
              ]}
            />
          </div>
        </div>

        {/* Pills de temporada */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-cv-cream-300 pt-4">
          <button
            type="button"
            onClick={() => onChange({ ...filtros, temporadas: [] })}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
              filtros.temporadas.length === 0
                ? "bg-cv-green-800 text-cv-cream-50"
                : "border border-cv-cream-300 bg-white text-cv-gray-600 hover:border-cv-green-300",
            )}
          >
            Todas las temporadas
          </button>

          {TEMPORADAS.map(({ value, icon }) => {
            const active = filtros.temporadas.includes(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() =>
                  onChange({
                    ...filtros,
                    temporadas: toggle(filtros.temporadas, value),
                  })
                }
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "bg-cv-green-100 text-cv-green-800"
                    : "border border-cv-cream-300 bg-white text-cv-gray-600 hover:border-cv-green-300",
                )}
              >
                {icon}
                {value}
              </button>
            );
          })}

          {hayFiltros && (
            <button
              type="button"
              onClick={limpiar}
              className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-[#8a4f37] transition-colors hover:text-[#6d3e2b]"
            >
              <X className="h-3.5 w-3.5" />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Encabezado de resultados */}
      <div className="mb-2 mt-8 flex items-baseline justify-between">
        <h2 className="text-lg font-bold uppercase tracking-wide text-cv-green-900">
          Especies del bosque
        </h2>
        <span className="text-sm text-cv-gray-500">
          {total} {total === 1 ? "especie" : "especies"}
        </span>
      </div>
    </div>
  );
}
