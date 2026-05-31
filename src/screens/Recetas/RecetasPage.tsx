import { RECETARIO_META, RECETAS } from "./recetas.data";
import { RecetasHero } from "./components/RecetasHero";
import { RecetasGrid } from "./components/RecetasGrid";

export default function RecetasPage() {
  return (
    <section className="space-y-10">
      <RecetasHero total={RECETARIO_META.total} />
      <RecetasGrid recetas={RECETAS} />
    </section>
  );
}
