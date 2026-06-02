import React, { useState } from 'react';
import { Button } from './Button';
import { X, DollarSign, Clock, AlertCircle } from 'lucide-react';

interface PriceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { finalPrice: string; estimatedHours: string; notes: string }) => void;
  currentPrice: string;
  currentHours: string;
  hourlyRate: number;
}

export function PriceEditModal({
  isOpen,
  onClose,
  onSave,
  currentPrice,
  currentHours,
  hourlyRate,
}: PriceEditModalProps) {
  const [finalPrice, setFinalPrice] = useState(currentPrice);
  const [estimatedHours, setEstimatedHours] = useState(currentHours);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const calculateEstimatedPrice = () => {
    const hours = parseFloat(estimatedHours) || 0;
    return hours * hourlyRate;
  };

  const priceDifference = parseFloat(finalPrice) - calculateEstimatedPrice();

  const handleSave = () => {
    onSave({ finalPrice, estimatedHours, notes });
    setNotes('');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-xl text-foreground mb-1">Ajustar Precio y Horas</h2>
                  <p className="text-sm text-muted-foreground">
                    Personaliza la cotización según la complejidad
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors flex-shrink-0"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Estimated Hours */}
            <div>
              <label className="block text-sm text-foreground mb-2 flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                Horas Estimadas
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-input bg-input-background text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Tu tarifa base: ${hourlyRate.toLocaleString()} COP/hora
              </p>
            </div>

            {/* Calculated Price */}
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Precio calculado:</span>
                <span className="text-lg text-foreground">
                  ${calculateEstimatedPrice().toLocaleString()} COP
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {estimatedHours} hora(s) × ${hourlyRate.toLocaleString()} COP
              </p>
            </div>

            {/* Final Price */}
            <div>
              <label className="block text-sm text-foreground mb-2 flex items-center gap-2">
                <DollarSign size={16} className="text-primary" />
                Precio Final (COP)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-input bg-input-background text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                />
              </div>

              {priceDifference !== 0 && (
                <div className={`mt-2 text-xs ${priceDifference > 0 ? 'text-secondary' : 'text-success'}`}>
                  {priceDifference > 0 ? '+' : ''}{priceDifference.toLocaleString()} COP del precio base
                  {Math.abs(priceDifference) > 0 && ` (${priceDifference > 0 ? 'por complejidad adicional' : 'descuento aplicado'})`}
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm text-foreground mb-2">
                Notas sobre el ajuste (opcional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Explica el motivo del ajuste de precio..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-input bg-input-background text-foreground placeholder:text-muted-foreground resize-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
              />
            </div>

            {/* Info */}
            <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <AlertCircle className="text-primary flex-shrink-0 mt-0.5" size={16} />
              <p className="text-xs text-muted-foreground">
                El cliente será notificado del precio actualizado y las notas que agregues.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex gap-3">
            <Button
              variant="outline"
              color="primary"
              onClick={onClose}
              fullWidth
            >
              Cancelar
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={handleSave}
              fullWidth
            >
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
