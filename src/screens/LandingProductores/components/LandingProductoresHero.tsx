import Link from "next/link";
import { Reveal } from "@/components/UI/Reveal";
import { heroData } from "./landingProductores.data";

export function LandingProductoresHero() {
  return (
    <section
      className="relative min-h-[70vh] overflow-hidden border-b border-cv-cream-300"
      style={{
        backgroundImage: `linear-gradient(rgba(20,41,31,0.42), rgba(20,41,31,0.42)), url('${heroData.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cv-green-100">{heroData.badge}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-6xl">{heroData.title}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-cv-cream-100 sm:text-lg">{heroData.description}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/auth"
            className="rounded-full bg-cv-gold-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-cv-gold-500"
          >
            Comienza a Vender
          </Link>
          <Link
            href="/menus"
            className="rounded-full border border-cv-cream-300 px-8 py-3 text-sm font-semibold text-white/95 transition hover:bg-white/10"
          >
            Saber mas
          </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
