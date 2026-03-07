"use client"

import React, { useRef } from "react"
import { motion, useInView, Variants } from "framer-motion"

// The Mathematics of Heavy Friction: Heavy Quart Stagger
const DURATION = 1.0;
const EASE = [0.165, 0.84, 0.44, 1.0] as const;

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const itemVariantsCenter: Variants = {
    hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: DURATION, ease: EASE } }
};

const itemVariantsLeft: Variants = {
    hidden: { opacity: 0, x: -80, filter: "blur(10px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: DURATION, ease: EASE } }
};

const itemVariantsRight: Variants = {
    hidden: { opacity: 0, x: 80, filter: "blur(10px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: DURATION, ease: EASE } }
};

export function FirmIntro() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

    return (
        <section className="relative py-24 md:py-32 bg-rd-navy z-10 lg:-mt-[50vh] overflow-hidden">
            {/* Decorative Background Glows */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-rd-gold/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="max-w-7xl mx-auto px-6 relative z-10"
            >
                <motion.div variants={itemVariantsCenter} className="mb-20 text-center max-w-4xl mx-auto">
                    <h3 className="text-3xl md:text-[3.5rem] leading-tight font-light mb-8 text-white font-display">
                        Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-rd-gold via-[#ffe8a1] to-rd-gold font-serif italic font-bold">Three Pillars</span><br />of Excellence.
                    </h3>
                    <div className="relative w-32 h-[1px] bg-gradient-to-r from-transparent via-rd-gold/50 to-transparent mx-auto">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 border border-rd-gold/50" />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 text-gray-300 leading-relaxed font-light text-lg">
                    <motion.div variants={itemVariantsLeft} className="space-y-8">
                        <p className="text-xl md:text-2xl leading-relaxed font-light text-white/90">
                            <strong className="text-white font-medium">Royal Dynamite Limited</strong> is a premium logistics and automotive firm owned by <span className="text-rd-gold border-b border-rd-gold/30 pb-0.5 hover:border-rd-gold transition-colors cursor-default">Reuben Kwaku Gyebi</span> and <span className="text-rd-gold border-b border-rd-gold/30 pb-0.5 hover:border-rd-gold transition-colors cursor-default">Michaelina Koranteng</span>.
                        </p>
                        <p className="text-white/60">
                            Established in 2015, we were incorporated under the Companies Code, 1963 (Act 179) and certified to commence business with a singular focus on uncompromising quality.
                        </p>

                        <div className="relative mt-12 p-8 md:p-10 rounded-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm border border-white/[0.05] group-hover:border-rd-gold/20 transition-colors duration-500" />
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rd-gold/80 to-rd-gold/10" />
                            <p className="relative text-xl text-white/80 italic font-light leading-relaxed">
                                &quot;We have diligently served our cherished partners and customers through our prompt, impeccable, and quality delivery of services. Excellence is not just our goal; it is our standard.&quot;
                            </p>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariantsRight} className="space-y-10 lg:pt-4">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="h-[1px] w-8 bg-rd-gold/50"></span>
                                <h4 className="text-sm tracking-[0.2em] uppercase font-bold text-rd-gold">Authorized Services</h4>
                            </div>

                            <ul className="space-y-6 pt-2 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                                {[
                                    "Freight Forwarding",
                                    "Auto Dealership",
                                    "V.I.P Car Rentals",
                                    "Transport Services"
                                ].map((service) => (
                                    <li key={service} className="relative flex items-center gap-6 group cursor-default">
                                        <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-rd-navy border border-white/20 group-hover:border-rd-gold/50 transition-colors z-10">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-rd-gold group-hover:scale-150 transition-all duration-300" />
                                        </span>
                                        <span className="text-xl md:text-2xl text-white/70 group-hover:text-white font-display transition-colors duration-300 tracking-wide">
                                            {service}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-10 border-t border-white/5 space-y-4">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="h-[1px] w-8 bg-rd-gold/50"></span>
                                <h4 className="text-sm tracking-[0.2em] uppercase font-bold text-rd-gold">Human Resources</h4>
                            </div>
                            <p className="text-white/60 leading-relaxed">
                                Our teams comprise dynamic professionals from various walks of life. They discharge their responsibilities with utmost zeal to achieve an elite standard of client satisfaction.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
