import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    Car,
    KeyRound,
    Users,
    Package,
    MessageCircle,
    Star,
    Quote,
    Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, generateWhatsAppLink } from "@/lib/constants";
import { InteractiveHero } from "@/components/ui/interactive-hero";
import { PremiumTrustBar } from "@/components/ui/premium-trust-bar";
import { HowItWorks } from "@/components/ui/how-it-works";
import { WhyUs } from "@/components/ui/why-us";
import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";

export default function HomePage() {
    return (
        <div className="flex flex-col">
            {/* ════════════════════════════════════════════
                HERO — Interactive: Parallax + Magnetic effects
            ════════════════════════════════════════════ */}
            <InteractiveHero />

            {/* ════════════════════════════════════════════
                PREMIUM TRUST BAR — Glass-morphism with scroll-over effect
            ════════════════════════════════════════════ */}
            <PremiumTrustBar />

            {/* ════════════════════════════════════════════
                SERVICES — Asymmetric Dark Glass Grid (Context 7)
            ════════════════════════════════════════════ */}
            <section className="relative py-24" style={{ background: '#0F223D' }}>
                {/* Gold-to-navy gradient top — seamless flow from Stats section */}
                <div className="absolute inset-x-0 top-0 h-16" style={{ background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.5) 0%, #0F223D 100%)' }} />

                {/* Texture overlay */}
                <div className="services-texture absolute inset-0 pointer-events-none" />

                <div className="relative container px-4 md:px-6 z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold mb-3">What We Do</p>
                        <h2 className="text-3xl font-serif font-bold sm:text-4xl text-white">
                            Our Services
                        </h2>
                        <div className="w-16 h-1 bg-rd-gold mx-auto mt-5 rounded-full" />
                    </div>

                    {/* Asymmetric Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                        {/* ── LEFT: Feature Card (Auto Sales) ── */}
                        <Link
                            href="/dealership"
                            className="dark-glass-feature group relative lg:col-span-7 min-h-[420px] lg:min-h-[540px] flex flex-col justify-end"
                        >
                            {/* Background image */}
                            <Image
                                src="/auto-dealership.png"
                                alt="Premium auto dealership showroom"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 58vw"
                            />
                            {/* Cinematic overlay */}
                            <div className="absolute inset-0" style={{
                                background: 'linear-gradient(to top, rgba(10,20,40,0.95) 0%, rgba(10,20,40,0.6) 40%, rgba(10,20,40,0.2) 100%)'
                            }} />
                            <div className="absolute inset-0" style={{
                                background: 'linear-gradient(to right, rgba(10,20,40,0.7) 0%, transparent 60%)'
                            }} />

                            {/* Content overlay */}
                            <div className="relative z-10 p-8 lg:p-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                                        <Car className="h-6 w-6 text-rd-gold" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-rd-gold/80">Featured Service</span>
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-3">
                                    Premium Auto Sales
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed max-w-md mb-6">
                                    Curated selection of quality vehicles — SUVs, sedans, trucks — all VIN-verified with full documentation and transparent pricing.
                                </p>
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-rd-gold group-hover:gap-3 transition-all duration-300">
                                    View Inventory
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </Link>

                        {/* ── RIGHT: Compact Glass Card Stack ── */}
                        <div className="lg:col-span-5 flex flex-col gap-5">
                            {[
                                {
                                    icon: KeyRound,
                                    title: "Vehicle Rentals",
                                    description: "Premium daily and weekly rentals with comprehensive insurance. Business sedans to 30-seater coaches.",
                                    href: "/rentals",
                                    cta: "Explore Rentals",
                                },
                                {
                                    icon: Truck,
                                    title: "Transport Services",
                                    description: "Airport transfers, corporate shuttles, and event transport across Ghana. Professional drivers, tracked vehicles.",
                                    href: "/transport",
                                    cta: "Learn More",
                                },
                                {
                                    icon: Package,
                                    title: "Freight Forwarding",
                                    description: "Sea, air, and land cargo with expert customs clearance at all Ghanaian ports. Full shipment tracking.",
                                    href: "/freight",
                                    cta: "Request Quote",
                                },
                            ].map((service) => (
                                <Link
                                    key={service.title}
                                    href={service.href}
                                    className="dark-glass group flex items-start gap-5 p-6"
                                >
                                    <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                                        <service.icon className="h-5 w-5 text-rd-gold/70 group-hover:text-rd-gold transition-colors duration-300" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <h3 className="text-lg font-serif font-bold text-white">
                                                {service.title}
                                            </h3>
                                            <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-rd-gold group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                                        </div>
                                        <p className="text-sm text-white/50 leading-relaxed mb-3">
                                            {service.description}
                                        </p>
                                        <span className="text-xs font-semibold text-rd-gold/60 group-hover:text-rd-gold transition-colors duration-300 uppercase tracking-wider">
                                            {service.cta}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                TRUST — Pillars of Trust (Why Us)
            ════════════════════════════════════════════ */}
            <WhyUs />

            {/* ════════════════════════════════════════════
                HOW IT WORKS — Interactive Progressive Timeline
            ════════════════════════════════════════════ */}
            <HowItWorks />

            {/* ════════════════════════════════════════════
                TESTIMONIALS — Interactive Carousel
            ════════════════════════════════════════════ */}
            <TestimonialsCarousel />

            {/* ════════════════════════════════════════════
                CTA — Final conversion
            ════════════════════════════════════════════ */}
            <section className="py-20 overflow-hidden relative" style={{ background: 'linear-gradient(180deg, #0F223D 0%, #1a3a66 50%, #0F223D 100%)' }}>
                {/* Subtle dot pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#D4AF37_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                <div className="container px-4 md:px-6 relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold mb-3">Get In Touch</p>
                        <h2 className="text-3xl font-serif font-bold sm:text-4xl mb-4 text-white">
                            Ready to Get Started?
                        </h2>
                        <div className="w-16 h-1 bg-rd-gold mx-auto mt-3 mb-6 rounded-full" />
                        <p className="text-white/60 text-lg mb-10">
                            Whether you&apos;re buying, renting, shipping, or need transport — we&apos;re
                            one message away.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="h-14 px-8 rounded-full bg-rd-gold text-rd-navy hover:bg-rd-gold/90 font-bold text-base shadow-lg shadow-rd-gold/20"
                                asChild
                            >
                                <a
                                    href={generateWhatsAppLink("Hello, I'd like to enquire about your services.")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    WhatsApp Us Now
                                </a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-8 rounded-full border-white/20 text-white hover:bg-white/5 font-medium text-base bg-transparent"
                                asChild
                            >
                                <Link href="/contact">
                                    Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
