"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import BlurText from "@/components/BlurText"
import { motion } from "framer-motion"

export function TransportHero() {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
            {/* Background Image - Chauffeur opening door */}
            <div className="absolute inset-0 z-0 bg-[#0a192f]">
                <div className="relative w-full h-full animate-slow-zoom">
                    <Image
                        src="/transport-hero.png"
                        alt="Chauffeur opening door of black luxury car at night"
                        fill
                        sizes="100vw"
                        className={`object-cover transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                        priority
                        onLoad={() => setIsLoaded(true)}
                    />
                </div>
                {/* Overlay with Global Tokens */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-background-dark/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 text-center pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-6"
                >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">Ghana&apos;s Finest Transport</span>
                </motion.div>

                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                    <BlurText
                        text="ARRIVE"
                        className="justify-center"
                        tag="span"
                        delay={100}
                        stepDuration={0.4}
                    />{" "}
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
                        className="text-[#D4AF37] italic font-serif inline-block"
                    >
                        EXCEPTIONALLY
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.6 }}
                    className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    Experience the pinnacle of comfort and style with Royal Dynamite. Ghana&apos;s premier chauffeur service for those who demand excellence in every mile.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 min-h-[56px] rounded-xl
                                       font-bold text-sm tracking-[0.15em] uppercase
                                       bg-gradient-to-r from-[#D4AF37] via-[#e8c84a] to-[#D4AF37]
                                       bg-[length:200%_auto] hover:bg-right
                                       text-[#0a1628]
                                       shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.55)]
                                       transition-all duration-300 group w-full sm:w-auto justify-center"
                        >
                            Book Your Journey
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                        <a
                            href="#fleet"
                            className="inline-flex items-center gap-3 px-8 py-4 min-h-[56px] rounded-xl
                                       font-bold text-sm tracking-[0.15em] uppercase
                                       border-2 border-white/30 text-white
                                       hover:border-white/60 hover:bg-white/10
                                       backdrop-blur-sm transition-all duration-300 group w-full sm:w-auto justify-center"
                        >
                            View Fleet
                            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
