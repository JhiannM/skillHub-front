import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
    it("renders children correctly", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("handles click events", () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        screen.getByRole("button", { name: "Click me" }).click();
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("disables button when disabled prop is true", () => {
        const handleClick = vi.fn();
        render(<Button disabled onClick={handleClick}>Click me</Button>);
        const button = screen.getByRole("button", { name: "Click me" });
        expect(button).toBeDisabled();
        button.click();
        expect(handleClick).not.toHaveBeenCalled();
    });

    it("applies class for fullWidth", () => {
        render(<Button fullWidth>Full Width</Button>);
        expect(screen.getByRole("button", { name: "Full Width" })).toHaveClass("w-full");
    });

    it("applies variant classes correctly", () => {
        const { rerender } = render(<Button variant="solid" color="primary">Solid Primary</Button>);
        expect(screen.getByRole("button")).toHaveClass("bg-primary");

        rerender(<Button variant="outline" color="secondary">Outline Secondary</Button>);
        expect(screen.getByRole("button")).toHaveClass("border-secondary");

        rerender(<Button variant="ghost" color="destructive">Ghost Destructive</Button>);
        expect(screen.getByRole("button")).toHaveClass("text-destructive");
    });
});
