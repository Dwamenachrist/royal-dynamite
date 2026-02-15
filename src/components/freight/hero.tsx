import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"

export function FreightHero() {
    return (
        <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image - Container Ship/Port at Night */}
            <div className="absolute inset-0 z-0">
                <div className="relative w-full h-full animate-slow-zoom">
                    <Image
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                        alt="Container ship at night with crane operations"
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                </div>
                {/* Overlay with Global Tokens */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-background-dark/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-6">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">Global Logistics Solutions</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                    SECURE GLOBAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-primary to-primary-light bg-[length:200%_auto] animate-shine italic font-serif">LOGISTICS</span>.<br />
                    DELIVERED WITH PRECISION.
                </h1>

                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    End-to-end supply chain solutions for businesses that demand reliability. From port to final destination, we handle it all with military-grade precision.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        className="btn-primary"
                        asChild
                    >
                        <Link href="/contact">
                            Request a Freight Quote
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        className="btn-secondary hover:text-white"
                        asChild
                    >
                        <a href="#services">
                            View Services
                            <ChevronDown className="ml-2 w-4 h-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    )
}
