"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { Avatar } from "../../../components/ui/Avatar";
import { Button } from "../../../components/ui/Button";
import { VerifiedBadge } from "../../../components/ui/VerifiedBadge";
import { RatingDisplay } from "../../../components/ui/RatingDisplay";
import { SkillTag } from "../../../components/ui/SkillTag";
import { StatCard } from "../../../components/ui/StatCard";
import { AvailabilityCalendar } from "../../../components/ui/AvailabilityCalendar";
import { CategoryBadge } from "../../../components/ui/CategoryIcon";
import api from "../../../lib/axios";
import { useUser } from "../../../contexts/UserContext";
import {
    MapPin,
    Briefcase,
    Award,
    DollarSign,
    MessageCircle,
    Share2,
    Clock,
} from "lucide-react";

// Mock data for public/search providers
const mockFreelancers: Record<string, any> = {
    demo: {
        name: "María González Pérez",
        avatar: "",
        location: "Bogotá, Colombia",
        category: "tecnologia",
        categoryLabel: "Tecnología",
        verified: true,
        servicesCompleted: 127,
        rating: 4.8,
        reviews: 89,
        hourlyRate: "50,000",
        bio: "Desarrolladora web con más de 5 años de experiencia creando aplicaciones modernas y escalables. Especializada en React, Node.js y arquitecturas cloud. Apasionada por crear soluciones que impacten positivamente a las personas.",
        skills: [
            "React",
            "Node.js",
            "TypeScript",
            "Next.js",
            "PostgreSQL",
            "AWS",
            "UI/UX Design",
            "Git",
        ],
        availability: [
            { day: "Lunes", dayShort: "L", available: true, hours: "9:00 AM - 6:00 PM" },
            { day: "Martes", dayShort: "M", available: true, hours: "9:00 AM - 6:00 PM" },
            { day: "Miércoles", dayShort: "X", available: true, hours: "9:00 AM - 6:00 PM" },
            { day: "Jueves", dayShort: "J", available: true, hours: "9:00 AM - 6:00 PM" },
            { day: "Viernes", dayShort: "V", available: true, hours: "9:00 AM - 3:00 PM" },
            { day: "Sábado", dayShort: "S", available: false },
            { day: "Domingo", dayShort: "D", available: false },
        ],
        responseTime: "2 horas",
        completionRate: "98%",
    },
    "1": {
        name: "María González",
        location: "Bogotá, Colombia",
        category: "tecnologia",
        categoryLabel: "Tecnología",
        verified: true,
        servicesCompleted: 145,
        rating: 4.9,
        reviews: 127,
        hourlyRate: "50,000",
        bio: "Desarrolladora web full-stack con 5+ años de experiencia. Especializada en aplicaciones modernas y escalables.",
        skills: ["React", "Node.js", "TypeScript", "UI/UX"],
        availability: [
            { day: "Lunes", dayShort: "L", available: true, hours: "9:00 AM - 6:00 PM" },
            { day: "Martes", dayShort: "M", available: true, hours: "9:00 AM - 6:00 PM" },
            { day: "Miércoles", dayShort: "X", available: true, hours: "9:00 AM - 6:00 PM" },
            { day: "Jueves", dayShort: "J", available: true, hours: "9:00 AM - 6:00 PM" },
            { day: "Viernes", dayShort: "V", available: true, hours: "9:00 AM - 3:00 PM" },
            { day: "Sábado", dayShort: "S", available: false },
            { day: "Domingo", dayShort: "D", available: false },
        ],
        responseTime: "2 horas",
        completionRate: "98%",
    },
    "2": {
        name: "Carlos Ramírez",
        location: "Medellín, Colombia",
        category: "hogar",
        categoryLabel: "Hogar",
        verified: true,
        servicesCompleted: 92,
        rating: 5.0,
        reviews: 89,
        hourlyRate: "35,000",
        bio: "Electricista certificado con 10 años de experiencia. Trabajo residencial y comercial.",
        skills: ["Electricidad", "Instalaciones", "Reparaciones"],
        availability: [
            { day: "Lunes", dayShort: "L", available: true, hours: "8:00 AM - 6:00 PM" },
            { day: "Martes", dayShort: "M", available: true, hours: "8:00 AM - 6:00 PM" },
            { day: "Miércoles", dayShort: "X", available: true, hours: "8:00 AM - 6:00 PM" },
            { day: "Jueves", dayShort: "J", available: true, hours: "8:00 AM - 6:00 PM" },
            { day: "Viernes", dayShort: "V", available: true, hours: "8:00 AM - 6:00 PM" },
            { day: "Sábado", dayShort: "S", available: true, hours: "8:00 AM - 1:00 PM" },
            { day: "Domingo", dayShort: "D", available: false },
        ],
        responseTime: "1 hora",
        completionRate: "100%",
    },
    "3": {
        name: "Ana Martínez",
        location: "Bogotá, Colombia",
        category: "educacion",
        categoryLabel: "Educación",
        verified: true,
        servicesCompleted: 203,
        rating: 4.8,
        reviews: 156,
        hourlyRate: "40,000",
        bio: "Profesora de inglés certificada. Clases personalizadas para todos los niveles.",
        skills: ["Inglés", "TOEFL", "Business English"],
        availability: [
            { day: "Lunes", dayShort: "L", available: true, hours: "7:00 AM - 9:00 PM" },
            { day: "Martes", dayShort: "M", available: true, hours: "7:00 AM - 9:00 PM" },
            { day: "Miércoles", dayShort: "X", available: true, hours: "7:00 AM - 9:00 PM" },
            { day: "Jueves", dayShort: "J", available: true, hours: "7:00 AM - 9:00 PM" },
            { day: "Viernes", dayShort: "V", available: true, hours: "7:00 AM - 9:00 PM" },
            { day: "Sábado", dayShort: "S", available: true, hours: "8:00 AM - 2:00 PM" },
            { day: "Domingo", dayShort: "D", available: false },
        ],
        responseTime: "3 horas",
        completionRate: "99%",
    },
    "4": {
        name: "Jorge López",
        location: "Cali, Colombia",
        category: "tecnologia",
        categoryLabel: "Tecnología",
        verified: false,
        servicesCompleted: 71,
        rating: 4.7,
        reviews: 64,
        hourlyRate: "45,000",
        bio: "Desarrollador backend especializado en APIs y sistemas robustos.",
        skills: ["Python", "Django", "PostgreSQL"],
        availability: [
            { day: "Lunes", dayShort: "L", available: true, hours: "9:00 AM - 6:00 PM" },
            { day: "Martes", dayShort: "M", available: true, hours: "9:00 AM - 6:00 PM" },
            { day: "Miércoles", dayShort: "X", available: true, hours: "9:00 AM - 6:00 PM" },
            { day: "Jueves", dayShort: "J", available: true, hours: "9:00 AM - 6:00 PM" },
            { day: "Viernes", dayShort: "V", available: true, hours: "9:00 AM - 6:00 PM" },
            { day: "Sábado", dayShort: "S", available: false },
            { day: "Domingo", dayShort: "D", available: false },
        ],
        responseTime: "2 horas",
        completionRate: "95%",
    },
    "5": {
        name: "Laura Sánchez",
        location: "Medellín, Colombia",
        category: "salud",
        categoryLabel: "Salud",
        verified: true,
        servicesCompleted: 128,
        rating: 4.9,
        reviews: 112,
        hourlyRate: "60,000",
        bio: "Fisioterapeuta especializada en recuperación deportiva y lesiones.",
        skills: ["Fisioterapia", "Rehabilitación", "Deportiva"],
        availability: [
            { day: "Lunes", dayShort: "L", available: true, hours: "8:00 AM - 8:00 PM" },
            { day: "Martes", dayShort: "M", available: true, hours: "8:00 AM - 8:00 PM" },
            { day: "Miércoles", dayShort: "X", available: true, hours: "8:00 AM - 8:00 PM" },
            { day: "Jueves", dayShort: "J", available: true, hours: "8:00 AM - 8:00 PM" },
            { day: "Viernes", dayShort: "V", available: true, hours: "8:00 AM - 8:00 PM" },
            { day: "Sábado", dayShort: "S", available: true, hours: "8:00 AM - 1:00 PM" },
            { day: "Domingo", dayShort: "D", available: false },
        ],
        responseTime: "1 hora",
        completionRate: "98%",
    },
    "6": {
        name: "Pedro Gómez",
        location: "Bogotá, Colombia",
        category: "hogar",
        categoryLabel: "Hogar",
        verified: false,
        servicesCompleted: 47,
        rating: 4.6,
        reviews: 43,
        hourlyRate: "30,000",
        bio: "Plomero profesional con experiencia en residencias y edificios.",
        skills: ["Plomería", "Instalaciones", "Mantenimiento"],
        availability: [
            { day: "Lunes", dayShort: "L", available: true, hours: "8:00 AM - 5:00 PM" },
            { day: "Martes", dayShort: "M", available: true, hours: "8:00 AM - 5:00 PM" },
            { day: "Miércoles", dayShort: "X", available: true, hours: "8:00 AM - 5:00 PM" },
            { day: "Jueves", dayShort: "J", available: true, hours: "8:00 AM - 5:00 PM" },
            { day: "Viernes", dayShort: "V", available: true, hours: "8:00 AM - 5:00 PM" },
            { day: "Sábado", dayShort: "S", available: true, hours: "8:00 AM - 12:00 PM" },
            { day: "Domingo", dayShort: "D", available: false },
        ],
        responseTime: "4 horas",
        completionRate: "94%",
    },
};

export default function FreelancerProfile() {
    const { id } = useParams();
    const { user, userType, isAuthenticated } = useUser();
    const [freelancer, setFreelancer] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    const isActionDisabled = isOwnProfile || userType === "freelancer";

    useEffect(() => {
        async function loadProfile() {
            try {
                setLoading(true);

                // Autoredirect to login synchronously if no token found
                const token = Cookies.get("auth-token") || localStorage.getItem("token");
                if (!token) {
                    if (typeof window !== "undefined") {
                        window.location.href = `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`;
                    }
                    return;
                }

                const viewingOwn =
                    id === "me" ||
                    (isAuthenticated &&
                        userType === "freelancer" &&
                        id === user?.id);
                setIsOwnProfile(viewingOwn);

                let profileData = null;
                let profileName = "";

                if (viewingOwn) {
                    const { data } = await api.get("/providers/me/profile");
                    if (data.success && data.data) {
                        profileData = data.data;
                        profileName = user?.name || "Mi Perfil Profesional";
                    }
                } else {
                    const currentId = (id as string) || "demo";
                    if (mockFreelancers[currentId]) {
                        setFreelancer(mockFreelancers[currentId]);
                        setLoading(false);
                        return;
                    } else {
                        // Fetch public profile dynamic by ID from backend API
                        const { data } = await api.get(`/providers/${currentId}`);
                        if (data.success && data.data) {
                            profileData = data.data;
                            profileName = data.data.name || "Perfil Profesional";
                        }
                    }
                }

                if (profileData) {
                    const scheduleMap: Record<string, any> =
                        profileData.schedule || {};
                    const dayShorts: Record<string, string> = {
                        Lunes: "L",
                        Martes: "M",
                        Miercoles: "X",
                        Miércoles: "X",
                        Jueves: "J",
                        Viernes: "V",
                        Sabado: "S",
                        Sábado: "S",
                        Domingo: "D",
                    };
                    const daysOrder = [
                        "Lunes",
                        "Martes",
                        "Miercoles",
                        "Jueves",
                        "Viernes",
                        "Sabado",
                        "Domingo",
                    ];
                    const formattedAvailability = daysOrder.map((dayKey) => {
                        const dayData = scheduleMap[dayKey] || {
                            enabled: false,
                            inicio: "09:00",
                            fin: "18:00",
                        };
                        const displayDay =
                            dayKey === "Miercoles"
                                ? "Miércoles"
                                : dayKey === "Sabado"
                                  ? "Sábado"
                                  : dayKey;
                        return {
                            day: displayDay,
                            dayShort: dayShorts[dayKey] || dayKey.charAt(0),
                            available: !!dayData.enabled,
                            hours: dayData.enabled
                                ? `${dayData.inicio} - ${dayData.fin}`
                                : undefined,
                        };
                    });

                    const categoryMapping: Record<
                        string,
                        { label: string; key: string }
                    > = {
                        TECNOLOGIA: { label: "Tecnología", key: "tecnologia" },
                        HOGAR: { label: "Hogar", key: "hogar" },
                        SALUD: { label: "Salud", key: "salud" },
                        EDUCACION: { label: "Educación", key: "educacion" },
                        MECANICA: { label: "Mecánica", key: "tecnologia" },
                        CONSTRUCCION: { label: "Construcción", key: "hogar" },
                        FONTANERIA: { label: "Fontanería", key: "hogar" },
                    };
                    const mappedCat = categoryMapping[
                        profileData.main_category
                    ] || {
                        label: profileData.main_category || "Tecnología",
                        key: "tecnologia",
                    };

                    setFreelancer({
                        name: profileName,
                        avatar: "",
                        location: profileData.city
                            ? `${profileData.city}, Colombia`
                            : "Colombia",
                        category: mappedCat.key,
                        categoryLabel: mappedCat.label,
                        verified: true,
                        servicesCompleted: profileData.services_done || 0,
                        rating: 5.0,
                        reviews: 0,
                        hourlyRate: parseFloat(
                            profileData.base_price || "0"
                        ).toLocaleString("es-CO"),
                        bio: profileData.bio || "Sin biografía profesional aún.",
                        skills: profileData.skills || [],
                        availability: formattedAvailability,
                    });
                } else {
                    setFreelancer(mockFreelancers.demo);
                }
            } catch (err) {
                console.error("Error loading freelancer profile", err);
                setFreelancer(mockFreelancers.demo);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, [id, isAuthenticated, user, userType]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-primary font-bold animate-pulse text-lg">
                    Cargando perfil del profesional...
                </div>
            </div>
        );
    }

    if (!freelancer) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                    Profesional no encontrado
                </h1>
                <p className="text-muted-foreground mb-6">
                    El perfil solicitado no existe o no se encuentra disponible.
                </p>
                <Link href="/search">
                    <Button variant="solid" color="primary">
                        Volver a la búsqueda
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-8">
            {/* Header with cover-like gradient */}
            <div className="relative bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/10 pt-20 pb-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/search"
                        className="mb-4 text-primary hover:underline flex items-center gap-1 font-medium"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                        >
                            <path
                                d="M10 12L6 8l4-4"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Volver a la búsqueda
                    </Link>
                </div>
            </div>

            {/* Own Profile Preview Banner */}
            {isOwnProfile && (
                <div className="max-w-4xl mx-auto px-4 -mt-10 mb-6 relative z-10">
                    <div className="bg-primary/10 border border-primary/20 text-primary px-4 py-3 rounded-2xl text-center text-sm font-semibold shadow-sm">
                        Esta es la vista previa de tu perfil público. Los botones
                        de acción (contacto y contratación) están deshabilitados
                        para ti.
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`max-w-4xl mx-auto px-4 ${isOwnProfile ? "" : "-mt-16"}`}>
                {/* Profile Card */}
                <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden mb-6">
                    {/* Profile Header */}
                    <div className="p-6 pb-4">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <Avatar
                                    size="xl"
                                    fallback={freelancer.name.charAt(0)}
                                    className="w-24 h-24 md:w-32 md:h-32 shadow-lg ring-4 ring-background"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                                                {freelancer.name}
                                            </h1>
                                            {freelancer.verified && (
                                                <VerifiedBadge />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                            <MapPin size={16} />
                                            <span className="text-sm">
                                                {freelancer.location}
                                            </span>
                                        </div>
                                        <CategoryBadge
                                            category={freelancer.category}
                                            label={freelancer.categoryLabel}
                                        />
                                    </div>

                                    {/* Action Buttons - Desktop */}
                                    <div className="hidden sm:flex gap-2">
                                        <Button
                                            variant="ghost"
                                            color="primary"
                                            size="sm"
                                        >
                                            <Share2 size={18} />
                                        </Button>
                                    </div>
                                </div>

                                {/* Rating & Stats */}
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <RatingDisplay
                                        rating={freelancer.rating}
                                        reviews={freelancer.reviews}
                                    />
                                    <div className="h-4 w-px bg-border" />
                                    <div className="flex items-center gap-1.5 text-sm">
                                        <Briefcase
                                            size={16}
                                            className="text-muted-foreground"
                                        />
                                        <span className="text-foreground font-semibold">
                                            {freelancer.servicesCompleted}
                                        </span>
                                        <span className="text-muted-foreground">
                                            servicios realizados
                                        </span>
                                    </div>
                                </div>

                                {/* Bio */}
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {freelancer.bio}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons - Mobile */}
                    <div className="sm:hidden px-6 pb-6 flex gap-3">
                        {isActionDisabled ? (
                            <Button
                                variant="solid"
                                color="primary"
                                size="md"
                                fullWidth
                                disabled
                            >
                                <MessageCircle size={18} />
                                Contactar
                            </Button>
                        ) : (
                            <Link href={`/book-service/${id || "1"}`} className="w-full">
                                <Button
                                    variant="solid"
                                    color="primary"
                                    size="md"
                                    fullWidth
                                >
                                    <MessageCircle size={18} />
                                    Contactar
                                </Button>
                            </Link>
                        )}
                        <Button variant="outline" color="primary" size="md">
                            <Share2 size={18} />
                        </Button>
                    </div>

                    {/* Quick Stats */}
                    <div className="px-6 pb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <StatCard
                                icon={<DollarSign size={20} />}
                                value={`$${freelancer.hourlyRate}`}
                                label="COP / hora"
                                color="secondary"
                            />
                        </div>
                    </div>
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden sm:flex gap-3 mb-6">
                    {isActionDisabled ? (
                        <Button
                            variant="solid"
                            color="primary"
                            size="lg"
                            className="flex-1"
                            disabled
                        >
                            <MessageCircle size={20} />
                            Contactar
                        </Button>
                    ) : (
                        <Link href={`/book-service/${id || "1"}`} className="flex-1 flex">
                            <Button
                                variant="solid"
                                color="primary"
                                size="lg"
                                className="w-full"
                            >
                                <MessageCircle size={20} />
                                Contactar
                            </Button>
                        </Link>
                    )}
                    {isActionDisabled ? (
                        <Button
                            variant="outline"
                            color="primary"
                            size="lg"
                            className="flex-1"
                            disabled
                        >
                            <Award size={20} />
                            Ver Disponibilidad
                        </Button>
                    ) : (
                        <Link href={`/book-service/${id || "1"}`} className="flex-1 flex">
                            <Button
                                variant="outline"
                                color="primary"
                                size="lg"
                                className="w-full"
                            >
                                <Award size={20} />
                                Ver Disponibilidad
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Skills Section */}
                <div className="bg-card rounded-2xl shadow-md border border-border p-6 mb-6">
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Award className="text-primary" size={24} />
                        Mis Habilidades
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {freelancer.skills.map((skill: string) => (
                            <SkillTag
                                key={skill}
                                skill={skill}
                                category={freelancer.category}
                            />
                        ))}
                    </div>
                </div>

                {/* Availability Section */}
                <div className="bg-card rounded-2xl shadow-md border border-border p-6 mb-6">
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Clock className="text-primary" size={24} />
                        Disponibilidad
                    </h2>
                    <AvailabilityCalendar slots={freelancer.availability} />
                    <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-xl">
                        <p className="text-sm text-success text-center font-medium">
                            Disponible para comenzar proyectos esta semana
                        </p>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl shadow-md border border-border p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-foreground mb-1">
                                Tarifa Base
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Precio puede variar según la complejidad del
                                proyecto
                            </p>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-primary">
                                ${freelancer.hourlyRate}
                            </span>
                            <span className="text-lg text-muted-foreground font-medium">
                                COP / hora
                            </span>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                        {isActionDisabled ? (
                            <Button
                                variant="solid"
                                color="secondary"
                                size="lg"
                                fullWidth
                                disabled
                            >
                                <MessageCircle size={20} />
                                Solicitar Servicio
                            </Button>
                        ) : (
                            <Link href={`/book-service/${id || "1"}`}>
                                <Button
                                    variant="solid"
                                    color="secondary"
                                    size="lg"
                                    fullWidth
                                >
                                    <MessageCircle size={20} />
                                    Solicitar Servicio
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Sticky Bottom Bar */}
                <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg z-50">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Tarifa</p>
                          <p className="text-lg font-bold text-primary">
                              ${freelancer.hourlyRate} COP/h
                          </p>
                        </div>
                        {isActionDisabled ? (
                            <Button
                                variant="solid"
                                color="primary"
                                size="md"
                                disabled
                            >
                                <MessageCircle size={18} />
                                Contactar
                            </Button>
                        ) : (
                            <Link href={`/book-service/${id || "1"}`}>
                                <Button
                                    variant="solid"
                                    color="primary"
                                    size="md"
                                >
                                    <MessageCircle size={18} />
                                    Contactar
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
