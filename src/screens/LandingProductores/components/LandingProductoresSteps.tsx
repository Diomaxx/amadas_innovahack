import Link from "next/link";
import { BadgeCheck, CalendarCheck, UsersRound } from "lucide-react";
import { Reveal } from "@/components/UI/Reveal";
import { steps } from "./landingProductores.data";

const icons = [BadgeCheck, CalendarCheck, UsersRound];

export function LandingProductoresSteps() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cv-gold-600">Proceso</p>
        <h2 className="mt-2 text-4xl font-bold text-cv-green-900">3 Pasos hacia tu Crecimiento</h2>
        <p className="mx-auto mt-3 max-w-2xl text-cv-gray-700">
          Simplificamos el acceso al mercado global para tu asociacion.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = icons[index] ?? BadgeCheck;

          return (
            <Reveal key={step.title} delay={index * 0.08}>
            <article className="relative">
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2 rounded-full bg-cv-gold-600 px-2 py-0.5 text-xs font-bold text-white">
                {index + 1}
              </span>
              <div className="flex justify-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cv-green-700 text-white">
                  <Icon className="h-7 w-7" />
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-cv-green-900">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-cv-gray-700">{step.description}</p>
            </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.12}>
        <Link
          href="/auth"
          className="mt-10 inline-flex rounded-full bg-cv-gold-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-cv-gold-500"
        >
          Solicitar Union Ahora
        </Link>
      </Reveal>
    </section>
  );
}
