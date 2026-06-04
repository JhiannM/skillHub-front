/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Cookies from "js-cookie";
import { UserProvider, useUser, User } from "./UserContext";

// Mock js-cookie
vi.mock("js-cookie", () => {
    const store = new Map<string, string>();
    return {
        default: {
            get: vi.fn((key: string) => store.get(key) || null),
            set: vi.fn((key: string, val: string) => { store.set(key, val); }),
            remove: vi.fn((key: string) => { store.delete(key); }),
        }
    };
});

// A dummy component to consume the context
function TestConsumer() {
    const { user, userType, isAuthenticated, login, logout } = useUser();
    return (
        <div>
            <div data-testid="auth-status">{isAuthenticated ? "authenticated" : "unauthenticated"}</div>
            <div data-testid="user-name">{user?.name || "no-user"}</div>
            <div data-testid="user-type">{userType || "no-type"}</div>
            <button data-testid="login-btn" onClick={() => login("test-token", { id: "1", name: "Jhiann", email: "jhiann@example.com" }, "client")}>
                Login
            </button>
            <button data-testid="logout-btn" onClick={logout}>
                Logout
            </button>
        </div>
    );
}

describe("UserContext", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        localStorage.clear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should initialize as unauthenticated and clear storage if cookies are missing on mount", () => {
        render(
            <UserProvider>
                <TestConsumer />
            </UserProvider>
        );

        expect(screen.getByTestId("auth-status").textContent).toBe("unauthenticated");
        expect(screen.getByTestId("user-name").textContent).toBe("no-user");
        expect(screen.getByTestId("user-type").textContent).toBe("no-type");

        expect(Cookies.remove).toHaveBeenCalledWith("auth-token");
    });

    it("should recover session on mount if cookies and localStorage are present", async () => {
        (vi.mocked(Cookies.get) as any).mockReturnValue("stored-token");
        localStorage.setItem("token", "stored-token");
        const userData: User = { id: "2", name: "Alex", email: "alex@example.com" };
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userType", "freelancer");

        render(
            <UserProvider>
                <TestConsumer />
            </UserProvider>
        );

        // Before timers fire, state hasn't updated yet
        expect(screen.getByTestId("auth-status").textContent).toBe("unauthenticated");

        // Fast-forward the setTimeout
        act(() => {
            vi.runAllTimers();
        });

        expect(screen.getByTestId("auth-status").textContent).toBe("authenticated");
        expect(screen.getByTestId("user-name").textContent).toBe("Alex");
        expect(screen.getByTestId("user-type").textContent).toBe("freelancer");
    });

    it("should handle login properly", () => {
        render(
            <UserProvider>
                <TestConsumer />
            </UserProvider>
        );

        const loginButton = screen.getByTestId("login-btn");
        
        act(() => {
            loginButton.click();
        });

        expect(screen.getByTestId("auth-status").textContent).toBe("authenticated");
        expect(screen.getByTestId("user-name").textContent).toBe("Jhiann");
        expect(screen.getByTestId("user-type").textContent).toBe("client");

        expect(Cookies.set).toHaveBeenCalledWith("auth-token", "test-token", { expires: 7 });
        expect(localStorage.getItem("token")).toBe("test-token");
        expect(JSON.parse(localStorage.getItem("user") || "{}")).toEqual({
            id: "1",
            name: "Jhiann",
            email: "jhiann@example.com",
        });
        expect(localStorage.getItem("userType")).toBe("client");
    });

    it("should handle logout properly", () => {
        // Initialize as logged in directly via trigger
        render(
            <UserProvider>
                <TestConsumer />
            </UserProvider>
        );

        // Log in
        act(() => {
            screen.getByTestId("login-btn").click();
        });
        expect(screen.getByTestId("auth-status").textContent).toBe("authenticated");

        // Log out
        act(() => {
            screen.getByTestId("logout-btn").click();
        });

        expect(screen.getByTestId("auth-status").textContent).toBe("unauthenticated");
        expect(screen.getByTestId("user-name").textContent).toBe("no-user");
        expect(screen.getByTestId("user-type").textContent).toBe("no-type");

        expect(Cookies.remove).toHaveBeenCalledWith("auth-token");
        expect(localStorage.getItem("token")).toBeNull();
        expect(localStorage.getItem("user")).toBeNull();
        expect(localStorage.getItem("userType")).toBeNull();
    });

    it("should throw error if useUser is used outside of UserProvider", () => {
        // Prevent writing error output to console during test
        const consoleError = console.error;
        console.error = vi.fn();

        expect(() => render(<TestConsumer />)).toThrow(
            "useUser must be used within a UserProvider"
        );

        console.error = consoleError;
    });
});
