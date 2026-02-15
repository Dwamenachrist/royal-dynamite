import React from "react"
import { Vehicle } from "@/types" // Ensure this type exists or import from mock-data
import Image from "next/image"
import Link from "next/link"

interface SimilarCarsGridProps {
    vehicles: Vehicle[]
}

export function SimilarCarsGrid({ vehicles }: SimilarCarsGridProps) {
    if (!vehicles || vehicles.length === 0) return null

    return (
        <div className="mt-24 border-t border-white/5 pt-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">You May Also Like</h2>
                <Link href="/showroom" className="text-[#edbc1d] hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
                    View Inventory <span>→</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vehicles.slice(0, 3).map((vehicle) => (
                    <div key={vehicle.id} className="h-full">
                        <StitchVehicleCard vehicle={vehicle} />
                    </div>
                ))}
            </div>
        </div>
    )
}

import { StitchVehicleCard } from "@/components/stitch/vehicle-card"
