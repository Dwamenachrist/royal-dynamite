"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const philosophyConfig = [
    {
        id: "01",
        title: "Vision",
        subtitle: "Our Aspiration",
        description: "To be a leader in the provision of Auto Dealership and Freight Forwarding in Ghana and strive for excellence in all dealings.",
        // Modern skyscraper/glass building looking up - symbolizes Aspiration/Height
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        align: "left"
    },
    {
        id: "02",
        title: "Mission",
        subtitle: "Our Purpose",
        description: "To develop into a commercially viable Auto dealership and Freight Forwarding company by partnering other international companies to maximize our services with transparency, timeliness, and trust.",
        // Logistics/Freight container ship or high-end transport - symbolizes Service/Trade
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
        align: "right"
    },
    {
        id: "03",
        title: "Core Values",
        subtitle: "Our Bedrock",
        description: "The essence of who we are underpins our values: Ensuring fair and transparent practices, Encouraging environmentally friendly auto dealership, Fostering a climate that encourages staff innovation, and being Dependable - on time, every time.",
        // Abstract gold/dark texture or handshake - symbolizes Trust/Integrity
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
        align: "left"
    }
]

export function PhilosophySection() {
    return (
        <section className="relative bg-background-dark py-20 overflow-hidden">
            {philosophyConfig.map((item, index) => (
                <PhilosophyItem key={item.id} item={item} index={index} />
            ))}
        </section>
    )
}

function PhilosophyItem({ item, index }: { item: any, index: number }) { // eslint-disable-line @typescript-eslint/no-explicit-any
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // Subtler parallax within the image frame: "Window" effect
    // Image moves slightly against scroll direction to create depth inside the frame
    const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

    // Text floats slightly
    const yText = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])

    const isRight = item.align === 'right'

    return (
        <div ref={ref} className="min-h-screen flex items-center py-24 relative z-10 group">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Text Content */}
                    <motion.div
                        style={{ y: yText }}
                        className={`relative z-10 order-2 ${isRight ? 'lg:order-2 lg:text-right' : 'lg:order-1 text-left'}`}
                    >
                        <div className={`flex items-center gap-4 mb-8 ${isRight ? 'justify-end flex-row-reverse' : ''} relative`}>
                            <span className="h-[2px] w-12 bg-primary relative z-10"></span>
                            <span className="text-primary tracking-widest text-sm uppercase font-bold relative z-10">{item.subtitle}</span>
                        </div>

                        <h2 className="font-display text-4xl md:text-5xl mb-6 text-white font-bold leading-tight relative z-10">
                            {item.title}
                        </h2>

                        <p className="text-gray-300 leading-relaxed text-lg mb-8 font-light relative z-10">
                            {item.description}
                        </p>
                    </motion.div>

                    {/* Image Window */}
                    <div className={`order-1 ${isRight ? 'lg:order-1' : 'lg:order-2'} relative`}>
                        <div className="relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:border-primary/30 transition-colors duration-500">
                            <motion.div style={{ scale, y: yBg }} className="absolute inset-0 -top-[20%] h-[140%] w-full">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-background-dark/0 group-hover:bg-transparent transition-colors duration-500"></div>
                            </motion.div>

                            {/* Editorial Number Overlay */}
                            <div className={`absolute bottom-0 p-6 z-20 ${isRight ? 'left-0' : 'right-0'}`}>
                                <h3 className="text-9xl font-display font-bold text-white/10 leading-none select-none">
                                    {item.id}
                                </h3>
                            </div>

                            {/* Decorative Corner */}
                            <div className={`absolute bottom-6 w-12 h-12 border-b-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isRight ? 'left-6 border-l-2' : 'right-6 border-r-2'}`}></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
