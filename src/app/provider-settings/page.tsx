"use client";

import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { UserTypeSwitcher } from "../../components/shared/UserTypeSwitcher";
import { useUser } from "../../contexts/UserContext";
import {
    DollarSign,
    Calendar,
    Clock,
    Save,
    AlertCircle,
    CheckCircle2,
    User,
    Award,
    Briefcase,
    X,
    Plus,
} from "lucide-react";

export default function ProviderSettingsPage() {
    const { isAuthenticated, login } = useUser();

    // Auto-login as freelancer for demo
    React.useEffect(() => {
        if (!isAuthenticated) {
            login(
                "demo-token",
                { id: "1", name: "Demo User", email: "demo@skillhub.co" },
                "freelancer"
            );
        }
    }, [isAuthenticated, login]);

    // Profile Information
    const [bio, setBio] = useState(
        "Desarrolladora web con más de 5 años de experiencia creando aplicaciones modernas y escalables."
    );
    const [skills, setSkills] = useState<string[]>([
        "React",
        "Node.js",
        "TypeScript",
        "PostgreSQL",
    ]);
    const [newSkill, setNewSkill] = useState("");
    const [category, setCategory] = useState("tecnologia");
    const [serviceDescription, setServiceDescription] = useState(
        "Desarrollo de aplicaciones web, sitios corporativos, e-commerce y sistemas a medida."
    );
    const [experience, setExperience] = useState("5");

    // Pricing and Schedule
    const [hourlyRate, setHourlyRate] = useState("50000");
    const [workDays, setWorkDays] = useState({
        lunes: { enabled: true, start: "09:00", end: "18:00" },
        martes: { enabled: true, start: "09:00", end: "18:00" },
        miercoles: { enabled: true, start: "09:00", end: "18:00" },
        jueves: { enabled: true, start: "09:00", end: "18:00" },
        viernes: { enabled: true, start: "09:00", end: "15:00" },
        sabado: { enabled: false, start: "09:00", end: "13:00" },
        domingo: { enabled: false, start: "09:00", end: "13:00" },
    });

    const [saved, setSaved] = useState(false);

    const toggleDay = (day: string) => {
        setWorkDays((prev) => ({
            ...prev,
            [day]: {
                ...prev[day as keyof typeof prev],
                enabled: !prev[day as keyof typeof prev].enabled,
            },
        }));
    };

    const updateDayTime = (
        day: string,
        field: "start" | "end",
        value: string
    ) => {
        setWorkDays((prev) => ({
            ...prev,
            [day]: { ...prev[day as keyof typeof prev], [field]: value },
        }));
    };

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving settings:", {
            bio,
            skills,
            category,
            serviceDescription,
            experience,
            hourlyRate,
            workDays,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const daysOfWeek = [
        { key: "lunes", label: "Lunes" },
        { key: "martes", label: "Martes" },
        { key: "miercoles", label: "Miércoles" },
        { key: "jueves", label: "Jueves" },
        { key: "viernes", label: "Viernes" },
        { key: "sabado", label: "Sábado" },
        { key: "domingo", label: "Domingo" },
    ];

    const enabledDays = Object.entries(workDays).filter(
        ([_, data]) => data.enabled
    ).length;

    // Calculate profile completion
    const calculateProfileCompletion = () => {
        let completed = 0;
        const total = 6;

        if (bio.length >= 50) completed++;
        if (skills.length >= 3) completed++;
        if (category) completed++;
        if (serviceDescription.length >= 30) completed++;
        if (experience && parseInt(experience) > 0) completed++;
        if (hourlyRate && parseInt(hourlyRate) >= 10000) completed++;

        return Math.round((completed / total) * 100);
    };

    const profileCompletion = calculateProfileCompletion();

    return (
        <div className="min-h-screen bg-background">
            <UserTypeSwitcher />

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Configuración de Perfil y Servicio
                    </h1>
                    <p className="text-muted-foreground">
                        Completa tu perfil profesional, habilidades,
                        disponibilidad y tarifas
                    </p>
                </div>

                {saved && (
                    <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-xl flex items-center gap-3">
                        <CheckCircle2 className="text-success" size={20} />
                        <span className="text-success font-medium">
                            Configuración guardada exitosamente
                        </span>
                    </div>
                )}

                {/* Profile Completion */}
                <div className="mb-6 bg-card rounded-xl border border-border p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Briefcase className="text-primary" size={20} />
                            <h3 className="text-foreground font-bold">
                                Progreso del Perfil
                            </h3>
                        </div>
                        <span
                            className={`text-lg font-bold ${profileCompletion === 100 ? "text-success" : "text-primary"}`}
                        >
                            {profileCompletion}%
                        </span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${
                                profileCompletion === 100
                                    ? "bg-success"
                                    : "bg-primary"
                            }`}
                            style={{ width: `${profileCompletion}%` }}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        {profileCompletion === 100
                            ? "¡Perfil completo! Estás listo para recibir solicitudes."
                            : "Completa tu perfil para aumentar tus oportunidades de trabajo."}
                    </p>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    {/* Profile Information */}
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <User className="text-primary" size={24} />
                            Información del Perfil
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Biografía Profesional{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Describe tu experiencia, especialización y enfoque profesional..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground resize-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                    required
                                    maxLength={500}
                                />
                                <p className="text-xs text-muted-foreground mt-2">
                                    {bio.length}/500 caracteres
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Categoría Principal{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                        className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                        required
                                    >
                                        <option value="tecnologia">
                                            Tecnología
                                        </option>
                                        <option value="hogar">Hogar</option>
                                        <option value="educacion">
                                            Educación
                                        </option>
                                        <option value="salud">
                                            Salud y Bienestar
                                        </option>
                                        <option value="eventos">Eventos</option>
                                        <option value="transporte">
                                            Transporte
                                        </option>
                                        <option value="creatividad">
                                            Creatividad
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Años de Experiencia{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="50"
                                        value={experience}
                                        onChange={(e) =>
                                            setExperience(e.target.value)
                                        }
                                        className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Descripción de Servicios{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <textarea
                                    value={serviceDescription}
                                    onChange={(e) =>
                                        setServiceDescription(e.target.value)
                                    }
                                    placeholder="Describe los servicios específicos que ofreces..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground resize-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                    required
                                    maxLength={300}
                                />
                                <p className="text-xs text-muted-foreground mt-2">
                                    {serviceDescription.length}/300 caracteres
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <Award className="text-primary" size={24} />
                            Habilidades Clave
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Agregar Habilidad
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newSkill}
                                        onChange={(e) =>
                                            setNewSkill(e.target.value)
                                        }
                                        onKeyPress={(e) =>
                                            e.key === "Enter" &&
                                            (e.preventDefault(), addSkill())
                                        }
                                        placeholder="Ej: React, Plomería, Diseño Gráfico..."
                                        className="flex-1 px-4 py-2.5 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                    />
                                    <Button
                                        type="button"
                                        variant="solid"
                                        color="primary"
                                        onClick={addSkill}
                                        disabled={!newSkill.trim()}
                                    >
                                        <Plus size={18} />
                                        <span className="hidden sm:inline">
                                            Agregar
                                        </span>
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Presiona Enter o haz clic en Agregar
                                </p>
                            </div>

                            {skills.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Tus Habilidades ({skills.length})
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill) => (
                                            <div
                                                key={skill}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-lg font-medium"
                                            >
                                                <span className="text-sm">
                                                    {skill}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeSkill(skill)
                                                    }
                                                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {skills.length === 0 && (
                                <div className="p-4 bg-muted/50 rounded-xl text-center border border-border">
                                    <p className="text-sm text-muted-foreground">
                                        No has agregado habilidades aún. Agrega
                                        al menos 3 para completar tu perfil.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hourly Rate */}
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <DollarSign className="text-primary" size={24} />
                            Tarifa por Hora
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Precio Base (COP/hora){" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        min="10000"
                                        step="1000"
                                        value={hourlyRate}
                                        onChange={(e) =>
                                            setHourlyRate(e.target.value)
                                        }
                                        className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-input bg-background text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                        required
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                                        COP
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Este es tu precio base. Podrás ajustarlo
                                    para cada servicio según la complejidad.
                                </p>
                            </div>

                            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            2 horas
                                        </p>
                                        <p className="text-lg font-bold text-foreground">
                                            $
                                            {(
                                                parseFloat(hourlyRate) * 2 || 0
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            4 horas
                                        </p>
                                        <p className="text-lg font-bold text-foreground">
                                            $
                                            {(
                                                parseFloat(hourlyRate) * 4 || 0
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            8 horas
                                        </p>
                                        <p className="text-lg font-bold text-foreground">
                                            $
                                            {(
                                                parseFloat(hourlyRate) * 8 || 0
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Work Schedule */}
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <Calendar className="text-primary" size={24} />
                                Días y Horarios de Trabajo
                            </h2>
                            <span className="text-sm font-medium text-muted-foreground">
                                {enabledDays}{" "}
                                {enabledDays === 1 ? "día" : "días"} habilitados
                            </span>
                        </div>

                        <div className="space-y-3">
                            {daysOfWeek.map(({ key, label }) => {
                                const dayData =
                                    workDays[key as keyof typeof workDays];
                                return (
                                    <div
                                        key={key}
                                        className={`p-4 rounded-xl border-2 transition-all ${
                                            dayData.enabled
                                                ? "border-primary/30 bg-primary/5"
                                                : "border-border bg-muted/30"
                                        }`}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                                            {/* Day Toggle */}
                                            <div className="flex items-center gap-3 md:w-40">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleDay(key)
                                                    }
                                                    className={`w-12 h-6 rounded-full transition-all ${
                                                        dayData.enabled
                                                            ? "bg-primary"
                                                            : "bg-muted"
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                                                            dayData.enabled
                                                                ? "translate-x-6"
                                                                : "translate-x-0.5"
                                                        }`}
                                                    />
                                                </button>
                                                <span
                                                    className={`font-medium ${dayData.enabled ? "text-foreground" : "text-muted-foreground"}`}
                                                >
                                                    {label}
                                                </span>
                                            </div>

                                            {/* Time Inputs */}
                                            {dayData.enabled && (
                                                <div className="flex-1 flex items-center gap-4">
                                                    <div className="flex-1">
                                                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                                                            Inicio
                                                        </label>
                                                        <input
                                                            type="time"
                                                            value={
                                                                dayData.start
                                                            }
                                                            onChange={(e) =>
                                                                updateDayTime(
                                                                    key,
                                                                    "start",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                                        />
                                                    </div>
                                                    <span className="text-muted-foreground mt-5 font-bold">
                                                        -
                                                    </span>
                                                    <div className="flex-1">
                                                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                                                            Fin
                                                        </label>
                                                        <input
                                                            type="time"
                                                            value={dayData.end}
                                                            onChange={(e) =>
                                                                updateDayTime(
                                                                    key,
                                                                    "end",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4 p-4 bg-muted/50 rounded-xl border border-border">
                            <div className="flex items-start gap-3">
                                <Clock
                                    className="text-primary flex-shrink-0 mt-0.5"
                                    size={18}
                                />
                                <div>
                                    <p className="text-sm font-bold text-foreground mb-1">
                                        Configuración de Horarios
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Define tus días y horarios de trabajo.
                                        Los clientes podrán solicitar servicios
                                        dentro de estos horarios. Puedes ajustar
                                        caso por caso al aceptar cada solicitud.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle
                                className="text-primary flex-shrink-0 mt-0.5"
                                size={20}
                            />
                            <div>
                                <h3 className="font-bold text-foreground mb-2">
                                    Importante
                                </h3>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        • Tu perfil completo será visible
                                        públicamente para los clientes
                                    </li>
                                    <li>
                                        • Un perfil completo con buena
                                        descripción aumenta tus posibilidades de
                                        recibir solicitudes
                                    </li>
                                    <li>
                                        • La tarifa base es visible, pero podrás
                                        ajustarla para cada servicio individual
                                    </li>
                                    <li>
                                        • Los horarios configurados son tu
                                        disponibilidad general
                                    </li>
                                    <li>
                                        • Puedes aceptar solicitudes fuera de tu
                                        horario si lo deseas
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <Button
                        type="submit"
                        variant="solid"
                        color="primary"
                        size="lg"
                        fullWidth
                    >
                        <Save size={20} />
                        Guardar Configuración
                    </Button>
                </form>
            </div>
        </div>
    );
}
