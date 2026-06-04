import { test, expect } from "@playwright/test";

test.describe("Flujo de Autenticación (E2E)", () => {
  const testEmail = `freelancer_${Date.now()}@example.com`;
  const testPassword = "Password123!";

  test("Debería registrar un nuevo freelancer y luego permitirle iniciar sesión", async ({ page }) => {
    // 1. Ir a la página de registro
    await page.goto("/register");
    await expect(page).toHaveTitle(/SkillHub/);

    // 2. Seleccionar el rol "Soy Independiente" (freelancer es la opción por defecto, pero igual hacemos clic)
    await page.click('button:has-text("Soy Independiente")');

    // 3. Rellenar los campos
    await page.fill('input[placeholder="Ej: María González"]', "Juan Pérez E2E");
    await page.fill('input[placeholder="tu@correo.com"]', testEmail);
    await page.fill('input[placeholder="Mínimo 8 caracteres"]', testPassword);

    // 4. Enviar el formulario de registro
    await Promise.all([
      page.waitForURL("**/login"), // Espera a ser redirigido a la página de login
      page.click('button:has-text("Crear mi cuenta")'),
    ]);

    // 5. Verificar que estamos en login
    await expect(page).toHaveURL(/.*login/);

    // 6. Rellenar credenciales en login
    await page.fill('input[placeholder="tu@correo.com"]', testEmail);
    await page.fill('input[placeholder="Ingresa tu contraseña"]', testPassword);

    // 7. Enviar formulario de login
    // El rol "PROVIDER" (freelancer) redirige a /provider-settings
    await Promise.all([
      page.waitForURL("**/provider-settings"),
      page.click('button[type="submit"]'),
    ]);

    // 8. Verificar que el inicio de sesión redirigió a la configuración del proveedor
    await expect(page).toHaveURL(/.*provider-settings/);
  });
});
