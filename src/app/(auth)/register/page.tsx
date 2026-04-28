"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { SegmentedControl } from "../../../components/ui/SegmentedControl";
import { Eye, EyeOff, Shield, Briefcase, Search } from "lucide-react";

export default function RegisterPage() {
    const [userType, setUserType] = useState("freelancer");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { width: "w-0", color: "", text: "" };
        if (password.length < 6)
            return { width: "w-1/3", color: "bg-destructive", text: "Débil" };
        if (password.length < 8)
            return { width: "w-2/3", color: "bg-secondary", text: "Media" };
        return { width: "w-full", color: "bg-success", text: "Fuerte" };
    };

    const passwordStrength = getPasswordStrength(formData.password);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Register:", formData, userType);
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo & Header */}
                <div className="text-center mb-8">
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
                    <p className="text-muted-foreground">
                        Conectamos talento local con oportunidades
                    </p>
                </div>

                {/* Card Container */}
                <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                Crear cuenta
                            </h2>
                            <p className="text-muted-foreground text-sm">
                                Únete a la comunidad de profesionales
                            </p>
                        </div>

                        {/* Role Selector */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-3">
                                ¿Cómo quieres usar SkillHub?
                            </label>
                            <SegmentedControl
                                fullWidth
                                value={userType}
                                onChange={setUserType}
                                options={[
                                    {
                                        value: "freelancer",
                                        label: "Soy Independiente",
                                        icon: <Briefcase size={18} />,
                                    },
                                    {
                                        value: "client",
                                        label: "Busco un Servicio",
                                        icon: <Search size={18} />,
                                    },
                                ]}
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                                {userType === "freelancer"
                                    ? "Ofrece tus servicios y conecta con clientes"
                                    : "Encuentra profesionales confiables para tu proyecto"}
                            </p>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <Input
                                label="Nombre completo"
                                type="text"
                                placeholder="Ej: María González"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                fullWidth
                                required
                            />

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
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Mínimo 8 caracteres"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2.5 pr-12 rounded-xl border-2 border-input bg-card text-foreground placeholder:text-muted-foreground transition-all duration-200 outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 shadow-sm"
                                        required
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
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
                                {formData.password && (
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${passwordStrength.width} ${passwordStrength.color}`}
                                            />
                                        </div>
                                        <span className="text-xs text-muted-foreground min-w-[50px]">
                                            {passwordStrength.text}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="flex items-start gap-3 p-4 bg-success/5 border border-success/20 rounded-xl">
                            <Shield
                                className="text-success flex-shrink-0 mt-0.5"
                                size={20}
                            />
                            <div>
                                <p className="text-sm text-foreground font-medium mb-0.5">
                                    Conexión segura
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Tus datos están protegidos con encriptación
                                    de extremo a extremo
                                </p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Button
                            type="submit"
                            variant="solid"
                            color="primary"
                            size="lg"
                            fullWidth
                        >
                            Crear mi cuenta
                        </Button>

                        {/* Terms */}
                        <p className="text-xs text-muted-foreground text-center leading-relaxed">
                            Al registrarte, aceptas nuestros{" "}
                            <button
                                type="button"
                                className="text-primary hover:underline font-medium"
                            >
                                Términos de Servicio
                            </button>{" "}
                            y{" "}
                            <button
                                type="button"
                                className="text-primary hover:underline font-medium"
                            >
                                Política de Privacidad
                            </button>
                        </p>
                    </form>
                </div>

                {/* Footer Link */}
                <div className="text-center mt-6">
                    <p className="text-sm text-muted-foreground">
                        ¿Ya tienes cuenta?{" "}
                        <Link
                            href="/login"
                            className="text-primary hover:underline font-medium"
                        >
                            Ingresa aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
