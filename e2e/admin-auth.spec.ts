import { test, expect } from "@playwright/test";
import { ADMIN, USER, loginAs } from "./support/auth";

/**
 * Guard de administración: el rol lo decide el backend (users.role vía
 * GET /auth/me), no el cliente. Prueba end-to-end del bypass de auth:
 * el token inyectado → sync en `users` → rol → UI.
 */
test.describe("Guard de admin", () => {
  test("sin sesión → redirige a /auth", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/auth/);
  });

  test("usuario autenticado no-admin → acceso restringido", async ({ page }) => {
    await loginAs(page, USER);
    await page.goto("/admin");
    await expect(page.getByText("Acceso restringido")).toBeVisible();
  });

  test("admin → entra al panel", async ({ page }) => {
    await loginAs(page, ADMIN);
    await page.goto("/admin");

    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByText("Acceso restringido")).toHaveCount(0);
    // El dashboard admin renderiza su encabezado.
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
