import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SegmentedControl } from "./SegmentedControl";

describe("SegmentedControl Component", () => {
    const options = [
        { value: "a", label: "Option A", icon: <span data-testid="icon-a">A</span> },
        { value: "b", label: "Option B" },
    ];

    it("renders options, labels, and icons correctly", () => {
        render(<SegmentedControl options={options} value="a" onChange={vi.fn()} />);
        expect(screen.getByText("Option A")).toBeInTheDocument();
        expect(screen.getByText("Option B")).toBeInTheDocument();
        expect(screen.getByTestId("icon-a")).toBeInTheDocument();
    });

    it("applies active styles to the selected option and inactive to others", () => {
        render(<SegmentedControl options={options} value="a" onChange={vi.fn()} />);
        const buttonA = screen.getByRole("button", { name: "A Option A" });
        const buttonB = screen.getByRole("button", { name: "Option B" });

        expect(buttonA).toHaveClass("bg-card text-foreground");
        expect(buttonB).toHaveClass("text-muted-foreground");
    });

    it("calls onChange callback when an option is clicked", () => {
        const handleChange = vi.fn();
        render(<SegmentedControl options={options} value="a" onChange={handleChange} />);
        
        screen.getByRole("button", { name: "Option B" }).click();
        expect(handleChange).toHaveBeenCalledWith("b");
    });

    it("applies fullWidth styles correctly", () => {
        const { container } = render(
            <SegmentedControl options={options} value="a" onChange={vi.fn()} fullWidth />
        );
        expect(container.firstChild).toHaveClass("w-full");
    });
});
