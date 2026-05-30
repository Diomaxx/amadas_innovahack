import Link from "next/link";
import { Reveal } from "@/components/UI/Reveal";
import { steps } from "./landingRestaurantes.data";

export function LandingRestaurantesSteps() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="text-4xl font-bold text-cv-green-900">Como conectar con el bosque</h2>
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.08}>
            <article>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cv-green-800 text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-cv-green-900">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-cv-gray-700">{step.description}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <Link
          href="/catalogo"
          className="mt-10 inline-flex rounded-full border border-cv-green-700 px-8 py-3 text-sm font-semibold text-cv-green-800 transition hover:bg-cv-green-100"
        >
          Explorar temporada
        </Link>
      </Reveal>
    </section>
  );
}
