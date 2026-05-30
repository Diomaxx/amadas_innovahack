import Link from "next/link";
import { Reveal } from "@/components/UI/Reveal";
import { heroData } from "./landingRestaurantes.data";

export function LandingRestaurantesHero() {
  return (
    <section
      className="relative min-h-[68vh] overflow-hidden border-b border-cv-cream-300"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(250,247,242,0.88) 0%, rgba(250,247,242,0.66) 45%, rgba(20,41,31,0.15) 100%), url('${heroData.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex min-h-[68vh] max-w-6xl items-center px-6 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="inline-flex rounded-full bg-cv-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cv-green-800">
              {heroData.badge}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-cv-green-900 sm:text-6xl">{heroData.title}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-base leading-relaxed text-cv-gray-700 sm:text-lg">{heroData.description}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/catalogo"
              className="rounded-full bg-cv-green-800 px-8 py-3 text-sm font-semibold text-white transition hover:bg-cv-green-700"
            >
              Ver Catalogo de Temporada
            </Link>
            <Link
              href="/menus"
              className="rounded-full border border-cv-green-700 px-8 py-3 text-sm font-semibold text-cv-green-800 transition hover:bg-cv-green-100"
            >
              Conocer mas
            </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
