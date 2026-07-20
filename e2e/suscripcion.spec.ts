import { test, expect } from "@playwright/test";
import { USER, loginAs } from "./support/auth";
import {
  API_BASE,
  clearSuscripciones,
  firstProducto,
  userToken,
} from "./support/api";

/**
 * Suscripción a alertas (lo que en el front reemplaza a "notificaciones"):
 * un usuario autenticado se suscribe a un producto desde su ficha y la
 * suscripción se persiste en el backend.
 */
test.describe("Catálogo · Suscripción a alertas", () => {
  test.afterEach(async ({ request }) => {
    await clearSuscripciones(request);
  });

  test("el usuario se suscribe a un producto y se persiste", async ({
    page,
    request,
  }) => {
    const producto = await firstProducto(request);

    await loginAs(page, USER);
    await page.goto(`/catalogo/${producto.id}`);

    await page.getByRole("button", { name: "Suscribirse" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText("Suscripción personalizada")).toBeVisible();

    await dialog.getByRole("button", { name: "ACTIVAR ALERTAS" }).click();
    await expect(
      dialog.getByRole("button", { name: "ALERTAS ACTIVADAS" }),
    ).toBeVisible({ timeout: 10_000 });

    // Verificación en el backend: la suscripción quedó registrada.
    const res = await request.get(`${API_BASE}/suscripciones`, {
      headers: { Authorization: `Bearer ${userToken()}` },
    });
    const body = await res.json();
    const subs = body.data ?? body;
    expect(subs.length).toBeGreaterThan(0);
    expect(String(subs[0].producto_id)).toBe(String(producto.id));
  });
});
