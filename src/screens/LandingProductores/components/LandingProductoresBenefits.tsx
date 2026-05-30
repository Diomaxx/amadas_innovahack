import { ChartNoAxesCombined, Medal, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/UI/Reveal";
import { benefits } from "./landingProductores.data";

const icons = [ChartNoAxesCombined, ShieldCheck, Medal];

export function LandingProductoresBenefits() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal className="text-center">
        <h2 className="text-4xl font-bold text-cv-green-900">Beneficios Exclusivos de la Red</h2>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {benefits.map((item, index) => {
          const Icon = icons[index] ?? Medal;

          return (
            <Reveal key={item.title} delay={index * 0.08}>
              <article
                className="relative overflow-hidden rounded-2xl"
                style={{
                  backgroundImage: `linear-gradient(rgba(7,55,37,0.75), rgba(7,55,37,0.9)), url('${item.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="space-y-4 p-6 text-center text-white">
                  <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-3xl font-semibold leading-tight">{item.title}</h3>
                  <p className="text-sm text-cv-cream-100">{item.description}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
