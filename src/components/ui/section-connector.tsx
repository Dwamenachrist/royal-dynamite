"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function SectionConnector() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Vertical line grows
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Dot flows down
    const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <div
            ref={containerRef}
            className="relative h-24 md:h-32 w-full flex justify-center overflow-hidden pointer-events-none"
            style={{ background: "#132b4d" }}
            aria-hidden="true"
        >
            {/* Background Track (Subtle) */}
            <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {/* Glowing Active Line */}
            <motion.div
                className="absolute top-0 w-[2px] bg-gradient-to-b from-transparent via-rd-gold to-transparent shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                style={{ height }}
            />

            {/* Floating Node/Dot */}
            <motion.div
                className="absolute w-3 h-3 rounded-full bg-rd-gold shadow-[0_0_15px_rgba(212,175,55,0.8)] z-10"
                style={{
                    top,
                    opacity,
                    left: "calc(50% - 6px)"
                }}
            />
        </div>
    );
}
