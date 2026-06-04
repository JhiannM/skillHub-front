import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserTypeSwitcher } from "./UserTypeSwitcher";
import { useUser } from "../../contexts/UserContext";

// Mock the UserContext hook
vi.mock("../../contexts/UserContext", () => {
    return {
        useUser: vi.fn(),
    };
});

describe("UserTypeSwitcher Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it("returns null when no user is logged in", () => {
        vi.mocked(useUser).mockReturnValue({
            user: null,
            userType: null,
            isAuthenticated: false,
            login: vi.fn(),
            logout: vi.fn(),
        });

        const { container } = render(<UserTypeSwitcher />);
        expect(container.firstChild).toBeNull();
    });

    it("renders switch buttons when user is logged in", () => {
        vi.mocked(useUser).mockReturnValue({
            user: { id: "1", name: "Test", email: "test@example.com" },
            userType: "client",
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
        });

        render(<UserTypeSwitcher />);
        expect(screen.getByRole("button", { name: /Modo Prestador/ })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Modo Cliente/ })).toBeInTheDocument();
    });

    it("triggers login with switcher type when clicked", () => {
        const mockLogin = vi.fn();
        vi.mocked(useUser).mockReturnValue({
            user: { id: "1", name: "Test", email: "test@example.com" },
            userType: "client",
            isAuthenticated: true,
            login: mockLogin,
            logout: vi.fn(),
        });

        localStorage.setItem("token", "dummy-jwt");

        render(<UserTypeSwitcher />);
        
        const prestadorBtn = screen.getByRole("button", { name: /Modo Prestador/ });
        fireEvent.click(prestadorBtn);

        expect(mockLogin).toHaveBeenCalledWith("dummy-jwt", { id: "1", name: "Test", email: "test@example.com" }, "freelancer");
    });
});
