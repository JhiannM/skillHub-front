import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceCard } from "./ServiceCard";

describe("ServiceCard Component", () => {
    const defaultProps = {
        id: "serv-789",
        title: "Reparación de Calentador",
        status: "requested" as const,
        otherPerson: {
            name: "Juan Técnico",
            type: "freelancer" as const,
            avatar: "https://example.com/avatar.png",
        },
        date: "2026-06-15",
        time: "10:00 AM",
        location: "Bogotá, Colombia",
        price: "150.000",
        unreadMessages: 3,
    };

    it("renders details correctly including unread messages and action required badge", () => {
        render(<ServiceCard {...defaultProps} />);

        expect(screen.getByText("Reparación de Calentador")).toBeInTheDocument();
        expect(screen.getByText("Juan Técnico")).toBeInTheDocument();
        expect(screen.getByText("Prestador")).toBeInTheDocument();
        expect(screen.getByText("2026-06-15")).toBeInTheDocument();
        expect(screen.getByText("10:00 AM")).toBeInTheDocument();
        expect(screen.getByText("Bogotá, Colombia")).toBeInTheDocument();
        expect(screen.getByText("$150.000 COP")).toBeInTheDocument();
        
        expect(screen.getByText("3 nuevos")).toBeInTheDocument();
        expect(screen.getByText("Acción requerida")).toBeInTheDocument();
    });

    it("renders status badges correctly based on status prop", () => {
        const { rerender } = render(<ServiceCard {...defaultProps} status="accepted" />);
        expect(screen.getByText("Aceptado")).toBeInTheDocument();

        rerender(<ServiceCard {...defaultProps} status="in-progress" />);
        expect(screen.getByText("En Proceso")).toBeInTheDocument();

        rerender(<ServiceCard {...defaultProps} status="completed" />);
        expect(screen.getByText("Completado")).toBeInTheDocument();
        expect(screen.getByText("Servicio finalizado")).toBeInTheDocument();

        rerender(<ServiceCard {...defaultProps} status="rejected" />);
        expect(screen.getByText("Rechazado")).toBeInTheDocument();
    });

    it("has the correct route redirection Link", () => {
        render(<ServiceCard {...defaultProps} />);
        
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/service/serv-789");
    });
});
