import React from "react";
import { cn } from "../../lib/utils";

export interface SegmentedControlOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

export interface SegmentedControlProps {
    options: SegmentedControlOption[];
    value: string;
    onChange: (value: string) => void;
    fullWidth?: boolean;
    className?: string;
}

export function SegmentedControl({
    options,
    value,
    onChange,
    fullWidth,
    className,
}: SegmentedControlProps) {
    return (
        <div
            className={cn(
                "flex p-1 bg-muted rounded-xl gap-1",
                fullWidth ? "w-full" : "inline-flex",
                className
            )}
        >
            {options.map((option) => {
                const isSelected = value === option.value;
                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-lg transition-all",
                            isSelected
                                ? "bg-card text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10"
                        )}
                    >
                        {option.icon}
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
