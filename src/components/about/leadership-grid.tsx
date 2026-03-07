"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const teamConfig = [
    {
        name: "Reuben Kwaku Gyebi",
        role: "Pastor & CEO",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4hOcdudYSjIpxbnnF1D72cVmcvup2Y-cnNUxgPxAHPxdYYBDP6TmrFgdB70KiYHg8q7YKSCSD_TBbRi_Kva9yhNQgphbhxewKIKvuQRkxeW4mV9V-Zue-sVP9HxLotHOJyh0SMGZubbO5yg290wT0buV0Ta9LwzwqKbLOUBCsfcXt7egvICiWKZClS0sZgVw880VpD9D9tekx_yPOPo_nmpYMK7NBZKPT59WI7Gsunrr1mS-NaYujhPdVCbaCHOFEz4tmAUSDU9rk"
    },
    {
        name: "Michaelina Koranteng",
        role: "Co-Founder / Director",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfiw33vXMVEcfuqPgimxCGqTUISV_QcfVBsSodoDQ85u4Bq5EgyZNTpge9OQbvYPN8jimmC3aQAmTIGtuQEzAqEswHvXhYQ-CQ4z8zYJ5M-fBG1w9QoG5yHMn2BTTFTdOPxpiz79wKHr7djJb6c7aDzXcGaODZRjWPJn4eJ4koDi34L3GoB5ahXl6zx_uapZbRHhV2VSq1pvENSZSf0qJ0NyIR3fWj-umzeDmNOzD8EQRMV6eAniPgpm1xmBzOI4ZxEuqqa8FJWrGu"
    },
    {
        name: "David Mensah",
        role: "Operations Lead",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzsMjlHRI8YCuEon6wNYU1vySgsjpaqVXwdRftm5jbrFaySjgxQMlKxgOOCmT7d3YTDJ8X8isjiro7npGClpva56YouRTLrI9XJYzsoDRji666SVYs4BD1WP-HkynLiz5jYpSJHfwdsI_TEESgt86f6aSN9xY_9HL8ewtYHuFEcTUJSPlcHTdJZ-iC2dVk05p7Jr-Tv3F_PVrGY5tYmBCq3M0QKI6KH5mDzCgLPUT1mEjnOX0-KpLF25NPjIq4f43Q7By4trQmju8Z"
    },
    {
        name: "Sarah Kweku",
        role: "Logistics Manager",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeDTW7S6PAWFd5T8HMfsFmFYWe4aWipbV3iaXfSsRYiQcoDqPCLtx23dI46iyTAkOqkn2hcUUDCh2mVjstMmSk0uE1B5e0EZGcLzvlGNhSF1zcqmXCzPJ5-f5gr4B48CiF-sZGNjmsHsCqCAr3lXL49qv2e_Oupsfg5k_qgGGqDbuBY2ifVa0KDA06DfhRuVGjNlxlp7PFTr_LRL0p3dfk9L0cD5ItGDQ9CciHPqYGrECHiskGpjWHNVkbgJuoZl6Lcww_0LlkLBs5"
    }
]

export function LeadershipGrid() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    return (
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background-dark relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1.0] as [number, number, number, number] }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                >
                    <div>
                        <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-semibold">Leadership</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-white">The Architects of <br /><span className="font-serif italic text-primary">Prestige</span></h3>
                    </div>
                    <p className="text-gray-400 max-w-sm text-sm leading-relaxed text-right md:text-left">
                        Meet the visionaries dedicated to upholding the Royal Standard in every interaction.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    className="grid gap-6 pb-8 px-4 -mx-4 sm:px-6 sm:-mx-6 lg:px-0 lg:mx-0 auto-cols-[calc(85%-16px)] grid-flow-col overflow-x-auto snap-x snap-mandatory md:auto-cols-auto md:grid-flow-row md:grid-cols-2 lg:grid-cols-4 md:overflow-x-visible [&::-webkit-scrollbar]:hidden"
                >
                    {teamConfig.map((member, index) => (
                        <GQCard key={index} member={member} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

function GQCard({ member }: { member: TeamMember }) {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1.0] as [number, number, number, number] } // Heavy Quart
        }
    }

    return (
        <motion.div
            variants={cardVariants}
            className="snap-start shrink-0 group relative aspect-[3/4] w-full rounded-lg overflow-hidden cursor-pointer bg-black active:scale-[0.98] lg:active:scale-100 transition-transform duration-300"
            style={{ willChange: "transform, opacity" }}
        >
            {/* Image Layer - B&W to Color/Gold Transition - lg:group-hover to prevent mobile sticky tap */}
            <div className="absolute inset-0 transition-all duration-700 filter lg:grayscale lg:contrast-125 lg:brightness-110 lg:group-hover:grayscale-0 lg:group-hover:brightness-100 lg:group-hover:contrast-100">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-1000 lg:group-hover:scale-110"
                />
            </div>

            {/* Gold Tint Overlay on Hover */}
            <div className="absolute inset-0 bg-primary/20 mix-blend-color opacity-0 lg:group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>

            {/* Cinematic Gradient Mask - lighter on mobile by default, dark on desktop default, light on desktop hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent opacity-60 lg:opacity-90 lg:group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>

            {/* Content Layer */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 transform lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                <div className="hidden lg:block h-[1px] w-12 bg-primary mb-4 transform scale-x-0 lg:group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <h4 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-wide lg:group-hover:text-primary transition-colors duration-300">{member.name}</h4>
                <p className="text-primary text-[10px] md:text-xs uppercase tracking-widest font-bold lg:opacity-80 lg:group-hover:opacity-100 transition-opacity">{member.role}</p>
            </div>
        </motion.div>
    )
}
