import { getRentalApplications } from "@/lib/supabase/queries"
import RentalsClient from "./rentals-client"

export default async function RentalsPage() {
    const applications = await getRentalApplications()
    return <RentalsClient applications={applications} />
}
