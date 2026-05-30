import { LandingRestaurantesCta } from "./components/LandingRestaurantesCta";
import { LandingRestaurantesHero } from "./components/LandingRestaurantesHero";
import { LandingRestaurantesPartners } from "./components/LandingRestaurantesPartners";
import { LandingRestaurantesStandards } from "./components/LandingRestaurantesStandards";
import { LandingRestaurantesSteps } from "./components/LandingRestaurantesSteps";
import { LandingRestaurantesTestimonial } from "./components/LandingRestaurantesTestimonial";
import { LandingRestaurantesValueCards } from "./components/LandingRestaurantesValueCards";

export default function LandingRestaurantesPage() {
  return (
    <section className="relative left-1/2 -my-8 w-screen -translate-x-1/2 overflow-x-hidden bg-cv-cream-50">
      <LandingRestaurantesHero />
      <LandingRestaurantesValueCards />
      <LandingRestaurantesStandards />
      <LandingRestaurantesSteps />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <LandingRestaurantesPartners />
      </div>
      <LandingRestaurantesTestimonial />
      <LandingRestaurantesCta />
    </section>
  );
}
