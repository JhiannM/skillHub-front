import React from "react";
import { X } from "lucide-react";

export interface FilterChipProps {
    label: string;
    active?: boolean;
    onClick?: () => void;
    onRemove?: () => void;
    icon?: React.ReactNode;
}

export function FilterChip({
    label,
    active = false,
    onClick,
    onRemove,
    icon,
}: FilterChipProps) {
    return (
        <button
            onClick={onClick}
            className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200
        ${
            active
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"
        }
      `}
        >
            {icon && (
                <span className={active ? "text-primary-foreground" : ""}>
                    {icon}
                </span>
            )}
            <span>{label}</span>
            {active && onRemove && (
                <X
                    size={14}
                    className="hover:opacity-70"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                />
            )}
        </button>
    );
}
