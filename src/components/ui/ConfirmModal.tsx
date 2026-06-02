import React, { useState } from 'react';
import { Button } from './Button';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  title: string;
  description: string;
  confirmText: string;
  confirmColor?: 'primary' | 'secondary' | 'success' | 'destructive';
  requiresReason?: boolean;
  icon?: React.ReactNode;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  confirmColor = 'primary',
  requiresReason = false,
  icon,
}: ConfirmModalProps) {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(requiresReason ? reason : undefined);
    setReason('');
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
        <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {icon && (
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                    ${confirmColor === 'destructive' ? 'bg-destructive/10' :
                      confirmColor === 'success' ? 'bg-success/10' :
                      confirmColor === 'secondary' ? 'bg-secondary/10' : 'bg-primary/10'}
                  `}>
                    {icon}
                  </div>
                )}
                <div>
                  <h2 className="text-xl text-foreground mb-1">{title}</h2>
                  <p className="text-sm text-muted-foreground">{description}</p>
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
          <div className="p-6">
            {requiresReason && (
              <div className="mb-4">
                <label className="block text-sm text-foreground mb-2">
                  Motivo {requiresReason && <span className="text-destructive">*</span>}
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe brevemente el motivo..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-input bg-input-background text-foreground placeholder:text-muted-foreground resize-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none"
                  required={requiresReason}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {reason.length}/500 caracteres
                </p>
              </div>
            )}

            {confirmColor === 'destructive' && (
              <div className="flex items-start gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg mb-4">
                <AlertTriangle className="text-destructive flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-foreground">
                  Esta acción no se puede deshacer. El otro usuario será notificado.
                </p>
              </div>
            )}
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
              color={confirmColor}
              onClick={handleConfirm}
              fullWidth
              disabled={requiresReason && !reason.trim()}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
