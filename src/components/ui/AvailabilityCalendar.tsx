import React from "react";
import { Clock, Calendar } from "lucide-react";

interface TimeSlot {
    day: string;
    dayShort: string;
    available: boolean;
    hours?: string;
}

interface AvailabilityCalendarProps {
    slots: TimeSlot[];
}

export function AvailabilityCalendar({ slots }: AvailabilityCalendarProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2">
                {slots.map((slot, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                            slot.available
                                ? "bg-success/10 border-2 border-success/30"
                                : "bg-muted border-2 border-transparent"
                        }`}
                    >
                        <span
                            className={`text-xs mb-1 ${
                                slot.available
                                    ? "text-success"
                                    : "text-muted-foreground"
                            }`}
                        >
                            {slot.dayShort}
                        </span>
                        <div
                            className={`w-2 h-2 rounded-full ${
                                slot.available
                                    ? "bg-success"
                                    : "bg-muted-foreground/30"
                            }`}
                        />
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                {slots
                    .filter((s) => s.available && s.hours)
                    .map((slot, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                            <div className="flex items-center gap-2">
                                <Calendar
                                    size={16}
                                    className="text-muted-foreground"
                                />
                                <span className="text-sm text-foreground">
                                    {slot.day}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock
                                    size={14}
                                    className="text-muted-foreground"
                                />
                                <span className="text-sm text-muted-foreground">
                                    {slot.hours}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
