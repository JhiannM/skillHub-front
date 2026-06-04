import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge Component", () => {
    it("renders children correctly", () => {
        render(<Badge>Test Badge</Badge>);
        expect(screen.getByText("Test Badge")).toBeInTheDocument();
    });

    it("applies variant classes correctly", () => {
        const { rerender } = render(<Badge variant="solid">Solid</Badge>);
        expect(screen.getByText("Solid")).toHaveClass("bg-primary text-primary-foreground");

        rerender(<Badge variant="outline">Outline</Badge>);
        expect(screen.getByText("Outline")).toHaveClass("border-border bg-muted/20");

        rerender(<Badge variant="success">Success</Badge>);
        expect(screen.getByText("Success")).toHaveClass("bg-success/10 text-success");
    });
});
