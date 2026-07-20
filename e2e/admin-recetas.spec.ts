import { test, expect } from "@playwright/test";
import { ADMIN, loginAs } from "./support/auth";
import { deleteRecetasByMarca } from "./support/api";

/**
 * Admin · Recetas — el flujo que antes escribía en Firestore, ahora contra el
 * backend propio: crear una receta desde el panel (modal → API → refetch) y
 * verla aparecer en la grilla.
 */
const MARCA = "[E2E-receta]";

test.describe("Admin · Recetas", () => {
  test.afterEach(async ({ request }) => {
    await deleteRecetasByMarca(request, MARCA);
  });

  test("crea una receta desde el panel y aparece en la grilla", async ({
    page,
  }) => {
    const nombre = `${MARCA} Sopa de maní ${Date.now()}`;

    await loginAs(page, ADMIN);
    await page.goto("/admin/recetas");

    await page.getByRole("button", { name: "Nueva Receta" }).click();

    const modal = page.getByRole("dialog");
    await expect(
      modal.getByRole("heading", { name: "Nueva Receta" }),
    ).toBeVisible();

    await modal.getByPlaceholder(/Albóndigas de yuca/).fill(nombre);
    await modal.getByPlaceholder(/Chef María Rodríguez/).fill("Chef E2E");
    await modal
      .getByPlaceholder(/Breve descripción o contexto/)
      .fill("Contexto de prueba E2E");
    // Categoría ya trae "Elaboración salada" por defecto → no hay que tocarla.
    await modal.getByPlaceholder(/carne molida/).fill("maní\npapa\nsal");
    await modal.getByPlaceholder(/Mezclar los ingredientes/).fill(
      "Licuar el maní\nHervir y servir",
    );

    await modal.getByRole("button", { name: "Crear receta" }).click();

    // La grilla se refresca desde el backend y muestra la nueva receta.
    await expect(page.getByText(nombre)).toBeVisible({ timeout: 15_000 });
  });
});
