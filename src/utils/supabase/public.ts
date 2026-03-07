// ──────────────────────────────────────────────
// PUBLIC (ANONYMOUS) SUPABASE CLIENT
// ──────────────────────────────────────────────
// This client does NOT call cookies(), so pages that use it
// remain eligible for static rendering / ISR in Next.js.
// Use ONLY for public data (e.g. vehicles with status="available").

import { createClient } from "@supabase/supabase-js"

let _client: ReturnType<typeof createClient> | null = null

export function getPublicSupabaseClient() {
    if (_client) return _client

    _client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    return _client
}
