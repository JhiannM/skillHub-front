import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FilterChip } from "./FilterChip";

describe("FilterChip Component", () => {
    it("renders label and custom icon correctly", () => {
        render(<FilterChip label="Design" icon={<span data-testid="chip-icon">🎨</span>} />);
        expect(screen.getByText("Design")).toBeInTheDocument();
        expect(screen.getByTestId("chip-icon")).toBeInTheDocument();
    });

    it("applies normal styling when inactive", () => {
        const { container } = render(<FilterChip label="Inactive" active={false} />);
        expect(container.firstChild).toHaveClass("bg-muted text-muted-foreground");
        expect(container.querySelector("svg")).not.toBeInTheDocument();
    });

    it("applies active styling when active", () => {
        const { container } = render(<FilterChip label="Active" active={true} />);
        expect(container.firstChild).toHaveClass("bg-primary text-primary-foreground");
    });

    it("triggers onClick handler when clicked", () => {
        const handleClick = vi.fn();
        render(<FilterChip label="Clickable" onClick={handleClick} />);
        screen.getByRole("button").click();
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders X icon and calls onRemove when clicked (stopping propagation)", () => {
        const handleClick = vi.fn();
        const handleRemove = vi.fn();
        const { container } = render(
            <FilterChip
                label="Removable"
                active={true}
                onClick={handleClick}
                onRemove={handleRemove}
            />
        );

        const svgX = container.querySelector("svg");
        expect(svgX).toBeInTheDocument();

        // Click on the X icon
        if (svgX) {
            svgX.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        }

        expect(handleRemove).toHaveBeenCalledTimes(1);
        expect(handleClick).not.toHaveBeenCalled(); // Click should not bubble to button because of e.stopPropagation()
    });
});
