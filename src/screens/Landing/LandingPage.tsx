"use client";

import LandingAnimatedCards from "./components/LandingAnimatedCards";
import LandingAnimatedHero from "./components/LandingAnimatedHero";
import LandingFeatureCard from "./components/LandingFeatureCard";

const heroImage =
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1800&q=80";
const productsImage =
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80";
const recipesImage =
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1200&q=80";

export default function LandingPage() {
  return (
    <section className="relative left-1/2 -my-8 w-screen -translate-x-1/2 overflow-x-hidden bg-[#f2f1ec]">
      <div className="flex w-full flex-col space-y-4 p-0">
        <LandingAnimatedHero backgroundImage={heroImage} />

        <LandingAnimatedCards>
          <LandingFeatureCard
            backgroundImage={productsImage}
            overlayClassName="bg-gradient-to-r from-[#0a3f1f]/75 via-[#0a3f1f]/55 to-transparent"
            icon="??"
            iconClassName="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0f5e2f]/80 text-3xl"
            title={
              <>
                Explorar productos
                <br />
                del bosque
              </>
            }
            dividerClassName="mt-4 h-[2px] w-28 bg-[#71d275]"
            description="Explora los productos del bosque, sus temporadas y contactos de referencia."
            buttonLabel="Explorar productos"
            buttonClassName="mt-auto w-fit rounded-full bg-[#52bb5c] px-7 py-3 text-lg font-bold text-white transition hover:bg-[#44a34d]"
            buttonHref="/productores"
          />

          <LandingFeatureCard
            backgroundImage={recipesImage}
            overlayClassName="bg-gradient-to-r from-[#4b473f]/65 via-[#4b473f]/45 to-transparent"
            icon="?????"
            iconClassName="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#f2c12e] text-3xl text-black"
            title={
              <>
                Descubrir recetas
                <br />e inspiracion
              </>
            }
            dividerClassName="mt-4 h-[2px] w-28 bg-[#f2c12e]"
            description="Descubre recetas, ingredientes de temporada e ideas culinarias inspiradas."
            buttonLabel="Ver inspiracion"
            buttonClassName="mt-auto w-fit rounded-full bg-[#f2c12e] px-7 py-3 text-lg font-bold text-black transition hover:bg-[#deae21]"
            buttonHref="/restaurantes"
          />
        </LandingAnimatedCards>
      </div>
    </section>
  );
}
