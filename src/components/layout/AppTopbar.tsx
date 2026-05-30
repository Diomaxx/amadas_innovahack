"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, CircleUserRound, Leaf, LogOut, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/lib/firebase/auth";

const topbarLinks = [
  { href: "/", label: "Inicio", activePaths: ["/", "/productores", "/restaurantes"] },
  { href: "/recetas", label: "Recetas" },
  { href: "/catalogo", label: "Catalogo" },
  { href: "/abastecimiento", label: "Abastecimiento" },
  { href: "/menus", label: "Menus" },
  { href: "/conexiones", label: "Conexiones" },
];

export function AppTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!menuRef.current) {
        return;
      }

      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      await logout();
      setMenuOpen(false);
      router.push("/");
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-cv-cream-300/70 bg-cv-cream-50/85 shadow-[0_8px_18px_-16px_rgba(20,41,31,0.45)] backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cv-green-800 text-cv-cream-50 ring-1 ring-cv-gold-400/40 transition-transform duration-300 group-hover:-rotate-6">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="font-display text-2xl font-semibold leading-none tracking-tight text-cv-green-900">
            Calendario <span className="text-cv-gold-600">Vivo</span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-2 text-sm md:flex">
          {topbarLinks.map((link) => (
            (() => {
              const isActive = link.activePaths
                ? link.activePaths.includes(pathname)
                : pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "group relative rounded-md px-3 py-2 font-medium transition-colors duration-300",
                    isActive ? "text-cv-green-800" : "text-cv-gray-600 hover:text-cv-green-700"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-3 right-3 h-0.5 origin-left rounded-full bg-cv-green-700 transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })()
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 rounded-full border border-cv-cream-300 bg-white px-3 py-2 text-cv-gray-500 transition focus-within:border-cv-green-400 hover:border-cv-green-300">
          <Search className="h-4 w-4" />
          <span className="hidden text-sm sm:inline">Buscar productos...</span>
        </div>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            aria-label="Perfil"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-1 rounded-full border border-cv-cream-300 bg-white px-2 py-1.5 text-cv-green-900 transition duration-300 hover:-translate-y-0.5 hover:border-cv-green-300 hover:bg-cv-cream-100"
          >
            <CircleUserRound className="h-5 w-5" />
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-200", menuOpen && "rotate-180")}
            />
          </button>

          <div
            className={cn(
              "absolute right-0 top-12 w-64 overflow-hidden rounded-xl border border-cv-cream-300 bg-white shadow-[0_20px_40px_-24px_rgba(20,41,31,0.6)] transition-all duration-200",
              menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
            )}
          >
            <div className="border-b border-cv-cream-200 bg-cv-cream-100 px-4 py-3">
              <p className="text-sm font-semibold text-cv-green-900">
                {user ? "Sesion activa" : "Invitado"}
              </p>
              <p className="truncate text-xs text-cv-gray-600">
                {user?.email ?? "Inicia sesion para personalizar tu experiencia"}
              </p>
            </div>

            <div className="p-2">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/auth");
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-cv-gray-700 transition hover:bg-cv-cream-100 hover:text-cv-green-900"
              >
                <User className="h-4 w-4" />
                {user ? "Mi cuenta" : "Iniciar sesion"}
              </button>

              {user ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#8a2f2f] transition hover:bg-[#fff3f3] disabled:opacity-60"
                >
                  <LogOut className="h-4 w-4" />
                  {isSigningOut ? "Cerrando..." : "Cerrar sesion"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
