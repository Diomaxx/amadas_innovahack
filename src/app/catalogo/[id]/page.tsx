import CatalogoDetailPage from "@/screens/Catalogo/CatalogoDetailPage";

export default async function CatalogoDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CatalogoDetailPage id={id} />;
}
