"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

interface ElectricBorderProps {
    color?: string
    speed?: number
    borderRadius?: number
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
}

export const ElectricBorder: React.FC<ElectricBorderProps> = ({
    color = "#D4AF37", // Royal Gold focus hue
    speed = 1,
    borderRadius = 32,
    className,
    style,
    children
}) => {
    return (
        <div
            className={cn("relative overflow-hidden group p-[1px] transform-gpu", className)}
            style={{ borderRadius, ...style }}
        >
            <div
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ ease: "linear", duration: 4 / speed, repeat: Infinity }}
                    className="absolute -inset-[100%] z-0"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 60%, ${color} 100%)`,
                        borderRadius: '50%'
                    }}
                />
            </div>
            <div
                className="relative z-10 h-full w-full bg-transparent"
                style={{ borderRadius: borderRadius - 1 }}
            >
                {children}
            </div>
        </div>
    )
}

export default ElectricBorder
