import { galleryImages } from "./landingProductores.data";
import { Reveal } from "@/components/UI/Reveal";

export function LandingProductoresGallery() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cv-gold-600">El bosque</p>
        <h2 className="mt-2 text-4xl font-bold text-cv-green-900">Un Tesoro de Biodiversidad</h2>
        <p className="mx-auto mt-3 max-w-2xl text-cv-gray-700">
          Explora la riqueza natural de donde provienen nuestros productos.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image, index) => (
          <Reveal key={`${image}-${index}`} delay={index * 0.05}>
            <div className="overflow-hidden rounded-xl">
              <img
                src={image}
                alt={`Bosque chiquitano ${index + 1}`}
                className="h-44 w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
