"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { loginWithEmail, mensajeErrorSupabase } from "@/lib/supabase/auth";
import { AuthBrandPanel } from "@/screens/Auth/components/AuthBrandPanel";

export function LoginCard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const busy = isSubmitting;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await loginWithEmail(email, password);
      router.push("/");
    } catch (err) {
      setError(mensajeErrorSupabase(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl border border-cv-cream-300 bg-white shadow-2xl shadow-cv-green-900/10 md:grid-cols-2"
    >
      {/* Cortina: la imagen cubre toda la tarjeta y se desliza a la mitad
          derecha. (Solo md+; en móvil se muestra como banner estático abajo.) */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 right-0 z-20 hidden md:block"
        initial={{ left: "0%" }}
        animate={{ left: "50%" }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.83, 0, 0.17, 1] }}
      >
        <AuthBrandPanel contentDelay={0.3} />
      </motion.div>

      {/* Left: form — aparece cuando la cortina ya se corrió */}
      <motion.div
        className="p-8 sm:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="mb-8 flex items-center gap-2.5">
          <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-[0_10px_20px_-12px_rgba(20,41,31,0.35)]">
            <Image
              src="/logo.png"
              alt="ALMA"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-70" />
          </span>
          <span className="bg-gradient-to-r from-cv-green-900 via-cv-green-700 to-cv-gold-600 bg-clip-text font-display text-2xl font-semibold leading-none tracking-tight text-transparent">
            ALMA
          </span>
        </div>

        <h1 className="mb-2 font-display text-3xl font-bold text-cv-green-900">
          Iniciar sesión
        </h1>
        <p className="mb-7 text-sm text-cv-gray-600">
          Bienvenido de vuelta. Ingresa para continuar.
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-cv-gray-700">
              Correo electrónico o teléfono
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@ejemplo.com"
              className="w-full rounded-lg border border-cv-cream-300 bg-white px-4 py-2.5 text-sm text-cv-gray-900 outline-none transition focus:border-cv-green-500 focus:ring-2 focus:ring-cv-green-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-cv-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-cv-cream-300 bg-white px-4 py-2.5 pr-11 text-sm text-cv-gray-900 outline-none transition focus:border-cv-green-500 focus:ring-2 focus:ring-cv-green-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cv-gray-400 transition-colors hover:text-cv-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-cv-gray-600">
              <input type="checkbox" className="rounded border-cv-cream-300" />
              Recordarme
            </label>
            <Link
              href="#"
              className="text-cv-gold-600 transition-colors hover:text-cv-gold-500"
            >
              Olvidé mi contraseña
            </Link>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-cv-green-800 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-cv-green-700 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="mt-6 text-sm text-cv-gray-600">
          ¿Aún no tienes cuenta?{" "}
          <Link
            href="/auth/registro"
            className="font-medium text-cv-green-700 transition-colors hover:text-cv-green-600"
          >
            Crear cuenta
          </Link>
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-cv-gray-500 transition-colors hover:text-cv-gray-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al inicio
        </Link>
      </motion.div>

      {/* Right: placeholder donde aterriza la cortina (md+).
          En móvil, banner estático debajo del formulario. */}
      <div className="relative min-h-[240px] md:min-h-0">
        <div className="md:hidden">
          <AuthBrandPanel contentDelay={0} />
        </div>
      </div>
    </motion.div>
  );
}
