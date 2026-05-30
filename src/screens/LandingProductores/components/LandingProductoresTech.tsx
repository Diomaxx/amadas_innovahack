import { Leaf, BellRing, Handshake } from "lucide-react";
import { Reveal } from "@/components/UI/Reveal";
import { techCards } from "./landingProductores.data";

const icons = [Leaf, BellRing, Handshake];

export function LandingProductoresTech() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="text-center">
        <h2 className="text-4xl font-bold text-cv-green-900">Tecnologia al servicio del bosque</h2>
        <p className="mx-auto mt-3 max-w-2xl text-cv-gray-700">
          Herramientas digitales disenadas para que las asociaciones locales gestionen su produccion con eficiencia.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {techCards.map((card, index) => {
          const Icon = icons[index] ?? Leaf;

          return (
            <Reveal key={card.title} delay={index * 0.08}>
              <article
                className="relative overflow-hidden rounded-2xl"
                style={{
                  backgroundImage: `linear-gradient(rgba(7,55,37,0.78), rgba(7,55,37,0.88)), url('${card.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="space-y-4 p-6 text-white">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-3xl font-semibold leading-tight">{card.title}</h3>
                  <p className="text-sm text-cv-cream-100">{card.description}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
