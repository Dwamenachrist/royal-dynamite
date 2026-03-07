"use client"

import React from "react"
import { motion } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import Link from "next/link"

export function CTASection() {
    const ref = useRef(null)

    return (
        <section ref={ref} className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-background-dark">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="relative w-full h-full"
                    initial={{ scale: 1.1, filter: "blur(10px)", opacity: 0 }}
                    whileInView={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 1.8, ease: [0.19, 1.0, 0.22, 1.0] as [number, number, number, number] }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    style={{ willChange: "transform, filter, opacity" }}
                >
                    <Image
                        src="/images/concierge-hero.png"
                        alt="Luxury Royal Dynamite Showroom at Night"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-background-dark/80"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                </motion.div>
            </div>

            <div className="relative z-10 text-center px-6 w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{ duration: 1.2, ease: [0.19, 1.0, 0.22, 1.0] as [number, number, number, number] }}
                    style={{ willChange: "transform, opacity" }}
                    className="glass-panel w-full p-8 md:p-16 rounded-2xl border border-primary/20 backdrop-blur-xl shadow-2xl"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">Experience the Royal Touch</h2>
                    <p className="text-gray-300 text-lg mb-10 font-light leading-relaxed max-w-2xl mx-auto">
                        Visit our headquarters in Accra or speak with a dedicated concierge member to tailor your experience.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <Button
                            variant="ghost"
                            size="lg"
                            className="btn-primary w-full md:w-auto h-14 px-8 text-sm font-semibold tracking-wide"
                            asChild
                        >
                            <Link href="/contact">
                                Contact Concierge
                            </Link>
                        </Button>

                        <Button
                            variant="ghost"
                            size="lg"
                            className="btn-secondary w-full md:w-auto h-14 px-8 text-sm font-semibold tracking-wide"
                            asChild
                        >
                            <a href="https://maps.google.com/?q=Airport+Residential+Area+Accra+Ghana" target="_blank" rel="noopener noreferrer">
                                <MapPin className="w-4 h-4 mr-2" /> Locate Showroom
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
