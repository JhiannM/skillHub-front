import React from "react";
import Link from "next/link";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CategoryIcon } from "../components/ui/CategoryIcon";
import {
    Search,
    Briefcase,
    Shield,
    Star,
    TrendingUp,
    Users,
} from "lucide-react";

export default function HomePage() {
    const categories = [
        {
            id: "tecnologia",
            label: "Tecnología",
            icon: "tecnologia" as const,
            count: "2,340",
        },
        { id: "hogar", label: "Hogar", icon: "hogar" as const, count: "1,890" },
        { id: "salud", label: "Salud", icon: "salud" as const, count: "1,120" },
        {
            id: "educacion",
            label: "Educación",
            icon: "educacion" as const,
            count: "980",
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-20 md:py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                                Conecta con el{" "}
                                <span className="text-primary">
                                    mejor talento
                                </span>{" "}
                                local
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                La plataforma colombiana que une profesionales
                                independientes con clientes. Confiable, segura y
                                diseñada para la economía colaborativa.
                            </p>

                            {/* Search Bar */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <div className="flex-1 relative">
                                    <Search
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        size={20}
                                    />
                                    <input
                                        type="text"
                                        placeholder="¿Qué servicio necesitas?"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-input bg-card text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none shadow-sm"
                                    />
                                </div>
                                <Link
                                    href="/search"
                                    className="w-full sm:w-auto"
                                >
                                    <Button
                                        variant="solid"
                                        color="primary"
                                        size="lg"
                                        className="w-full"
                                    >
                                        Buscar
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <span>Popular:</span>
                                <button className="text-primary hover:underline font-medium">
                                    Desarrollo Web
                                </button>
                                <button className="text-primary hover:underline font-medium">
                                    Diseño Gráfico
                                </button>
                                <button className="text-primary hover:underline font-medium">
                                    Electricista
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card variant="elevated" className="p-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                    <Users className="text-primary" size={24} />
                                </div>
                                <p className="text-3xl font-bold text-foreground mb-1">
                                    +12,000
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Profesionales
                                </p>
                            </Card>
                            <Card variant="elevated" className="p-6">
                                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                                    <Briefcase
                                        className="text-secondary"
                                        size={24}
                                    />
                                </div>
                                <p className="text-3xl font-bold text-foreground mb-1">
                                    45,000+
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Proyectos
                                </p>
                            </Card>
                            <Card variant="elevated" className="p-6">
                                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-4">
                                    <Star className="text-success" size={24} />
                                </div>
                                <p className="text-3xl font-bold text-foreground mb-1">
                                    4.8
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Calificación
                                </p>
                            </Card>
                            <Card variant="elevated" className="p-6">
                                <div className="w-12 h-12 bg-chart-4/10 rounded-xl flex items-center justify-center mb-4 text-yellow-500">
                                    <TrendingUp size={24} />
                                </div>
                                <p className="text-3xl font-bold text-foreground mb-1">
                                    98%
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Satisfacción
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-foreground mb-3">
                            Explora por categoría
                        </h3>
                        <p className="text-lg text-muted-foreground">
                            Encuentra profesionales en diferentes áreas
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Card
                                key={category.id}
                                variant="elevated"
                                hoverable
                                className="p-6 text-center"
                            >
                                <div className="flex justify-center mb-4">
                                    <CategoryIcon
                                        category={category.icon}
                                        size={32}
                                    />
                                </div>
                                <h4 className="text-lg font-semibold text-foreground mb-2">
                                    {category.label}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    {category.count} profesionales
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 px-4 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-foreground mb-3">
                            ¿Cómo funciona?
                        </h3>
                        <p className="text-lg text-muted-foreground">
                            Tres pasos para conectar con los mejores
                            profesionales
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-primary">
                                    1
                                </span>
                            </div>
                            <h4 className="text-xl font-bold text-foreground mb-2">
                                Busca
                            </h4>
                            <p className="text-muted-foreground">
                                Explora perfiles verificados y encuentra el
                                profesional perfecto para tu proyecto
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-secondary">
                                    2
                                </span>
                            </div>
                            <h4 className="text-xl font-bold text-foreground mb-2">
                                Contacta
                            </h4>
                            <p className="text-muted-foreground">
                                Comunícate directamente, solicita cotizaciones y
                                revisa disponibilidad
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-success">
                                    3
                                </span>
                            </div>
                            <h4 className="text-xl font-bold text-foreground mb-2">
                                Contrata
                            </h4>
                            <p className="text-muted-foreground">
                                Acuerda términos, paga de forma segura y
                                completa tu proyecto con éxito
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="max-w-4xl mx-auto text-center">
                    <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        ¿Listo para empezar?
                    </h3>
                    <p className="text-xl text-muted-foreground mb-8">
                        Únete a miles de profesionales y clientes que confían en
                        SkillHub
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/register">
                            <Button variant="solid" color="primary" size="lg">
                                Crear cuenta gratis
                            </Button>
                        </Link>
                        <Link href="/profile/demo">
                            <Button variant="outline" color="primary" size="lg">
                                Ver perfil de ejemplo
                            </Button>
                        </Link>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 sm:pl-4 border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0">
                            <Link href="/service/demo">
                                <Button
                                    variant="ghost"
                                    color="primary"
                                    size="md"
                                >
                                    Ver solicitud
                                </Button>
                            </Link>
                            <Link href="/service/demo/rating">
                                <Button
                                    variant="ghost"
                                    color="secondary"
                                    size="md"
                                >
                                    Calificar servicio
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
