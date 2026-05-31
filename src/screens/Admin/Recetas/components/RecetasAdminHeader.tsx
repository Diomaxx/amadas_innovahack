"use client";

import { Plus } from "lucide-react";

export function RecetasAdminHeader({ onNueva }: { onNueva: () => void }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold text-cv-green-900">
          Recetario
        </h1>
        <p className="mt-1.5 text-sm text-cv-gray-600">
          Gestiona las recetas gastronómicas con productos del bosque.
        </p>
      </div>

      <button
        type="button"
        onClick={onNueva}
        className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-cv-green-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cv-green-800"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        Nueva Receta
      </button>
    </header>
  );
}
