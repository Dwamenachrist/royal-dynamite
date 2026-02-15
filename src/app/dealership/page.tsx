import type { Metadata } from "next";
import { getSaleVehicles } from "@/lib/mock-data";
import { StitchHero } from "@/components/stitch/hero";
import { StitchDealershipLayout } from "@/components/stitch/dealership-layout";

export const metadata: Metadata = {
    title: "Auto Dealership | Quality Cars for Sale in Ghana | Royal Dynamite",
    description: "Browse our premium inventory of quality vehicles including SUVs, sedans, and trucks. Transparent pricing, full documentation, and VIN-verified history on every vehicle.",
};

export default function DealershipPage() {
    const vehiclesForSale = getSaleVehicles();

    return (
        <div className="min-h-screen bg-[#0a192f] text-slate-400 font-display">
            <StitchHero />

            <main className="w-full max-w-[1600px] mx-auto px-4 py-12">
                <StitchDealershipLayout initialVehicles={vehiclesForSale} />
            </main>
        </div>
    );
}
