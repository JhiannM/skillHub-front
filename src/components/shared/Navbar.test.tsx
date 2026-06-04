import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { useUser } from "../../contexts/UserContext";

// Mock UserContext hook
vi.mock("../../contexts/UserContext", () => {
    return {
        useUser: vi.fn(),
    };
});

describe("Navbar Component", () => {
    const originalWindow = global.window;

    beforeEach(() => {
        vi.clearAllMocks();
        if (typeof window !== "undefined") {
            const mockLocation = { href: "" };
            Object.defineProperty(window, "location", {
                value: mockLocation,
                writable: true,
                configurable: true,
            });
        }
    });

    afterEach(() => {
        global.window = originalWindow;
    });

    it("renders visitor links (Ingresar, Registrarse) when unauthenticated", () => {
        vi.mocked(useUser).mockReturnValue({
            user: null,
            userType: null,
            isAuthenticated: false,
            login: vi.fn(),
            logout: vi.fn(),
        });

        render(<Navbar />);

        expect(screen.getByText("Ingresar")).toBeInTheDocument();
        expect(screen.getByText("Registrarse")).toBeInTheDocument();
        expect(screen.queryByText("Mis Solicitudes")).not.toBeInTheDocument();
    });

    it("renders user details and freelancer link when logged in as freelancer", () => {
        vi.mocked(useUser).mockReturnValue({
            user: { id: "1", name: "Alex Prestador", email: "alex@example.com" },
            userType: "freelancer",
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
        });

        render(<Navbar />);

        expect(screen.getByText("Alex Prestador")).toBeInTheDocument();
        expect(screen.getByText("Mis Servicios")).toBeInTheDocument();
        expect(screen.queryByText("Ingresar")).not.toBeInTheDocument();
    });

    it("renders client link when logged in as client", () => {
        vi.mocked(useUser).mockReturnValue({
            user: { id: "1", name: "Carlos Cliente", email: "carlos@example.com" },
            userType: "client",
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
        });

        render(<Navbar />);

        expect(screen.getByText("Carlos Cliente")).toBeInTheDocument();
        expect(screen.getByText("Mis Solicitudes")).toBeInTheDocument();
    });

    it("toggles dropdown user menu and triggers logout + redirect when 'Cerrar Sesión' is clicked", () => {
        const mockLogout = vi.fn();
        vi.mocked(useUser).mockReturnValue({
            user: { id: "1", name: "Jhiann Dev", email: "jhiann@example.com" },
            userType: "client",
            isAuthenticated: true,
            login: vi.fn(),
            logout: mockLogout,
        });

        render(<Navbar />);

        // Dropdown menu should be hidden initially
        expect(screen.queryByText("Mi Perfil")).not.toBeInTheDocument();

        // Click user avatar to open menu
        const userButton = screen.getByRole("button", { name: /Jhiann Dev/ });
        
        act(() => {
            fireEvent.click(userButton);
        });

        // Dropdown should render
        expect(screen.getByText("Mi Perfil")).toBeInTheDocument();
        expect(screen.getByText("jhiann@example.com")).toBeInTheDocument();
        expect(screen.getByText("Cliente")).toBeInTheDocument();

        // Click on Cerrar Sesión
        const logoutBtn = screen.getByText("Cerrar Sesión");
        
        act(() => {
            fireEvent.click(logoutBtn);
        });

        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(window.location.href).toBe("/");
    });

    it("links Settings correctly to '/provider-settings' for freelancer", () => {
        vi.mocked(useUser).mockReturnValue({
            user: { id: "1", name: "Alex Prestador", email: "alex@example.com" },
            userType: "freelancer",
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
        });

        render(<Navbar />);

        // Open menu
        const userButton = screen.getByRole("button", { name: /Alex/ });
        act(() => {
            fireEvent.click(userButton);
        });

        const settingsLink = screen.getByText("Configuración").closest("a");
        expect(settingsLink).toHaveAttribute("href", "/provider-settings");
    });

    it("links Settings correctly to '/settings' for client", () => {
        vi.mocked(useUser).mockReturnValue({
            user: { id: "1", name: "Carlos Cliente", email: "carlos@example.com" },
            userType: "client",
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
        });

        render(<Navbar />);

        // Open menu
        const userButton = screen.getByRole("button", { name: /Carlos/ });
        act(() => {
            fireEvent.click(userButton);
        });

        const settingsLink = screen.getByText("Configuración").closest("a");
        expect(settingsLink).toHaveAttribute("href", "/settings");
    });
});
