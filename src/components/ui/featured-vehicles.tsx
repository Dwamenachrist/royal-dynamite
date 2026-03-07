import { getFeaturedVehicles } from "@/lib/supabase/queries"
import { FeaturedVehiclesCarousel } from "@/components/ui/featured-vehicles-carousel"

export async function FeaturedVehicles() {
    const vehicles = await getFeaturedVehicles()
    if (!vehicles || vehicles.length === 0) return null
    return <FeaturedVehiclesCarousel vehicles={vehicles} />
}
