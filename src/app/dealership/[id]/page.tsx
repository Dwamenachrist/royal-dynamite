import { notFound } from "next/navigation"
import { VehicleActionPanel } from "@/components/dealership/vehicle-action-panel"
import { VehicleGallery } from "@/components/dealership/vehicle-gallery"
import { TrustBar } from "@/components/dealership/trust-bar"
import { SpecsTabs } from "@/components/dealership/specs-tabs"
import { MobileVehicleHeader } from "@/components/dealership/mobile-vehicle-header"
import { MobileVehicleFooter } from "@/components/dealership/mobile-vehicle-footer"
import { StickyMobileCTA } from "@/components/dealership/sticky-mobile-cta"
import { SimilarCarsGrid } from "@/components/dealership/similar-cars-grid"
import { getVehicleById, getSaleVehicles } from "@/lib/supabase/queries"
import { dbVehicleToVehicle, dbVehiclesToVehicles } from "@/lib/utils/mapVehicle"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export const revalidate = 60

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const dbVehicle = await getVehicleById(id)

    if (!dbVehicle) {
        return notFound()
    }

    const vehicle = dbVehicleToVehicle(dbVehicle)

    // Get similar vehicles (same category, different ID)
    const allSaleVehicles = await getSaleVehicles()
    const similarVehicles = dbVehiclesToVehicles(
        allSaleVehicles
            .filter(v => v.body_type === dbVehicle.body_type && v.id !== dbVehicle.id)
            .slice(0, 3)
    )

    return (
        <div className="bg-[#0F172A] text-white font-display min-h-screen selection:bg-[#edbc1d] selection:text-black">
            {/* Background Decoration */}
            <div className="fixed top-0 right-0 w-1/2 h-screen bg-[#edbc1d]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-1/3 h-screen bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

            <main className="pt-24 pb-12 lg:pb-12 relative overflow-x-clip" style={{ paddingBottom: "max(5rem, calc(3rem + env(safe-area-inset-bottom, 0px)))" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="flex mb-6 text-sm text-gray-400">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/" className="hover:text-[#edbc1d] transition-colors flex items-center gap-1">
                                    <Home className="w-4 h-4" /> Home
                                </Link>
                            </li>
                            <li><ChevronRight className="w-4 h-4 mx-1" /></li>
                            <li>
                                <Link href="/dealership" className="hover:text-[#edbc1d] transition-colors">
                                    Auto Dealership
                                </Link>
                            </li>
                            <li><ChevronRight className="w-4 h-4 mx-1" /></li>
                            <li aria-current="page" className="text-white font-medium truncate max-w-[200px] sm:max-w-none">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                            </li>
                        </ol>
                    </nav>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Left Column: Media Gallery (65%) */}
                        <div className="w-full lg:w-[65%] space-y-8">
                            <VehicleGallery images={vehicle.images} />

                            {/* Mobile Only Header (Title/Price/CTA) - Appears after Gallery on Mobile */}
                            <MobileVehicleHeader vehicle={vehicle} />

                            <TrustBar className="my-8" />
                            <SpecsTabs vehicle={vehicle} />

                            {/* Mobile Only Footer (Consultant/Map) */}
                            <MobileVehicleFooter vehicle={vehicle} />
                        </div>

                        {/* Right Column: Sticky Details Panel (35%) - Desktop Only */}
                        <div className="hidden lg:block w-full lg:w-[35%]">
                            <VehicleActionPanel vehicle={vehicle} />
                        </div>
                    </div>

                    {/* Recirculation: You May Also Like */}
                    <SimilarCarsGrid vehicles={similarVehicles} />
                </div>
            </main>

            {/* Sticky Mobile CTA — always accessible on scroll */}
            <StickyMobileCTA
                vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                vehicleId={vehicle.id}
                mode="sale"
            />
        </div>
    )
}
