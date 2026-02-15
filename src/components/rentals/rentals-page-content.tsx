"use client";

import { getRentalVehicles } from "@/lib/mock-data";
import { StitchRentalsLayout } from "@/components/stitch/rentals-layout";
import { StitchRentalsHero } from "@/components/stitch/rentals-hero";

export function RentalsPageContent() {
    const rentalVehicles = getRentalVehicles();

    return (
        <div className="min-h-screen bg-[#0a192f] text-slate-400 font-display">
            <StitchRentalsHero />

            <main className="w-full max-w-[1600px] mx-auto px-4 py-12">
                <StitchRentalsLayout initialVehicles={rentalVehicles} />
            </main>
        </div>
    );
}
