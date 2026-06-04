import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCard } from "./StatCard";

describe("StatCard Component", () => {
    it("renders icon, value, and label correctly", () => {
        render(
            <StatCard
                icon={<span data-testid="stat-icon">📊</span>}
                value="4,500"
                label="Active Projects"
            />
        );
        expect(screen.getByTestId("stat-icon")).toBeInTheDocument();
        expect(screen.getByText("4,500")).toBeInTheDocument();
        expect(screen.getByText("Active Projects")).toBeInTheDocument();
    });

    it("applies variant color classes correctly", () => {
        const { container, rerender } = render(
            <StatCard
                icon={<span>📊</span>}
                value="10"
                label="Label"
                color="secondary"
            />
        );
        const iconWrapper = container.querySelector(".rounded-lg");
        expect(iconWrapper).toHaveClass("bg-secondary/10 text-secondary");

        rerender(
            <StatCard
                icon={<span>📊</span>}
                value="10"
                label="Label"
                color="success"
            />
        );
        const iconWrapperUpdated = container.querySelector(".rounded-lg");
        expect(iconWrapperUpdated).toHaveClass("bg-success/10 text-success");
    });
});
