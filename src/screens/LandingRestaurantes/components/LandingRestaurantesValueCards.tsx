import { valueCards } from "./landingRestaurantes.data";
import { Reveal } from "@/components/UI/Reveal";

export function LandingRestaurantesValueCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        {valueCards.map((card, index) => (
          <Reveal key={card.title} delay={index * 0.08}>
            <article
              className="relative overflow-hidden rounded-2xl"
              style={{
                backgroundImage: `linear-gradient(rgba(20,41,31,0.2), rgba(20,41,31,0.8)), url('${card.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="min-h-64 space-y-3 p-6 text-white">
                <h2 className="pt-20 text-4xl font-bold leading-tight">{card.title}</h2>
                <p className="text-sm text-cv-cream-100">{card.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
