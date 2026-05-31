"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Menu } from "../menus.types";

type MenusGridProps = {
  menus: Menu[];
};

function MenuTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-cv-cream-100 px-2.5 py-1 text-xs font-medium text-cv-gray-700 transition-colors duration-300 hover:bg-cv-green-100 hover:text-cv-green-800"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}

function MenuCard({ menu, index }: { menu: Menu; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04 }}
    >
    <Link
      href={`/menus/${menu.id}`}
      className="group block overflow-hidden rounded-2xl border border-cv-cream-300 bg-card transition hover:-translate-y-1 hover:shadow-lg hover:shadow-cv-green-900/10"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={menu.coverImage}
          alt={menu.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3 p-5">
        <p className="text-sm font-medium text-cv-gold-600">{menu.restaurant}</p>

        <h3 className="text-xl font-semibold text-cv-green-900 transition-colors duration-300 group-hover:text-cv-green-700">
          {menu.title}
        </h3>

        <p className="text-sm leading-relaxed text-cv-gray-600">{menu.summary}</p>

        <MenuTags tags={menu.tags} />

        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cv-green-700 underline-offset-4 group-hover:underline">
          Explorar menú
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
    </motion.div>
  );
}

export function MenusGrid({ menus }: MenusGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {menus.map((menu, index) => (
        <MenuCard key={menu.id} menu={menu} index={index} />
      ))}
    </div>
  );
}
