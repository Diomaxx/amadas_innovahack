import type { Metadata } from "next";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminGuard } from "@/components/layout/AdminGuard";

export const metadata: Metadata = {
  title: "Backoffice · ALMA",
  description: "Panel administrativo de la Fundación Amigos de la Naturaleza.",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col bg-cv-cream-100 lg:flex-row">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </AdminGuard>
  );
}
