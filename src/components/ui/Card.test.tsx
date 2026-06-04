import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardBody } from "./Card";

describe("Card and CardBody Components", () => {
    it("renders children in Card correctly", () => {
        render(<Card>Card content</Card>);
        expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("renders children in CardBody correctly", () => {
        render(
            <Card>
                <CardBody>Body content</CardBody>
            </Card>
        );
        expect(screen.getByText("Body content")).toBeInTheDocument();
        expect(screen.getByText("Body content")).toHaveClass("p-6");
    });

    it("applies variant classes correctly", () => {
        const { rerender } = render(<Card variant="elevated">Elevated</Card>);
        expect(screen.getByText("Elevated")).toHaveClass("shadow-md");

        rerender(<Card variant="bordered">Bordered</Card>);
        expect(screen.getByText("Bordered")).toHaveClass("border-2");
    });

    it("applies hoverable classes correctly", () => {
        render(<Card hoverable>Hoverable</Card>);
        expect(screen.getByText("Hoverable")).toHaveClass("hover:shadow-lg");
    });

    it("passes through extra HTML attributes", () => {
        render(<Card data-testid="custom-card" id="unique-card">Card</Card>);
        const card = screen.getByTestId("custom-card");
        expect(card).toHaveAttribute("id", "unique-card");
    });
});
