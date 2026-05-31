"use client";

import Link from "next/link";
import { Trees } from "lucide-react";
import catalogoData from "@/mocks/catalogoData.json";
import { CatalogoListItem, type EspecieListData } from "./CatalogoListItem";

const OTROS_RECURSOS = catalogoData.otrosRecursos as EspecieListData[];

/**
 * Lista de "Otros recursos del bosque" para la página de producto.
 * Excluye el recurso que se está viendo (si aplica) y limita la cantidad.
 */
export function OtrosRecursos({
  excludeId,
  limit = 4,
}: {
  excludeId?: string;
  limit?: number;
}) {
  const recursos = OTROS_RECURSOS.filter((r) => r.id !== excludeId).slice(
    0,
    limit,
  );

  if (recursos.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="mb-4 flex items-center gap-2">
        <Trees className="h-5 w-5 text-cv-green-700" />
        <h2 className="text-base font-semibold text-cv-gray-800">
          Otros Recursos del Bosque
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {recursos.map((r) => (
          <Link key={r.id} href={`/catalogo/${r.id}`} className="block">
            <CatalogoListItem especie={r} />
          </Link>
        ))}
      </div>
    </section>
  );
}
