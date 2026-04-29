import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("auth-token")?.value;
    const { pathname } = request.nextUrl;

    // Rutas que requieren autenticación
    const protectedRoutes = [
        "/provider-settings",
        "/settings",
        "/messages",
        "/my-services",
        "/profile/me",
    ];

    // Rutas exclusivas para usuarios no autenticados (invitados)
    const guestOnlyRoutes = ["/login", "/register"];

    // Verificar si es una ruta protegida
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Verificar si es una ruta de invitado
    const isGuestOnlyRoute = guestOnlyRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Si el usuario no tiene token y trata de acceder a una ruta protegida
    if (!token && isProtectedRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        // Opcionalmente guardar la url original para redireccionar después del login
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
    }

    // Si el usuario ya tiene token y trata de acceder a login/register
    if (token && isGuestOnlyRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/search"; // O al dashboard principal
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    // Configurar en qué rutas se ejecutará el middleware
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
