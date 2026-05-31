import { CalendarDays } from "lucide-react";

type FiltroFechasProps = {
  fechaInicio: string;
  fechaFin: string;
  onChangeInicio: (v: string) => void;
  onChangeFin: (v: string) => void;
  onLimpiar: () => void;
};

function formatDisplay(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${parseInt(d)}/${parseInt(m)}/${y}`;
}

export function FiltroFechas({
  fechaInicio,
  fechaFin,
  onChangeInicio,
  onChangeFin,
  onLimpiar,
}: FiltroFechasProps) {
  const tieneRango = fechaInicio || fechaFin;

  return (
    <div className="rounded-xl border border-cv-cream-300 bg-white px-5 py-3 sm:px-6">
      <div className="flex flex-wrap items-end gap-3 sm:gap-4">
        {/* Title */}
        <p className="w-full text-sm font-semibold text-cv-gray-900 mb-0 pb-0 leading-none">
          Rango de Fechas
        </p>

        {/* Fecha de inicio */}
        <div className="min-w-36 flex-1">
          <label className="mb-1 block text-xs text-cv-gray-500">
            Fecha de inicio
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-cv-cream-300 bg-cv-cream-50 px-3 py-1.5 focus-within:border-cv-green-400">
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => onChangeInicio(e.target.value)}
              className="flex-1 bg-transparent text-sm text-cv-gray-700 focus:outline-none [color-scheme:light]"
            />
            <CalendarDays className="h-4 w-4 shrink-0 text-cv-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Fecha de fin */}
        <div className="min-w-36 flex-1">
          <label className="mb-1 block text-xs text-cv-gray-500">
            Fecha de fin
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-cv-cream-300 bg-cv-cream-50 px-3 py-1.5 focus-within:border-cv-green-400">
            <input
              type="date"
              value={fechaFin}
              min={fechaInicio || undefined}
              onChange={(e) => onChangeFin(e.target.value)}
              className="flex-1 bg-transparent text-sm text-cv-gray-700 focus:outline-none [color-scheme:light]"
            />
            <CalendarDays className="h-4 w-4 shrink-0 text-cv-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Limpiar */}
        <button
          type="button"
          onClick={onLimpiar}
          className="shrink-0 pb-1 text-sm font-medium text-cv-gray-500 transition-colors hover:text-cv-gray-800"
        >
          Limpiar
        </button>
      </div>

      {/* Active filter banner */}
      {tieneRango && (
        <div className="mt-2 rounded-lg bg-cv-green-100 px-4 py-1.5 text-sm font-medium text-cv-green-700">
          Filtrado:{" "}
          {fechaInicio ? formatDisplay(fechaInicio) : "…"}
          {" - "}
          {fechaFin ? formatDisplay(fechaFin) : "…"}
        </div>
      )}
    </div>
  );
}
