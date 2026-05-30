import { Quote } from "lucide-react";
import { Reveal } from "@/components/UI/Reveal";
import { testimonial } from "./landingRestaurantes.data";

export function LandingRestaurantesTestimonial() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
      <article className="rounded-3xl bg-cv-green-800 p-10 text-center text-white">
        <Quote className="mx-auto h-10 w-10 text-cv-green-300" />
        <p className="mx-auto mt-4 max-w-3xl text-4xl font-semibold leading-tight">"{testimonial.quote}"</p>
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="mx-auto mt-6 h-14 w-14 rounded-full border-2 border-cv-green-200 object-cover"
        />
        <p className="mt-3 text-sm font-semibold">{testimonial.author}</p>
        <p className="text-xs text-cv-green-200">{testimonial.role}</p>
      </article>
      </Reveal>
    </section>
  );
}
