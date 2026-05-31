"use client";

import { motion } from "framer-motion";
import { CalendarDays, ShieldCheck, UtensilsCrossed } from "lucide-react";

const FEATURES = [
  { Icon: CalendarDays, label: "Calendario vivo de temporadas" },
  { Icon: UtensilsCrossed, label: "Productos y recetas del bosque" },
  { Icon: ShieldCheck, label: "Información revisada por FAN" },
];

const FOREST_IMG =
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80";

/**
 * Contenido del panel de marca (imagen de bosque + overlay + textos).
 * Llena por completo a su contenedor; el posicionamiento (cortina animada)
 * lo controla quien lo monta.
 *
 * @param contentDelay segundos a esperar antes de revelar el texto, para que
 *        aparezca recién cuando la cortina llegó a su lugar.
 */
export function AuthBrandPanel({
  eyebrow = "Del bosque a la mesa",
  title = "Conecta con los productos del bosque",
  contentDelay = 0,
}: {
  eyebrow?: string;
  title?: string;
  contentDelay?: number;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Imagen de bosque */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${FOREST_IMG}')` }}
      />

      {/* Overlay verde para legibilidad */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,41,31,0.45) 0%, rgba(20,41,31,0.65) 55%, rgba(11,24,18,0.85) 100%)",
        }}
      />
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cv-gold-400/70 to-transparent" />

      {/* Texto — entra cuando la cortina ya llegó */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: contentDelay }}
        className="relative flex h-full flex-col justify-center p-10 text-cv-cream-50"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cv-gold-300">
          {eyebrow}
        </p>

        <h2 className="mb-8 max-w-[14ch] font-display text-3xl font-bold leading-[1.1] drop-shadow-sm">
          {title}
        </h2>

        <ul className="space-y-4">
          {FEATURES.map(({ Icon, label }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: contentDelay + 0.1 + i * 0.1 }}
              className="flex items-center gap-3 text-sm text-cv-cream-100"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cv-green-700/60 text-cv-gold-300 ring-1 ring-cv-gold-400/30 backdrop-blur-sm">
                <Icon className="h-4 w-4" />
              </span>
              {label}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
