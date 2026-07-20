import { test, expect } from "@playwright/test";

/**
 * Flujos públicos (sin sesión): prueban el camino front → backend → DB de test.
 * Los datos vienen del seed, servidos por la API real.
 */
test.describe("Público (sin sesión)", () => {
  test("el catálogo carga productos desde la API", async ({ page }) => {
    await page.goto("/catalogo");

    await expect(
      page.getByRole("heading", { name: "Frutos silvestres de Bolivia" }),
    ).toBeVisible();

    // Cada especie es un <article>, renderizado con datos del backend.
    await expect(page.locator("article").first()).toBeVisible();
    expect(await page.locator("article").count()).toBeGreaterThan(0);
  });

  test("el listado de recetas responde", async ({ page }) => {
    const res = await page.goto("/recetas");
    expect(res?.status()).toBeLessThan(400);
    // Hay contenido (no crashea la ruta).
    await expect(page.locator("body")).toBeVisible();
  });
});
