import React from "react";
import Link from "next/link";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { ServiceStatus } from "../ui/StatusStepper";
import {
    Calendar,
    MapPin,
    DollarSign,
    Clock,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";

interface ServiceCardProps {
    id: string;
    title: string;
    status: ServiceStatus;
    otherPerson: {
        name: string;
        avatar?: string;
        type: "client" | "freelancer";
    };
    date: string;
    time: string;
    location: string;
    price: string;
    unreadMessages?: number;
}

export function ServiceCard({
    id,
    title,
    status,
    otherPerson,
    date,
    time,
    location,
    price,
    unreadMessages = 0,
}: ServiceCardProps) {
    const getStatusConfig = (status: ServiceStatus) => {
        switch (status) {
            case "requested":
                return {
                    badge: <Badge variant="outline">Pendiente</Badge>,
                    color: "border-secondary/30",
                };
            case "accepted":
                return {
                    badge: <Badge variant="primary">Aceptado</Badge>,
                    color: "border-primary/30",
                };
            case "in-progress":
                return {
                    badge: (
                        <Badge
                            variant="outline"
                            className="border-chart-4 text-chart-4"
                        >
                            En Proceso
                        </Badge>
                    ),
                    color: "border-chart-4/30",
                };
            case "completed":
                return {
                    badge: <Badge variant="success">Completado</Badge>,
                    color: "border-success/30",
                };
            case "rejected":
                return {
                    badge: <Badge variant="destructive">Rechazado</Badge>,
                    color: "border-destructive/30",
                };
        }
    };

    const statusConfig = getStatusConfig(status);

    return (
        <Link href={`/service/${id}`} className="block">
            <div
                className={`bg-card rounded-xl border-2 ${statusConfig.color} p-4 hover:shadow-md transition-all duration-200 cursor-pointer group`}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors truncate">
                            {title}
                        </h3>
                        <div className="flex items-center gap-2">
                            {statusConfig.badge}
                            {unreadMessages > 0 && (
                                <div className="flex items-center gap-1 px-2 py-0.5 bg-secondary/10 rounded-full">
                                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                                    <span className="text-xs text-secondary font-medium">
                                        {unreadMessages} nuevos
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Other Person Info */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-muted/50 rounded-lg">
                    <Avatar
                        size="sm"
                        fallback={otherPerson.name.substring(0, 2)}
                        src={otherPerson.avatar}
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                            {otherPerson.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {otherPerson.type === "freelancer"
                                ? "Prestador"
                                : "Cliente"}
                        </p>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-start gap-2">
                        <Calendar
                            className="text-muted-foreground flex-shrink-0 mt-0.5"
                            size={16}
                        />
                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                                Fecha
                            </p>
                            <p className="text-sm text-foreground truncate font-medium">
                                {date}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Clock
                            className="text-muted-foreground flex-shrink-0 mt-0.5"
                            size={16}
                        />
                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                                Hora
                            </p>
                            <p className="text-sm text-foreground truncate font-medium">
                                {time}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                        <MapPin
                            className="text-muted-foreground flex-shrink-0 mt-0.5"
                            size={16}
                        />
                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                                Ubicación
                            </p>
                            <p className="text-sm text-foreground truncate font-medium">
                                {location}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <DollarSign
                            className="text-muted-foreground flex-shrink-0 mt-0.5"
                            size={16}
                        />
                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                                Precio
                            </p>
                            <p className="text-sm text-primary font-bold">
                                ${price} COP
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions for Pending */}
                {status === "requested" && (
                    <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-xs text-secondary font-semibold">
                            <AlertCircle size={14} />
                            <span>Acción requerida</span>
                        </div>
                    </div>
                )}

                {/* Completed Badge */}
                {status === "completed" && (
                    <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-xs text-success font-semibold">
                            <CheckCircle2 size={14} />
                            <span>Servicio finalizado</span>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
}
