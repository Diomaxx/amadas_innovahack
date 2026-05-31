"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChefHat } from "lucide-react";
import type { Receta } from "../recetas.types";
import { getRecetaById } from "@/lib/firebase/recetas.repo";
import { RecetasSkeleton } from "./RecetasSkeleton";
import { RecetaDetail } from "./RecetaDetail";

export function RecetaDetailClient({ id }: { id: string }) {
  const [receta, setReceta] = useState<Receta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activo = true;
    getRecetaById(id)
      .then((r) => {
        if (activo) setReceta(r);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });
    return () => {
      activo = false;
    };
  }, [id]);

  if (loading) return <RecetasSkeleton />;

  if (!receta) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-cv-cream-300 py-24 text-center">
        <ChefHat className="mb-4 h-12 w-12 text-cv-green-300" />
        <h1 className="text-xl font-bold text-cv-green-900">Receta no encontrada</h1>
        <p className="mt-2 text-sm text-cv-gray-600">
          No pudimos encontrar la receta que estás buscando.
        </p>
        <Link
          href="/recetas"
          className="mt-6 rounded-full bg-cv-green-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-cv-green-700"
        >
          Volver a recetas
        </Link>
      </div>
    );
  }

  return <RecetaDetail receta={receta} />;
}
