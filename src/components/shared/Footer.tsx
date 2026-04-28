import React from "react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-border bg-card py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground text-lg">
                                    S
                                </span>
                            </div>
                            <span className="text-xl text-primary font-bold">
                                SkillHub
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Conectando talento local con oportunidades en
                            Colombia
                        </p>
                    </div>

                    <div>
                        <h4 className="text-foreground mb-3 font-semibold">
                            Plataforma
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Cómo funciona
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Categorías
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Precios
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-foreground mb-3 font-semibold">
                            Empresa
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Sobre nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-foreground mb-3 font-semibold">
                            Legal
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Términos de servicio
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Política de privacidad
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Seguridad
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>
                        © 2026 SkillHub. Todos los derechos reservados. Hecho en
                        Colombia 🇨🇴
                    </p>
                    <p className="mt-2">
                        <Link
                            href="/admin"
                            className="text-primary hover:underline text-xs"
                        >
                            Panel Administrativo
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
