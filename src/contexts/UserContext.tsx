"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type User = {
    id: string;
    name: string;
    email: string;
};

export type UserType = "freelancer" | "client";

export interface UserContextType {
    user: User | null;
    userType: UserType | null;
    isAuthenticated: boolean;
    login: (token: string, userData: User, type: UserType) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userType, setUserType] = useState<UserType | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Al cargar la app, revisamos si hay un JWT en localStorage o en cookies
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const storedType = localStorage.getItem("userType");

        if (token && storedUser && storedType) {
            setUser(JSON.parse(storedUser));
            setUserType(storedType as UserType);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token: string, userData: User, type: UserType) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userType", type);
        setUser(userData);
        setUserType(type);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userType");
        setUser(null);
        setUserType(null);
        setIsAuthenticated(false);
    };

    return (
        <UserContext.Provider
            value={{ user, userType, isAuthenticated, login, logout }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
