import { test, expect } from "@playwright/test";
import { ADMIN, loginAs } from "./support/auth";
import { API_BASE, adminToken, firstProducto } from "./support/api";

/**
 * Admin · Moderación de publicaciones — flujo que antes vivía en Firestore.
 * Se crea una publicación pendiente (vía API, para ser determinista), se abre
 * su detalle en el panel y se aprueba; debe salir de "Pendientes".
 */
const P = "[E2E-pub]";

test.describe("Admin · Moderación de publicaciones", () => {
  const createdIds: string[] = [];

  test.afterEach(async ({ request }) => {
    for (const id of createdIds.splice(0)) {
      await request.delete(`${API_BASE}/publicaciones/${id}`, {
        headers: { Authorization: `Bearer ${adminToken()}` },
      });
    }
  });

  test("aprobar una publicación pendiente la saca de la lista", async ({
    page,
    request,
  }) => {
    const producto = await firstProducto(request);
    const titulo = `${P} Cosecha de temporada ${Date.now()}`;

    // Semilla determinista: una publicación pendiente creada por API.
    const creada = await request.post(`${API_BASE}/publicaciones`, {
      headers: { Authorization: `Bearer ${adminToken()}` },
      data: {
        titulo,
        descripcion: "Publicación de prueba E2E",
        tipo: "Frutos",
        producto: producto.nombre,
        autor: `${P} Autor`,
        ubicacion: "Comarapa",
        // La card del panel formatea `fecha`; sin ella el render crashea.
        fecha: "2026-05-01",
        imagen:
          "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        ciclos: [{ inicio: "Ene", fin: "Mar" }],
      },
    });
    expect(creada.ok()).toBeTruthy();
    createdIds.push(String((await creada.json()).id));

    await loginAs(page, ADMIN);
    await page.goto("/admin/publicaciones");

    // La tarjeta pendiente aparece.
    const card = page.locator("article", { hasText: titulo });
    await expect(card).toBeVisible({ timeout: 15_000 });

    await card.getByRole("button", { name: /Click para ver detalles/ }).click();

    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: "Aprobar y Publicar" }).click();

    // Tras aprobar + refetch, ya no está en Pendientes.
    await expect(page.locator("article", { hasText: titulo })).toHaveCount(0, {
      timeout: 15_000,
    });

    // Verificación en el backend: quedó aprobada.
    const id = createdIds[0];
    const res = await request.get(`${API_BASE}/publicaciones/${id}`);
    expect((await res.json()).estado).toBe("aprobado");
  });
});
