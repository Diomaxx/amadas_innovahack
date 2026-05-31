import { ChefHat } from "lucide-react";
import type { Receta, RecetaCategoria } from "@/screens/Recetas/recetas.types";
import { CATEGORIA_VISUAL } from "@/screens/Recetas/components/recetaVisuals";
import { CATEGORIAS, CATEGORIA_SHORT } from "../recetas.admin.data";

export function RecetasStatsBar({ recetas }: { recetas: Receta[] }) {
  const counts = CATEGORIAS.reduce(
    (acc, categoria) => {
      acc[categoria] = recetas.filter((r) => r.categoria === categoria).length;
      return acc;
    },
    {} as Record<RecetaCategoria, number>,
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {/* Total */}
      <div className="rounded-xl border border-cv-cream-300 bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <ChefHat className="h-4 w-4 shrink-0 text-cv-green-700" />
          <span className="truncate text-xs font-semibold uppercase tracking-wide text-cv-gray-500">
            Total recetas
          </span>
        </div>
        <p className="mt-2 text-3xl font-bold text-cv-green-900">
          {recetas.length}
        </p>
      </div>

      {/* Una tarjeta por categoría */}
      {CATEGORIAS.map((categoria) => {
        const visual = CATEGORIA_VISUAL[categoria];
        return (
          <div
            key={categoria}
            className="rounded-xl border border-cv-cream-300 bg-white px-4 py-4"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: visual.color }}
              />
              <span className="truncate text-xs font-semibold uppercase tracking-wide text-cv-gray-500">
                {CATEGORIA_SHORT[categoria]}
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold text-cv-green-900">
              {counts[categoria]}
            </p>
          </div>
        );
      })}
    </div>
  );
}
