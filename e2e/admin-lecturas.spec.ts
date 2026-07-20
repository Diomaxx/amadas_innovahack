import { test, expect } from "@playwright/test";
import { ADMIN, loginAs } from "./support/auth";
import { API_BASE, adminToken } from "./support/api";

/**
 * Admin · Lecturas — los listados/paneles que en Firebase eran realtime, ahora
 * servidos por la API: métricas del dashboard y la red de contactos.
 */
test.describe("Admin · Lecturas", () => {
  test("el dashboard muestra métricas reales del backend", async ({
    page,
    request,
  }) => {
    const stats = await (
      await request.get(`${API_BASE}/admin/stats`, {
        headers: { Authorization: `Bearer ${adminToken()}` },
      })
    ).json();
    expect(stats.totals.productos).toBeGreaterThan(0);

    await loginAs(page, ADMIN);
    await page.goto("/admin");

    // La barra de stats renderiza (labels) y muestra el número real de productos.
    await expect(page.getByText("TOTAL PRODUCTOS")).toBeVisible();
    await expect(page.getByText("CONTACTOS ACTIVOS")).toBeVisible();
    await expect(
      page.getByText(String(stats.totals.productos), { exact: false }).first(),
    ).toBeVisible();
  });

  test("contactos lista la red y abre el detalle", async ({ page }) => {
    await loginAs(page, ADMIN);
    await page.goto("/admin/contactos");

    const cards = page.getByRole("article");
    await expect(cards.first()).toBeVisible({ timeout: 15_000 });
    expect(await cards.count()).toBeGreaterThan(0);

    await page
      .getByRole("button", { name: /Ver detalle de/ })
      .first()
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});
