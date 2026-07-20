import type { Page } from "@playwright/test";

/**
 * Inyección de sesión para los tests E2E (bypass de auth gated en el backend).
 *
 * En vez de loguear contra Supabase real, sembramos en localStorage una sesión
 * de supabase-js cuyo `access_token` es un token de test `e2e.<base64url(JSON)>`.
 * El front lo reenvía como `Authorization: Bearer` y el backend (con
 * `E2E_TEST_AUTH=true`) lo acepta. La storage key la fija el ref del
 * NEXT_PUBLIC_SUPABASE_URL de test (ver playwright.config.ts).
 */
const STORAGE_KEY = "sb-e2e-test-auth-token";

export interface Identity {
  id: string;
  email: string;
  fullName?: string;
}

// admin.e2e@alma.test está en ADMIN_EMAILS (playwright.config) → promovido a
// admin. Email propio de Playwright (distinto del de la suite jest) para no
// chocar por la constraint única de email en el contenedor Docker compartido.
export const ADMIN: Identity = {
  id: "00000000-0000-0000-0000-0000000000e1",
  email: "admin.e2e@alma.test",
  fullName: "Admin E2E",
};

export const USER: Identity = {
  id: "00000000-0000-0000-0000-0000000000e2",
  email: "user.e2e@alma.test",
  fullName: "Usuario E2E",
};

export function buildAccessToken(identity: Identity): string {
  const payload = {
    id: identity.id,
    email: identity.email,
    userMetadata: { full_name: identity.fullName },
  };
  return `e2e.${Buffer.from(JSON.stringify(payload)).toString("base64url")}`;
}

function buildSession(identity: Identity) {
  const nowSec = Math.floor(Date.now() / 1000);
  return {
    access_token: buildAccessToken(identity),
    token_type: "bearer",
    expires_in: 3600,
    expires_at: nowSec + 60 * 60 * 24 * 365, // 1 año → supabase-js no refresca
    refresh_token: "e2e-refresh-token",
    user: {
      id: identity.id,
      aud: "authenticated",
      role: "authenticated",
      email: identity.email,
      app_metadata: { provider: "email", providers: ["email"] },
      user_metadata: { full_name: identity.fullName },
      identities: [],
      created_at: "2020-01-01T00:00:00.000Z",
      updated_at: "2020-01-01T00:00:00.000Z",
    },
  };
}

/**
 * Autentica al `page` como `identity`, de forma determinista. Llamar antes de
 * `page.goto`.
 *
 * Dos capas:
 *  1. Siembra la sesión de supabase-js en localStorage → el `AuthContext` ve
 *     al usuario logueado (renderiza UI de sesión, no redirige a /auth).
 *  2. Intercepta las requests a `/api/**` e inyecta el header `Authorization`
 *     → el token SIEMPRE llega al backend, sin depender de cuándo supabase-js
 *     termina de propagar la sesión (evita el race en el que /auth/me sale sin
 *     token y el guard cree que no sos admin).
 */
export async function loginAs(page: Page, identity: Identity): Promise<void> {
  const session = JSON.stringify(buildSession(identity));
  await page.addInitScript(
    ([key, value]) => {
      window.localStorage.setItem(key, value);
    },
    [STORAGE_KEY, session] as const,
  );

  const bearer = buildAccessToken(identity);
  await page.route("**/api/**", async (route) => {
    const headers = {
      ...route.request().headers(),
      authorization: `Bearer ${bearer}`,
    };
    await route.continue({ headers });
  });
}
