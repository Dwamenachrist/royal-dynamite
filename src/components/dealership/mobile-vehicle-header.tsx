import React from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

interface MobileVehicleHeaderProps {
    vehicle: any
}

export function MobileVehicleHeader({ vehicle }: MobileVehicleHeaderProps) {
    return (
        <div className="lg:hidden space-y-6 mt-6 mb-8">
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
                <div className="text-4xl font-bold text-[#edbc1d] tracking-tight">
                    {vehicle.price ? `GH₵ ${vehicle.price.toLocaleString()}` : `GH₵ ${vehicle.dailyRate}/day`}
                </div>
                <span className="text-xs text-gray-500 mt-2 block">*Price includes all import duties and taxes</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <Button
                    className="w-full bg-gradient-to-r from-[#edbc1d] to-yellow-500 text-black font-bold text-lg py-6 rounded shadow-lg shadow-yellow-500/20"
                >
                    ENQUIRE NOW
                </Button>
                <Button
                    variant="outline"
                    className="w-full bg-white/5 text-white border-white/10 py-6 text-lg font-semibold"
                >
                    <MessageSquare className="w-5 h-5 mr-2 text-green-400" />
                    WHATSAPP DIRECT
                </Button>
            </div>
        </div>
    )
}
