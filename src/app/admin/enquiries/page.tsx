import { getEnquiries } from "@/lib/supabase/queries"
import EnquiriesClient from "./enquiries-client"

export default async function EnquiriesPage() {
    const enquiries = await getEnquiries()
    return <EnquiriesClient enquiries={enquiries} />
}
