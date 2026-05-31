"use client";

import { RECETARIO_META, RECETAS } from "./recetas.data";
import { useUnifiedLoading } from "@/hooks/useUnifiedLoading";
import { RecetasHero } from "./components/RecetasHero";
import { RecetasGrid } from "./components/RecetasGrid";
import { RecetasSkeleton } from "./components/RecetasSkeleton";

export default function RecetasPage({
  insumoInicial,
}: {
  insumoInicial?: string;
}) {
  const isLoading = useUnifiedLoading();

  if (isLoading) {
    return <RecetasSkeleton />;
  }

  return (
    <section className="space-y-10">
      <RecetasHero total={RECETARIO_META.total} />
      <RecetasGrid recetas={RECETAS} insumoInicial={insumoInicial} />
    </section>
  );
}
