"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../../components/ui/Button";
import { FilterChip } from "../../components/ui/FilterChip";
import { FreelancerCard } from "../../components/modules/FreelancerCard";
import {
    FilterModal,
    FilterValues,
} from "../../components/modules/FilterModal";
import { Search, SlidersHorizontal, X } from "lucide-react";
import api from "../../lib/axios";

const VALID_CATEGORIES = [
    "TECNOLOGIA",
    "HOGAR",
    "SALUD",
    "EDUCACION",
    "MECANICA",
    "CONSTRUCCION",
    "FONTANERIA",
    "MANUFACTURA",
    "EVENTOS",
    "TRANSPORTE",
    "CREATIVIDAD",
];

const CATEGORY_LABELS: Record<string, string> = {
    TECNOLOGIA: "Tecnología",
    HOGAR: "Hogar",
    SALUD: "Salud y Bienestar",
    EDUCACION: "Educación",
    MECANICA: "Mecánica",
    CONSTRUCCION: "Construcción",
    FONTANERIA: "Fontanería",
    MANUFACTURA: "Manufactura",
    EVENTOS: "Eventos",
    TRANSPORTE: "Transporte",
    CREATIVIDAD: "Creatividad",
};

export default function SearchPage() {
    // Inputs & Filters State
    const [searchInput, setSearchInput] = useState("");
    const [activeKeyword, setActiveKeyword] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");

    // API Data State
    const [providers, setProviders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    // Dynamic search and filter fetch logic
    const fetchProviders = useCallback(async (
        currentPage: number,
        keyword: string,
        category: string | null,
        minP: string,
        maxP: string,
        append: boolean = false
    ) => {
        try {
            if (append) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }

            const params: Record<string, any> = {
                page: currentPage,
                limit: 12,
            };

            if (keyword.trim()) {
                params.keyword = keyword.trim();
            }
            if (category) {
                params.category = category;
            }
            if (minP) {
                params.minPrice = Number(minP);
            }
            if (maxP) {
                params.maxPrice = Number(maxP);
            }

            const { data } = await api.get("/providers/search", { params });

            if (data.success && data.data) {
                const newProviders = data.data.providers || [];
                const limit = data.data.limit || 12;

                setProviders(prev => append ? [...prev, ...newProviders] : newProviders);
                setHasMore(newProviders.length >= limit);
            } else {
                if (!append) {
                    setProviders([]);
                }
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching providers from backend API", error);
            if (!append) {
                setProviders([]);
            }
            setHasMore(false);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    // Initial fetch and trigger fetch on filter changes
    useEffect(() => {
        setPage(1);
        fetchProviders(1, activeKeyword, selectedCategory, priceMin, priceMax, false);
    }, [activeKeyword, selectedCategory, priceMin, priceMax, fetchProviders]);

    const handleSearchSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setActiveKeyword(searchInput);
    };

    const handleClearSearch = () => {
        setSearchInput("");
        setActiveKeyword("");
    };

    const handleApplyFilters = (filters: FilterValues) => {
        setPriceMin(filters.priceMin);
        setPriceMax(filters.priceMax);
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProviders(nextPage, activeKeyword, selectedCategory, priceMin, priceMax, true);
    };

    const handleClearAllFilters = () => {
        setSearchInput("");
        setActiveKeyword("");
        setSelectedCategory(null);
        setPriceMin("");
        setPriceMax("");
    };

    const hasActiveFilters =
        activeKeyword ||
        selectedCategory ||
        priceMin ||
        priceMax;

    return (
        <div className="bg-background min-h-screen pb-12">
            {/* Search Header */}
            <div className="sticky top-0 z-30 bg-card border-b border-border shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    {/* Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="flex gap-3 mb-4">
                        <div className="flex-1 relative">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, biografía o habilidad..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full pl-12 pr-10 py-3 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                            />
                            {searchInput && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                        <Button
                            type="submit"
                            variant="solid"
                            color="primary"
                            size="md"
                            className="px-6 shadow-md"
                        >
                            <Search size={18} className="sm:mr-2" />
                            <span className="hidden sm:inline">Buscar</span>
                        </Button>
                    </form>

                    {/* Category Chips - VALID_CATEGORIES */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                        {VALID_CATEGORIES.map((catKey) => {
                            const isSelected = selectedCategory === catKey;
                            return (
                                <FilterChip
                                    key={catKey}
                                    label={CATEGORY_LABELS[catKey] || catKey}
                                    active={isSelected}
                                    onClick={() =>
                                        setSelectedCategory(isSelected ? null : catKey)
                                    }
                                    onRemove={() => setSelectedCategory(null)}
                                />
                            );
                        })}

                        <div className="w-px h-6 bg-border mx-1 shrink-0" />

                        {/* Advanced Filters Trigger */}
                        <button
                            type="button"
                            onClick={() => setIsFilterModalOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm transition-all"
                        >
                            <SlidersHorizontal size={16} />
                            <span>Filtros</span>
                            {(priceMin || priceMax) && (
                                <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
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
                            {activeKeyword
                                ? `Resultados para "${activeKeyword}"`
                                : "Explora Profesionales"}
                        </h2>
                        {!loading && (
                            <p className="text-sm text-muted-foreground">
                                {providers.length} profesionales encontrados
                                {selectedCategory && ` en ${CATEGORY_LABELS[selectedCategory]}`}
                            </p>
                        )}
                    </div>

                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={handleClearAllFilters}
                            className="text-sm text-primary hover:underline flex items-center gap-1 font-semibold transition-colors"
                        >
                            <X size={14} />
                            Limpiar filtros
                        </button>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-card rounded-2xl border border-border p-6 h-60 animate-pulse space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-12 h-12 bg-muted rounded-full" />
                                        <div className="space-y-2">
                                            <div className="h-4 bg-muted w-24 rounded" />
                                            <div className="h-3 bg-muted w-16 rounded" />
                                        </div>
                                    </div>
                                    <div className="h-4 bg-muted w-16 rounded" />
                                </div>
                                <div className="h-4 bg-muted w-3/4 rounded" />
                                <div className="h-4 bg-muted w-1/2 rounded" />
                                <div className="flex gap-2 pt-2">
                                    <div className="h-6 bg-muted w-12 rounded" />
                                    <div className="h-6 bg-muted w-12 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && providers.length === 0 && (
                    <div className="text-center py-16 bg-card rounded-2xl border border-border max-w-xl mx-auto shadow-sm">
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
                            Intenta ajustar tus filtros o prueba con otras palabras clave
                        </p>
                        <Button
                            variant="outline"
                            color="primary"
                            onClick={handleClearAllFilters}
                        >
                            Limpiar filtros
                        </Button>
                    </div>
                )}

                {/* Results Grid */}
                {!loading && providers.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {providers.map((p) => {
                            // Map category backend format to CategoryIcon format
                            const displayCategory = p.main_category?.toLowerCase() || "tecnologia";

                            return (
                                <FreelancerCard
                                    key={p.user_id}
                                    id={p.user_id}
                                    name={p.name}
                                    category={displayCategory}
                                    hourlyRate={parseInt(p.base_price || "0").toLocaleString("es-CO")}
                                    skills={p.skills || []}
                                    isTopTalent={p.profile_completion === 100}
                                    bio={p.bio || "Sin biografía profesional aún."}
                                    servicesCompleted={p.services_done || 0}
                                />
                            );
                        })}
                    </div>
                )}

                {/* Load More Button */}
                {!loading && hasMore && (
                    <div className="text-center mt-12">
                        <Button
                            variant="outline"
                            color="primary"
                            size="lg"
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            className="min-w-[200px]"
                        >
                            {loadingMore ? "Cargando..." : "Cargar más profesionales"}
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
        </div>
    );
}
