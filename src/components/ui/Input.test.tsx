import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input Component", () => {
    it("renders with a label and placeholders correctly", () => {
        render(<Input label="Username" placeholder="Enter username" />);
        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    });

    it("displays error messages and applies error border class", () => {
        render(<Input error="Field required" />);
        expect(screen.getByText("Field required")).toBeInTheDocument();
        const input = screen.getByRole("textbox");
        expect(input).toHaveClass("border-destructive");
    });

    it("applies fullWidth sizing correctly", () => {
        const { container } = render(<Input fullWidth />);
        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass("w-full");
        expect(wrapper).not.toHaveClass("max-w-md");
    });

    it("respects default max-width when fullWidth is false", () => {
        const { container } = render(<Input />);
        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass("max-w-md");
    });

    it("forwards the ref to the HTML input element", () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Input ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});
