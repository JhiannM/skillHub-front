import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { PriceEditModal } from "./PriceEditModal";

describe("PriceEditModal Component", () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        onSave: vi.fn(),
        currentPrice: "100000",
        currentHours: "2",
        hourlyRate: 50000,
    };

    it("does not render when isOpen is false", () => {
        const { container } = render(<PriceEditModal {...defaultProps} isOpen={false} />);
        expect(container.firstChild).toBeNull();
    });

    it("renders initial price, hours, hourly rate, and calculate pricing box", () => {
        render(<PriceEditModal {...defaultProps} />);
        expect(screen.getByText("Ajustar Precio y Horas")).toBeInTheDocument();
        expect(screen.getByDisplayValue("2")).toBeInTheDocument(); // hours
        expect(screen.getByDisplayValue("100000")).toBeInTheDocument(); // price
        expect(screen.getByText(/50,000 COP\/hora/)).toBeInTheDocument();
        expect(screen.getByText(/100,000 COP/)).toBeInTheDocument(); // calculated price
    });

    it("recalculates price and differences when inputs change", () => {
        const { container } = render(<PriceEditModal {...defaultProps} />);

        const numberInputs = container.querySelectorAll("input[type='number']");
        const hoursInput = numberInputs[0];
        const finalPriceInput = numberInputs[1];

        // Change hours to 3 (base price should become 150000)
        act(() => {
            fireEvent.change(hoursInput, { target: { value: "3" } });
        });
        expect(screen.getByText(/150,000 COP/)).toBeInTheDocument(); // 3 * 50000

        // With hours = 3 (base = 150000) and finalPrice = 100000, difference should be -50000 (descuento)
        expect(screen.getByText(/-50,000 COP del precio base/)).toBeInTheDocument();

        // Change final price to 200000. With hours = 3 (base = 150000), difference should be +50000 (por complejidad)
        act(() => {
            fireEvent.change(finalPriceInput, { target: { value: "200000" } });
        });
        expect(screen.getByText(/\+50,000 COP del precio base/)).toBeInTheDocument();
    });

    it("submits correct updated values on save click", () => {
        const handleSave = vi.fn();
        const { container } = render(<PriceEditModal {...defaultProps} onSave={handleSave} />);

        const numberInputs = container.querySelectorAll("input[type='number']");
        const hoursInput = numberInputs[0];
        const finalPriceInput = numberInputs[1];
        const textarea = screen.getByPlaceholderText("Explica el motivo del ajuste de precio...");

        act(() => {
            fireEvent.change(hoursInput, { target: { value: "4" } });
            fireEvent.change(finalPriceInput, { target: { value: "250000" } });
            fireEvent.change(textarea, { target: { value: "More complex work required" } });
        });

        act(() => {
            screen.getByRole("button", { name: "Guardar Cambios" }).click();
        });

        expect(handleSave).toHaveBeenCalledWith({
            finalPrice: "250000",
            estimatedHours: "4",
            notes: "More complex work required",
        });
    });

    it("triggers onClose when Cancel button is clicked", () => {
        const handleClose = vi.fn();
        render(<PriceEditModal {...defaultProps} onClose={handleClose} />);
        
        screen.getByRole("button", { name: "Cancelar" }).click();
        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
