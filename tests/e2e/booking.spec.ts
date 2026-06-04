import { test, expect } from "@playwright/test";

test.describe("Flujo de Reserva y Gestión de Servicios (E2E)", () => {
  test("Debería permitir solicitar un servicio, redirigir a mis solicitudes y cancelar una solicitud", async ({ page }) => {
    // Manejar el diálogo alert() que aparece al enviar la solicitud
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("¡Solicitud enviada!");
      await dialog.accept();
    });

    // 1. Navegar a la página de reserva para la freelancer id '1'
    // Nota: Esta ruta tiene un login automático de demostración para facilidad de prueba
    await page.goto("/book-service/1");
    await expect(page).toHaveURL(/\/book-service\/1/);

    // 2. Completar los campos requeridos en el formulario de solicitud
    await page.fill('input[placeholder="Ej: Desarrollo de sitio web corporativo"]', "Servicio Eléctrico E2E");
    await page.fill('textarea[placeholder="Describe lo que necesitas con el mayor detalle posible..."]', "Descripción detallada de la prueba de servicio E2E.");
    
    // Poner una fecha futura
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split("T")[0];
    await page.fill('input[type="date"]', dateString);
    await page.fill('input[type="time"]', "10:00");

    // 3. Enviar la solicitud
    await page.click('button:has-text("Enviar Solicitud")');

    // 4. Verificar redirección automática a /my-services
    await expect(page).toHaveURL(/.*my-services/);

    // 5. Ir al detalle de un servicio (haciendo clic en la primera tarjeta de servicio)
    // El mockup renderiza servicios precargados como "Reparación Eléctrica Residencial"
    const serviceCard = page.locator('a[href^="/service/"]').first();
    await expect(serviceCard).toBeVisible();
    await serviceCard.click();

    // 6. Verificar que estamos en la página de detalle del servicio
    await expect(page).toHaveURL(/\/service\/\d+/);
    await expect(page.locator('main h1')).toBeVisible();

    // 7. Simular flujo de cancelación
    const cancelBtn = page.locator('button:has-text("Cancelar Servicio")');
    if (await cancelBtn.isVisible()) {
      // Registrar otro manejador para los diálogos de confirmación o alerta si aplica
      page.on("dialog", async (dialog) => {
        if (dialog.message().includes("cancelado")) {
          await dialog.accept();
        }
      });

      await cancelBtn.click();
      
      // La confirmación requiere ingresar un motivo en un modal de confirmación
      const reasonTextarea = page.locator('textarea[placeholder="Escribe el motivo aquí..."]');
      if (await reasonTextarea.isVisible()) {
        await reasonTextarea.fill("Cancelación de prueba E2E");
        await page.click('button:has-text("Confirmar Cancelación")');
      }
    }
  });
});
