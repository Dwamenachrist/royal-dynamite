import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
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
        <Card className="group overflow-hidden border-border/40 hover:border-rd-gold/25 bg-card transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,34,61,0.1),0_4px_12px_rgba(212,175,55,0.06)]">
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                    src={vehicle.images[0]}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                    <Badge variant={isRental ? "secondary" : "default"} className={`${isRental ? "bg-white/90 text-black backdrop-blur-sm" : "bg-rd-navy text-white"} shadow-sm`}>
                        {isRental ? "For Rent" : "For Sale"}
                    </Badge>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-black/40 text-white backdrop-blur-md border-none uppercase text-[10px] tracking-wider">
                        {vehicle.category}
                    </Badge>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Content */}
            <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex justify-between items-start gap-2">
                    <div>
                        <h3 className="font-bold text-lg leading-tight group-hover:text-rd-navy dark:group-hover:text-rd-gold transition-colors">
                            {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            {vehicle.year} • {vehicle.transmission}
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-5 pb-4">
                <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold font-serif text-rd-navy dark:text-rd-gold">{displayPrice}</span>
                </div>
                <div className="flex gap-2 mt-3 text-xs text-muted-foreground">
                    <span className="bg-rd-navy/5 dark:bg-white/5 px-2.5 py-1 rounded-full font-medium">{(vehicle.mileage || 0).toLocaleString()} km</span>
                    <span className="bg-rd-navy/5 dark:bg-white/5 px-2.5 py-1 rounded-full font-medium">{vehicle.fuelType}</span>
                </div>
            </CardContent>

            <CardFooter className="px-5 pb-5 pt-0 flex gap-3">
                <Button variant="outline" className="flex-1 border-rd-navy/20 hover:border-rd-navy/40 hover:bg-rd-navy/5 text-rd-navy dark:text-rd-gold dark:border-rd-gold/20 dark:hover:bg-rd-gold/10 rounded-full" asChild>
                    <Link href={isRental ? `/rentals/${vehicle.id}` : `/dealership/${vehicle.id}`}>
                        Details
                    </Link>
                </Button>
                <Button className="flex-1 bg-rd-gold hover:bg-rd-gold/90 text-rd-navy font-bold" asChild>
                    <a
                        href={generateWhatsAppLink(whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}
