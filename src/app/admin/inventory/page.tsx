import { getVehicles } from "@/lib/supabase/queries"
import InventoryClient from "./inventory-client"

export default async function InventoryPage() {
    const vehicles = await getVehicles()
    return <InventoryClient vehicles={vehicles} />
}
