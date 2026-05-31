import type { Metadata } from "next";
import { RecetaDetailClient } from "@/screens/Recetas/components/RecetaDetailClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Receta · ALMA",
  description: "Recetas elaboradas con ingredientes de los bosques de Bolivia.",
};

export default async function RecetaDetailRoute({ params }: PageProps) {
  const { id } = await params;
  return <RecetaDetailClient id={id} />;
}
