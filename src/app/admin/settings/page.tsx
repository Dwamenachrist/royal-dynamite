import { getAdminProfile } from "@/lib/supabase/queries"
import { redirect } from "next/navigation"
import { SettingsClient } from "./settings-client"

export default async function SettingsPage() {
    const profile = await getAdminProfile()

    if (!profile) {
        redirect("/login")
    }

    return <SettingsClient profile={profile} />
}
