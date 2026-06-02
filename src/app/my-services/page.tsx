"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ServiceCard } from "../../components/modules/ServiceCard";
import { Button } from "../../components/ui/Button";
import { useUser } from "../../contexts/UserContext";
import { ServiceStatus } from "../../components/ui/StatusStepper";
import {
    Filter,
    Search,
    Briefcase,
    TrendingUp,
    Clock,
    CheckCircle2,
} from "lucide-react";

export default function MyServicesPage() {
    const { userType, isAuthenticated, login } = useUser();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | ServiceStatus>(
        "all"
    );

    // Auto-login for demo with correct UserContext signature
    useEffect(() => {
        if (!isAuthenticated) {
            login(
                "demo-token",
                {
                    id: "demo-client-id",
                    name: "Cliente de Prueba",
                    email: "demo@skillhub.co",
                },
                "client"
            );
        }
    }, [isAuthenticated, login]);

    // Autoredirect to login if no token active
    useEffect(() => {
        const token =
            Cookies.get("auth-token") || localStorage.getItem("token");
        if (!token) {
            if (typeof window !== "undefined") {
                window.location.href = `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`;
            }
        }
    }, []);

    // Mock data - different for client vs freelancer
    const clientServices = [
        {
            id: "1",
            title: "Reparación Eléctrica Residencial",
            status: "in-progress" as ServiceStatus,
            otherPerson: {
                name: "Juan Ramírez",
                type: "freelancer" as const,
            },
            date: "2026-04-28",
            time: "10:00 AM",
            location: "A domicilio",
            price: "135,000",
            unreadMessages: 2,
        },
        {
            id: "2",
            title: "Clases de Inglés Personalizadas",
            status: "accepted" as ServiceStatus,
            otherPerson: {
                name: "Ana Martínez",
                type: "freelancer" as const,
            },
            date: "2026-04-30",
            time: "3:00 PM",
            location: "Remoto",
            price: "80,000",
            unreadMessages: 0,
        },
        {
            id: "3",
            title: "Desarrollo Aplicación Web",
            status: "requested" as ServiceStatus,
            otherPerson: {
                name: "María González",
                type: "freelancer" as const,
            },
            date: "2026-05-05",
            time: "9:00 AM",
            location: "Punto pactado",
            price: "450,000",
            unreadMessages: 1,
        },
        {
            id: "4",
            title: "Instalación de Aire Acondicionado",
            status: "completed" as ServiceStatus,
            otherPerson: {
                name: "Carlos López",
                type: "freelancer" as const,
            },
            date: "2026-04-15",
            time: "2:00 PM",
            location: "A domicilio",
            price: "200,000",
            unreadMessages: 0,
        },
    ];

    const freelancerServices = [
        {
            id: "5",
            title: "Desarrollo de Dashboard Administrativo",
            status: "in-progress" as ServiceStatus,
            otherPerson: {
                name: "Carlos Pérez",
                type: "client" as const,
            },
            date: "2026-04-26",
            time: "9:00 AM",
            location: "Remoto",
            price: "850,000",
            unreadMessages: 3,
        },
        {
            id: "6",
            title: "Sitio Web para Restaurante",
            status: "requested" as ServiceStatus,
            otherPerson: {
                name: "Laura Sánchez",
                type: "client" as const,
            },
            date: "2026-05-02",
            time: "11:00 AM",
            location: "Punto pactado",
            price: "650,000",
            unreadMessages: 1,
        },
        {
            id: "7",
            title: "App Móvil E-commerce",
            status: "accepted" as ServiceStatus,
            otherPerson: {
                name: "Roberto García",
                type: "client" as const,
            },
            date: "2026-05-10",
            time: "10:00 AM",
            location: "Remoto",
            price: "1,200,000",
            unreadMessages: 0,
        },
        {
            id: "8",
            title: "Landing Page Corporativa",
            status: "completed" as ServiceStatus,
            otherPerson: {
                name: "Diana Torres",
                type: "client" as const,
            },
            date: "2026-04-10",
            time: "3:00 PM",
            location: "Remoto",
            price: "350,000",
            unreadMessages: 0,
        },
    ];

    const services =
        userType === "client" ? clientServices : freelancerServices;

    const filteredServices = services.filter((service) => {
        const matchesSearch =
            service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.otherPerson.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        const matchesFilter =
            filterStatus === "all" || service.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: services.length,
        active: services.filter((s) => s.status === "in-progress").length,
        pending: services.filter((s) => s.status === "requested").length,
        completed: services.filter((s) => s.status === "completed").length,
    };

    return (
        <div className="min-h-screen bg-background pb-12">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl text-foreground font-bold mb-2">
                        {userType === "client"
                            ? "Mis Solicitudes"
                            : "Mis Servicios"}
                    </h1>
                    <p className="text-muted-foreground">
                        {userType === "client"
                            ? "Administra los servicios que has solicitado"
                            : "Gestiona tus servicios activos y solicitudes pendientes"}
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Briefcase className="text-primary" size={20} />
                            </div>
                            <div>
                                <p className="text-2xl text-foreground font-bold">
                                    {stats.total}
                                </p>
                                <p className="text-xs text-muted-foreground font-medium">
                                    Total
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-chart-4/10 rounded-lg flex items-center justify-center">
                                <TrendingUp
                                    className="text-chart-4"
                                    size={20}
                                />
                            </div>
                            <div>
                                <p className="text-2xl text-foreground font-bold">
                                    {stats.active}
                                </p>
                                <p className="text-xs text-muted-foreground font-medium">
                                    En Proceso
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                                <Clock className="text-secondary" size={20} />
                            </div>
                            <div>
                                <p className="text-2xl text-foreground font-bold">
                                    {stats.pending}
                                </p>
                                <p className="text-xs text-muted-foreground font-medium">
                                    Pendientes
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                                <CheckCircle2
                                    className="text-success"
                                    size={20}
                                />
                            </div>
                            <div>
                                <p className="text-2xl text-foreground font-bold">
                                    {stats.completed}
                                </p>
                                <p className="text-xs text-muted-foreground font-medium">
                                    Completados
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-card rounded-xl border border-border p-4 mb-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Buscar por servicio o persona..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={filterStatus}
                            onChange={(e) =>
                                setFilterStatus(e.target.value as "all" | ServiceStatus)
                            }
                            className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="requested">Pendientes</option>
                            <option value="accepted">Aceptados</option>
                            <option value="in-progress">En Proceso</option>
                            <option value="completed">Completados</option>
                            <option value="rejected">Rechazados</option>
                        </select>

                        <Button variant="outline" color="primary">
                            <Filter size={18} className="mr-1" />
                            Más filtros
                        </Button>
                    </div>
                </div>

                {/* Services Grid */}
                {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map((service) => (
                            <ServiceCard key={service.id} {...service} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-card rounded-xl border border-border p-12 text-center shadow-sm">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase
                                className="text-muted-foreground"
                                size={32}
                            />
                        </div>
                        <h3 className="text-xl text-foreground font-bold mb-2">
                            {searchQuery || filterStatus !== "all"
                                ? "No se encontraron resultados"
                                : userType === "client"
                                  ? "No tienes solicitudes"
                                  : "No tienes servicios activos"}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            {searchQuery || filterStatus !== "all"
                                ? "Intenta ajustar tus filtros de búsqueda"
                                : userType === "client"
                                  ? "Comienza buscando profesionales en nuestra plataforma"
                                  : "Las solicitudes de clientes aparecerán aquí"}
                        </p>
                        {!searchQuery &&
                            filterStatus === "all" &&
                            userType === "client" && (
                                <Button variant="solid" color="primary">
                                    <Search size={18} className="mr-2" />
                                    Explorar Servicios
                                </Button>
                            )}
                    </div>
                )}

                {/* Pagination */}
                {filteredServices.length > 0 && (
                    <div className="flex items-center justify-center gap-3 mt-8">
                        <Button variant="outline" color="primary">
                            Anterior
                        </Button>
                        <div className="flex items-center gap-2">
                            <button className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                1
                            </button>
                            <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-foreground font-semibold">
                                2
                            </button>
                            <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-foreground font-semibold">
                                3
                            </button>
                        </div>
                        <Button variant="outline" color="primary">
                            Siguiente
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
