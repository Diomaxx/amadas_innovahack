"use client";

import { cn } from "@/lib/utils";

/* ── Types ──────────────────────────────────────────────────────────── */
export type Temporada = "En temporada" | "Próximamente" | "Finalizando";
export type Categoria = "Frutas" | "Nueces y Semillas" | "Hierbas e Infusiones" | "Mieles";
export type UsoSugerido = "Consumo fresco" | "Repostería" | "Aceites";

export interface FiltrosState {
  temporadas: Temporada[];
  categorias: Categoria[];
  usos: UsoSugerido[];
}

interface CatalogoFiltrosProps {
  filtros: FiltrosState;
  onChange: (filtros: FiltrosState) => void;
}

/* ── Helpers ─────────────────────────────────────────────────────────── */
function toggleItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

/* ── Sub-components ──────────────────────────────────────────────────── */
function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-0.5 group">
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors duration-150",
          checked
            ? "border-cv-green-700 bg-cv-green-700"
            : "border-cv-gray-300 bg-white group-hover:border-cv-green-500"
        )}
        onClick={onChange}
      >
        {checked && (
          <svg
            className="h-2.5 w-2.5 text-white"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M1.5 5L4 7.5L8.5 2.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        onClick={onChange}
        className={cn(
          "text-sm transition-colors duration-150",
          checked ? "font-medium text-cv-green-800" : "text-cv-gray-700 group-hover:text-cv-green-700"
        )}
      >
        {label}
      </span>
    </label>
  );
}

function PillButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1 text-xs font-medium transition-all duration-150",
        active
          ? "border-cv-green-700 bg-cv-green-700 text-white shadow-sm"
          : "border-cv-cream-300 bg-white text-cv-gray-700 hover:border-cv-green-500 hover:text-cv-green-700"
      )}
    >
      {label}
    </button>
  );
}

/* ── Main Component ──────────────────────────────────────────────────── */
export function CatalogoFiltros({ filtros, onChange }: CatalogoFiltrosProps) {
  const temporadaOptions: Temporada[] = ["En temporada", "Próximamente", "Finalizando"];
  const categoriaOptions: Categoria[] = ["Frutas", "Nueces y Semillas", "Hierbas e Infusiones", "Mieles"];
  const usoOptions: UsoSugerido[] = ["Consumo fresco", "Repostería", "Aceites"];

  return (
    <aside className="flex flex-col gap-6 text-cv-gray-800">
      {/* Temporada */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cv-gray-500">
          Temporada
        </p>
        <div className="flex flex-col gap-1.5">
          {temporadaOptions.map((t) => (
            <CheckboxItem
              key={t}
              label={t}
              checked={filtros.temporadas.includes(t)}
              onChange={() =>
                onChange({ ...filtros, temporadas: toggleItem(filtros.temporadas, t) })
              }
            />
          ))}
        </div>
      </div>

      {/* Separador */}
      <div className="h-px bg-cv-cream-300" />

      {/* Categoría */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cv-gray-500">
          Categoría
        </p>
        <div className="flex flex-col gap-1.5">
          {categoriaOptions.map((c) => (
            <CheckboxItem
              key={c}
              label={c}
              checked={filtros.categorias.includes(c)}
              onChange={() =>
                onChange({ ...filtros, categorias: toggleItem(filtros.categorias, c) })
              }
            />
          ))}
        </div>
      </div>

      {/* Separador */}
      <div className="h-px bg-cv-cream-300" />

      {/* Uso Sugerido */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cv-gray-500">
          Uso Sugerido
        </p>
        <div className="flex flex-wrap gap-2">
          {usoOptions.map((u) => (
            <PillButton
              key={u}
              label={u}
              active={filtros.usos.includes(u)}
              onClick={() =>
                onChange({ ...filtros, usos: toggleItem(filtros.usos, u) })
              }
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
