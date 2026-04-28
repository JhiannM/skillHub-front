import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "solid" | "outline" | "ghost";
    color?: "primary" | "secondary" | "success" | "destructive";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
}

export function Button({
    className,
    variant = "solid",
    color = "primary",
    size = "md",
    fullWidth = false,
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        solid: {
            primary:
                "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
            secondary:
                "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            success: "bg-success text-success-foreground hover:bg-success/90",
            destructive:
                "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        },
        outline: {
            primary: "border-2 border-primary text-primary hover:bg-primary/10",
            secondary:
                "border-2 border-secondary text-secondary hover:bg-secondary/10",
            success: "border-2 border-success text-success hover:bg-success/10",
            destructive:
                "border-2 border-destructive text-destructive hover:bg-destructive/10",
        },
        ghost: {
            primary: "text-primary hover:bg-primary/10",
            secondary: "text-secondary hover:bg-secondary/10",
            success: "text-success hover:bg-success/10",
            destructive: "text-destructive hover:bg-destructive/10",
        },
    };

    const sizes = {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-8 text-lg",
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant][color],
                sizes[size],
                fullWidth && "w-full",
                className
            )}
            {...props}
        />
    );
}
