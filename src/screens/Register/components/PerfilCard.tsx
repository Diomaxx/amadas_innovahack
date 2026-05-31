"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PerfilOption } from "../register.data";

export function PerfilCard({
  perfil,
  index,
}: {
  perfil: PerfilOption;
  index: number;
}) {
  const { Icon } = perfil;
  const isSolid = perfil.variant === "solid";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-cv-cream-300 bg-white p-7 shadow-sm transition-shadow duration-300 hover:border-cv-green-300 hover:shadow-xl hover:shadow-cv-green-900/10 sm:p-8"
    >
      {/* Marca de agua */}
      <Icon className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 text-cv-green-900/[0.04] transition-transform duration-500 group-hover:scale-110 group-hover:text-cv-green-900/[0.06]" />

      {/* Icono */}
      <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cv-green-100 text-cv-green-700 ring-1 ring-cv-green-200">
        <Icon className="h-6 w-6" />
      </span>

      <h2 className="font-display text-xl font-bold text-cv-green-900">
        {perfil.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-cv-gray-600">
        {perfil.description}
      </p>

      {/* Features */}
      <ul className="mt-5 space-y-2.5">
        {perfil.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2.5 text-sm text-cv-gray-700"
          >
            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cv-green-100 text-cv-green-700">
              <Check className="h-3 w-3" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {perfil.note && (
        <p className="mt-4 flex items-center gap-2 text-xs font-medium text-cv-green-600">
          <ShieldCheck className="h-4 w-4" />
          {perfil.note}
        </p>
      )}

      {/* CTA */}
      <Link
        href={perfil.href}
        className={cn(
          "group/btn mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
          isSolid
            ? "bg-cv-green-800 text-cv-cream-50 hover:bg-cv-green-700 hover:shadow-md"
            : "border border-cv-green-700 text-cv-green-800 hover:bg-cv-green-50 hover:shadow-sm",
        )}
      >
        {perfil.cta}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
      </Link>
    </motion.div>
  );
}
