import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer Component", () => {
    it("renders brand, headings, links, and copyright text correctly", () => {
        render(<Footer />);
        
        expect(screen.getByText("SkillHub")).toBeInTheDocument();
        expect(screen.getByText("Conectando talento local con oportunidades en Colombia")).toBeInTheDocument();
        
        expect(screen.getByText("Plataforma")).toBeInTheDocument();
        expect(screen.getByText("Empresa")).toBeInTheDocument();
        expect(screen.getByText("Legal")).toBeInTheDocument();

        expect(screen.getByText("Cómo funciona")).toBeInTheDocument();
        expect(screen.getByText("Términos de servicio")).toBeInTheDocument();
        expect(screen.getByText("Panel Administrativo")).toBeInTheDocument();
        expect(screen.getByText(/© 2026 SkillHub\. Todos los derechos reservados\./)).toBeInTheDocument();
    });
});
