"use client";

import { usePathname } from "next/navigation";
import { AppFooter } from "./AppFooter";
import { AppMobileNav } from "./AppMobileNav";
import { AppTopbar } from "./AppTopbar";

/**
 * Decide qué "chrome" envuelve a la página.
 *
 * El panel administrativo (`/admin`) usa su propio shell a pantalla completa
 * (sidebar propio), por lo que NO debe llevar el topbar/footer público ni el
 * límite de ancho `max-w-6xl`. El resto del sitio sí.
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // El panel admin y las pantallas de auth usan su propio shell a pantalla
  // completa, sin el topbar/footer público ni el límite de ancho.
  const isBare =
    pathname?.startsWith("/admin") || pathname?.startsWith("/auth") || false;

  if (isBare) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col print:bg-white">
      <div className="print:hidden"><AppTopbar /></div>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6 md:py-8 lg:px-8 print:m-0 print:max-w-none print:p-0">
        {children}
      </main>
      <div className="hidden md:block print:hidden">
        <AppFooter />
      </div>
      <div className="print:hidden"><AppMobileNav /></div>
    </div>
  );
}
