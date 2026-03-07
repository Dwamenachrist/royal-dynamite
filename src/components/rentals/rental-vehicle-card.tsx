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
            <div className="relative bg-white dark:bg-zinc-900 rounded-2xl border border-border/40 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-rd-gold/30 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(15,34,61,0.08),0_4px_12px_rgba(212,175,55,0.05)]">
                {/* Gold top accent — visible on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-rd-gold/0 via-rd-gold to-rd-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Image Zone */}
                <div className="relative aspect-[16/10] bg-[#F5F5F7] dark:bg-zinc-800 overflow-hidden">
                    <Image
                        src={vehicle.images[0]}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Subtle bottom reflection gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-4 space-y-2.5">
                    {/* Name + Rating */}
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif font-bold text-[15px] leading-snug text-rd-navy dark:text-white group-hover:text-rd-navy/80 transition-colors">
                            {vehicle.make} {vehicle.model}
                        </h3>
                        {vehicle.rating && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 mt-0.5">
                                <Star className="h-3 w-3 fill-rd-gold text-rd-gold" />
                                <span className="font-medium">{vehicle.rating}</span>
                            </div>
                        )}
                    </div>

                    {/* Specs line */}
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        {specs}
                    </p>

                    {/* Badges + Price row */}
                    <div className="flex items-end justify-between pt-1">
                        <div className="flex gap-1.5">
                            <Badge
                                variant="secondary"
                                className="text-[10px] px-2 py-0.5 rounded-full bg-[#F0F0F0] dark:bg-white/10 text-foreground/70 font-medium uppercase tracking-wide border-0"
                            >
                                {vehicle.category}
                            </Badge>
                            {tierLabel && (
                                <Badge
                                    variant="secondary"
                                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium border-0 ${
                                        tierLabel === "Premium"
                                            ? "bg-[#FBF5E6] dark:bg-rd-gold/10 text-rd-gold"
                                            : "bg-[#F0F0F0] dark:bg-white/10 text-foreground/70"
                                    }`}
                                >
                                    {tierLabel}
                                </Badge>
                            )}
                        </div>

                        {/* Price */}
                        <div className="text-right">
                            {vehicle.dailyRate ? (
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-[11px] text-muted-foreground">GH₵</span>
                                    <span className="text-lg font-serif font-bold text-rd-gold">{vehicle.dailyRate}</span>
                                    <span className="text-[11px] text-muted-foreground">/day</span>
                                </div>
                            ) : (
                                <span className="text-xs text-muted-foreground">Contact for rate</span>
                            )}
                        </div>
                    </div>

                    {/* View Details button */}
                    <button className="w-full mt-1 py-2.5 rounded-lg text-xs font-semibold border border-rd-navy/15 text-rd-navy dark:text-white dark:border-white/15 hover:bg-rd-navy hover:text-white dark:hover:bg-rd-gold dark:hover:text-rd-navy transition-all duration-300 group-hover:border-rd-navy/30">
                        View Details
                    </button>
                </div>
            </div>
        </Link>
    );
}
