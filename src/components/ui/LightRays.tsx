"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

interface LightRaysProps {
    className?: string
    raysColor?: string
    raysOrigin?: string
}

export const LightRays: React.FC<LightRaysProps> = ({
    className,
    raysColor = "rgba(255,255,255,0.05)",
    raysOrigin = "top-left"
}) => {
    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen", className)}>
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="w-[200%] h-[200%] absolute origin-top-left -top-1/2 -left-1/2 will-change-transform"
                style={{
                    background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${raysColor} 10%, transparent 20%, transparent 50%, ${raysColor} 60%, transparent 70%)`,
                    filter: 'blur(30px)',
                    transformOrigin: raysOrigin === 'top-left' ? '0% 0%' : '50% 0%'
                }}
            />
        </div>
    )
}

export default LightRays
