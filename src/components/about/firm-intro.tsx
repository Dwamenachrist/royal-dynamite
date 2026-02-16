"use client"

import React from "react"
import { motion } from "framer-motion"

export function FirmIntro() {
    return (
        // Added -mt-[50vh] to creating the "Reveal Underneath" effect as the Hero fades out
        <section className="relative py-32 bg-background-dark z-10 -mt-[50vh]">
            {/* Decorative Background Glow */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <h3 className="text-3xl md:text-5xl font-light mb-6 text-white font-display">
                        Built on <span className="text-gradient-gold font-serif italic">Three Pillars</span> of Excellence.
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-gray-400 leading-relaxed font-light text-lg">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <p>
                            <strong className="text-white font-medium">Royal Dynamite Limited</strong> is a registered limited liability company in Ghana and is currently owned by <span className="text-white border-b border-primary/30 pb-0.5">Reuben Kwaku Gyebi (50%)</span> and <span className="text-white border-b border-primary/30 pb-0.5">Michaelina Koranteng (50%)</span>.
                        </p>
                        <p>
                            Established in the year 2015, the company was incorporated under the <strong className="text-white">Companies Code, 1963 (Act 179)</strong> on 23rd December 2015 and certified to commence business under the provision of sections 27 and 28 of the Companies Code, 1963 on 6th January, 2016.
                        </p>
                        <div className="p-6 glass-panel rounded-xl border-l-4 border-l-primary/60 bg-primary/5">
                            <p className="text-gray-300 italic font-light">
                                &quot;We have diligently served our cherished partners and customers through our prompt and quality delivery of services.&quot;
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h4 className="text-lg text-primary tracking-widest uppercase font-bold text-gradient-gold">Authorized Services</h4>
                            <p>
                                Royal Dynamite Limited is authorized to provide the following services:
                            </p>
                            <ul className="space-y-4 pt-2">
                                <li className="flex items-center gap-4 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform duration-300"></span>
                                    <span className="text-xl text-white font-display">1. Freight Forwarding</span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform duration-300"></span>
                                    <span className="text-xl text-white font-display">2. Auto Dealership</span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform duration-300"></span>
                                    <span className="text-xl text-white font-display">3. V.I.P Car Rentals</span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform duration-300"></span>
                                    <span className="text-xl text-white font-display">4. Transport Services</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                            <h4 className="text-lg text-primary tracking-widest uppercase font-bold mb-4 text-gradient-gold">Human Resources</h4>
                            <p>
                                Our human resources are a cream of young, agile, ardent, talented, and dynamic professionals from various walks of life. These professionals discharge their responsibilities with utmost zeal and determination to achieve optimum clients&apos; satisfaction.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
