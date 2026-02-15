import React from "react"
import { ScrollyHero } from "@/components/about/scrolly-hero"
import { AboutHero } from "@/components/about/about-hero"
import { FirmIntro } from "@/components/about/firm-intro"
import { PhilosophySection } from "@/components/about/philosophy-section"
import { StatsBar } from "@/components/about/stats-bar"
import { LeadershipGrid } from "@/components/about/leadership-grid"
import { CTASection } from "@/components/about/cta-section"

export default function AboutPage() {
    return (
        <main className="bg-background-dark min-h-screen">
            {/* Desktop Scrollytelling Hero (Samurai V2) */}
            <ScrollyHero />

            {/* Mobile/Fallback Hero */}
            <div className="lg:hidden">
                <AboutHero />
            </div>

            <FirmIntro />
            <PhilosophySection />
            <StatsBar />
            <LeadershipGrid />
            <CTASection />
        </main>
    )
}
