import { UtensilsCrossed } from "lucide-react";
import { partnerNames } from "./landingProductores.data";

export function LandingProductoresPartners() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cv-gold-600">Marcas aliadas</p>
      <h2 className="mt-2 text-4xl font-bold text-cv-green-900">Tus productos en las mejores manos</h2>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
        {partnerNames.map((name) => (
          <span key={name} className="inline-flex items-center gap-2 text-cv-gray-600">
            <UtensilsCrossed className="h-4 w-4" />
            <span className="text-sm font-medium">{name}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
