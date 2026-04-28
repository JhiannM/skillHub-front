import React, { useState } from "react";
import { Button } from "../ui/Button";
import { X, DollarSign, MapPin } from "lucide-react";

export interface FilterValues {
    priceMin: string;
    priceMax: string;
    modality: string[];
}

export interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterValues) => void;
}

export function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [modality, setModality] = useState<string[]>([]);

    if (!isOpen) return null;

    const handleModalityToggle = (value: string) => {
        setModality((prev) =>
            prev.includes(value)
                ? prev.filter((m) => m !== value)
                : [...prev, value]
        );
    };

    const handleApply = () => {
        onApply({ priceMin, priceMax, modality });
        onClose();
    };

    const handleClear = () => {
        setPriceMin("");
        setPriceMax("");
        setModality([]);
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50">
                <div className="bg-card rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:max-w-lg md:mx-4 max-h-[85vh] md:max-h-[90vh] overflow-hidden flex flex-col border border-border">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border bg-card">
                        <h2 className="text-xl font-bold text-foreground">
                            Filtros Avanzados
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                        >
                            <X size={20} className="text-muted-foreground" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-card">
                        {/* Price Range */}
                        <div>
                            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                                <DollarSign
                                    size={18}
                                    className="text-primary"
                                />
                                Rango de Precio (COP/hora)
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm text-muted-foreground mb-1.5">
                                        Mínimo
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="20,000"
                                        value={priceMin}
                                        onChange={(e) =>
                                            setPriceMin(e.target.value)
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground transition-all duration-200 outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-muted-foreground mb-1.5">
                                        Máximo
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="100,000"
                                        value={priceMax}
                                        onChange={(e) =>
                                            setPriceMax(e.target.value)
                                        }
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground transition-all duration-200 outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => {
                                        setPriceMin("0");
                                        setPriceMax("30000");
                                    }}
                                    className="px-3 py-1.5 text-xs bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors border border-border"
                                >
                                    {"<"} 30k
                                </button>
                                <button
                                    onClick={() => {
                                        setPriceMin("30000");
                                        setPriceMax("60000");
                                    }}
                                    className="px-3 py-1.5 text-xs bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors border border-border"
                                >
                                    30k - 60k
                                </button>
                                <button
                                    onClick={() => {
                                        setPriceMin("60000");
                                        setPriceMax("");
                                    }}
                                    className="px-3 py-1.5 text-xs bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors border border-border"
                                >
                                    {">"} 60k
                                </button>
                            </div>
                        </div>

                        {/* Modality */}
                        <div>
                            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                                <MapPin size={18} className="text-primary" />
                                Modalidad
                            </h3>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-border bg-background hover:border-ring cursor-pointer transition-all">
                                    <input
                                        type="checkbox"
                                        checked={modality.includes("domicilio")}
                                        onChange={() =>
                                            handleModalityToggle("domicilio")
                                        }
                                        className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-ring"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            A Domicilio
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            El profesional va hasta tu ubicación
                                        </p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-border bg-background hover:border-ring cursor-pointer transition-all">
                                    <input
                                        type="checkbox"
                                        checked={modality.includes(
                                            "punto-pactado"
                                        )}
                                        onChange={() =>
                                            handleModalityToggle(
                                                "punto-pactado"
                                            )
                                        }
                                        className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-ring"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            Punto Pactado
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Acuerdan lugar de encuentro
                                        </p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-border bg-background hover:border-ring cursor-pointer transition-all">
                                    <input
                                        type="checkbox"
                                        checked={modality.includes("remoto")}
                                        onChange={() =>
                                            handleModalityToggle("remoto")
                                        }
                                        className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-ring"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            Remoto
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Trabajo 100% virtual
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-border flex gap-3 bg-card">
                        <Button
                            variant="ghost"
                            color="primary"
                            onClick={handleClear}
                            className="flex-1"
                        >
                            Limpiar
                        </Button>
                        <Button
                            variant="solid"
                            color="primary"
                            onClick={handleApply}
                            className="flex-1"
                        >
                            Aplicar Filtros
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
