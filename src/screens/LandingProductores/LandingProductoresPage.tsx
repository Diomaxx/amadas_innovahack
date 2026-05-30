import { LandingProductoresBenefits } from "./components/LandingProductoresBenefits";
import { LandingProductoresGallery } from "./components/LandingProductoresGallery";
import { LandingProductoresHero } from "./components/LandingProductoresHero";
import { LandingProductoresPartners } from "./components/LandingProductoresPartners";
import { LandingProductoresStats } from "./components/LandingProductoresStats";
import { LandingProductoresSteps } from "./components/LandingProductoresSteps";
import { LandingProductoresTech } from "./components/LandingProductoresTech";
import { LandingProductoresTestimonials } from "./components/LandingProductoresTestimonials";

export default function LandingProductoresPage() {
  return (
    <section className="relative left-1/2 -my-8 w-screen -translate-x-1/2 overflow-x-hidden bg-cv-cream-50">
      <LandingProductoresHero />
      <LandingProductoresStats />
      <LandingProductoresTech />
      <LandingProductoresSteps />
      <LandingProductoresBenefits />
      <LandingProductoresPartners />
      <LandingProductoresTestimonials />
      <LandingProductoresGallery />
    </section>
  );
}
