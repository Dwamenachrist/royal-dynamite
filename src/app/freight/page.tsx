import type { Metadata } from "next";
import { FreightHero } from "@/components/freight/hero";
import { FreightShowcase } from "@/components/freight/service-showcase";
import { FreightValueProp } from "@/components/freight/value-prop";
import { FreightCTA } from "@/components/freight/cta";

export const metadata: Metadata = {
    title: "Freight Forwarding | Air, Sea & Land Cargo | Royal Dynamite Ghana",
    description:
        "Professional freight forwarding and customs clearance in Ghana. Sea, air, and land cargo with full shipment tracking. Get a quote within 24 hours.",
};

export default function FreightPage() {
    return (
        <div className="min-h-screen bg-[#0a192f]">
            <FreightHero />
            <FreightValueProp />
            <FreightShowcase />
            <FreightCTA />
        </div>
    );
}
