import { partnerRestaurants } from "./landingRestaurantes.data";
import { Reveal } from "@/components/UI/Reveal";

export function LandingRestaurantesPartners() {
  return (
    <section className="mx-auto max-w-5xl rounded-2xl bg-cv-cream-100 px-4 py-10 text-center sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cv-gray-600">
          Restaurantes que ya transforman el bosque
        </p>
      </Reveal>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-7">
        {partnerRestaurants.map((partner, index) => (
          <Reveal key={partner} delay={index * 0.06}>
            <span className="text-4xl font-semibold tracking-wide text-cv-gray-600">{partner}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
