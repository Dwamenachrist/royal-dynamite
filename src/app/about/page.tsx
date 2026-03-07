import type { Metadata } from "next";
import { ScrollyHero } from "@/components/about/scrolly-hero";
import { MobileDiamondHero } from "@/components/about/mobile-diamond-hero";
import { FirmIntro } from "@/components/about/firm-intro";
import { PhilosophySection } from "@/components/about/philosophy-section";
import { StatsBar } from "@/components/about/stats-bar";
import { LeadershipGrid } from "@/components/about/leadership-grid";
import { MajorClients } from "@/components/about/major-clients";
import { CTASection } from "@/components/about/cta-section";

export const metadata: Metadata = {
    title: "About Us | Royal Dynamite Limited — Excellence in Motion",
    description:
        "Learn about Royal Dynamite Limited — Ghana's trusted vehicle and logistics company since 2015. Incorporated, transparent, and built on trust.",
};

export default function AboutPage() {
    return (
        <main className="bg-background-dark min-h-screen">
            {/* Desktop Scrollytelling Hero (Samurai V2) */}
            <ScrollyHero />

            {/* Mobile Touch-Optimized Interactive Hero */}
            <MobileDiamondHero />

            <FirmIntro />
            <PhilosophySection />
            <StatsBar />
            <LeadershipGrid />
            <MajorClients />
            <CTASection />
        </main>
    );
}
