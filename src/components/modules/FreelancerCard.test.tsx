import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FreelancerCard } from "./FreelancerCard";

describe("FreelancerCard Component", () => {
    const defaultProps = {
        id: "123",
        name: "Jhiann Dev",
        hourlyRate: "65,000",
        skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
        isTopTalent: true,
        bio: "Senior full stack web developer focused on performance.",
        category: "tecnologia",
        servicesCompleted: 14,
    };

    it("renders name, bio, rate, avatar, and top talent badge correctly", () => {
        const { container } = render(<FreelancerCard {...defaultProps} />);

        expect(screen.getByText("Jhiann Dev")).toBeInTheDocument();
        expect(screen.getByText("Senior full stack web developer focused on performance.")).toBeInTheDocument();
        expect(screen.getByText("$65,000")).toBeInTheDocument();
        expect(screen.getByText("J")).toBeInTheDocument(); // Name avatar fallback
        
        // Top talent badge check (represented by BadgeCheck icon)
        const svgCheck = container.querySelector(".lucide-badge-check");
        expect(svgCheck).toBeInTheDocument();
    });

    it("does not render top talent badge if isTopTalent is false", () => {
        const { container } = render(<FreelancerCard {...defaultProps} isTopTalent={false} />);
        const svgCheck = container.querySelector(".lucide-badge-check");
        expect(svgCheck).not.toBeInTheDocument();
    });

    it("displays at most 3 skills and lists the remaining skill count", () => {
        render(<FreelancerCard {...defaultProps} />);

        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("TypeScript")).toBeInTheDocument();
        expect(screen.getByText("Next.js")).toBeInTheDocument();

        // 4th and 5th skills should not be direct tags
        expect(screen.queryByText("Tailwind CSS")).not.toBeInTheDocument();

        // Remaining count badge: +2
        expect(screen.getByText("+2")).toBeInTheDocument();
    });

    it("creates correct profile page link", () => {
        render(<FreelancerCard {...defaultProps} />);
        
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/profile/123");
        expect(screen.getByRole("button", { name: "Ver perfil" })).toBeInTheDocument();
    });
});
