"use client";

import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { FilterChip } from "../../components/ui/FilterChip";
import { FreelancerCard } from "../../components/modules/FreelancerCard";
import {
    FilterModal,
    FilterValues,
} from "../../components/modules/FilterModal";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CategoryType } from "../../components/ui/CategoryIcon";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [advancedFilters, setAdvancedFilters] = useState<FilterValues>({
        priceMin: "",
        priceMax: "",
        modality: [],
    });

    const categories = [
        { id: "tecnologia", label: "Tecnología" },
        { id: "hogar", label: "Hogar" },
        { id: "salud", label: "Salud" },
        { id: "educacion", label: "Educación" },
    ];

    const cities = [
        { id: "bogota", label: "Bogotá" },
        { id: "medellin", label: "Medellín" },
        { id: "cali", label: "Cali" },
        { id: "barranquilla", label: "Barranquilla" },
        { id: "mosquera", label: "Mosquera" },
    ];

    const freelancers = [
        {
            id: "1",
            name: "María González",
            location: "Bogotá, Colombia",
            category: "tecnologia" as CategoryType,
            rating: 4.9,
            reviews: 127,
            servicesCompleted: 145,
            hourlyRate: "50,000",
            skills: ["React", "Node.js", "TypeScript", "UI/UX"],
            isTopTalent: true,
            bio: "Desarrolladora web full-stack con 5+ años de experiencia. Especializada en aplicaciones modernas y escalables.",
        },
        {
            id: "2",
            name: "Carlos Ramírez",
            location: "Medellín, Colombia",
            category: "hogar" as CategoryType,
            rating: 5.0,
            reviews: 89,
            servicesCompleted: 92,
            hourlyRate: "35,000",
            skills: ["Electricidad", "Instalaciones", "Reparaciones"],
            isTopTalent: true,
            bio: "Electricista certificado con 10 años de experiencia. Trabajo residencial y comercial.",
        },
        {
            id: "3",
            name: "Ana Martínez",
            location: "Bogotá, Colombia",
            category: "educacion" as CategoryType,
            rating: 4.8,
            reviews: 156,
            servicesCompleted: 203,
            hourlyRate: "40,000",
            skills: ["Inglés", "TOEFL", "Business English"],
            isTopTalent: true,
            bio: "Profesora de inglés certificada. Clases personalizadas para todos los niveles.",
        },
        {
            id: "4",
            name: "Jorge López",
            location: "Cali, Colombia",
            category: "tecnologia" as CategoryType,
            rating: 4.7,
            reviews: 64,
            servicesCompleted: 71,
            hourlyRate: "45,000",
            skills: ["Python", "Django", "PostgreSQL"],
            isTopTalent: false,
            bio: "Desarrollador backend especializado en APIs y sistemas robustos.",
        },
        {
            id: "5",
            name: "Laura Sánchez",
            location: "Medellín, Colombia",
            category: "salud" as CategoryType,
            rating: 4.9,
            reviews: 112,
            servicesCompleted: 128,
            hourlyRate: "60,000",
            skills: ["Fisioterapia", "Rehabilitación", "Deportiva"],
            isTopTalent: true,
            bio: "Fisioterapeuta especializada en recuperación deportiva y lesiones.",
        },
        {
            id: "6",
            name: "Pedro Gómez",
            location: "Bogotá, Colombia",
            category: "hogar" as CategoryType,
            rating: 4.6,
            reviews: 43,
            servicesCompleted: 47,
            hourlyRate: "30,000",
            skills: ["Plomería", "Instalaciones", "Mantenimiento"],
            isTopTalent: false,
            bio: "Plomero profesional con experiencia en residencias y edificios.",
        },
    ];

    const handleApplyFilters = (filters: FilterValues) => {
        setAdvancedFilters(filters);
    };

    const hasActiveFilters =
        selectedCategory ||
        selectedCity ||
        advancedFilters.priceMin ||
        advancedFilters.priceMax ||
        advancedFilters.modality.length > 0;

    return (
        <div className="bg-background">
            {/* Search Header */}
            <div className="sticky top-0 z-30 bg-card border-b border-border shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    {/* Search Bar */}
                    <div className="flex gap-3 mb-4">
                        <div className="flex-1 relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Buscar por servicio o habilidad..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                        <Button
                            variant="solid"
                            color="primary"
                            size="md"
                            className="px-6"
                        >
                            <Search size={18} className="sm:mr-2" />
                            <span className="hidden sm:inline">Buscar</span>
                        </Button>
                    </div>

                    {/* Filter Chips */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                        {/* Categories */}
                        {categories.map((cat) => (
                            <FilterChip
                                key={cat.id}
                                label={cat.label}
                                active={selectedCategory === cat.id}
                                onClick={() =>
                                    setSelectedCategory(
                                        selectedCategory === cat.id
                                            ? null
                                            : cat.id
                                    )
                                }
                                onRemove={() => setSelectedCategory(null)}
                            />
                        ))}

                        <div className="w-px h-6 bg-border mx-1" />

                        {/* Cities */}
                        {cities.slice(0, 3).map((city) => (
                            <FilterChip
                                key={city.id}
                                label={city.label}
                                active={selectedCity === city.id}
                                onClick={() =>
                                    setSelectedCity(
                                        selectedCity === city.id
                                            ? null
                                            : city.id
                                    )
                                }
                                onRemove={() => setSelectedCity(null)}
                            />
                        ))}

                        <div className="w-px h-6 bg-border mx-1" />

                        {/* Advanced Filters Button */}
                        <button
                            onClick={() => setIsFilterModalOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md transition-all"
                        >
                            <SlidersHorizontal size={16} />
                            <span>Filtros</span>
                            {(advancedFilters.priceMin ||
                                advancedFilters.priceMax ||
                                advancedFilters.modality.length > 0) && (
                                <span className="w-2 h-2 bg-white rounded-full" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-1">
                            {searchQuery
                                ? `Resultados para "${searchQuery}"`
                                : "Explora Profesionales"}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {freelancers.length} profesionales disponibles
                            {selectedCity &&
                                ` en ${cities.find((c) => c.id === selectedCity)?.label}`}
                        </p>
                    </div>

                    {hasActiveFilters && (
                        <button
                            onClick={() => {
                                setSelectedCategory(null);
                                setSelectedCity(null);
                                setAdvancedFilters({
                                    priceMin: "",
                                    priceMax: "",
                                    modality: [],
                                });
                            }}
                            className="text-sm text-primary hover:underline flex items-center gap-1 font-medium"
                        >
                            <X size={14} />
                            Limpiar filtros
                        </button>
                    )}
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {freelancers.map((freelancer) => (
                        <FreelancerCard key={freelancer.id} {...freelancer} />
                    ))}
                </div>

                {/* Empty State */}
                {freelancers.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search
                                className="text-muted-foreground"
                                size={32}
                            />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                            No encontramos resultados
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Intenta ajustar tus filtros o prueba con otras
                            palabras clave
                        </p>
                        <Button variant="outline" color="primary">
                            Limpiar filtros
                        </Button>
                    </div>
                )}

                {/* Load More */}
                {freelancers.length > 0 && (
                    <div className="text-center mt-12">
                        <Button variant="outline" color="primary" size="lg">
                            Cargar más profesionales
                        </Button>
                    </div>
                )}
            </div>

            {/* Filter Modal */}
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleApplyFilters}
            />

            {/* Floating Action Button - Mobile Only */}
            <button
                onClick={() => setIsFilterModalOpen(true)}
                className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-secondary text-secondary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-secondary/80 transition-all z-40"
            >
                <SlidersHorizontal size={24} />
                {(advancedFilters.priceMin ||
                    advancedFilters.priceMax ||
                    advancedFilters.modality.length > 0) && (
                    <span className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full border-2 border-secondary" />
                )}
            </button>
        </div>
    );
}
