import React from "react";
import { Star } from "lucide-react";

interface RatingDisplayProps {
    rating: number;
    reviews: number;
    size?: "sm" | "md" | "lg";
}

export function RatingDisplay({
    rating,
    reviews,
    size = "md",
}: RatingDisplayProps) {
    const sizeClasses = {
        sm: { star: 14, text: "text-sm" },
        md: { star: 16, text: "text-base" },
        lg: { star: 20, text: "text-lg" },
    };

    const currentSize = sizeClasses[size];

    return (
        <div className="inline-flex items-center gap-1.5">
            <Star className="text-secondary fill-secondary" size={currentSize.star} />
            <span className={`${currentSize.text} text-foreground`}>
                {rating.toFixed(1)}
            </span>
            <span className={`${currentSize.text} text-muted-foreground`}>
                ({reviews} reseñas)
            </span>
        </div>
    );
}
