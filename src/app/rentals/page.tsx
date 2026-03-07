import type { Metadata } from "next";
import { StitchRentalsHero } from "@/components/stitch/rentals-hero";
import { StitchRentalsLayout } from "@/components/stitch/rentals-layout";
import { getRentalVehicles } from "@/lib/supabase/queries";
import { dbVehiclesToVehicles } from "@/lib/utils/mapVehicle";

export const metadata: Metadata = {
    title: "Vehicle Rentals | Premium Car Hire in Accra, Ghana | Royal Dynamite",
    description:
        "Rent quality sedans, SUVs, and buses in Accra. Competitive daily and weekly rates, comprehensive insurance, and a simple pre-qualification process.",
};

// ISR: regenerate page data every 60 seconds
export const revalidate = 60;

export default async function RentalsPage() {
    const dbVehicles = await getRentalVehicles();
    const allRentals = dbVehiclesToVehicles(dbVehicles);

    return (
        <div className="min-h-screen bg-[#0a192f]">
            <StitchRentalsHero />
            <div className="container px-4 md:px-6 py-12">
                <StitchRentalsLayout initialVehicles={allRentals} />
            </div>
        </div>
    );
}
