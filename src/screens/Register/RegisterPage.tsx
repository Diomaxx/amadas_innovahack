"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { PERFILES } from "./register.data";
import { PerfilCard } from "./components/PerfilCard";
import { ComoFunciona } from "./components/ComoFunciona";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-cv-cream-100">
      {/* Contenido */}
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(141,195,164,0.16),transparent_40%),radial-gradient(circle_at_85%_30%,rgba(200,169,110,0.12),transparent_40%)]" />

        <div className="relative mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-cv-gray-500 transition-colors hover:text-cv-green-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al inicio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="font-display text-3xl font-bold text-cv-green-900 sm:text-4xl">
              ¿Cómo quieres participar en la red?
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-cv-gray-600">
              Seleccione el perfil que mejor describa su actividad para integrarse
              al ecosistema de preservación y aprovechamiento sostenible del
              bosque.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {PERFILES.map((perfil, i) => (
              <PerfilCard key={perfil.id} perfil={perfil} index={i} />
            ))}
          </div>

          <ComoFunciona />

          <p className="mt-10 text-center text-sm text-cv-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/auth"
              className="font-medium text-cv-green-700 transition-colors hover:text-cv-green-600"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
