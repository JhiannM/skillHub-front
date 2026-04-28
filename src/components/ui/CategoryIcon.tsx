import React from "react";
import { Laptop, Home, Heart, BookOpen, Wrench, PenTool } from "lucide-react";
import { cn } from "../../lib/utils";

export type CategoryType =
    | "tecnologia"
    | "hogar"
    | "salud"
    | "educacion"
    | "reparaciones"
    | "diseno"
    | string;

export interface CategoryIconProps {
    category: CategoryType;
    size?: number;
    className?: string;
}

export function CategoryIcon({
    category,
    size = 24,
    className,
}: CategoryIconProps) {
    const icons: Record<string, React.ReactNode> = {
        tecnologia: <Laptop size={size} />,
        hogar: <Home size={size} />,
        salud: <Heart size={size} />,
        educacion: <BookOpen size={size} />,
        reparaciones: <Wrench size={size} />,
        diseno: <PenTool size={size} />,
    };

    return (
        <div className={cn("text-primary", className)}>
            {icons[category] || <Laptop size={size} />}
        </div>
    );
}
