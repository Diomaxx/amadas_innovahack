"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, Home, Users, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileLinks = [
  { href: "/", label: "Inicio", Icon: Home, activePaths: ["/", "/productores", "/restaurantes"] },
  { href: "/catalogo", label: "Catalogo", Icon: BookOpenText },
  { href: "/conexiones", label: "Conexiones", Icon: Users, activePaths: ["/conexiones", "/intercambio"] },
  { href: "/menus", label: "Menus", Icon: UtensilsCrossed },
];

export function AppMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-cv-cream-300 bg-cv-cream-50/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 backdrop-blur md:hidden">
      <div className="mx-auto flex w-full max-w-md items-center justify-between gap-1">
        {mobileLinks.map((link) => {
          const isActive = link.activePaths
            ? link.activePaths.includes(pathname)
            : pathname === link.href;
          const Icon = link.Icon;

          return (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold leading-none transition-colors",
                isActive
                  ? "bg-cv-green-800 text-cv-cream-50"
                  : "text-cv-gray-600 hover:bg-cv-cream-100 hover:text-cv-green-800"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
