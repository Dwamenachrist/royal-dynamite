import React from "react"
import { Phone, MapPin } from "lucide-react"

interface MobileVehicleFooterProps {
    vehicle: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function MobileVehicleFooter({ vehicle }: MobileVehicleFooterProps) {
    return (
        <div className="lg:hidden mt-12 space-y-6">
            {/* Consultant Profile */}
            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
                    <img src="https://i.pravatar.cc/150?u=kwame" alt="Consultant" className="object-cover w-full h-full" />
                </div>
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Sales Consultant</p>
                    <p className="text-sm font-bold text-white">Kwame Mensah</p>
                </div>
                <div className="ml-auto">
                    <button className="text-[#edbc1d] hover:text-white transition-colors p-2 bg-white/5 rounded-full">
                        <Phone className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Mini Map/Location */}
            <div className="rounded-xl p-1 overflow-hidden bg-[#0F172A]/60 border border-white/10">
                <div className="bg-[#1e293b] h-32 w-full rounded relative group cursor-pointer overflow-hidden relative">
                    {/* CSS Based Map Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px), radial-gradient(#4b5563 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 10px 10px'
                    }}></div>
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-600/30 transform -rotate-12"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-600/30 transform rotate-12"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/80 backdrop-blur px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-xl z-10">
                            <MapPin className="text-[#edbc1d] w-3 h-3" />
                            <span className="text-xs font-bold text-white">Adenta - Bulldog, Accra</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
