import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VerifiedBadge } from "./VerifiedBadge";

describe("VerifiedBadge Component", () => {
    it("renders verify icon and text correctly", () => {
        const { container } = render(<VerifiedBadge />);
        expect(screen.getByText("Verificado")).toBeInTheDocument();
        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass("text-success");
    });
});
