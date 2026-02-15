import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Vehicle } from "@/types";
import { formatCurrency, generateWhatsAppLink } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VehicleCardProps {
    vehicle: Vehicle;
    showRentalPrice?: boolean;
}

export function VehicleCard({ vehicle, showRentalPrice = false }: VehicleCardProps) {
    const isRental = vehicle.status === "rent";
    const displayPrice = isRental && showRentalPrice
        ? vehicle.dailyRate
            ? `${formatCurrency(vehicle.dailyRate)}/day`
            : "Contact for Rate"
        : formatCurrency(vehicle.price);

    const whatsappMessage = isRental
        ? `Hello, I'm interested in renting the ${vehicle.year} ${vehicle.make} ${vehicle.model}.`
        : `Hello, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} listed for ${formatCurrency(vehicle.price)}.`;

    return (
        <Card className="premium-card group h-full flex flex-col border-none shadow-none bg-transparent p-0 overflow-hidden">
            {/* Image Zone - Cinematic 16:9 */}
            <div className="relative aspect-video bg-muted overflow-hidden border-b border-border/40">
                <Image
                    src={vehicle.images[0]}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Status Badge - Minimalist */}
                <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-md border-0 text-[10px] uppercase tracking-wider px-2 py-0.5">
                        {isRental ? "Rent" : "Sale"}
                    </Badge>
                </div>
            </div>

            {/* Content - Sleek & Compact */}
            <div className="p-4 flex flex-col flex-1 gap-3">
                {/* Header & Price Group */}
                <div>
                    {/* Dominant Gold Price */}
                    <div className="text-xl md:text-2xl font-serif font-bold text-rd-gold mb-1 leading-none">
                        {displayPrice}
                    </div>
                    {/* Concise Title */}
                    <h3 className="font-medium text-base text-foreground/90 leading-tight group-hover:text-rd-navy dark:group-hover:text-white transition-colors">
                        <span className="text-muted-foreground font-normal">{vehicle.year}</span> {vehicle.make} {vehicle.model}
                    </h3>
                </div>

                {/* CTA Button - Full Width, Premium */}
                <div className="mt-auto pt-2">
                    <Button
                        className="w-full bg-rd-navy text-white hover:bg-rd-gold hover:text-rd-navy transition-all duration-300 font-medium text-xs uppercase tracking-wider h-9"
                        asChild
                    >
                        <a
                            href={generateWhatsAppLink(whatsappMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {isRental ? "Book Now" : "Enquire"}
                        </a>
                    </Button>
                </div>
            </div>
        </Card>
    );
}
