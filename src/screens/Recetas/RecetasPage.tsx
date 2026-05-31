"use client";

import type { Receta } from "./recetas.types";
import { useCollection } from "@/hooks/useCollection";
import { subscribeRecetas } from "@/lib/firebase/recetas.repo";
import { useUnifiedLoading } from "@/hooks/useUnifiedLoading";
import { RecetasHero } from "./components/RecetasHero";
import { RecetasGrid } from "./components/RecetasGrid";
import { RecetasSkeleton } from "./components/RecetasSkeleton";

export default function RecetasPage({
  insumoInicial,
}: {
  insumoInicial?: string;
}) {
  const uiLoading = useUnifiedLoading();
  const { data: recetas, loading } = useCollection<Receta>(subscribeRecetas);

  if (uiLoading || loading) {
    return <RecetasSkeleton />;
  }

  return (
    <section className="space-y-10">
      <RecetasHero total={recetas.length} />
      <RecetasGrid recetas={recetas} insumoInicial={insumoInicial} />
    </section>
  );
}
