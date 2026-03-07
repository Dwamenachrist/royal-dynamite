import type { Metadata } from "next";
import { TransportHero } from "@/components/transport/hero";
import { StatsSection } from "@/components/transport/stats";
import { FleetShowcaseSection } from "@/components/transport/fleet-showcase";
import { ValuePropSection } from "@/components/transport/value-prop";
import { BookingCTASection } from "@/components/transport/booking-cta";

export const metadata: Metadata = {
    title: "Transport Services | Airport Transfers & Corporate Shuttles | Royal Dynamite",
    description:
        "Professional airport transfers, corporate shuttle services, and group event transport across Ghana. Trained drivers, tracked vehicles, and fixed pricing.",
};

export default function TransportPage() {
    return (
        <div className="min-h-screen bg-[#0a192f]">
            <TransportHero />
            <ValuePropSection />
            <FleetShowcaseSection />
            <StatsSection />
            <BookingCTASection />
        </div>
    );
}
