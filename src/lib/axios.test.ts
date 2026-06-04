/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Cookies from "js-cookie";
import api from "./axios";

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

describe("axios api instance", () => {
    const originalWindow = global.window;

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        
        // Mock window.location
        if (typeof window !== "undefined") {
            const mockLocation = {
                href: "",
                pathname: "/home",
            };
            // Use defineProperty because window.location is read-only in jsdom
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

    it("should inject authorization header if token exists in cookies", async () => {
        (vi.mocked(Cookies.get) as any).mockReturnValue("fake-jwt-token");

        // Get the request interceptor handler
        const requestInterceptor = (api.interceptors.request as any).handlers[0];
        const config = {
            headers: {},
        };

        const result = await requestInterceptor.fulfilled(config);
        expect(result.headers.Authorization).toBe("Bearer fake-jwt-token");
        expect(Cookies.get).toHaveBeenCalledWith("auth-token");
    });

    it("should not inject authorization header if token does not exist in cookies", async () => {
        (vi.mocked(Cookies.get) as any).mockReturnValue(undefined);

        const requestInterceptor = (api.interceptors.request as any).handlers[0];
        const config = {
            headers: {},
        };

        const result = await requestInterceptor.fulfilled(config);
        expect(result.headers.Authorization).toBeUndefined();
    });

    it("should handle request interceptor error rejection", async () => {
        const requestInterceptor = (api.interceptors.request as any).handlers[0];
        const error = new Error("request error");
        await expect(requestInterceptor.rejected(error)).rejects.toThrow("request error");
    });

    it("should pass through normal responses", async () => {
        const responseInterceptor = (api.interceptors.response as any).handlers[0];
        const response = { data: "success" };
        const result = await responseInterceptor.fulfilled(response);
        expect(result).toBe(response);
    });

    it("should handle 401 unauthorized errors by clearing session and redirecting", async () => {
        // Set up mock session
        localStorage.setItem("token", "dummy");
        localStorage.setItem("user", "dummy");
        localStorage.setItem("userType", "dummy");

        const responseInterceptor = (api.interceptors.response as any).handlers[0];
        const mockError = {
            config: { url: "/some-protected-endpoint" },
            response: { status: 401 },
        };

        await expect(responseInterceptor.rejected(mockError)).rejects.toEqual(mockError);

        // Verify session was cleared
        expect(Cookies.remove).toHaveBeenCalledWith("auth-token");
        expect(localStorage.getItem("token")).toBeNull();
        expect(localStorage.getItem("user")).toBeNull();
        expect(localStorage.getItem("userType")).toBeNull();

        // Verify redirect
        expect(window.location.href).toBe("/login");
    });

    it("should not redirect or clear session on 401 if request is to login page", async () => {
        localStorage.setItem("token", "dummy");

        const responseInterceptor = (api.interceptors.response as any).handlers[0];
        const mockError = {
            config: { url: "/auth/login" },
            response: { status: 401 },
        };

        await expect(responseInterceptor.rejected(mockError)).rejects.toEqual(mockError);

        // Verify session was NOT cleared
        expect(Cookies.remove).not.toHaveBeenCalled();
        expect(localStorage.getItem("token")).toBe("dummy");
        expect(window.location.href).not.toBe("/login");
    });
});
