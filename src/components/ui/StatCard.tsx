import React from "react";

interface StatCardProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    color?: "primary" | "secondary" | "success";
}

const colorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    success: "bg-success/10 text-success",
};

export function StatCard({
    icon,
    value,
    label,
    color = "primary",
}: StatCardProps) {
    return (
        <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-sm">
            <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClasses[color]}`}
            >
                {icon}
            </div>
            <div>
                <p className="text-2xl text-foreground font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
        </div>
    );
}
