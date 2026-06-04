import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AvailabilityCalendar } from "./AvailabilityCalendar";

describe("AvailabilityCalendar Component", () => {
    const slots = [
        { day: "Lunes", dayShort: "Lun", available: true, hours: "08:00 - 17:00" },
        { day: "Martes", dayShort: "Mar", available: false },
        { day: "Miércoles", dayShort: "Mié", available: true, hours: "09:00 - 14:00" },
    ];

    it("renders all slots' shortened days and status indicators", () => {
        const { container } = render(<AvailabilityCalendar slots={slots} />);
        
        expect(screen.getByText("Lun")).toBeInTheDocument();
        expect(screen.getByText("Mar")).toBeInTheDocument();
        expect(screen.getByText("Mié")).toBeInTheDocument();

        // Check slots' styling classes based on availability
        const availableSlots = container.querySelectorAll(".bg-success\\/10");
        expect(availableSlots.length).toBe(2);

        const unavailableSlots = container.querySelectorAll(".bg-muted");
        // Filter out details container elements that might have bg-muted/50 class
        const unavailableSlotsFiltered = Array.from(unavailableSlots).filter(
            el => el.classList.contains("border-transparent")
        );
        expect(unavailableSlotsFiltered.length).toBe(1);
    });

    it("renders time details only for available slots", () => {
        render(<AvailabilityCalendar slots={slots} />);

        // Only Lunes and Miércoles should render hours detail rows
        expect(screen.getByText("Lunes")).toBeInTheDocument();
        expect(screen.getByText("08:00 - 17:00")).toBeInTheDocument();
        expect(screen.getByText("Miércoles")).toBeInTheDocument();
        expect(screen.getByText("09:00 - 14:00")).toBeInTheDocument();

        // Martes should NOT render a hours detail row
        expect(screen.queryByText("Martes")).not.toBeInTheDocument();
    });
});
