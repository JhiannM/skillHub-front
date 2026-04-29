"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Eye, EyeOff, Lock, Mail, Shield, ArrowRight, AlertCircle } from "lucide-react";
import { useUser, UserType } from "../../../contexts/UserContext";
import api from "../../../lib/axios";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            const response = await api.post("/auth/login", formData);
            
            if (response.data.success && response.data.data) {
                const { token, user } = response.data.data;
                const userType: UserType = user.role === "PROVIDER" ? "freelancer" : "client";
                
                login(token, { id: user.id || "1", name: user.name, email: user.email }, userType);
                
                // Redirigir al usuario según su rol o a la página principal
                router.push(userType === "freelancer" ? "/provider-settings" : "/search");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Ocurrió un error al iniciar sesión. Verifica tus credenciales.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Side - Branding & Stats (Hidden on mobile) */}
                    <div className="hidden lg:block">
                        <div className="space-y-6">
                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                                    <span className="text-primary-foreground text-3xl font-bold">
                                        S
                                    </span>
                                </div>
                                <div>
                                    <h1 className="text-5xl text-primary font-bold">
                                        SkillHub
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Economía colaborativa local
                                    </p>
                                </div>
                            </div>

                            {/* Welcome Message */}
                            <div className="space-y-3 mt-12">
                                <h2 className="text-4xl font-bold text-foreground">
                                    ¡Bienvenido de vuelta!
                                </h2>
                                <p className="text-xl text-muted-foreground">
                                    Conecta con los mejores profesionales
                                    independientes de Colombia
                                </p>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="bg-card rounded-2xl shadow-md p-6 border border-border">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                        <Mail
                                            className="text-primary"
                                            size={24}
                                        />
                                    </div>
                                    <p className="text-3xl font-bold text-foreground mb-1">
                                        +12,000
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Usuarios activos
                                    </p>
                                </div>
                                <div className="bg-card rounded-2xl shadow-md p-6 border border-border">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                                        <Shield
                                            className="text-secondary"
                                            size={24}
                                        />
                                    </div>
                                    <p className="text-3xl font-bold text-foreground mb-1">
                                        100%
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Seguro y confiable
                                    </p>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-4 mt-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            className="text-success"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-foreground font-medium">
                                        Verificación de identidad
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            className="text-success"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-foreground font-medium">
                                        Pagos seguros
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            className="text-success"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-foreground font-medium">
                                        Soporte 24/7
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full">
                        {/* Mobile Logo (Only visible on small screens) */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-primary-foreground text-2xl font-bold">
                                        S
                                    </span>
                                </div>
                                <h1 className="text-4xl text-primary font-bold">
                                    SkillHub
                                </h1>
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">
                                ¡Bienvenido!
                            </h2>
                            <p className="text-muted-foreground">
                                Ingresa para conectar con talento local
                            </p>
                        </div>

                        {/* Login Card */}
                        <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Desktop Title */}
                                <div className="hidden lg:block mb-6">
                                    <h3 className="text-2xl font-bold text-foreground mb-2">
                                        Iniciar sesión
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        Ingresa tus credenciales para continuar
                                    </p>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl">
                                        <AlertCircle size={16} />
                                        <p>{error}</p>
                                    </div>
                                )}

                                {/* Form Fields */}
                                <div className="space-y-4">
                                    <Input
                                        label="Correo electrónico"
                                        type="email"
                                        placeholder="tu@correo.com"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        fullWidth
                                        required
                                    />

                                    <div>
                                        <label className="block text-sm text-foreground mb-1.5">
                                            Contraseña
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Ingresa tu contraseña"
                                                value={formData.password}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        password:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2.5 pr-12 rounded-xl border-2 border-input bg-card text-foreground placeholder:text-muted-foreground transition-all duration-200 outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 shadow-sm"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={20} />
                                                ) : (
                                                    <Eye size={20} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div
                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                                rememberMe
                                                    ? "bg-primary border-primary"
                                                    : "border-input group-hover:border-ring"
                                            }`}
                                            onClick={() =>
                                                setRememberMe(!rememberMe)
                                            }
                                        >
                                            {rememberMe && (
                                                <svg
                                                    width="12"
                                                    height="10"
                                                    viewBox="0 0 12 10"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M1 5L4.5 8.5L11 1"
                                                        stroke="white"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-sm text-foreground">
                                            Recordarme
                                        </span>
                                    </label>
                                    <button
                                        type="button"
                                        className="text-sm text-primary hover:underline font-medium"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>

                                {/* Security Badge */}
                                <div className="flex items-center justify-center gap-2 py-3 px-4 bg-success/5 border border-success/20 rounded-xl">
                                    <Lock className="text-success" size={16} />
                                    <p className="text-xs text-success font-medium">
                                        Conexión encriptada SSL
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <Button
                                    type="submit"
                                    variant="solid"
                                    color="primary"
                                    size="lg"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    <span>{isLoading ? "Ingresando..." : "Ingresar"}</span>
                                    {!isLoading && <ArrowRight size={20} className="ml-2" />}
                                </Button>

                                {/* Divider */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-border"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="px-4 bg-card text-muted-foreground">
                                            o continúa con
                                        </span>
                                    </div>
                                </div>

                                {/* Social Login */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-border rounded-xl hover:border-ring hover:bg-muted/30 transition-all"
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                        <span className="text-sm text-foreground font-medium">
                                            Google
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-border rounded-xl hover:border-ring hover:bg-muted/30 transition-all"
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                        </svg>
                                        <span className="text-sm text-foreground font-medium">
                                            Facebook
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Footer Link */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-muted-foreground">
                                ¿No tienes cuenta?{" "}
                                <Link
                                    href="/register"
                                    className="text-primary hover:underline font-medium"
                                >
                                    Regístrate gratis
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
