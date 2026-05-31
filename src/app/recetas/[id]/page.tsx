import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRecetaById, RECETAS } from "@/screens/Recetas/recetas.data";
import { RecetaDetail } from "@/screens/Recetas/components/RecetaDetail";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return RECETAS.map((receta) => ({ id: String(receta.id) }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const receta = getRecetaById(id);
  if (!receta) return { title: "Receta no encontrada · AMADAS" };
  return {
    title: `${receta.nombre} · Recetas`,
    description: `Receta elaborada por ${receta.autores}. ${receta.contexto}.`,
  };
}

export default async function RecetaDetailRoute({ params }: PageProps) {
  const { id } = await params;
  const receta = getRecetaById(id);

  if (!receta) notFound();

  return <RecetaDetail receta={receta} />;
}
