import RecetasPage from "@/screens/Recetas/RecetasPage";

export default async function RecetasRoute({
  searchParams,
}: {
  searchParams: Promise<{ insumo?: string }>;
}) {
  const { insumo } = await searchParams;
  return <RecetasPage insumoInicial={insumo} />;
}

