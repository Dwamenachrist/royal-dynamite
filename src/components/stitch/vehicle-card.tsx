"use client";

import Image from "next/image";
import Link from "next/link";
import { Vehicle } from "@/types";
import { generateWhatsAppLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface StitchVehicleCardProps {
    vehicle: Vehicle;
}

export function StitchVehicleCard({ vehicle }: StitchVehicleCardProps) {
    const isRental = vehicle.status === "rent";
    // Currency Localization: GH₵ with commas
    const priceDisplay = isRental
        ? `GH₵ ${vehicle.dailyRate?.toLocaleString()}`
        : `GH₵ ${vehicle.price?.toLocaleString()}`;

    const buttonText = isRental ? "Book Now" : "Enquire Now";

    const whatsappMessage = isRental
        ? `Hello, I am interested in renting the ${vehicle.year} ${vehicle.make} ${vehicle.model}. Is it available?`
        : `Hello, I am interested in purchasing the ${vehicle.year} ${vehicle.make} ${vehicle.model} listed for ${priceDisplay}.`;

    // Status Badge Logic - Critical Visual Polish
    let badgeText = "";
    // Solid Gold Background with Dark Navy Text for "In Stock"
    let badgeColor = "bg-[#D4AF37] text-[#0a192f] border-none font-bold shadow-[0_4px_10px_rgba(212,175,55,0.3)]";

    if (isRental) {
        badgeText = "FOR RENT";
        badgeColor = "bg-blue-600/90 text-white border-none font-bold shadow-lg";
    } else if (vehicle.mileage < 1000) {
        badgeText = "NEW ARRIVAL";
        badgeColor = "bg-green-600/90 text-white border-none font-bold shadow-lg";
    } else {
        badgeText = "IN STOCK";
    }

    return (
        <Link
            href={isRental ? `/rentals/${vehicle.id}` : `/dealership/${vehicle.id}`}
            className="group relative bg-[#112240] border border-white/5 rounded-2xl overflow-hidden hover:border-rd-gold/50 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                    src={vehicle.images[0] || "/placeholder-car.jpg"}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Dark subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-transparent to-transparent opacity-60" />

                {/* Badge - High Contrast */}
                <div className={cn("absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase", badgeColor)}>
                    {badgeText}
                </div>
            </div>

            {/* Content - STRICT HIERARCHY: Price -> Title -> Action */}
            <div className="p-6 flex flex-col flex-grow relative">
                <div className="mb-6">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                        {isRental ? "Daily Rate" : "Price"}
                    </p>
                    {/* HUGE GOLD PRICE */}
                    <p className="text-3xl font-serif font-bold text-rd-gold tracking-tight">
                        {priceDisplay}<span className="text-sm text-slate-500 font-sans font-normal">{isRental && "/day"}</span>
                    </p>

                    {/* Title */}
                    <h3 className="text-xl font-medium text-white group-hover:text-rd-gold transition-colors duration-300 mt-2">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                    <span
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(generateWhatsAppLink(whatsappMessage), "_blank");
                        }}
                        role="button"
                        tabIndex={0}
                        // Premium Metallic Button Styling
                        className="w-full relative overflow-hidden flex items-center justify-center py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F2D06B] to-[#D4AF37] bg-[length:200%_auto] text-[#0a192f] font-bold text-sm tracking-widest uppercase transition-all duration-500 hover:bg-[position:right_center] shadow-[0_4px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 cursor-pointer"
                    >
                        {buttonText}
                    </span>
                </div>
            </div>
        </Link>
    );
}

