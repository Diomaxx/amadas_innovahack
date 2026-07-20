import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E de AMADAS/ALMA.
 *
 * Levanta DOS servidores, ambos aislados de producción:
 *  1. Backend NestJS contra el Postgres EFÍMERO de Docker (:55432) y con
 *     `E2E_TEST_AUTH=true` (acepta tokens de test "e2e.*"). El script
 *     `start:e2e` del backend hace `docker up + migrate + seed` antes de arrancar.
 *  2. Front Next.js apuntando a ese backend, con NEXT_PUBLIC_SUPABASE_URL falso
 *     (la sesión se inyecta en localStorage; no se toca Supabase real).
 *
 * Ningún dato de test toca la base de producción.
 */

const BACKEND_DIR = "../alma-platform-backend";

// URLs de test (locales, dummy). El ref "e2e-test" fija la storage key de
// supabase-js (sb-e2e-test-auth-token) que usa el fixture de auth.
const FRONT_ENV = {
  NEXT_PUBLIC_API_URL: "http://localhost:3001/api",
  NEXT_PUBLIC_SUPABASE_URL: "https://e2e-test.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "e2e-anon-key",
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "demo",
};

const BACKEND_ENV = {
  NODE_ENV: "test",
  PORT: "3001",
  FRONTEND_URL: "http://localhost:3000",
  DATABASE_URL:
    "postgresql://alma:alma@localhost:55432/alma_test?schema=public",
  DIRECT_URL: "postgresql://alma:alma@localhost:55432/alma_test?schema=public",
  SUPABASE_URL: "https://e2e-test.supabase.co",
  SUPABASE_ANON_KEY: "e2e-anon-key",
  SUPABASE_SERVICE_ROLE_KEY: "e2e-service-role-key",
  SUPABASE_JWT_AUDIENCE: "authenticated",
  ADMIN_EMAILS: "admin.e2e@alma.test",
  E2E_TEST_AUTH: "true",
};

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: [
    {
      command: `npm --prefix ${BACKEND_DIR} run start:e2e`,
      url: "http://localhost:3001/api/health",
      timeout: 180_000,
      reuseExistingServer: true,
      env: BACKEND_ENV,
    },
    {
      command: "npm run dev",
      url: "http://localhost:3000",
      timeout: 180_000,
      reuseExistingServer: true,
      env: FRONT_ENV,
    },
  ],
});
