"use client"

import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // Slow Zoom Effect
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

    return (
        <section ref={ref} className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <motion.div style={{ scale }} className="relative w-full h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1565514020176-dbf22777373e?q=80&w=2070&auto=format&fit=crop"
                        alt="Luxury Royal Dynamite Showroom at Night"
                        fill
                        className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-background-dark/80"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                </motion.div>
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <div className="glass-panel p-10 md:p-16 rounded-2xl border border-primary/20 backdrop-blur-md shadow-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">Experience the Royal Touch</h2>
                    <p className="text-gray-300 text-lg mb-10 font-light leading-relaxed max-w-2xl mx-auto">
                        Visit our headquarters in Accra or speak with a dedicated concierge member to tailor your experience.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <Button
                            variant="ghost"
                            size="lg"
                            className="btn-primary w-full md:w-auto px-8 py-6 text-sm"
                            asChild
                        >
                            <Link href="/contact">
                                Contact Concierge
                            </Link>
                        </Button>

                        <Button
                            variant="ghost"
                            size="lg"
                            className="btn-secondary w-full md:w-auto px-8 py-6 text-sm"
                            asChild
                        >
                            <a href="https://maps.google.com/?q=Airport+Residential+Area+Accra+Ghana" target="_blank" rel="noopener noreferrer">
                                <MapPin className="w-4 h-4 mr-2" /> Locate Showroom
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
