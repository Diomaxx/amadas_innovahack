"use client";

import { useCallback, useState } from "react";
import { UserPlus } from "lucide-react";
import { EnlaceNotificacion } from "./EnlaceNotificacion";

export function ContactosHeader() {
  const [notifVisible, setNotifVisible] = useState(false);

  const handleInvitar = useCallback(() => {
    setNotifVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setNotifVisible(false);
  }, []);

  return (
    <>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-cv-green-900">
            Gestión de Contactos
          </h1>
          <p className="mt-1.5 text-sm text-cv-gray-600">
            Administra productores, asociaciones, tiendas y proveedores.
          </p>
        </div>

        <button
          type="button"
          onClick={handleInvitar}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-cv-cream-300 bg-white px-4 py-2.5 text-sm font-medium text-cv-gray-700 shadow-sm transition-colors hover:bg-cv-cream-100"
        >
          <UserPlus className="h-4 w-4 text-cv-gray-500" />
          Invitar Productor
        </button>
      </header>

      <EnlaceNotificacion visible={notifVisible} onClose={handleClose} />
    </>
  );
}
