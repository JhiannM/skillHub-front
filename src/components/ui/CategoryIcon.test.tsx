import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CategoryIcon, CategoryBadge } from "./CategoryIcon";

describe("CategoryIcon and CategoryBadge Components", () => {
    it("renders CategoryIcon with correct classes for technology", () => {
        const { container } = render(<CategoryIcon category="tecnologia" />);
        const wrapper = container.querySelector("div");
        expect(wrapper).toHaveClass("bg-primary/10");
        const svg = container.querySelector("svg");
        expect(svg).toHaveClass("text-primary");
    });

    it("renders CategoryIcon with fallback when category is unknown", () => {
        const { container } = render(<CategoryIcon category="unknown" />);
        const wrapper = container.querySelector("div");
        expect(wrapper).toHaveClass("bg-primary/10");
        const svg = container.querySelector("svg");
        expect(svg).toHaveClass("text-primary");
    });

    it("renders CategoryBadge with correct classes and label", () => {
        const { getByText } = render(<CategoryBadge category="hogar" label="Home Services" />);
        const badge = getByText("Home Services");
        expect(badge).toHaveClass("bg-secondary/10 text-secondary");
    });

    it("uses default category when value is empty in CategoryBadge", () => {
        const { getByText } = render(<CategoryBadge category="" label="Empty category label" />);
        const badge = getByText("Empty category label");
        expect(badge).toHaveClass("bg-primary/10 text-primary");
    });
});
