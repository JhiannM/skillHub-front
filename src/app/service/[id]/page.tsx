"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../components/ui/Button";
import { Avatar } from "../../../components/ui/Avatar";
import {
    StatusStepper,
    ServiceStatus,
} from "../../../components/ui/StatusStepper";
import { ConfirmModal } from "../../../components/ui/ConfirmModal";
import { PriceEditModal } from "../../../components/ui/PriceEditModal";
import { useUser } from "../../../contexts/UserContext";
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Clock,
    DollarSign,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Play,
    Ban,
    Edit,
} from "lucide-react";

export default function ServiceDetailPage() {
    const params = useParams();
    const id =
        typeof params.id === "string"
            ? params.id
            : Array.isArray(params.id)
              ? params.id[0]
              : "";
    const router = useRouter();
    const { userType, isAuthenticated, login } = useUser();

    // Auto-login for demo purposes
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

    const [currentStatus, setCurrentStatus] =
        useState<ServiceStatus>("requested");

    // Price state
    const [finalPrice, setFinalPrice] = useState("135000");
    const [estimatedHours, setEstimatedHours] = useState("3");
    const [priceNote, setPriceNote] = useState(
        "El precio fue ajustado debido a la complejidad del trabajo encontrado en la inspección."
    );

    // Modal states
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showStartModal, setShowStartModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [showPriceEditModal, setShowPriceEditModal] = useState(false);

    // Action handlers
    const handleAccept = (reason?: string) => {
        console.log("Accepting service:", reason);
        setCurrentStatus("accepted");
        alert("¡Solicitud aceptada! El cliente ha sido notificado.");
    };

    const handleReject = (reason?: string) => {
        console.log("Rejecting service:", reason);
        setCurrentStatus("rejected");
        alert("Solicitud rechazada. El cliente ha sido notificado del motivo.");
    };

    const handleStart = (reason?: string) => {
        console.log("Starting service:", reason);
        setCurrentStatus("in-progress");
        alert("¡Servicio iniciado! Ambas partes han sido notificadas.");
    };

    const handleCancel = (reason?: string) => {
        console.log("Canceling service:", reason);
        alert(`Servicio cancelado. Motivo: ${reason}`);
        router.push("/my-services");
    };

    const handleComplete = (reason?: string) => {
        console.log("Completing service:", reason);
        setCurrentStatus("completed");
        alert("¡Servicio finalizado exitosamente! Gracias por usar SkillHub.");
    };

    const handlePriceSave = (data: {
        finalPrice: string;
        estimatedHours: string;
        notes: string;
    }) => {
        console.log("Saving price:", data);
        setFinalPrice(data.finalPrice);
        setEstimatedHours(data.estimatedHours);
        if (data.notes) {
            setPriceNote(data.notes);
        }
        alert("Precio actualizado. El cliente será notificado.");
    };

    // Mock data
    const service = {
        id: id || "1",
        title: "Reparación Eléctrica Residencial",
        status: currentStatus,
        client: {
            name: "Carlos Pérez",
            avatar: "",
        },
        freelancer: {
            name: "Juan Ramírez",
            avatar: "",
            servicesCompleted: 89,
        },
        date: "2026-04-28",
        time: "10:00 AM",
        location: "A domicilio",
        address: "Calle 45 #23-10, Bogotá",
        description:
            "Necesito reparar el sistema eléctrico de mi casa. Hay varios tomacorrientes que no funcionan y algunas luces que parpadean.",
        estimatedPrice: "120,000",
        finalPrice: finalPrice,
        priceNote: priceNote,
    };

    const getStatusConfig = (status: ServiceStatus) => {
        switch (status) {
            case "requested":
                return {
                    color: "bg-secondary/10 border-secondary/30",
                    textColor: "text-secondary",
                    icon: <AlertCircle size={20} />,
                    label: "Pendiente de Aceptación",
                };
            case "accepted":
                return {
                    color: "bg-primary/10 border-primary/30",
                    textColor: "text-primary",
                    icon: <CheckCircle2 size={20} />,
                    label: "Aceptado",
                };
            case "in-progress":
                return {
                    color: "bg-chart-4/10 border-chart-4/30",
                    textColor: "text-chart-4",
                    icon: <Clock size={20} />,
                    label: "En Proceso",
                };
            case "completed":
                return {
                    color: "bg-success/10 border-success/30",
                    textColor: "text-success",
                    icon: <CheckCircle2 size={20} />,
                    label: "Finalizado",
                };
            case "rejected":
                return {
                    color: "bg-destructive/10 border-destructive/30",
                    textColor: "text-destructive",
                    icon: <XCircle size={20} />,
                    label: "Rechazado",
                };
        }
    };

    const statusConfig = getStatusConfig(service.status);



    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-card border-b border-border">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <Link
                        href="/my-services"
                        className="flex items-center gap-2 text-primary hover:underline mb-4"
                    >
                        <ArrowLeft size={18} />
                        <span>Volver</span>
                    </Link>

                    <h1 className="text-2xl text-foreground mb-2">
                        {service.title}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Solicitud #{service.id}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                {/* Status Banner - RF-09 */}
                <div
                    className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 ${statusConfig.color}`}
                >
                    <span className={statusConfig.textColor}>
                        {statusConfig.icon}
                    </span>
                    <span className={`${statusConfig.textColor}`}>
                        {statusConfig.label}
                    </span>
                </div>

                {/* Status Stepper */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <h2 className="text-lg text-foreground mb-4">
                        Estado del Servicio
                    </h2>
                    <StatusStepper currentStatus={service.status} />
                </div>

                {/* Participants */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Client Card */}
                    <div className="bg-card rounded-xl border border-border p-4">
                        <p className="text-sm text-muted-foreground mb-3">
                            Cliente
                        </p>
                        <div className="flex items-center gap-3">
                            <Avatar size="md" fallback="CP" />
                            <div>
                                <p className="text-foreground">
                                    {service.client.name}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Freelancer Card */}
                    <div className="bg-card rounded-xl border border-border p-4">
                        <p className="text-sm text-muted-foreground mb-3">
                            Prestador
                        </p>
                        <div className="flex items-center gap-3">
                            <Avatar size="md" fallback="JR" />
                            <div>
                                <p className="text-foreground">
                                    {service.freelancer.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {service.freelancer.servicesCompleted}{" "}
                                    servicios
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Summary - HU-06 */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <h2 className="text-lg text-foreground mb-4">
                        Resumen del Acuerdo
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">
                                Descripción
                            </p>
                            <p className="text-foreground">
                                {service.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                                <Calendar
                                    className="text-primary mt-0.5"
                                    size={20}
                                />
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Fecha y Hora
                                    </p>
                                    <p className="text-foreground">
                                        {service.date}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {service.time}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                                <MapPin
                                    className="text-primary mt-0.5"
                                    size={20}
                                />
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Modalidad
                                    </p>
                                    <p className="text-foreground">
                                        {service.location}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {service.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing - RF-08 */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg text-foreground flex items-center gap-2">
                            <DollarSign className="text-primary" size={24} />
                            Gestión de Costos
                        </h2>
                        {userType === "freelancer" &&
                            currentStatus !== "completed" &&
                            currentStatus !== "rejected" && (
                                <Button
                                    variant="outline"
                                    color="primary"
                                    size="sm"
                                    onClick={() => setShowPriceEditModal(true)}
                                >
                                    <Edit size={16} />
                                    Editar Precio
                                </Button>
                            )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-card rounded-lg">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Cotización Inicial
                                </p>
                                <p className="text-muted-foreground line-through">
                                    ${service.estimatedPrice} COP
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-card rounded-lg border-2 border-primary">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">
                                    Precio Final
                                </p>
                                <p className="text-3xl text-primary">
                                    ${parseFloat(finalPrice).toLocaleString()}{" "}
                                    COP
                                </p>
                            </div>
                        </div>

                        {priceNote && (
                            <div className="flex items-start gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                                <AlertCircle
                                    className="text-primary flex-shrink-0 mt-0.5"
                                    size={16}
                                />
                                <p className="text-xs text-foreground">
                                    {priceNote}
                                </p>
                            </div>
                        )}

                        <p className="text-xs text-muted-foreground italic">
                            * El precio puede ser personalizado según la
                            complejidad del trabajo
                        </p>
                    </div>
                </div>

                {/* Action Panel - HU-11 / HU-12 */}

                {/* FREELANCER: Service Requested - Accept or Reject */}
                {service.status === "requested" &&
                    userType === "freelancer" && (
                        <div className="bg-card rounded-xl border border-border p-6">
                            <h2 className="text-lg text-foreground mb-4">
                                Gestionar Solicitud
                            </h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                Un cliente ha solicitado tus servicios. Revisa
                                los detalles y decide si aceptar o rechazar.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    variant="solid"
                                    color="success"
                                    size="lg"
                                    fullWidth
                                    onClick={() => setShowAcceptModal(true)}
                                >
                                    <CheckCircle2 size={20} />
                                    Aceptar Solicitud
                                </Button>
                                <Button
                                    variant="outline"
                                    color="destructive"
                                    size="lg"
                                    fullWidth
                                    onClick={() => setShowRejectModal(true)}
                                >
                                    <XCircle size={20} />
                                    Rechazar
                                </Button>
                            </div>
                        </div>
                    )}

                {/* FREELANCER: Service Accepted - Start or Cancel */}
                {service.status === "accepted" && userType === "freelancer" && (
                    <div className="bg-card rounded-xl border border-border p-6">
                        <h2 className="text-lg text-foreground mb-4">
                            Iniciar Servicio
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            La solicitud ha sido aceptada. Cuando estés listo
                            para comenzar el trabajo, marca el servicio como
                            iniciado.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                variant="solid"
                                color="primary"
                                size="lg"
                                fullWidth
                                onClick={() => setShowStartModal(true)}
                            >
                                <Play size={20} />
                                Iniciar Servicio
                            </Button>
                            <Button
                                variant="ghost"
                                color="destructive"
                                size="lg"
                                onClick={() => setShowCancelModal(true)}
                            >
                                <Ban size={18} />
                                Cancelar
                            </Button>
                        </div>
                    </div>
                )}

                {/* FREELANCER: Service In Progress */}
                {service.status === "in-progress" &&
                    userType === "freelancer" && (
                        <div className="bg-card rounded-xl border border-border p-6">
                            <h2 className="text-lg text-foreground mb-4">
                                Servicio en Progreso
                            </h2>
                            <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl mb-4">
                                <AlertCircle
                                    className="text-primary flex-shrink-0 mt-0.5"
                                    size={20}
                                />
                                <div>
                                    <p className="text-sm text-foreground mb-1">
                                        Trabajo en curso
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        El cliente deberá confirmar la
                                        finalización cuando el trabajo esté
                                        completo.
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                color="destructive"
                                size="md"
                                onClick={() => setShowCancelModal(true)}
                            >
                                <Ban size={18} />
                                Cancelar Servicio
                            </Button>
                        </div>
                    )}

                {/* CLIENT: Service Accepted or In Progress - Can Cancel */}
                {(service.status === "accepted" ||
                    service.status === "in-progress") &&
                    userType === "client" && (
                        <div className="bg-card rounded-xl border border-border p-6">
                            <h2 className="text-lg text-foreground mb-4">
                                {service.status === "accepted"
                                    ? "Servicio Confirmado"
                                    : "Servicio en Progreso"}
                            </h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                {service.status === "accepted"
                                    ? "El prestador ha aceptado tu solicitud. El servicio comenzará en la fecha acordada."
                                    : "El prestador está trabajando en tu solicitud. Podrás confirmar la finalización cuando esté completo."}
                            </p>

                            {service.status === "in-progress" && (
                                <Button
                                    variant="solid"
                                    color="success"
                                    size="lg"
                                    fullWidth
                                    onClick={() => setShowCompleteModal(true)}
                                    className="mb-3"
                                >
                                    <CheckCircle2 size={20} />
                                    Confirmar Finalización
                                </Button>
                            )}

                            <Button
                                variant="outline"
                                color="destructive"
                                size="md"
                                onClick={() => setShowCancelModal(true)}
                            >
                                <Ban size={18} />
                                Cancelar Servicio
                            </Button>
                        </div>
                    )}

                {/* CLIENT: Service Requested - Can Cancel */}
                {service.status === "requested" && userType === "client" && (
                    <div className="bg-card rounded-xl border border-border p-6">
                        <h2 className="text-lg text-foreground mb-4">
                            Solicitud Enviada
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Tu solicitud ha sido enviada al prestador. Recibirás
                            una notificación cuando sea aceptada o rechazada.
                        </p>
                        <Button
                            variant="outline"
                            color="destructive"
                            size="md"
                            onClick={() => setShowCancelModal(true)}
                        >
                            <Ban size={18} />
                            Cancelar Solicitud
                        </Button>
                    </div>
                )}

                {/* SERVICE COMPLETED */}
                {service.status === "completed" && (
                    <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl border-2 border-success/20 p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle2
                                    className="text-success"
                                    size={24}
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg text-foreground mb-2">
                                    ¡Servicio Completado!
                                </h2>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Este servicio ha sido finalizado
                                    exitosamente.
                                    {userType === "client" &&
                                        " Gracias por usar SkillHub."}
                                    {userType === "freelancer" &&
                                        " El pago ha sido procesado."}
                                </p>
                                <Link href={`/service/${service.id}/receipt`}>
                                    <Button
                                        variant="outline"
                                        color="success"
                                        size="sm"
                                    >
                                        Ver Comprobante
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* SERVICE REJECTED */}
                {service.status === "rejected" && (
                    <div className="bg-destructive/10 rounded-xl border-2 border-destructive/20 p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <XCircle
                                    className="text-destructive"
                                    size={24}
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg text-foreground mb-2">
                                    Solicitud Rechazada
                                </h2>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {userType === "client"
                                        ? "El prestador ha rechazado esta solicitud. Puedes buscar otros profesionales."
                                        : "Has rechazado esta solicitud. El cliente ha sido notificado."}
                                </p>
                                {userType === "client" && (
                                    <Link href="/search">
                                        <Button
                                            variant="outline"
                                            color="primary"
                                            size="sm"
                                        >
                                            Buscar Otros Prestadores
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Modals */}
            <ConfirmModal
                isOpen={showAcceptModal}
                onClose={() => setShowAcceptModal(false)}
                onConfirm={handleAccept}
                title="Aceptar Solicitud"
                description="¿Confirmas que deseas aceptar esta solicitud de servicio?"
                confirmText="Sí, Aceptar"
                confirmColor="success"
                icon={<CheckCircle2 className="text-success" size={24} />}
            />

            <ConfirmModal
                isOpen={showRejectModal}
                onClose={() => setShowRejectModal(false)}
                onConfirm={handleReject}
                title="Rechazar Solicitud"
                description="El cliente será notificado del rechazo. Por favor indica el motivo."
                confirmText="Rechazar"
                confirmColor="destructive"
                requiresReason={true}
                icon={<XCircle className="text-destructive" size={24} />}
            />

            <ConfirmModal
                isOpen={showStartModal}
                onClose={() => setShowStartModal(false)}
                onConfirm={handleStart}
                title="Iniciar Servicio"
                description="¿Estás listo para comenzar con este servicio? El cliente será notificado."
                confirmText="Iniciar Ahora"
                confirmColor="primary"
                icon={<Play className="text-primary" size={24} />}
            />

            <ConfirmModal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                onConfirm={handleCancel}
                title="Cancelar Servicio"
                description="Esta acción cancelará el servicio. Ambas partes serán notificadas. Indica el motivo de la cancelación."
                confirmText="Confirmar Cancelación"
                confirmColor="destructive"
                requiresReason={true}
                icon={<Ban className="text-destructive" size={24} />}
            />

            <ConfirmModal
                isOpen={showCompleteModal}
                onClose={() => setShowCompleteModal(false)}
                onConfirm={handleComplete}
                title="Confirmar Finalización"
                description="¿El trabajo ha sido completado satisfactoriamente?"
                confirmText="Sí, Finalizar"
                confirmColor="success"
                icon={<CheckCircle2 className="text-success" size={24} />}
            />

            <PriceEditModal
                isOpen={showPriceEditModal}
                onClose={() => setShowPriceEditModal(false)}
                onSave={handlePriceSave}
                currentPrice={finalPrice}
                currentHours={estimatedHours}
                hourlyRate={45000}
            />
        </div>
    );
}
