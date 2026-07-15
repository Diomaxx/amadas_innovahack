"use client";

import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./client";

/**
 * Autenticación con Supabase (reemplazo de `@/lib/firebase/auth`).
 * Misma superficie que la versión Firebase para que el swap en los
 * componentes sea mínimo: login email/Google, registro, logout y observer.
 *
 * El perfil del usuario ya NO se guarda aquí (antes: Firestore `users/{uid}`):
 * tras el signUp, los wizards llaman a `POST /auth/register` del backend
 * (ver `@/lib/api/endpoints`), que persiste el perfil en Postgres.
 */

export type { Session, User };

export async function registerWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  // Si Supabase exige confirmación de email, no hay sesión todavía y no
  // podríamos llamar al backend con Bearer. Para el flujo actual la
  // confirmación debe estar deshabilitada en el dashboard de Supabase.
  if (!data.session) {
    throw new SupabaseFlowError(
      "email_confirmation_required",
      "Tu cuenta fue creada pero requiere confirmación por correo. Revisa tu bandeja y luego inicia sesión.",
    );
  }

  return data;
}

export async function loginWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Observa los cambios de sesión (login/logout/refresh). Entrega el `User` de
 * Supabase o `null`, igual que hacía `observeAuthState` con Firebase.
 * Devuelve la función de unsubscribe.
 */
export function observeAuthState(callback: (user: User | null) => void) {
  // Estado inicial (getSession lee de storage, no hace red)
  void supabase.auth.getSession().then(({ data }) => {
    callback(data.session?.user ?? null);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}

/** Error de flujo propio (no de la API de Supabase). */
export class SupabaseFlowError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "SupabaseFlowError";
  }
}

/**
 * Traduce errores de Supabase Auth a mensajes en español.
 * Devuelve `null` cuando el usuario simplemente canceló.
 */
export function mensajeErrorSupabase(err: unknown): string | null {
  if (err instanceof SupabaseFlowError) {
    return err.message;
  }

  const code =
    err && typeof err === "object" && "code" in err
      ? String((err as { code: unknown }).code)
      : "";

  switch (code) {
    case "invalid_credentials":
      return "Correo o contraseña incorrectos.";
    case "user_already_exists":
    case "email_exists":
      return "Ya existe una cuenta con ese correo.";
    case "weak_password":
      return "La contraseña es muy débil (mínimo 6 caracteres).";
    case "email_not_confirmed":
      return "Debes confirmar tu correo antes de iniciar sesión.";
    case "over_request_rate_limit":
      return "Demasiados intentos. Espera un momento e intenta de nuevo.";
    case "validation_failed":
      return "Correo inválido. Revisa el formato.";
    default: {
      const message =
        err instanceof Error ? err.message : "Error de autenticación.";
      // Errores de red de fetch
      if (/fetch|network/i.test(message)) {
        return "Sin conexión. Revisa tu internet e intenta de nuevo.";
      }
      return "No se pudo completar la operación. Intenta nuevamente.";
    }
  }
}
