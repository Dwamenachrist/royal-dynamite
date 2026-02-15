import React from "react"
import { cn } from "@/lib/utils"
import { ShieldCheck } from "lucide-react"

interface TrustBarProps {
    className?: string
}

export function TrustBar({ className }: TrustBarProps) {
    return (
        <div className={cn(
            "w-full rounded-lg py-3 px-6 flex flex-wrap justify-between items-center gap-4 mt-6",
            "bg-[#0F172A]/60 backdrop-blur-xl border border-white/10", // Glass panel style
            className
        )}>
            <div className="flex items-center gap-2">
                <ShieldCheck className="text-[#edbc1d] w-5 h-5" />
                <span className="text-sm font-medium text-gray-200">150-Point Inspection</span>
            </div>
            <div className="flex items-center gap-2">
                <ShieldCheck className="text-[#edbc1d] w-5 h-5" />
                <span className="text-sm font-medium text-gray-200">Royal Dynamite Warranty</span>
            </div>
            <div className="flex items-center gap-2">
                <ShieldCheck className="text-[#edbc1d] w-5 h-5" />
                <span className="text-sm font-medium text-gray-200">Nationwide Delivery</span>
            </div>
        </div>
    )
}
