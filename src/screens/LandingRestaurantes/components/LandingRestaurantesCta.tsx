import Link from "next/link";
import { Reveal } from "@/components/UI/Reveal";

export function LandingRestaurantesCta() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="text-5xl font-bold leading-tight text-cv-green-900">
          Listo para llevar el alma del bosque a tu menu?
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mx-auto mt-4 max-w-2xl text-cv-gray-700">
          Unete a la red de chefs que estan redefiniendo la alta gastronomia boliviana con responsabilidad ambiental.
        </p>
      </Reveal>

      <Reveal delay={0.16}>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/auth"
          className="rounded-full bg-cv-green-800 px-8 py-3 text-sm font-semibold text-white transition hover:bg-cv-green-700"
        >
          Unirse al Movimiento
        </Link>
        <Link
          href="/catalogo"
          className="rounded-full border border-cv-green-700 px-8 py-3 text-sm font-semibold text-cv-green-800 transition hover:bg-cv-green-100"
        >
          Ver Catalogo de Temporada
        </Link>
      </div>
      </Reveal>
    </section>
  );
}
