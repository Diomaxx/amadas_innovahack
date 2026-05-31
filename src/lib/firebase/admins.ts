import type { User } from "firebase/auth";

/**
 * Lista de emails con rol de administrador, leída de la variable de entorno
 * `NEXT_PUBLIC_ADMIN_EMAILS` (separados por coma). Se normaliza a minúsculas
 * para comparar sin distinguir mayúsculas.
 *
 * Nota: esta lista vive en el cliente, por lo que sirve para gatear la UI del
 * panel. La seguridad real (impedir escrituras de no-admins) la imponen las
 * reglas de Firestore en `firestore.rules`, que replican esta lista.
 */
export const ADMIN_EMAILS: string[] = (
  process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? ""
)
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

/** ¿El email pertenece a la lista de administradores? */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/** ¿El usuario autenticado es administrador? */
export function isAdmin(user: User | null | undefined): boolean {
  return isAdminEmail(user?.email ?? null);
}
