import React from "react";
import { Card, CardBody } from "../ui/Card";
import { CategoryType } from "../ui/CategoryIcon";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import { Button } from "../ui/Button";

export interface FreelancerCardProps {
    id: string;
    name: string;
    location: string;
    category: CategoryType;
    rating: number;
    reviews: number;
    servicesCompleted: number;
    hourlyRate: string;
    skills: string[];
    isTopTalent: boolean;
    bio: string;
}

export function FreelancerCard({
    name,
    location,
    rating,
    reviews,
    hourlyRate,
    skills,
    isTopTalent,
    bio,
}: FreelancerCardProps) {
    return (
        <Card hoverable className="flex flex-col h-full">
            <CardBody className="flex-1 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                            {name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground flex items-center gap-1">
                                {name}
                                {isTopTalent && (
                                    <BadgeCheck
                                        size={16}
                                        className="text-primary"
                                    />
                                )}
                            </h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin size={12} /> {location}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-foreground">
                            ${hourlyRate}
                        </p>
                        <p className="text-xs text-muted-foreground">/ hora</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <Star
                        size={16}
                        className="text-yellow-500 fill-yellow-500"
                    />
                    <span className="font-medium text-foreground">
                        {rating}
                    </span>
                    <span className="text-muted-foreground">
                        ({reviews} reseñas)
                    </span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                    {bio}
                </p>

                <div className="flex flex-wrap gap-2">
                    {skills.slice(0, 3).map((skill, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md border border-border"
                        >
                            {skill}
                        </span>
                    ))}
                    {skills.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md border border-border">
                            +{skills.length - 3}
                        </span>
                    )}
                </div>
            </CardBody>
            <div className="p-4 border-t border-border flex gap-2">
                <Button variant="outline" color="primary" fullWidth size="sm">
                    Ver perfil
                </Button>
                <Button variant="solid" color="primary" fullWidth size="sm">
                    Contactar
                </Button>
            </div>
        </Card>
    );
}
