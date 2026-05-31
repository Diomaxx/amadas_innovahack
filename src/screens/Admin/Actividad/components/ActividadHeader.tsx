import { CalendarDays } from "lucide-react";

export function ActividadHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold text-cv-green-900">
          Actividades Recientes
        </h1>
        <p className="mt-1.5 text-sm text-cv-gray-600">
          Historial completo de eventos y acciones en la plataforma.
        </p>
      </div>

      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-cv-cream-300 bg-white px-4 py-2.5 text-sm font-medium text-cv-gray-700 shadow-sm transition-colors hover:bg-cv-cream-100"
      >
        <CalendarDays className="h-4 w-4 text-cv-gray-500" />
        Filtrar por Fecha
      </button>
    </header>
  );
}
