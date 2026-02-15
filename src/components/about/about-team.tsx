"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ────────────────────────────────────────────
   Team Data
   ──────────────────────────────────────────── */
interface TeamMember {
    name: string;
    role: string;
    bio: string;
    initials: string;
    featured?: boolean;
}

const teamMembers: TeamMember[] = [
    {
        name: "Managing Director",
        role: "Founder & CEO",
        bio: "Visionary leader who founded Royal Dynamite in 2015, building it from a small dealership into Ghana's trusted automotive and logistics company.",
        initials: "MD",
        featured: true,
    },
    {
        name: "Head of Sales",
        role: "Auto Dealership",
        bio: "Leads our vehicle sales division with deep expertise in the Ghanaian automotive market.",
        initials: "HS",
    },
    {
        name: "Fleet Manager",
        role: "Rentals & Transport",
        bio: "Oversees our rental fleet and passenger transport operations with a focus on reliability.",
        initials: "FM",
    },
    {
        name: "Logistics Lead",
        role: "Freight & Forwarding",
        bio: "Manages freight forwarding operations, ensuring timely and secure deliveries across Ghana.",
        initials: "LL",
    },
];

/* ────────────────────────────────────────────
   Animation Variants
   ──────────────────────────────────────────── */
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
};

/* ────────────────────────────────────────────
   Team Card Sub-component
   ──────────────────────────────────────────── */
function TeamCard({ member }: { member: TeamMember }) {
    return (
        <motion.div
            variants={cardVariants}
            className={`group relative rounded-2xl overflow-hidden cursor-default transition-all duration-500 ${member.featured ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
            style={{
                background: "rgba(15, 30, 50, 0.45)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
        >
            {/* Hover border glow */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    boxShadow:
                        "inset 0 0 0 1px rgba(212, 175, 55, 0.25), 0 8px 32px rgba(212, 175, 55, 0.06)",
                }}
            />

            <div className={`flex flex-col h-full ${member.featured ? "p-8 md:p-10" : "p-6 md:p-8"}`}>
                {/* Avatar Circle */}
                <div
                    className={`flex items-center justify-center rounded-full shrink-0 mb-5 transition-transform duration-500 group-hover:scale-105 ${member.featured ? "w-20 h-20" : "w-16 h-16"
                        }`}
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)",
                        border: "2px solid rgba(212, 175, 55, 0.2)",
                    }}
                >
                    <span
                        className={`font-serif font-bold text-rd-gold ${member.featured ? "text-2xl" : "text-lg"
                            }`}
                    >
                        {member.initials}
                    </span>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h3
                        className={`font-serif font-bold text-white mb-1 ${member.featured ? "text-xl md:text-2xl" : "text-lg"
                            }`}
                    >
                        {member.name}
                    </h3>
                    <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-rd-gold/70 mb-3">
                        {member.role}
                    </span>
                    <p
                        className={`text-gray-400 leading-relaxed ${member.featured ? "text-[0.95rem]" : "text-sm"
                            }`}
                    >
                        {member.bio}
                    </p>
                </div>

                {/* Decorative accent */}
                <div
                    className="mt-5 h-[2px] w-12 rounded-full transition-all duration-500 group-hover:w-20"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(212, 175, 55, 0.5), transparent)",
                    }}
                />
            </div>
        </motion.div>
    );
}

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */
export function AboutTeam() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
            {/* Subtle divider line at top */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            <div className="container relative z-10 px-4 md:px-6">
                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-14"
                >
                    <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold/70 mb-4">
                        The People Behind the Brand
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                        Meet Our <span className="text-rd-gold">Team</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
                        A dedicated group of professionals committed to delivering excellence
                        in every vehicle and every service.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {teamMembers.map((member) => (
                        <TeamCard key={member.initials} member={member} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
