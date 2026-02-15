"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowDown } from "lucide-react"

export function AboutHero() {
    return (
        <header className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-background-dark">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJxBjUl8Dg66D9DsMBxQrbPtPNL3HCfRyEyHXzyiJamEEmOnp_ms0ZXugo4P1FXA8K1LraWJlOrzyu1GcE7zSX9z6_IDqtBN51ggdGguFp73SbFyyuJzE9NK8RggCRadfCM-UoAu0A1gzEtJST8OYGYZSwbo8acJJX6Wg9EsaYrmj0VbzG_Bf9Am1KrlJRXY-iU5o0TnTPJTjn1zefn4oIK25m0Xv-pqqvZ-1_V8YCbL7h_72AmyZGrjLLNEnCmHUe-0cxolX1sK8O"
                    alt="Silhouette of a luxury sedan against a dark city skyline at night"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/30 via-transparent to-background-dark"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-primary text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-semibold"
                >
                    Ghana's Premier Automotive Concierge
                </motion.h2>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-8">
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="block text-white"
                    >
                        BEYOND MOTION.
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="block text-gradient-gold text-glow"
                    >
                        THE ROYAL STANDARD.
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-12"
                >
                    Redefining the art of movement in West Africa. We don't just transport; we curate experiences of power, prestige, and unparalleled luxury.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex flex-col items-center"
                >
                    <div className="h-16 w-[1px] bg-gradient-to-b from-primary to-transparent mb-4"></div>
                    <span className="text-xs tracking-widest text-primary/80 uppercase flex items-center gap-2">
                        Scroll to Explore <ArrowDown className="w-3 h-3 animate-bounce" />
                    </span>
                </motion.div>
            </div>
        </header>
    )
}
