import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { FilterModal } from "./FilterModal";

describe("FilterModal Component", () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        onApply: vi.fn(),
    };

    it("does not render when isOpen is false", () => {
        const { container } = render(<FilterModal {...defaultProps} isOpen={false} />);
        expect(container.firstChild).toBeNull();
    });

    it("renders labels and presets when open", () => {
        render(<FilterModal {...defaultProps} />);

        expect(screen.getByText("Filtros Avanzados")).toBeInTheDocument();
        expect(screen.getByText("Rango de Precio (COP/hora)")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("20,000")).toBeInTheDocument(); // priceMin placeholder
        expect(screen.getByPlaceholderText("100,000")).toBeInTheDocument(); // priceMax placeholder
        
        expect(screen.getByText("< 30k")).toBeInTheDocument();
        expect(screen.getByText("30k - 60k")).toBeInTheDocument();
        expect(screen.getByText("> 60k")).toBeInTheDocument();
    });

    it("handles inputs and presets values correctly", () => {
        render(<FilterModal {...defaultProps} />);

        const minInput = screen.getByPlaceholderText("20,000");
        const maxInput = screen.getByPlaceholderText("100,000");

        act(() => {
            fireEvent.change(minInput, { target: { value: "15000" } });
            fireEvent.change(maxInput, { target: { value: "95000" } });
        });

        expect(minInput).toHaveValue(15000);
        expect(maxInput).toHaveValue(95000);

        // Click preset "30k - 60k"
        act(() => {
            fireEvent.click(screen.getByText("30k - 60k"));
        });
        expect(minInput).toHaveValue(30000);
        expect(maxInput).toHaveValue(60000);

        // Click preset "< 30k"
        act(() => {
            fireEvent.click(screen.getByText("< 30k"));
        });
        expect(minInput).toHaveValue(0);
        expect(maxInput).toHaveValue(30000);
    });

    it("submits correct filter values on Apply and closes modal", () => {
        const handleApply = vi.fn();
        const handleClose = vi.fn();
        render(<FilterModal {...defaultProps} onApply={handleApply} onClose={handleClose} />);

        const minInput = screen.getByPlaceholderText("20,000");
        act(() => {
            fireEvent.change(minInput, { target: { value: "45000" } });
        });

        act(() => {
            screen.getByRole("button", { name: "Aplicar Filtros" }).click();
        });

        expect(handleApply).toHaveBeenCalledWith({
            priceMin: "45000",
            priceMax: "",
        });
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("clears all input values when Limpiar button is clicked", () => {
        render(<FilterModal {...defaultProps} />);

        const minInput = screen.getByPlaceholderText("20,000");
        const maxInput = screen.getByPlaceholderText("100,000");

        act(() => {
            fireEvent.change(minInput, { target: { value: "45000" } });
            fireEvent.change(maxInput, { target: { value: "95000" } });
        });

        act(() => {
            screen.getByRole("button", { name: "Limpiar" }).click();
        });

        expect(minInput).toHaveValue(null);
        expect(maxInput).toHaveValue(null);
    });
});
