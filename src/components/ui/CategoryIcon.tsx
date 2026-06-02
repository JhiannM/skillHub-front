import React from "react";
import {
    Code2,
    Home,
    Heart,
    GraduationCap,
    Wrench,
    PenTool,
    LucideIcon,
} from "lucide-react";

export type CategoryType =
    | "tecnologia"
    | "hogar"
    | "salud"
    | "educacion"
    | "reparaciones"
    | "diseno"
    | string;

interface CategoryIconProps {
    category: CategoryType;
    size?: number;
    className?: string;
}

const categoryIcons: Record<string, LucideIcon> = {
    tecnologia: Code2,
    hogar: Home,
    salud: Heart,
    educacion: GraduationCap,
    reparaciones: Wrench,
    diseno: PenTool,
};

const categoryColors: Record<string, string> = {
    tecnologia: "text-primary",
    hogar: "text-secondary",
    salud: "text-success",
    educacion: "text-chart-4",
    reparaciones: "text-primary",
    diseno: "text-secondary",
};

const categoryBackgrounds: Record<string, string> = {
    tecnologia: "bg-primary/10",
    hogar: "bg-secondary/10",
    salud: "bg-success/10",
    educacion: "bg-chart-4/10",
    reparaciones: "bg-primary/10",
    diseno: "bg-secondary/10",
};

export function CategoryIcon({
    category,
    size = 24,
    className = "",
}: CategoryIconProps) {
    const cat = category?.toLowerCase() || "tecnologia";
    const Icon = categoryIcons[cat] || Code2;
    const colorClass = categoryColors[cat] || "text-primary";
    const bgClass = categoryBackgrounds[cat] || "bg-primary/10";

    return (
        <div
            className={`inline-flex items-center justify-center p-3 rounded-lg ${bgClass} ${className}`}
        >
            <Icon size={size} className={colorClass} />
        </div>
    );
}

interface CategoryBadgeProps {
    category: CategoryType;
    label: string;
}

export function CategoryBadge({ category, label }: CategoryBadgeProps) {
    const cat = category?.toLowerCase() || "tecnologia";
    const colorClass = categoryColors[cat] || "text-primary";
    const bgClass = categoryBackgrounds[cat] || "bg-primary/10";

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium ${bgClass} ${colorClass}`}
        >
            {label}
        </span>
    );
}
