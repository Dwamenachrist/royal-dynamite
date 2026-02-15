import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"

export function TransportHero() {
    return (
        <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image - Chauffeur opening door */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/transport-hero.png"
                    alt="Chauffeur opening door of black luxury car at night"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                {/* Overlay with Global Tokens */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-background-dark/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 text-center pt-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-6">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">Ghana&apos;s Finest Transport</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                    ARRIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-primary to-primary-light bg-[length:200%_auto] animate-shine italic font-serif">EXCEPTIONALLY</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    Experience the pinnacle of comfort and style with Royal Dynamite. Ghana&apos;s premier chauffeur service for those who demand excellence in every mile.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        className="btn-primary"
                        asChild
                    >
                        <Link href="/contact">
                            Book Your Journey
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        className="btn-secondary hover:text-white"
                        asChild
                    >
                        <a href="#fleet">
                            View Fleet
                            <ChevronDown className="ml-2 w-4 h-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    )
}
