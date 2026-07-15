"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase para el navegador. Solo se usa para autenticación:
 * el token de la sesión de Supabase (`access_token`) se envía como
 * `Authorization: Bearer <token>` a la API de NestJS, que es quien lo valida.
 *
 * El frontend NO consulta Postgres directamente; todo el acceso a datos pasa
 * por el backend (ver `@/lib/api/client`).
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan variables de entorno de Supabase (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY).",
  );
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Devuelve el access token de la sesión actual de Supabase, o `null` si no hay
 * sesión. Lo usa el API client para adjuntar el header de autorización.
 */
export async function getAccessToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}
