import React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, fullWidth, ...props }, ref) => {
        return (
            <div className={cn("w-full", !fullWidth && "max-w-md")}>
                {label && (
                    <label className="block text-sm text-foreground mb-1.5">
                        {label}
                    </label>
                )}
                <input
                    className={cn(
                        "flex w-full rounded-xl border-2 border-input bg-card px-4 py-2.5 text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm",
                        error &&
                            "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-destructive">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
