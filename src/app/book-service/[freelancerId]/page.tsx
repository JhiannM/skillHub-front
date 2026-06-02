"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Navbar } from "../../../components/shared/Navbar";
import { Button } from "../../../components/ui/Button";
import { Avatar } from "../../../components/ui/Avatar";
import { useUser } from "../../../contexts/UserContext";
import api from "../../../lib/axios";
import {
    Calendar,
    Clock,
    MapPin,
    Monitor,
    DollarSign,
    FileText,
    Send,
    AlertCircle,
    Home,
} from "lucide-react";

export default function BookServicePage() {
    const { freelancerId } = useParams();
    const router = useRouter();
    const { isAuthenticated, login } = useUser();

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

    const [serviceType, setServiceType] = useState<"presencial" | "virtual">(
        "virtual"
    );
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        estimatedHours: "",
        address: "",
        city: "",
        additionalNotes: "",
    });

    // Mock freelancer data as fallback / initial state
    const [freelancer, setFreelancer] = useState({
        id: (freelancerId as string) || "1",
        name: "María González",
        hourlyRate: 50000,
        category: "Desarrollo Web",
        rating: 4.9,
    });

    // Fetch real freelancer details if it is a dynamic UUID
    useEffect(() => {
        async function loadFreelancer() {
            try {
                const currentId = (freelancerId as string) || "demo";
                if (currentId && currentId !== "demo" && currentId !== "1") {
                    const { data } = await api.get(`/providers/${currentId}`);
                    if (data.success && data.data) {
                        const providerData = data.data;
                        const categoryMapping: Record<string, string> = {
                            TECNOLOGIA: "Tecnología",
                            HOGAR: "Hogar",
                            SALUD: "Salud y Bienestar",
                            EDUCACION: "Educación",
                            MECANICA: "Mecánica",
                            CONSTRUCCION: "Construcción",
                            FONTANERIA: "Fontanería",
                            MANUFACTURA: "Manufactura",
                            EVENTOS: "Eventos",
                            TRANSPORTE: "Transporte",
                            CREATIVIDAD: "Creatividad",
                        };
                        const mappedCategory =
                            categoryMapping[providerData.main_category] ||
                            providerData.main_category ||
                            "Tecnología";

                        setFreelancer({
                            id: currentId,
                            name: providerData.name || "Prestador de Servicios",
                            hourlyRate: parseFloat(
                                providerData.base_price || "50000"
                            ),
                            category: mappedCategory,
                            rating: 4.9,
                        });
                    }
                }
            } catch (err) {
                console.error("Error loading freelancer in booking page", err);
            }
        }
        loadFreelancer();
    }, [freelancerId]);

    const calculateEstimatedPrice = () => {
        const hours = parseFloat(formData.estimatedHours) || 0;
        return hours * freelancer.hourlyRate;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Booking service:", { serviceType, ...formData });
        alert("¡Solicitud enviada! El prestador será notificado.");
        router.push("/my-services");
    };

    return (
        <div className="min-h-screen bg-background pb-12">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl text-foreground font-bold mb-2">
                        Solicitar Servicio
                    </h1>
                    <p className="text-muted-foreground">
                        Completa los detalles de tu solicitud
                    </p>
                </div>

                {/* Freelancer Info */}
                <div className="bg-card rounded-xl border border-border p-6 mb-6">
                    <div className="flex items-center gap-4">
                        <Avatar
                            size="lg"
                            fallback={freelancer.name.charAt(0)}
                        />
                        <div className="flex-1">
                            <h3 className="text-lg text-foreground font-bold mb-1">
                                {freelancer.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                                {freelancer.category}
                            </p>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-primary font-bold">
                                    ${freelancer.hourlyRate.toLocaleString()}{" "}
                                    COP/hora
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Service Type */}
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-foreground mb-4">
                            Tipo de Servicio
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setServiceType("virtual")}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                    serviceType === "virtual"
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50"
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            serviceType === "virtual"
                                                ? "bg-primary/10"
                                                : "bg-muted"
                                        }`}
                                    >
                                        <Monitor
                                            className={
                                                serviceType === "virtual"
                                                    ? "text-primary"
                                                    : "text-muted-foreground"
                                            }
                                            size={20}
                                        />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-foreground font-semibold">
                                            Virtual/Remoto
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Trabajo 100% online
                                        </p>
                                    </div>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setServiceType("presencial")}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                    serviceType === "presencial"
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50"
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            serviceType === "presencial"
                                                ? "bg-primary/10"
                                                : "bg-muted"
                                        }`}
                                    >
                                        <Home
                                            className={
                                                serviceType === "presencial"
                                                    ? "text-primary"
                                                    : "text-muted-foreground"
                                            }
                                            size={20}
                                        />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-foreground font-semibold">
                                            Presencial
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            A domicilio o punto pactado
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Service Details */}
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-foreground mb-4">
                            Detalles del Servicio
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Título del Servicio{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ej: Desarrollo de sitio web corporativo"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2.5 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Descripción Detallada{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <textarea
                                    placeholder="Describe lo que necesitas con el mayor detalle posible..."
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground resize-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                    required
                                    maxLength={1000}
                                />
                                <p className="text-xs text-muted-foreground mt-2">
                                    {formData.description.length}/1000
                                    caracteres
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <Calendar className="text-primary" size={20} />
                            Fecha y Hora
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Fecha Preferida{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            date: e.target.value,
                                        })
                                    }
                                    min={new Date().toISOString().split("T")[0]}
                                    className="w-full px-4 py-2.5 rounded-xl border-2 border-input bg-background text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Hora Preferida{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            time: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2.5 rounded-xl border-2 border-input bg-background text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location (Only for presencial) */}
                    {serviceType === "presencial" && (
                        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                <MapPin className="text-primary" size={20} />
                                Ubicación
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Ciudad{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <select
                                        value={formData.city}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                city: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-input bg-background text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                        required
                                    >
                                        <option value="">
                                            Selecciona una ciudad
                                        </option>
                                        <option value="bogota">Bogotá</option>
                                        <option value="medellin">
                                            Medellín
                                        </option>
                                        <option value="cali">Cali</option>
                                        <option value="barranquilla">
                                            Barranquilla
                                        </option>
                                        <option value="cartagena">
                                            Cartagena
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Dirección Completa{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Calle 45 #23-10, Chapinero"
                                        value={formData.address}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                address: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Estimated Hours */}
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <Clock className="text-primary" size={20} />
                            Duración Estimada
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Horas Estimadas (opcional)
                                </label>
                                <input
                                    type="number"
                                    min="0.5"
                                    step="0.5"
                                    placeholder="Ej: 4"
                                    value={formData.estimatedHours}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            estimatedHours: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2.5 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                />
                                <p className="text-xs text-muted-foreground mt-2">
                                    Si no estás seguro, déjalo vacío. El
                                    prestador podrá ajustar la estimación.
                                </p>
                            </div>

                            {formData.estimatedHours && (
                                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-muted-foreground font-semibold">
                                            Precio Estimado:
                                        </span>
                                        <span className="text-2xl text-primary font-bold">
                                            $
                                            {calculateEstimatedPrice().toLocaleString()}{" "}
                                            COP
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Basado en {formData.estimatedHours}{" "}
                                        hora(s) × $
                                        {freelancer.hourlyRate.toLocaleString()}{" "}
                                        COP/hora
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <FileText className="text-primary" size={20} />
                            Notas Adicionales
                        </h2>
                        <textarea
                            placeholder="Información adicional que el prestador deba saber..."
                            value={formData.additionalNotes}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    additionalNotes: e.target.value,
                                })
                            }
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground resize-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                        />
                    </div>

                    {/* Summary */}
                    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border-2 border-primary/20 p-6 shadow-sm">
                        <div className="flex items-start gap-3">
                            <AlertCircle
                                className="text-primary flex-shrink-0 mt-0.5"
                                size={20}
                            />
                            <div>
                                <h3 className="font-bold text-foreground mb-2">
                                    Resumen de tu Solicitud
                                </h3>
                                <ul className="space-y-1 text-sm text-muted-foreground font-medium">
                                    <li>
                                        • El prestador recibirá una notificación
                                        con tu solicitud
                                    </li>
                                    <li>
                                        • Podrá aceptar, rechazar o ajustar los
                                        detalles (precio, horas)
                                    </li>
                                    <li>
                                        • Recibirás una confirmación cuando
                                        responda
                                    </li>
                                    <li>
                                        • El precio final puede variar según la
                                        complejidad del trabajo
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            color="primary"
                            size="lg"
                            onClick={() => router.back()}
                            fullWidth
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="solid"
                            color="primary"
                            size="lg"
                            fullWidth
                        >
                            <Send size={20} className="mr-2" />
                            Enviar Solicitud
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
