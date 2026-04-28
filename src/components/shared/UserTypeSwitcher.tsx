"use client";

import React from "react";
import { useUser, UserType } from "../../contexts/UserContext";
import { Briefcase, Search } from "lucide-react";

export function UserTypeSwitcher() {
    const { userType, login, user } = useUser();

    if (!user) return null;

    const handleSwitch = (type: UserType) => {
        login(localStorage.getItem("token") || "demo-token", user, type);
    };

    return (
        <div className="bg-muted py-2 border-b border-border">
            <div className="max-w-4xl mx-auto px-4 flex justify-center">
                <div className="bg-background rounded-xl p-1 inline-flex gap-1 shadow-sm border border-border">
                    <button
                        onClick={() => handleSwitch("freelancer")}
                        className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                            userType === "freelancer"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                    >
                        <Briefcase size={16} />
                        Modo Prestador
                    </button>
                    <button
                        onClick={() => handleSwitch("client")}
                        className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                            userType === "client"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                    >
                        <Search size={16} />
                        Modo Cliente
                    </button>
                </div>
            </div>
        </div>
    );
}
