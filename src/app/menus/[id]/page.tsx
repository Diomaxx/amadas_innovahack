import type { Metadata } from "next";
import { MenuDetailClient } from "@/screens/Menus/components/MenuDetailClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Menú · ALMA",
  description: "Propuestas gastronómicas con ingredientes de los bosques de Bolivia.",
};

export default async function MenuDetailRoute({ params }: PageProps) {
  const { id } = await params;
  return <MenuDetailClient id={id} />;
}
