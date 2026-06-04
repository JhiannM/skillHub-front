import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ConfirmModal } from "./ConfirmModal";

describe("ConfirmModal Component", () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        onConfirm: vi.fn(),
        title: "Test Modal",
        description: "Are you sure?",
        confirmText: "Yes, do it",
    };

    it("does not render when isOpen is false", () => {
        const { container } = render(<ConfirmModal {...defaultProps} isOpen={false} />);
        expect(container.firstChild).toBeNull();
    });

    it("renders title, description and action buttons when open", () => {
        render(<ConfirmModal {...defaultProps} />);
        expect(screen.getByText("Test Modal")).toBeInTheDocument();
        expect(screen.getByText("Are you sure?")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Yes, do it" })).toBeInTheDocument();
    });

    it("triggers onClose when Cancel or Close buttons are clicked", () => {
        const handleClose = vi.fn();
        const { container } = render(<ConfirmModal {...defaultProps} onClose={handleClose} />);
        
        screen.getByRole("button", { name: "Cancelar" }).click();
        expect(handleClose).toHaveBeenCalledTimes(1);

        // Click on X button (usually has close icon)
        // Find X icon close button - it has class w-8 h-8
        const closeX = container.querySelector(".w-8.h-8");
        if (closeX) {
            fireEvent.click(closeX);
        }
        expect(handleClose).toHaveBeenCalledTimes(2);
    });

    it("triggers onClose when clicking backdrop", () => {
        const handleClose = vi.fn();
        const { container } = render(<ConfirmModal {...defaultProps} onClose={handleClose} />);
        
        const backdrop = container.querySelector(".bg-black\\/50");
        expect(backdrop).toBeInTheDocument();
        if (backdrop) {
            fireEvent.click(backdrop);
        }
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("triggers onConfirm and onClose when confirm button is clicked", () => {
        const handleConfirm = vi.fn();
        const handleClose = vi.fn();
        render(<ConfirmModal {...defaultProps} onConfirm={handleConfirm} onClose={handleClose} />);

        screen.getByRole("button", { name: "Yes, do it" }).click();
        expect(handleConfirm).toHaveBeenCalledWith(undefined);
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("requires reason, disables confirm button when reason is empty, and submits reason when filled", () => {
        const handleConfirm = vi.fn();
        render(<ConfirmModal {...defaultProps} requiresReason={true} onConfirm={handleConfirm} />);

        const confirmButton = screen.getByRole("button", { name: "Yes, do it" });
        expect(confirmButton).toBeDisabled();

        const textarea = screen.getByPlaceholderText("Describe brevemente el motivo...");
        expect(textarea).toBeInTheDocument();

        // Write a reason
        act(() => {
            fireEvent.change(textarea, { target: { value: "Cancelation policy reason" } });
        });
        expect(confirmButton).not.toBeDisabled();

        act(() => {
            confirmButton.click();
        });
        expect(handleConfirm).toHaveBeenCalledWith("Cancelation policy reason");
    });

    it("renders warning box and warning icon when confirmColor is destructive", () => {
        render(<ConfirmModal {...defaultProps} confirmColor="destructive" />);
        expect(screen.getByText("Esta acción no se puede deshacer. El otro usuario será notificado.")).toBeInTheDocument();
    });
});
