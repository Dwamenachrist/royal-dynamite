import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare } from "lucide-react"
import { generateWhatsAppLink, formatCurrency } from "@/lib/constants"

import { Vehicle } from "@/types"

interface MobileVehicleHeaderProps {
    vehicle: Vehicle
}

export function MobileVehicleHeader({ vehicle }: MobileVehicleHeaderProps) {
    return (
        <div className="lg:hidden -mt-12 mb-8 relative z-20 backdrop-blur-xl bg-[#0F172A]/80 border border-white/10 p-6 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] space-y-6 mx-[-1rem]">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#edbc1d] text-xs font-bold uppercase tracking-widest">
                    <span>{vehicle.year} Model</span>
                    <span className="w-1 h-1 bg-[#edbc1d] rounded-full"></span>
                    <span>{vehicle.status === 'sale' ? 'Unregistered' : 'For Rent'}</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white leading-tight uppercase font-display">
                    {vehicle.make} <span className="text-gray-400 font-light block text-2xl mt-1">{vehicle.model}</span>
                </h1>
            </div>

            {/* Price */}
            <div className="border-b border-white/10 pb-6">
                <div className={vehicle.status === 'sale'
                    ? "text-xl font-semibold text-white/70 italic tracking-wide truncate"
                    : "text-4xl font-bold text-[#edbc1d] tracking-tight truncate"
                }>
                    {vehicle.status === 'sale'
                        ? 'Contact for Price'
                        : `${formatCurrency(vehicle.dailyRate)}/day`}
                </div>
                {vehicle.status !== 'sale' && (
                    <span className="text-xs text-gray-500 mt-2 block">*Comprehensive insurance included</span>
                )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <Button
                    asChild
                    className="w-full bg-gradient-to-r from-[#edbc1d] to-yellow-500 text-black font-bold text-lg py-6 rounded shadow-lg shadow-yellow-500/20"
                >
                    <Link href={`/dealership/${vehicle.id}/enquire`}>
                        ENQUIRE NOW
                    </Link>
                </Button>
                <Button
                    asChild
                    variant="outline"
                    className="w-full bg-white/5 text-white border-white/10 py-6 text-lg font-semibold"
                >
                    <a
                        href={generateWhatsAppLink(
                            `Hi, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}. Please send me more details.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MessageSquare className="w-5 h-5 mr-2 text-green-400" />
                        WHATSAPP DIRECT
                    </a>
                </Button>
            </div>
        </div>
    )
}
