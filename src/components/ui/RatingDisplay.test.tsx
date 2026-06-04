import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RatingDisplay } from "./RatingDisplay";

describe("RatingDisplay Component", () => {
    it("renders rating and reviews count formatted properly", () => {
        render(<RatingDisplay rating={4.67} reviews={18} />);
        expect(screen.getByText("4.7")).toBeInTheDocument(); // 4.67 rounded to 1 decimal place is 4.7
        expect(screen.getByText("(18 reseñas)")).toBeInTheDocument();
    });

    it("applies sizing text classes correctly", () => {
        const { rerender } = render(<RatingDisplay rating={5} reviews={5} size="sm" />);
        expect(screen.getByText("5.0")).toHaveClass("text-sm");

        rerender(<RatingDisplay rating={5} reviews={5} size="lg" />);
        expect(screen.getByText("5.0")).toHaveClass("text-lg");
    });
});
