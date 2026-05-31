"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Leaf, LogOut, Plus } from "lucide-react";
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
        <Link href="/admin" className="group flex items-center gap-2.5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cv-green-800 text-cv-cream-50 ring-1 ring-cv-gold-400/40 transition-transform duration-300 group-hover:-rotate-6">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-tight text-cv-green-900">
              Backoffice
            </span>
            <span className="mt-1 text-xs text-cv-gray-500">Fundación FAN</span>
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
                  ? "bg-cv-green-100 text-cv-green-900"
                  : "text-cv-gray-600 hover:bg-cv-cream-100 hover:text-cv-green-800",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  active
                    ? "text-cv-green-700"
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
        <Link
          href="/"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-cv-gray-600 transition-colors duration-200 hover:bg-cv-cream-100 hover:text-cv-green-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a la app
        </Link>

        <Link
          href="/admin/flora"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-cv-green-800 px-4 py-2.5 text-sm font-medium text-cv-cream-50 transition-colors duration-200 hover:bg-cv-green-700"
        >
          <Plus className="h-4 w-4" />
          Nuevo Producto
        </Link>

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
