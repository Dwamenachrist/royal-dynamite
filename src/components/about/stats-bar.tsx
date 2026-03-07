"use client"

import React from "react"
import { motion, animate, useInView } from "framer-motion"

export function StatsBar() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.165, 0.84, 0.44, 1.0] // Heavy Quart
            }
        }
    }

    return (
        <section className="py-20 relative border-y border-white/5 bg-background-dark/50 overflow-hidden">
            {/* Carbon Fiber Texture Overlay */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 py-8 md:p-12 w-full grid grid-cols-3 gap-2 md:gap-12 items-center text-center border border-[#D4AF37]/20 shadow-2xl relative"
                    style={{ willChange: "transform, opacity" }}
                >
                    {/* Inner glow for premium glass feel */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>

                    <StatItem value="10+" label="Years of Excellence" variants={itemVariants} />
                    <StatItem value="500+" label="VIP Clients" variants={itemVariants} />
                    <StatItem value="24/7" label="Concierge" variants={itemVariants} />

                </motion.div>
            </div>
        </section>
    )
}

function StatItem({ value, label, variants }: { value: string, label: string, variants: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Special handling for 24/7 to avoid "247/" parsing
    if (value === "24/7") {
        return (
            <motion.div variants={variants} className="flex flex-col items-center justify-center group relative z-10 px-1" style={{ willChange: "transform, opacity" }}>
                <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-[#eecf6d] to-primary mb-1 md:mb-2 transition-transform duration-500 drop-shadow-lg font-display whitespace-nowrap">
                    24/7
                </div>
                <span className="text-gray-400 uppercase tracking-widest text-[9px] md:text-xs font-semibold whitespace-nowrap text-center leading-tight">
                    {label}
                </span>
            </motion.div>
        )
    }

    // Extract numeric part and suffix
    const numericPart = parseInt(value.replace(/\D/g, '')) || 0
    const suffix = value.replace(/[0-9]/g, '')

    return (
        <motion.div variants={variants} className="flex flex-col items-center justify-center group relative z-10 px-1" style={{ willChange: "transform, opacity" }}>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-[#eecf6d] to-primary mb-1 md:mb-2 transition-transform duration-500 drop-shadow-lg font-display flex items-baseline">
                <Counter from={0} to={numericPart} duration={1.5} />
                <span>{suffix}</span>
            </div>
            <span className="text-gray-400 uppercase tracking-widest text-[9px] md:text-xs font-semibold whitespace-nowrap text-center leading-tight">
                {label}
            </span>
        </motion.div>
    )
}

function Counter({ from, to, duration }: { from: number, to: number, duration: number }) {
    const nodeRef = React.useRef<HTMLSpanElement>(null)
    const isInView = useInView(nodeRef, { once: true, margin: "0px 0px -50px 0px" })

    React.useEffect(() => {
        const node = nodeRef.current
        if (!node || !isInView) return

        const controls = animate(from, to, {
            duration,
            onUpdate(value) {
                node.textContent = value.toFixed(0)
            },
            ease: "easeOut"
        })

        return () => controls.stop()
    }, [from, to, duration, isInView])

    return <span ref={nodeRef}>{from}</span>
}
