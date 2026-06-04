/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { middleware } from "./middleware";
import { NextResponse } from "next/server";

// Mock NextResponse
const mockRedirect = vi.fn((url) => ({ type: "redirect", url }));
const mockNext = vi.fn(() => ({ type: "next" }));

vi.mock("next/server", () => {
    return {
        NextResponse: {
            redirect: vi.fn((url) => mockRedirect(url)),
            next: vi.fn(() => mockNext()),
        },
    };
});

describe("Next.js Routing Middleware", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const createMockRequest = (pathname: string, token?: string) => {
        const searchParams = {
            set: vi.fn(),
        };
        const nextUrl = {
            pathname,
            searchParams,
            clone() {
                return {
                    pathname,
                    searchParams,
                    toString() {
                        return `http://localhost${pathname}`;
                    },
                };
            },
        };

        return {
            cookies: {
                get: vi.fn((key: string) => {
                    if (key === "auth-token" && token) {
                        return { value: token };
                    }
                    return undefined;
                }),
            },
            nextUrl,
        } as any;
    };

    it("should allow request to proceed for public routes when unauthenticated", () => {
        const req = createMockRequest("/", undefined);
        const res = middleware(req);

        expect(res).toEqual({ type: "next" });
        expect(NextResponse.next).toHaveBeenCalled();
        expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it("should redirect unauthenticated request to protected route to login page", () => {
        const req = createMockRequest("/provider-settings/profile", undefined);
        const res = middleware(req);

        expect(NextResponse.redirect).toHaveBeenCalled();
        expect(res?.type).toBe("redirect");

        // Check that callbackUrl is appended
        const redirectTarget = vi.mocked(NextResponse.redirect).mock
            .calls[0][0] as any;
        expect(redirectTarget.pathname).toBe("/login");
        expect(redirectTarget.searchParams.set).toHaveBeenCalledWith(
            "callbackUrl",
            "/provider-settings/profile"
        );
    });

    it("should allow request to proceed for protected route when authenticated", () => {
        const req = createMockRequest("/my-services", "valid-token");
        const res = middleware(req);

        expect(res).toEqual({ type: "next" });
        expect(NextResponse.next).toHaveBeenCalled();
        expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it("should redirect authenticated user from guest-only route to search page", () => {
        const req = createMockRequest("/login", "valid-token");
        const res = middleware(req);

        expect(NextResponse.redirect).toHaveBeenCalled();
        expect(res?.type).toBe("redirect");

        const redirectTarget = vi.mocked(NextResponse.redirect).mock
            .calls[0][0] as any;
        expect(redirectTarget.pathname).toBe("/search");
    });

    it("should allow unauthenticated user to access guest-only routes", () => {
        const req = createMockRequest("/login", undefined);
        const res = middleware(req);

        expect(res).toEqual({ type: "next" });
        expect(NextResponse.next).toHaveBeenCalled();
    });
});
