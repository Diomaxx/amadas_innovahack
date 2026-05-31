"use client";

import { useState } from "react";
import { Database, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { seedAll, type SeedResult } from "@/lib/firebase/seed";
import { AdminPageHeader } from "@/screens/Admin/components/AdminPageHeader";

type Estado =
  | { tipo: "idle" }
  | { tipo: "cargando" }
  | { tipo: "ok"; result: SeedResult }
  | { tipo: "error"; mensaje: string };

export default function AdminSeedPage() {
  const [estado, setEstado] = useState<Estado>({ tipo: "idle" });

  async function sembrar() {
    setEstado({ tipo: "cargando" });
    try {
      const result = await seedAll();
      setEstado({ tipo: "ok", result });
    } catch (error) {
      setEstado({
        tipo: "error",
        mensaje: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Inicializar datos"
        subtitle="Sube los datos de ejemplo (mock) a Firestore. Usa los mismos ids, así que es seguro ejecutarlo varias veces (hace merge)."
      />

      <div className="rounded-2xl border border-cv-cream-300 bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cv-green-100">
            <Database className="h-6 w-6 text-cv-green-700" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-cv-gray-900">
              Sembrar colecciones
            </h2>
            <p className="mt-1 text-sm text-cv-gray-500">
              Publicaciones, contactos, productos (temporada), recetas y
              actividad. Se escribe con tu sesión de administrador.
            </p>

            <button
              type="button"
              onClick={sembrar}
              disabled={estado.tipo === "cargando"}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cv-green-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cv-green-800 disabled:opacity-60"
            >
              {estado.tipo === "cargando" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sembrando…
                </>
              ) : (
                <>
                  <Database className="h-4 w-4" />
                  Ejecutar seeding
                </>
              )}
            </button>
          </div>
        </div>

        {estado.tipo === "ok" && (
          <div className="mt-6 rounded-xl border border-cv-green-200 bg-cv-green-50 p-4">
            <div className="flex items-center gap-2 text-cv-green-800">
              <CheckCircle2 className="h-5 w-5" />
              <p className="text-sm font-semibold">Datos sembrados correctamente</p>
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-cv-gray-700 sm:grid-cols-3">
              {Object.entries(estado.result).map(([col, n]) => (
                <li
                  key={col}
                  className="rounded-lg border border-cv-cream-300 bg-white px-3 py-2"
                >
                  <span className="font-bold text-cv-gray-900">{n}</span>{" "}
                  <span className="capitalize text-cv-gray-500">{col}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {estado.tipo === "error" && (
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-[#E4C9C2] bg-[#FBEEEB] p-4 text-[#A6452F]">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="text-sm font-semibold">No se pudo sembrar</p>
              <p className="mt-1 text-xs">{estado.mensaje}</p>
              <p className="mt-2 text-xs text-cv-gray-600">
                Revisá que tu email esté en NEXT_PUBLIC_ADMIN_EMAILS y que las
                reglas de Firestore estén publicadas.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
