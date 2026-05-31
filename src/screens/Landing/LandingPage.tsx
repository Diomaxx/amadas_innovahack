"use client";

import { motion } from "framer-motion";
import { Trees, CookingPot } from "lucide-react";
import LandingAnimatedCards from "./components/LandingAnimatedCards";
import LandingAnimatedHero from "./components/LandingAnimatedHero";
import LandingFeatureCard from "./components/LandingFeatureCard";

const heroImage =
  "https://res.cloudinary.com/dfzi3onqf/image/upload/f_auto,q_auto/WhatsApp_Image_2026-05-30_at_22.24.35_ssvaso";
const productsImage =
  "https://res.cloudinary.com/dfzi3onqf/image/upload/v1780194777/productoslanding_pphkbj.jpg";
const recipesImage =
  "https://res.cloudinary.com/dfzi3onqf/image/upload/v1780194777/restauranteslanding_sqd8iz.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function LandingPage() {
  return (
    <section className="relative left-1/2 -my-8 w-screen -translate-x-1/2 overflow-x-hidden bg-cv-cream-100">
      <div className="flex w-full flex-col p-0">
        <LandingAnimatedHero backgroundImage={heroImage} />

        <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-16 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-10 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cv-gold-600">
              Elige tu camino
            </p>
            <h2 className="font-display mt-3 text-4xl font-semibold text-cv-green-900 sm:text-5xl">
              Dos caminos hacia el bosque
            </h2>
          </motion.div>

          <LandingAnimatedCards>
            <LandingFeatureCard
              index={0}
              backgroundImage={productsImage}
              overlayClassName="bg-gradient-to-t from-cv-green-900 via-cv-green-900/60 to-cv-green-900/20"
              icon={<Trees className="h-7 w-7 text-cv-cream-50" />}
              iconClassName="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cv-green-700/80 ring-1 ring-cv-green-300/40 backdrop-blur"
              title={
                <>
                  Explorar productos
                  <br />
                  del bosque
                </>
              }
              dividerClassName="mt-4 h-[3px] w-28 rounded-full bg-cv-green-300"
              description="Explora los productos del bosque, sus temporadas y contactos de referencia."
              buttonLabel="Explorar productos"
              buttonClassName="rounded-full bg-cv-green-500 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-cv-green-900/25 transition hover:bg-cv-green-400"
              buttonHref="/productores"
            />

            <LandingFeatureCard
              index={1}
              backgroundImage={recipesImage}
              overlayClassName="bg-gradient-to-t from-cv-green-900 via-cv-green-900/55 to-cv-green-900/10"
              icon={<CookingPot className="h-7 w-7 text-cv-green-900" />}
              iconClassName="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cv-gold-400 ring-1 ring-cv-gold-300 backdrop-blur"
              title={
                <>
                  Descubrir recetas
                  <br />e inspiración
                </>
              }
              dividerClassName="mt-4 h-[3px] w-28 rounded-full bg-cv-gold-400"
              description="Descubre recetas, ingredientes de temporada e ideas culinarias inspiradas."
              buttonLabel="Ver inspiración"
              buttonClassName="rounded-full bg-cv-gold-500 px-7 py-3 text-base font-semibold text-cv-green-900 shadow-lg shadow-cv-gold-600/25 transition hover:bg-cv-gold-400"
              buttonHref="/restaurantes"
            />
          </LandingAnimatedCards>
        </div>
      </div>
    </section>
  );
}
