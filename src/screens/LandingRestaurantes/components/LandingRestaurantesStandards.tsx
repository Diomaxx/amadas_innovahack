import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/UI/Reveal";
import { standards } from "./landingRestaurantes.data";

export function LandingRestaurantesStandards() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid items-center gap-8 rounded-3xl bg-cv-cream-100 p-8 md:grid-cols-2">
        <Reveal className="relative overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=1200&q=80"
            alt="Chef preparando ingredientes"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-4 left-4 max-w-xs rounded-xl bg-white p-4 text-sm text-cv-gray-700 shadow-lg">
            "La calidad del producto silvestre es incomparable con cualquier cultivo industrial."
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-4xl font-bold text-cv-green-900">Elevando el estandar culinario</h2>
          <p className="mt-3 text-cv-gray-700">
            Buscamos chefs y restaurantes que vean en el bosque no solo una fuente de insumos, sino un aliado estrategico.
          </p>

          <ul className="mt-6 space-y-4">
            {standards.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={0.14 + index * 0.06} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-cv-gold-600" />
                  <div>
                    <p className="font-semibold text-cv-green-900">{item.title}</p>
                    <p className="text-sm text-cv-gray-700">{item.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
