"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import type { Menu } from "../menus.types";
import { getMenuUi } from "@/lib/api/menus";
import { MenusSkeleton } from "./MenusSkeleton";
import { MenuDetail } from "./MenuDetail";

export function MenuDetailClient({ id }: { id: string }) {
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activo = true;
    getMenuUi(id)
      .then((m) => {
        if (activo) setMenu(m);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });
    return () => {
      activo = false;
    };
  }, [id]);

  if (loading) return <MenusSkeleton />;

  if (!menu) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-cv-cream-300 py-24 text-center">
        <UtensilsCrossed className="mb-4 h-12 w-12 text-cv-green-300" />
        <h1 className="text-xl font-bold text-cv-green-900">Menú no encontrado</h1>
        <p className="mt-2 text-sm text-cv-gray-600">
          No pudimos encontrar el menú que estás buscando.
        </p>
        <Link
          href="/menus"
          className="mt-6 rounded-full bg-cv-green-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-cv-green-700"
        >
          Volver a menús
        </Link>
      </div>
    );
  }

  return <MenuDetail menu={menu} />;
}
