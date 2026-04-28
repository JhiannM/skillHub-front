import React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "elevated" | "bordered";
    hoverable?: boolean;
}

export function Card({
    className,
    variant = "default",
    hoverable = false,
    ...props
}: CardProps) {
    const baseStyles =
        "bg-card text-card-foreground rounded-2xl overflow-hidden";

    const variants = {
        default: "",
        elevated: "shadow-md border border-border/50",
        bordered: "border-2 border-border",
    };

    return (
        <div
            className={cn(
                baseStyles,
                variants[variant],
                hoverable &&
                    "transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30",
                className
            )}
            {...props}
        />
    );
}

export function CardBody({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-6", className)} {...props} />;
}
