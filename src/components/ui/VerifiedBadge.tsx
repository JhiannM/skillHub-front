import React from "react";
import { ShieldCheck } from "lucide-react";

export function VerifiedBadge() {
    return (
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-success/10 rounded-lg">
            <ShieldCheck className="text-success" size={16} />
            <span className="text-xs text-success">Verificado</span>
        </div>
    );
}
