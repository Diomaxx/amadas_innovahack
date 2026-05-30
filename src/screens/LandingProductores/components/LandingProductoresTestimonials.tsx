import { Quote } from "lucide-react";
import { Reveal } from "@/components/UI/Reveal";
import { testimonials } from "./landingProductores.data";

export function LandingProductoresTestimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal className="text-center">
        <h2 className="text-4xl font-bold text-cv-green-900">Lideres de la Red</h2>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {testimonials.map((item, index) => (
          <Reveal key={item.author} delay={index * 0.1}>
            <article className="rounded-2xl bg-cv-green-800 p-7 text-white shadow-lg shadow-cv-green-900/20">
              <Quote className="h-7 w-7 text-cv-green-300" />
              <p className="mt-3 text-lg leading-relaxed text-cv-cream-100">"{item.quote}"</p>
              <p className="mt-6 text-sm font-semibold">{item.author}</p>
              <p className="text-xs text-cv-green-200">{item.role}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
