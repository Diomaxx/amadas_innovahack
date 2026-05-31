"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

type EnlaceNotificacionProps = {
  visible: boolean;
  onClose: () => void;
};

export function EnlaceNotificacion({ visible, onClose }: EnlaceNotificacionProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed right-6 top-6 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-cv-cream-300 bg-white px-4 py-3.5 shadow-lg"
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "#dcfce7" }}
          >
            <CheckCircle className="h-5 w-5" style={{ color: "#22c55e" }} />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-cv-gray-900">¡Enlace copiado!</p>
            <p className="mt-0.5 text-sm text-cv-gray-600">
              Comparte este enlace con el productor para que complete su registro.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
