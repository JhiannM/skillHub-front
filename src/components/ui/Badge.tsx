import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?:
        | "solid"
        | "outline"
        | "primary"
        | "secondary"
        | "success"
        | "destructive";
}

export function Badge({ className, variant = "outline", ...props }: BadgeProps) {
    const baseStyles =
        "inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-semibold transition-colors";

    const variants = {
        solid: "border border-transparent bg-primary text-primary-foreground",
        outline: "border border-border text-foreground bg-muted/20",
        primary: "border border-primary/20 bg-primary/10 text-primary",
        secondary: "border border-secondary/20 bg-secondary/10 text-secondary",
        success: "border border-success/20 bg-success/10 text-success",
        destructive: "border border-destructive/20 bg-destructive/10 text-destructive",
    };

    return (
        <div
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        />
    );
}
