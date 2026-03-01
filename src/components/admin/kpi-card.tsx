"use client"

import Link from "next/link"
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KpiCardProps {
    label: string
    value: number | string
    icon: LucideIcon
    color: string
    bgColor: string
    href?: string
    trend?: {
        value: number
        direction: "up" | "down" | "neutral"
    }
    subtitle?: string
}

export default function KpiCard({
    label,
    value,
    icon: Icon,
    color,
    bgColor,
    href,
    trend,
    subtitle,
}: KpiCardProps) {
    const content = (
        <>
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium leading-tight">{label}</span>
                <div
                    className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center border shrink-0",
                        bgColor
                    )}
                >
                    <Icon className={cn("w-4 h-4", color)} />
                </div>
            </div>

            <p className={cn("text-4xl font-extrabold leading-none mt-2", color)}>{value}</p>

            {(trend || subtitle) && (
                <div className="flex items-center gap-2 mt-2">
                    {trend && (
                        <div
                            className={cn(
                                "flex items-center gap-1 text-[11px] font-bold",
                                trend.direction === "up" && "text-green-400",
                                trend.direction === "down" && "text-red-400",
                                trend.direction === "neutral" && "text-gray-500"
                            )}
                        >
                            {trend.direction === "up" && <TrendingUp className="w-3 h-3" />}
                            {trend.direction === "down" && <TrendingDown className="w-3 h-3" />}
                            {trend.direction === "neutral" && <Minus className="w-3 h-3" />}
                            <span>
                                {trend.direction !== "neutral" && (trend.direction === "up" ? "+" : "")}
                                {trend.direction !== "neutral" ? `${trend.value}%` : "Stable"}
                            </span>
                        </div>
                    )}
                    {subtitle && (
                        <span className="text-[11px] text-gray-600">{subtitle}</span>
                    )}
                </div>
            )}
        </>
    )

    const baseClass =
        "bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-0 transition-all"

    if (href) {
        return (
            <Link
                href={href}
                className={cn(
                    baseClass,
                    "hover:bg-white/[0.09] hover:border-white/20 hover:scale-[1.02] cursor-pointer block"
                )}
            >
                {content}
            </Link>
        )
    }

    return (
        <div className={cn(baseClass, "hover:bg-white/[0.07]")}>{content}</div>
    )
}
