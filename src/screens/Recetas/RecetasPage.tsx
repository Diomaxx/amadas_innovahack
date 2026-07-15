"use client";

import { useApiCollection } from "@/hooks/useApiCollection";
import { listRecetasUi } from "@/lib/api/recetas";
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
  const { data: recetas, loading } = useApiCollection(listRecetasUi);

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
