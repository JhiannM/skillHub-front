import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar Component", () => {
    it("renders fallback text in uppercase when src is not provided", () => {
        render(<Avatar fallback="jd" />);
        expect(screen.getByText("JD")).toBeInTheDocument();
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("renders image when src is provided", () => {
        render(<Avatar src="https://example.com/avatar.jpg" fallback="jd" />);
        const img = screen.getByRole("img");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
        expect(img).toHaveAttribute("alt", "jd");
        expect(screen.queryByText("JD")).not.toBeInTheDocument();
    });

    it("applies size classes correctly", () => {
        const { container, rerender } = render(<Avatar fallback="jd" size="sm" />);
        expect(container.firstChild).toHaveClass("w-8 h-8");

        rerender(<Avatar fallback="jd" size="xl" />);
        expect(container.firstChild).toHaveClass("w-16 h-16");
    });
});
