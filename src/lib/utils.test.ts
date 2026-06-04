import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
    it("merges class names correctly", () => {
        expect(cn("px-2", "py-2")).toBe("px-2 py-2");
    });

    it("handles conditional class names", () => {
        expect(cn("px-2", false && "py-2", "mx-2")).toBe("px-2 mx-2");
        expect(cn("px-2", true && "py-2", "mx-2")).toBe("px-2 py-2 mx-2");
    });

    it("merges conflicting Tailwind classes correctly using twMerge", () => {
        expect(cn("px-2 px-4")).toBe("px-4");
        expect(cn("bg-red-500 bg-blue-500")).toBe("bg-blue-500");
    });

    it("handles null, undefined and empty string arguments", () => {
        expect(cn("px-2", null, undefined, "")).toBe("px-2");
    });
});
