"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";
import { useUser } from "../../contexts/UserContext";
import {
    Bell,
    MessageCircle,
    Briefcase,
    User,
    Settings,
    LogOut,
    Menu,
} from "lucide-react";

export function Navbar() {
    const { user, userType, logout, isAuthenticated } = useUser();
    const [showUserMenu, setShowUserMenu] = React.useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-primary-foreground text-xl font-bold">
                                S
                            </span>
                        </div>
                        <h1 className="text-2xl text-primary font-bold hidden sm:block">
                            SkillHub
                        </h1>
                    </Link>

                    {/* Navigation */}
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            {/* Search Link */}
                            <Link
                                href="/search"
                                className="hidden md:block text-foreground hover:text-primary transition-colors font-medium"
                            >
                                Explorar
                            </Link>

                            {/* Unified link for both user types */}
                            <Link
                                href="/my-services"
                                className="hidden md:flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
                            >
                                <Briefcase size={18} />
                                <span>
                                    {userType === "freelancer"
                                        ? "Mis Servicios"
                                        : "Mis Solicitudes"}
                                </span>
                            </Link>

                            {/* Messages */}
                            <Link href="/messages" className="relative">
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
                                    <MessageCircle
                                        size={20}
                                        className="text-muted-foreground"
                                    />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
                                </button>
                            </Link>

                            {/* Notifications */}
                            <button className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
                                <Bell
                                    size={20}
                                    className="text-muted-foreground"
                                />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
                            </button>

                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowUserMenu(!showUserMenu)
                                    }
                                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    <Avatar
                                        size="sm"
                                        fallback={
                                            user?.name?.substring(0, 2) || "U"
                                        }
                                    />
                                    <span className="hidden md:block text-sm font-medium text-foreground max-w-[100px] truncate">
                                        {user?.name}
                                    </span>
                                </button>

                                {/* Dropdown Menu */}
                                {showUserMenu && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() =>
                                                setShowUserMenu(false)
                                            }
                                        />
                                        <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden">
                                            <div className="p-4 border-b border-border">
                                                <p className="text-sm font-bold text-foreground">
                                                    {user?.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {user?.email}
                                                </p>
                                                <p className="text-xs text-primary font-medium mt-1">
                                                    {userType === "freelancer"
                                                        ? "Prestador de Servicios"
                                                        : "Cliente"}
                                                </p>
                                            </div>
                                            <div className="py-2">
                                                <Link
                                                    href="/profile/me"
                                                    className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                                                    onClick={() =>
                                                        setShowUserMenu(false)
                                                    }
                                                >
                                                    <User
                                                        size={18}
                                                        className="text-muted-foreground"
                                                    />
                                                    <span className="text-sm font-medium text-foreground">
                                                        Mi Perfil
                                                    </span>
                                                </Link>
                                                <Link
                                                    href={
                                                        userType ===
                                                        "freelancer"
                                                            ? "/provider-settings"
                                                            : "/settings"
                                                    }
                                                    className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                                                    onClick={() =>
                                                        setShowUserMenu(false)
                                                    }
                                                >
                                                    <Settings
                                                        size={18}
                                                        className="text-muted-foreground"
                                                    />
                                                    <span className="text-sm font-medium text-foreground">
                                                        Configuración
                                                    </span>
                                                </Link>
                                            </div>
                                            <div className="border-t border-border py-2">
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setShowUserMenu(false);
                                                        window.location.href =
                                                            "/";
                                                    }}
                                                    className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors w-full text-left"
                                                >
                                                    <LogOut
                                                        size={18}
                                                        className="text-destructive"
                                                    />
                                                    <span className="text-sm font-medium text-destructive">
                                                        Cerrar Sesión
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/search"
                                className="hidden md:block text-foreground hover:text-primary transition-colors font-medium"
                            >
                                Explorar
                            </Link>
                            <Link href="/login">
                                <Button variant="ghost" color="primary">
                                    Ingresar
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="solid" color="primary">
                                    Registrarse
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
