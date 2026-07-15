"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useUnifiedLoading } from "@/hooks/useUnifiedLoading";
import { FeaturedMenuCard, MenusHero, SideMenuCard } from "./components/MenusHero";
import { MenusGrid } from "./components/MenusGrid";
import { MenusSkeleton } from "./components/MenusSkeleton";
import type { Menu } from "./menus.types";
import { useApiCollection } from "@/hooks/useApiCollection";
import { listMenusUi } from "@/lib/api/menus";

/** Regla de negocio: destacados primero, luego por fecha de actualización desc. */
function sortMenusByBusinessRules(menus: Menu[]): Menu[] {
  return [...menus].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export default function MenusPage() {
  const uiLoading = useUnifiedLoading();
  const { data: menusData, loading } = useApiCollection(listMenusUi);

  const { menus, featuredMenu, topSideMenu, regularMenus } = useMemo(() => {
    const sorted = sortMenusByBusinessRules(menusData);
    const featured = sorted.find((menu) => menu.featured) ?? null;
    const nonFeatured = sorted.filter((menu) => !menu.featured);
    const side = nonFeatured[0] ?? null;
    const regular = side ? nonFeatured.slice(1) : nonFeatured;
    return {
      menus: sorted,
      featuredMenu: featured,
      topSideMenu: side,
      regularMenus: regular,
    };
  }, [menusData]);

  if (uiLoading || loading) {
    return <MenusSkeleton />;
  }

  return (
    <motion.section
      className="space-y-8 pb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <MenusHero totalMenus={menus.length} />

      {featuredMenu ? (
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          <FeaturedMenuCard menu={featuredMenu} />
          {topSideMenu ? <SideMenuCard menu={topSideMenu} /> : null}
        </div>
      ) : null}

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-cv-green-900">Más propuestas</h2>
        <MenusGrid menus={regularMenus} />
      </div>
    </motion.section>
  );
}
