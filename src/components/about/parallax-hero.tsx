"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function ParallaxHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

    return (
        <section ref={containerRef} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Deep Parallax Background */}
            <motion.div
                style={{ y, scale, opacity }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHXQ21yFEItqUpMQlEwV8U59FPySOJ_kb2XDL8aj-CRmIKJrPgIgvO2HRTYXa8Ohn2gRkIK44UIs4G4pVIikUZm2MS2FwQkqFcWNK8W7T4SndO_3s7-sWYBWZ2hpKcK-DqPHCp3FjJwtFSij1NkDUhQvNUq1mF6I56XR6LCetn8Bxo2OmC7kpJ826b1yBt4RzCEOJYAAEvaoviM7RtnzdQzTKwnGna95kSRC9h8onQ_rqXoVFgCEVPdkwy9TWB6D_YRZzcz9fAnn7N"
                    alt="Luxury car silhouette"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/30 via-background-dark/60 to-background-dark"></div>
            </motion.div>

            {/* Content Layer (Moves faster than background) */}
            <div className="relative z-10 max-w-5xl px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="glass-panel p-12 md:p-20 border border-white/10 rounded-xl shadow-2xl backdrop-blur-md bg-background-dark/40"
                >
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        animate={{ opacity: 1, letterSpacing: "0.5em" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="text-primary text-xs font-bold mb-8 block uppercase tracking-[0.5em]"
                    >
                        Establishment of Prestige
                    </motion.span>

                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight">
                        <span className="block text-white mb-2">BEYOND MOTION.</span>
                        <span className="text-gradient-gold">A STANDARD OF EXCELLENCE.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        For over a decade, we have redefined luxury mobility. We are not just a service; we are the premise of prestige, reliability, and unparalleled experiences.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button className="btn-primary py-6 px-10 text-sm" asChild>
                            <a href="#about-content">
                                Experience the Legacy
                            </a>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary to-transparent"></div>
            </motion.div>
        </section>
    )
}
