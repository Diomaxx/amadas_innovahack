"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/firebase/auth";
import { ADMIN_NAV } from "@/screens/Admin/admin.config";

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      await logout();
      router.push("/");
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-cv-cream-300 bg-cv-cream-50">
      {/* Marca */}
      <div className="px-6 pb-6 pt-7">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl shadow-[0_10px_20px_-12px_rgba(20,41,31,0.35)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:shadow-[0_14px_28px_-12px_rgba(20,41,31,0.5)]">
            <Image
              src="/logo.png"
              alt="MATI"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-70" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-cv-green-900 via-cv-green-700 to-cv-gold-600 bg-clip-text transition-all duration-300 group-hover:from-cv-green-800 group-hover:via-cv-green-600 group-hover:to-cv-gold-500">
              MATI
            </span>
            <span className="mt-1 text-xs text-cv-gray-500">Backoffice</span>
          </span>
        </Link>
      </div>

      {/* Navegación */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {ADMIN_NAV.map(({ label, href, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                active
                  ? "bg-cv-green-800 text-cv-cream-50 shadow-[0_10px_20px_-14px_rgba(20,41,31,0.65)]"
                  : "text-cv-gray-600 hover:bg-cv-cream-100 hover:text-cv-green-800",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  active
                    ? "text-cv-gold-400"
                    : "text-cv-gray-400 group-hover:text-cv-green-600",
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Acciones inferiores */}
      <div className="space-y-3 border-t border-cv-cream-300 px-4 py-5">
        

        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#8a2f2f] transition-colors duration-200 hover:bg-[#fff3f3] disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" />
          {isSigningOut ? "Cerrando sesión..." : "Cerrar Sesión"}
        </button>
      </div>
    </aside>
  );
}
