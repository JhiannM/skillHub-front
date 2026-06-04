import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusStepper } from "./StatusStepper";

describe("StatusStepper Component", () => {
    it("renders rejected status screen correctly", () => {
        render(<StatusStepper currentStatus="rejected" />);
        expect(screen.getByText("Solicitud Rechazada")).toBeInTheDocument();
        expect(screen.queryByText("Solicitado")).not.toBeInTheDocument();
    });

    it("renders active steps correctly when status is requested", () => {
        const { container } = render(<StatusStepper currentStatus="requested" />);
        expect(screen.getByText("Solicitado")).toBeInTheDocument();
        expect(screen.getByText("Aceptado")).toBeInTheDocument();
        expect(screen.getByText("En Proceso")).toBeInTheDocument();
        expect(screen.getByText("Finalizado")).toBeInTheDocument();

        // The first circle (index 0) should be active primary color
        const firstCircle = container.querySelector(".bg-primary");
        expect(firstCircle).toBeInTheDocument();
        expect(firstCircle?.textContent).toBe("1");
    });

    it("renders success checks for completed steps and active style for in-progress step", () => {
        const { container } = render(<StatusStepper currentStatus="in-progress" />);
        
        // "requested" (index 0) and "accepted" (index 1) are completed
        // "in-progress" (index 2) is active (currentIndex)
        // "completed" (index 3) is pending

        const successCircles = Array.from(container.querySelectorAll(".bg-success")).filter(
            el => el.classList.contains("w-8")
        );
        expect(successCircles.length).toBe(2); // requested and accepted

        const activeCircle = container.querySelector(".bg-primary");
        expect(activeCircle).toBeInTheDocument();
        expect(activeCircle?.textContent).toBe("3"); // 1-indexed count for En Proceso step

        const pendingCircles = container.querySelectorAll(".bg-muted");
        // Filter out connector lines which might also have bg-muted
        const pendingCircleElements = Array.from(pendingCircles).filter(el => el.classList.contains("rounded-full"));
        expect(pendingCircleElements.length).toBe(1); // finalizado
        expect(pendingCircleElements[0].textContent).toBe("4");
    });
});
