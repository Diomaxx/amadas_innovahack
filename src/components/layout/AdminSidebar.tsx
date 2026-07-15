"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/supabase/auth";
import { ADMIN_NAV } from "@/screens/Admin/admin.config";

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Marca ALMA — reutilizada en el sidebar de escritorio y el drawer móvil. */
function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="group flex items-center gap-2.5"
    >
      <span className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl shadow-[0_10px_20px_-12px_rgba(20,41,31,0.35)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:shadow-[0_14px_28px_-12px_rgba(20,41,31,0.5)]">
        <Image
          src="/logo.png"
          alt="ALMA"
          fill
          sizes="44px"
          className="object-cover"
          priority
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-70" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-cv-green-900 via-cv-green-700 to-cv-gold-600 bg-clip-text transition-all duration-300 group-hover:from-cv-green-800 group-hover:via-cv-green-600 group-hover:to-cv-gold-500">
          ALMA
        </span>
        <span className="mt-1 text-xs text-cv-gray-500">Backoffice</span>
      </span>
    </Link>
  );
}

/** Contenido interno del panel: marca, navegación y acciones. */
function SidebarPanel({
  pathname,
  isSigningOut,
  onSignOut,
  onNavigate,
}: {
  pathname: string;
  isSigningOut: boolean;
  onSignOut: () => void;
  onNavigate?: () => void;
}) {
  return (
    <>
      {/* Marca */}
      <div className="px-6 pb-5 pt-7">
        <Brand onNavigate={onNavigate} />
      </div>

      <div className="mx-6 mb-2 h-px bg-gradient-to-r from-transparent via-cv-cream-300 to-transparent" />

      {/* Navegación */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cv-gray-400">
          Menú
        </p>
        {ADMIN_NAV.map(({ label, href, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-cv-green-800 to-cv-green-700 text-cv-cream-50 shadow-[0_14px_28px_-18px_rgba(20,41,31,0.9)]"
                  : "text-cv-gray-600 hover:translate-x-0.5 hover:bg-cv-cream-100/80 hover:text-cv-green-800",
              )}
            >
              {/* Indicador activo dorado */}
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-cv-gold-400 transition-all duration-300",
                  active ? "opacity-100" : "opacity-0",
                )}
              />
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
      <div className="mt-auto px-4 pb-5 pt-3">
        <div className="mb-3 h-px bg-gradient-to-r from-transparent via-cv-cream-300 to-transparent" />
        <button
          type="button"
          onClick={onSignOut}
          disabled={isSigningOut}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#8a2f2f] transition-colors duration-200 hover:bg-[#fff3f3] disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" />
          {isSigningOut ? "Cerrando sesión..." : "Cerrar Sesión"}
        </button>
      </div>
    </>
  );
}

export function AdminSidebar() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Cierra el drawer al navegar entre secciones.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Bloquea el scroll del body mientras el drawer está abierto.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

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
    <>
      {/* Barra superior — solo móvil/tablet */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-cv-cream-300 bg-cv-cream-50/95 px-4 py-3 backdrop-blur lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cv-cream-300 bg-white text-cv-gray-700 transition-colors hover:bg-cv-cream-100"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Drawer móvil + overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        {/* Overlay */}
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-cv-green-900/40 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />
        {/* Panel deslizante */}
        <aside
          className={cn(
            "absolute inset-y-0 left-0 flex w-72 max-w-[82%] flex-col overflow-hidden rounded-r-[1.75rem] border-r border-cv-cream-300 bg-gradient-to-b from-cv-cream-50 via-cv-cream-50 to-cv-cream-100/70 shadow-2xl transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-cv-green-300/25 blur-3xl" />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
            className="absolute right-3 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-cv-gray-500 transition-colors hover:bg-cv-cream-100 hover:text-cv-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
          <SidebarPanel
            pathname={pathname}
            isSigningOut={isSigningOut}
            onSignOut={handleSignOut}
            onNavigate={() => setMobileOpen(false)}
          />
        </aside>
      </div>

      {/* Sidebar de escritorio — tarjeta flotante */}
      <aside className="sticky top-0 hidden h-screen shrink-0 p-3 lg:flex xl:p-4">
        <div className="relative flex h-full w-64 flex-col overflow-hidden rounded-[1.75rem] border border-cv-cream-300/70 bg-gradient-to-b from-cv-cream-50 via-cv-cream-50 to-cv-cream-100/70 shadow-[0_28px_70px_-34px_rgba(20,41,31,0.55)] backdrop-blur-sm">
          {/* Resplandor decorativo superior */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-cv-green-300/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-40 w-40 rounded-full bg-cv-gold-400/15 blur-3xl" />
          <div className="relative flex h-full flex-col">
            <SidebarPanel
              pathname={pathname}
              isSigningOut={isSigningOut}
              onSignOut={handleSignOut}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
