import React from "react";
import { cn } from "../../lib/utils";

export interface AvatarProps {
    src?: string;
    fallback: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function Avatar({ src, fallback, size = "md", className }: AvatarProps) {
    const sizes = {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
    };

    return (
        <div
            className={cn(
                "relative flex items-center justify-center rounded-full overflow-hidden bg-primary/10 text-primary font-bold shadow-sm shrink-0",
                sizes[size],
                className
            )}
        >
            {src ? (
                <img
                    src={src}
                    alt={fallback}
                    className="w-full h-full object-cover"
                />
            ) : (
                <span>{fallback.toUpperCase()}</span>
            )}
        </div>
    );
}
