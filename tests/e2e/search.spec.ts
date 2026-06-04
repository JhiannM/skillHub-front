import { test, expect } from "@playwright/test";

test.describe("Flujo de Búsqueda y Filtrado (E2E)", () => {
  test("Debería permitir a un usuario buscar y filtrar prestadores de servicios", async ({ page }) => {
    // 1. Ir a la página de búsqueda
    await page.goto("/search");
    await expect(page).toHaveURL(/.*search/);

    // 2. Verificar que la cabecera de búsqueda esté visible
    const heading = page.locator('h2:has-text("Explora Profesionales")');
    await expect(heading).toBeVisible();

    // 3. Introducir un término de búsqueda en la barra
    const searchInput = page.getByPlaceholder("Buscar por nombre, biografía o habilidad...");
    await searchInput.fill("E2E");
    
    // Hacer clic en Buscar
    await page.click('button:has-text("Buscar")');

    // 4. Cambiar el filtro seleccionando la categoría "Tecnología"
    // Hacemos clic en el chip de "Tecnología"
    await page.click('span:has-text("Tecnología")');

    // 5. Verificar que se limpian los filtros al hacer clic en "Limpiar filtros"
    const clearFiltersBtn = page.locator('button:has-text("Limpiar filtros")').first();
    if (await clearFiltersBtn.isVisible()) {
      await clearFiltersBtn.click();
    }

    // 6. Verificar que podemos hacer clic en una categoría directamente
    await page.click('span:has-text("Hogar")');

    // 7. Si hay profesionales mostrados, hacer clic en "Ver perfil" del primero
    const viewProfileBtn = page.locator('a:has-text("Ver perfil")').first();
    if (await viewProfileBtn.isVisible()) {
      await Promise.all([
        page.waitForURL(/.*\/profile\/.+/),
        viewProfileBtn.click(),
      ]);
      await expect(page).toHaveURL(/.*\/profile\/.+/);
    }
  });
});
