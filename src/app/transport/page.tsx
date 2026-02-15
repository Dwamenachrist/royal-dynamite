import type { Metadata } from "next"
import { TransportHero } from "@/components/transport/hero"
import { ValuePropSection } from "@/components/transport/value-prop"
import { FleetShowcaseSection } from "@/components/transport/fleet-showcase"
import { StatsSection } from "@/components/transport/stats"
import { BookingCTASection } from "@/components/transport/booking-cta"

export const metadata: Metadata = {
    title: "Premium Transport Services",
    description:
        "Experience Ghana's finest private transport — airport transfers, corporate shuttles, and VIP event transport with professional chauffeurs and tracked vehicles.",
}

export default function TransportPage() {
    return (
        <main>
            <TransportHero />
            <ValuePropSection />
            <FleetShowcaseSection />
            <StatsSection />
            <BookingCTASection />
        </main>
    )
}
