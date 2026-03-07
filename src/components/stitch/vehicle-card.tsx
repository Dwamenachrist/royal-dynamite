"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Vehicle } from "@/types";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/constants";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface StitchVehicleCardProps {
    vehicle: Vehicle;
}

export function StitchVehicleCard({ vehicle }: StitchVehicleCardProps) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
    const [spotlightOpacity, setSpotlightOpacity] = useState(0);
    const isRental = vehicle.status === "rent";

    // Formatting Law enforcement
    // Only Rentals have price displayed. Sales do NOT show price in the grid explicitly or use a different tag.
    const priceDisplay = isRental
        ? vehicle.dailyRate ? `${formatCurrency(vehicle.dailyRate)}/day` : "Contact for Rate"
        : null;

    const buttonText = "View Details";

    // Status Badge Logic - Minimal & Clean
    let badgeText = "";
    let badgeColor = "bg-[#112240]/80 text-white border border-white/10 backdrop-blur-md font-bold tracking-widest";

    if (isRental) {
        badgeText = "FOR RENT";
        badgeColor = "bg-rd-navy/90 text-white border border-rd-navy/50 backdrop-blur-md font-bold tracking-widest";
    } else if (vehicle.mileage != null && vehicle.mileage < 1000) {
        badgeText = "NEW ARRIVAL";
        badgeColor = "bg-rd-gold/90 text-[#0a192f] border border-rd-gold/50 backdrop-blur-md font-bold tracking-widest";
    } else {
        badgeText = "IN STOCK";
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ ease: [0.165, 0.84, 0.44, 1.0], duration: 1.0 }}
            style={{ willChange: "transform, opacity" }}
            className="w-full h-full"
        >
            <Link
                ref={cardRef}
                href={isRental ? `/rentals/${vehicle.id}` : `/dealership/${vehicle.id}`}
                className="group relative bg-[#112240] border border-white/5 rounded-2xl overflow-hidden hover:border-rd-gold/50 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col h-full touch-manipulation active:scale-[0.98]"
                onMouseMove={(e) => {
                    if (!cardRef.current) return;
                    const rect = cardRef.current.getBoundingClientRect();
                    setSpotlightPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                }}
                onMouseEnter={() => setSpotlightOpacity(0.6)}
                onMouseLeave={() => setSpotlightOpacity(0)}
            >
                {/* Spotlight overlay - Isolated to desktop hover */}
                <div
                    className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 @media(hover:hover):block hidden"
                    style={{
                        opacity: spotlightOpacity,
                        background: `radial-gradient(circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(212, 175, 55, 0.15), transparent 80%)`,
                    }}
                />

                {/* Image Container - Strict Aspect Ratio to prevent CLS */}
                <div className="relative aspect-[4/3] w-full overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#0a192f] before:via-transparent before:to-transparent before:opacity-80 before:z-[1] before:mix-blend-multiply">
                    <Image
                        src={vehicle.images[0] || "/placeholder-car.jpg"}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Badge - High Contrast */}
                    <div className={cn("absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase", badgeColor)}>
                        {badgeText}
                    </div>
                </div>

                {/* Content - STRICT HIERARCHY */}
                <div className="p-6 flex flex-col flex-grow relative bg-[#0a192f]/50 backdrop-blur-[20px] after:absolute after:inset-0 after:bg-[#0A193D]/15 after:-z-10">
                    <div className="mb-6">
                        {priceDisplay ? (
                            <>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold">
                                    Daily Rate
                                </p>
                                <div className="text-2xl font-display font-medium text-rd-gold tracking-tight truncate whitespace-nowrap overflow-hidden max-w-full" style={{ fontFeatureSettings: "'cv02', 'cv03'" }}>
                                    {priceDisplay}
                                </div>
                            </>
                        ) : (
                            <p className="text-[10px] text-rd-gold uppercase tracking-widest mb-2 font-bold opacity-0">
                                _
                            </p>
                        )}

                        {/* Title */}
                        <h3 className="text-xl font-medium text-white group-hover:text-rd-gold transition-colors duration-300 mt-2 truncate">
                            <span className="text-slate-400 font-normal">{vehicle.year}</span> {vehicle.make} {vehicle.model}
                        </h3>
                    </div>

                    {/* Action Buttons - Ghost/Glassmorphic premium feel */}
                    <div className="mt-auto grid grid-cols-[1fr_auto] gap-3">
                        <span
                            className="w-full flex items-center justify-center py-3.5 rounded-xl border border-white/10 hover:border-rd-gold/50 bg-white/5 hover:bg-rd-gold/10 text-white hover:text-rd-gold font-bold text-xs tracking-widest uppercase transition-all duration-300 backdrop-blur-md"
                        >
                            {buttonText}
                        </span>
                        <span className="flex items-center justify-center w-[46px] rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 backdrop-blur-md">
                            <MessageCircle className="w-5 h-5" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}


