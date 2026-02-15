import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Vehicle } from "@/types";
import { Badge } from "@/components/ui/badge";

interface RentalVehicleCardProps {
    vehicle: Vehicle;
}

export function RentalVehicleCard({ vehicle }: RentalVehicleCardProps) {
    const specs = [
        vehicle.engineSize,
        vehicle.fuelType,
        vehicle.transmission,
        vehicle.drivetrain,
    ]
        .filter(Boolean)
        .join(" · ");

    const tierLabel = vehicle.tier
        ? vehicle.tier.charAt(0).toUpperCase() + vehicle.tier.slice(1)
        : null;

    return (
        <Link href={`/rentals/${vehicle.id}`} className="block group">
            <div className="premium-card h-full flex flex-col">
                {/* Image Zone */}
                <div className="relative aspect-[16/10] bg-[#F5F5F7] dark:bg-zinc-800 overflow-hidden border-b border-border/40">
                    <Image
                        src={vehicle.images[0]}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Tier Badge (Absolute) */}
                    {tierLabel && (
                        <div className="absolute top-3 right-3">
                            <Badge
                                variant="secondary"
                                className={`text-[10px] px-2 py-0.5 rounded-full font-medium border-0 backdrop-blur-md shadow-sm ${tierLabel === "Premium"
                                    ? "bg-rd-gold/90 text-rd-navy"
                                    : "bg-white/90 text-zinc-800"
                                    }`}
                            >
                                {tierLabel}
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    {/* Header: Make/Model & Rating */}
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">
                                {vehicle.category}
                            </div>
                            <h3 className="font-serif font-bold text-lg leading-tight text-rd-navy dark:text-white group-hover:text-rd-gold transition-colors">
                                {vehicle.make} {vehicle.model}
                            </h3>
                        </div>
                        {vehicle.rating && (
                            <div className="flex items-center gap-1 bg-rd-gold/10 px-1.5 py-0.5 rounded text-xs text-rd-gold font-medium">
                                <Star className="h-3 w-3 fill-current" />
                                <span>{vehicle.rating}</span>
                            </div>
                        )}
                    </div>

                    {/* Specs / Features */}
                    <div className="mt-auto pt-4 border-t border-border/40">
                        <div className="flex items-end justify-between">
                            <div className="text-right w-full flex items-center justify-between">
                                <span className="text-xs text-muted-foreground font-medium">Daily Rate</span>
                                {vehicle.dailyRate ? (
                                    <div className="flex items-baseline gap-1 text-rd-gold">
                                        <span className="text-xs">GH₵</span>
                                        <span className="text-xl font-bold font-serif">{vehicle.dailyRate}</span>
                                    </div>
                                ) : (
                                    <span className="text-xs font-semibold text-rd-gold">Contact us</span>
                                )}
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-4">
                            <div className="w-full py-2.5 rounded-lg bg-rd-navy text-white text-sm font-semibold text-center transition-all duration-300 group-hover:bg-rd-gold group-hover:text-rd-navy shadow-sm">
                                Book Now
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
