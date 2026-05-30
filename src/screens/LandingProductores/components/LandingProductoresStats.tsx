import { CircleDollarSign, ReceiptText, Store } from "lucide-react";
import { stats } from "./landingProductores.data";

const icons = [Store, ReceiptText, CircleDollarSign];

export function LandingProductoresStats() {
  return (
    <section className="border-y border-cv-cream-300 bg-cv-cream-100">
      <div className="mx-auto grid max-w-6xl gap-3 px-4 py-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        {stats.map((item, index) => {
          const Icon = icons[index] ?? Store;

          return (
            <div key={item} className="flex items-center justify-center gap-2 text-center text-xs font-semibold uppercase tracking-wide text-cv-green-900">
              <Icon className="h-4 w-4 text-cv-gold-600" />
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
