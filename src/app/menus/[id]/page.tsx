import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMenuById, getMenuIds } from "@/server/menus/menus.repository";
import { MenuDetail } from "@/screens/Menus/components/MenuDetail";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getMenuIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const menu = await getMenuById(id);
  if (!menu) return { title: "Menú no encontrado · ALMA" };
  return {
    title: `${menu.title} · ${menu.restaurant} · Menús`,
    description: menu.tagline ?? menu.summary,
  };
}

export default async function MenuDetailRoute({ params }: PageProps) {
  const { id } = await params;
  const menu = await getMenuById(id);

  if (!menu) notFound();

  return <MenuDetail menu={menu} />;
}
