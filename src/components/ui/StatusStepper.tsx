import React from "react";
import { Check } from "lucide-react";

export type ServiceStatus =
    | "requested"
    | "accepted"
    | "in-progress"
    | "completed"
    | "rejected";

interface Step {
    id: ServiceStatus;
    label: string;
}

interface StatusStepperProps {
    currentStatus: ServiceStatus;
}

const steps: Step[] = [
    { id: "requested", label: "Solicitado" },
    { id: "accepted", label: "Aceptado" },
    { id: "in-progress", label: "En Proceso" },
    { id: "completed", label: "Finalizado" },
];

export function StatusStepper({ currentStatus }: StatusStepperProps) {
    const getStepIndex = (status: ServiceStatus) => {
        return steps.findIndex((s) => s.id === status);
    };

    const currentIndex = getStepIndex(currentStatus);

    const getStepColor = (index: number) => {
        if (currentStatus === "rejected") {
            return index === 0 ? "destructive" : "muted";
        }
        if (index < currentIndex) return "success";
        if (index === currentIndex) return "primary";
        return "muted";
    };

    const getStepBg = (index: number) => {
        const color = getStepColor(index);
        if (color === "success") return "bg-success";
        if (color === "primary") return "bg-primary";
        if (color === "destructive") return "bg-destructive";
        return "bg-muted";
    };

    const getStepTextColor = (index: number) => {
        const color = getStepColor(index);
        if (color === "muted") return "text-muted-foreground";
        return "text-foreground";
    };

    if (currentStatus === "rejected") {
        return (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                <div className="flex items-center gap-2 justify-center">
                    <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">✕</span>
                    </div>
                    <span className="text-destructive font-semibold">Solicitud Rechazada</span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-2">
                {steps.map((step, index) => {
                    const isCompleted = index < currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                        <div
                            key={step.id}
                            className="flex-1 flex flex-col items-center relative"
                        >
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`absolute top-4 left-1/2 w-full h-0.5 -z-10 ${
                                        index < currentIndex
                                            ? "bg-success"
                                            : "bg-muted"
                                    }`}
                                />
                            )}

                            {/* Step Circle */}
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all ${getStepBg(
                                    index
                                )} ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                            >
                                {isCompleted ? (
                                    <Check size={16} className="text-white" />
                                ) : (
                                    <span className="text-white text-sm">
                                        {index + 1}
                                    </span>
                                )}
                            </div>

                            {/* Step Label */}
                            <span
                                className={`text-xs text-center font-medium ${getStepTextColor(
                                    index
                                )}`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
