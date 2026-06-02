import React from "react";
import { CategoryType } from "./CategoryIcon";

interface SkillTagProps {
    skill: string;
    category?: CategoryType;
}

const categoryColors: Record<CategoryType, { bg: string; text: string }> = {
    tecnologia: { bg: "bg-primary/10", text: "text-primary" },
    hogar: { bg: "bg-secondary/10", text: "text-secondary" },
    salud: { bg: "bg-success/10", text: "text-success" },
    educacion: { bg: "bg-chart-4/10", text: "text-chart-4" },
};

export function SkillTag({ skill, category = "tecnologia" }: SkillTagProps) {
    // Normalizar categoría para evitar errores si viene en mayúsculas o es indefinida
    const normalizedCategory = (category?.toLowerCase() || "tecnologia") as CategoryType;
    const colors = categoryColors[normalizedCategory] || categoryColors.tecnologia;

    return (
        <span
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm ${colors.bg} ${colors.text}`}
        >
            {skill}
        </span>
    );
}
