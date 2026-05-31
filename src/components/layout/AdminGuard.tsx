"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { isAdmin } from "@/lib/firebase/admins";

/**
 * Protege el panel administrativo. Mientras Firebase resuelve la sesión muestra
 * un loader; si no hay usuario redirige a `/auth`; si hay usuario pero no es
 * administrador muestra un aviso de acceso denegado. Solo renderiza el panel
 * cuando el usuario es admin.
 *
 * La seguridad real de los datos la imponen las reglas de Firestore; este
 * guard es la barrera de UI.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const admin = isAdmin(user);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cv-cream-100">
        <Loader2 className="h-6 w-6 animate-spin text-cv-green-700" />
      </div>
    );
  }

  if (!user) {
    return null; // redirigiendo a /auth
  }

  if (!admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cv-cream-100 px-6">
        <div className="max-w-md rounded-2xl border border-cv-cream-300 bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F4E4DF]">
            <ShieldAlert className="h-6 w-6 text-[#A6452F]" />
          </div>
          <h1 className="text-lg font-bold text-cv-gray-900">
            Acceso restringido
          </h1>
          <p className="mt-2 text-sm text-cv-gray-500">
            Tu cuenta ({user.email}) no tiene permisos de administrador. Si crees
            que es un error, contacta al equipo de ALMA.
          </p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-5 rounded-lg bg-cv-green-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cv-green-800"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
