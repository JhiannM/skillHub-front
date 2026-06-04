import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkillTag } from "./SkillTag";

describe("SkillTag Component", () => {
    it("renders the skill name correctly", () => {
        render(<SkillTag skill="React" />);
        expect(screen.getByText("React")).toBeInTheDocument();
    });

    it("applies the correct styling based on category", () => {
        const { rerender } = render(<SkillTag skill="React" category="tecnologia" />);
        expect(screen.getByText("React")).toHaveClass("bg-primary/10 text-primary");

        rerender(<SkillTag skill="React" category="hogar" />);
        expect(screen.getByText("React")).toHaveClass("bg-secondary/10 text-secondary");
    });

    it("applies fallback technology styles if the category is unknown", () => {
        render(<SkillTag skill="React" category="unknown-category" />);
        expect(screen.getByText("React")).toHaveClass("bg-primary/10 text-primary");
    });
});
